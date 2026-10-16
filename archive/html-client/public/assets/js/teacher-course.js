// Trang /teacher/course.html?id=...: nội dung (mục + tài liệu), sinh viên (3 cách enroll), bài kiểm tra.

import { api, requirePage } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';
import { esc, fmtDateTime, debounce, withBusy } from './ui.js';
import { COURSE_FORMATS } from './messages-vi.js';
import { notify } from './notifications.js';
import {
  ALLOWED_EXT, MAX_UPLOAD_BYTES, courseIdFromUrl, fileIcon, fileLink, fmtSize, groupFiles,
  localInputToIso, statusBadge, timeRange, typeBadge,
} from './course-common.js';

const user = await requirePage({ permission: 'courses.manage', feature: 'courses' });
const layout = initAdminLayout({ active: 'courses', user });
connectRealtime().on('status', (s) => layout.setWsStatus(s));

const courseId = courseIdFromUrl();
if (!courseId) window.location.replace('/teacher/');
const base = `/teacher/courses/${encodeURIComponent(courseId)}`;
const ENROLL_METHODS = { 0: 'Dán MSSV', 1: 'Chọn từ DS', 2: 'Mã tham gia' };

let detail = null;
let enrolledIds = new Set();
const $ = (id) => document.getElementById(id);

// ============================================================ tải dữ liệu

async function loadDetail() {
  try {
    detail = await api.get(base);
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      notify.error('Không tìm thấy khóa học.');
      setTimeout(() => window.location.replace('/teacher/'), 1200);
      return;
    }
    throw err;
  }
  const c = detail.course;
  document.title = `${c.title} · LAN LMS`;
  $('c-title').textContent = c.title;
  $('c-code').textContent = c.code;
  $('c-format').textContent = COURSE_FORMATS[c.format] || '';
  $('n-students').textContent = c.studentCount;
  $('n-assessments').textContent = detail.assessments.length;
  renderSections();
  renderUploadTargets();
  renderKey();
  renderAssessments();
  renderPaperOptions();
}

// ============================================================ nội dung

function fileRow(f) {
  return `
    <li class="list-group-item d-flex align-items-center">
      <i class="${fileIcon(f.contentType)} mr-2"></i>
      <div class="flex-fill text-truncate">
        ${fileLink(f.id, f.name, f.contentType)}
        <small class="text-muted ml-1">${fmtSize(f.size)}</small>
        ${f.hidden ? '<span class="badge badge-warning ml-1"><i class="fas fa-eye-slash"></i> Ẩn</span>' : ''}
      </div>
      <div class="text-nowrap">
        <button class="btn btn-xs btn-outline-secondary" data-toggle-hidden="${esc(f.id)}" data-hidden="${f.hidden}" title="${f.hidden ? 'Hiện với sinh viên' : 'Ẩn với sinh viên'}">
          <i class="fas ${f.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i>
        </button>
        <button class="btn btn-xs btn-outline-danger" data-del-file="${esc(f.id)}" data-name="${esc(f.name)}" title="Xóa file"><i class="fas fa-trash"></i></button>
      </div>
    </li>`;
}

function renderSections() {
  const fmt = detail.course.format;
  const groups = groupFiles(detail);
  const box = $('sections');

  if (fmt !== 2 && detail.sections.length === 0 && detail.files.length === 0) {
    box.innerHTML = `<div class="empty-state"><i class="fas fa-layer-group"></i>Chưa có mục nào. Thêm ${fmt === 1 ? 'tuần' : 'mục'} đầu tiên ở bên dưới.</div>`;
  } else {
    box.innerHTML = groups.map(({ section, files }) => `
      <div class="card card-outline ${section ? 'card-info' : 'card-secondary'} mb-3">
        <div class="card-header py-2">
          <h3 class="card-title">${section ? esc(section.title) : fmt === 2 ? 'Tài liệu' : '<i>Chưa phân mục</i>'}</h3>
          ${section ? `<div class="card-tools"><button class="btn btn-tool text-danger" data-del-section="${esc(section.id)}" data-name="${esc(section.title)}" title="Xóa mục"><i class="fas fa-times"></i></button></div>` : ''}
        </div>
        <ul class="list-group list-group-flush">
          ${files.length ? files.map(fileRow).join('') : '<li class="list-group-item text-muted small">Chưa có tài liệu</li>'}
        </ul>
      </div>`).join('');
  }

  // Ô thêm mục: ẩn với course chỉ có danh sách file; course theo tuần gợi ý sẵn "Tuần N"
  $('section-form').classList.toggle('d-none', fmt === 2);
  if (fmt === 1) {
    $('s-title').value = `Tuần ${detail.sections.length + 1}`;
  }
}

function renderUploadTargets() {
  const fmt = detail.course.format;
  $('upload-section-group').classList.toggle('d-none', fmt === 2);
  const sel = $('u-section');
  const current = sel.value;
  sel.innerHTML = detail.sections.map((s) => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('')
    + '<option value="">— Chưa phân mục —</option>';
  // Giữ lựa chọn cũ sau khi tải lại; lần đầu mặc định là mục đầu tiên
  if (current && [...sel.options].some((o) => o.value === current)) sel.value = current;
}

$('section-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = $('s-title').value.trim();
  if (!title) return;
  try {
    await api.post(`${base}/sections`, { title });
    $('s-title').value = '';
    await loadDetail();
  } catch (err) {
    notify.error(err.message);
  }
});

$('upload-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const file = $('u-file').files[0];
  if (!file) {
    notify.warning('Chọn file cần tải lên.');
    return;
  }
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    notify.error('Chỉ nhận file PDF, DOCX hoặc PPTX.');
    return;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    notify.error('File quá lớn (tối đa 20 MB).');
    return;
  }
  const fd = new FormData();
  fd.append('file', file);
  if (detail.course.format !== 2 && $('u-section').value) fd.append('sectionId', $('u-section').value);
  fd.append('hidden', $('u-hidden').checked ? 'true' : 'false');

  withBusy($('btn-upload'), async () => {
    try {
      await api.upload(`${base}/files`, fd);
      notify.success(`Đã tải lên ${file.name}.`);
      $('u-file').value = '';
      $('u-hidden').checked = false;
      await loadDetail();
    } catch (err) {
      notify.error(err.message);
    }
  });
});

$('sections').addEventListener('click', async (e) => {
  const del = e.target.closest('[data-del-file]');
  const tog = e.target.closest('[data-toggle-hidden]');
  const delSec = e.target.closest('[data-del-section]');
  try {
    if (del) {
      if (!window.confirm(`Xóa file "${del.dataset.name}"?`)) return;
      await api.del(`${base}/files/${encodeURIComponent(del.dataset.delFile)}`);
      notify.success('Đã xóa file.');
    } else if (tog) {
      await api.patch(`${base}/files/${encodeURIComponent(tog.dataset.toggleHidden)}`, { hidden: tog.dataset.hidden !== 'true' });
    } else if (delSec) {
      if (!window.confirm(`Xóa mục "${delSec.dataset.name}"? Tài liệu trong mục sẽ chuyển sang "Chưa phân mục".`)) return;
      await api.del(`${base}/sections/${encodeURIComponent(delSec.dataset.delSection)}`);
    } else {
      return;
    }
    await loadDetail();
  } catch (err) {
    notify.error(err.message);
  }
});

// ============================================================ sinh viên

async function loadStudents() {
  try {
    const rows = await api.get(`${base}/students`);
    enrolledIds = new Set(rows.map((r) => r.id));
    $('n-students').textContent = rows.length;
    $('student-body').innerHTML = rows.length === 0
      ? '<tr><td colspan="4" class="empty-state"><i class="fas fa-user-plus"></i>Chưa có sinh viên. Dùng một trong 3 cách bên cạnh để thêm.</td></tr>'
      : rows.map((r) => `
        <tr>
          <td class="text-mono">${esc(r.username)}</td>
          <td>${esc(r.fullName)}</td>
          <td class="d-none d-md-table-cell small text-muted">${esc(ENROLL_METHODS[r.method] || '')} · ${esc(fmtDateTime(r.enrolledAt))}</td>
          <td class="text-right"><button class="btn btn-xs btn-outline-danger" data-unenroll="${esc(r.id)}" data-name="${esc(r.username)}" title="Xóa khỏi khóa học"><i class="fas fa-user-minus"></i></button></td>
        </tr>`).join('');
    renderPickList();
  } catch (err) {
    notify.error(err.message);
  }
}

$('student-body').addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-unenroll]');
  if (!btn || !window.confirm(`Xóa ${btn.dataset.name} khỏi khóa học?`)) return;
  try {
    await api.del(`${base}/students/${encodeURIComponent(btn.dataset.unenroll)}`);
    await loadStudents();
  } catch (err) {
    notify.error(err.message);
  }
});

function reportHtml(r) {
  const parts = [`<div class="text-success"><i class="fas fa-check mr-1"></i>Đã thêm <b>${r.added.length}</b> sinh viên.</div>`];
  const list = (label, cls, items) => items.length
    ? `<div class="${cls}">${label} (${items.length}): <span class="text-mono">${items.map(esc).join(', ')}</span></div>` : '';
  parts.push(list('Đã có trong khóa', 'text-muted', r.alreadyEnrolled));
  parts.push(list('Không tìm thấy tài khoản', 'text-danger', r.notFound));
  parts.push(list('Không phải tài khoản sinh viên', 'text-warning', r.notStudent));
  return parts.join('');
}

$('btn-paste').addEventListener('click', (e) => {
  const content = $('paste-content').value.trim();
  if (!content) {
    notify.warning('Dán danh sách MSSV trước.');
    return;
  }
  withBusy(e.currentTarget, async () => {
    try {
      const r = await api.post(`${base}/students/paste`, { content });
      $('paste-report').innerHTML = reportHtml(r);
      if (r.added.length) $('paste-content').value = '';
      await loadStudents();
    } catch (err) {
      notify.error(err.message);
    }
  });
});

// ---- chọn từ danh sách
let pickResults = [];
const picked = new Set();

async function searchStudents() {
  try {
    pickResults = await api.get(`/teacher/students?q=${encodeURIComponent($('pick-q').value.trim())}`);
    renderPickList();
  } catch (err) {
    notify.error(err.message);
  }
}

function renderPickList() {
  const box = $('pick-list');
  if (pickResults.length === 0) {
    box.innerHTML = '<div class="empty-state small">Không có sinh viên phù hợp</div>';
  } else {
    box.innerHTML = pickResults.map((u) => {
      const already = enrolledIds.has(u.id);
      return `
        <label class="pick-item d-flex align-items-center mb-0 ${already ? 'text-muted' : ''}">
          <input type="checkbox" class="mr-2" value="${esc(u.id)}" ${already ? 'disabled checked' : picked.has(u.id) ? 'checked' : ''}>
          <span class="text-mono mr-2">${esc(u.username)}</span>
          <span class="text-truncate">${esc(u.fullName)}</span>
          ${already ? '<span class="badge badge-light ml-auto">đã có</span>' : ''}
        </label>`;
    }).join('');
  }
  const btn = $('btn-pick');
  btn.disabled = picked.size === 0;
  btn.textContent = picked.size ? `Thêm ${picked.size} sinh viên đã chọn` : 'Thêm sinh viên đã chọn';
}

$('pick-list').addEventListener('change', (e) => {
  if (e.target.type !== 'checkbox' || e.target.disabled) return;
  if (e.target.checked) picked.add(e.target.value);
  else picked.delete(e.target.value);
  renderPickList();
});
$('pick-q').addEventListener('input', debounce(searchStudents, 300));

$('btn-pick').addEventListener('click', (e) => {
  withBusy(e.currentTarget, async () => {
    try {
      const r = await api.post(`${base}/students`, { userIds: [...picked] });
      notify.success(`Đã thêm ${r.added.length} sinh viên.`);
      picked.clear();
      await loadStudents();
    } catch (err) {
      notify.error(err.message);
    }
  });
});

// ---- mã tham gia
function renderKey() {
  const key = detail.course.enrollKey;
  $('key-box').textContent = key || 'Đang tắt';
  $('key-box').classList.toggle('text-muted', !key);
  $('btn-key-off').disabled = !key;
}

$('btn-key-new').addEventListener('click', async () => {
  if (detail.course.enrollKey && !window.confirm('Tạo mã mới? Mã cũ sẽ không dùng được nữa.')) return;
  try {
    const r = await api.post(`${base}/enroll-key`);
    detail.course.enrollKey = r.enrollKey;
    renderKey();
  } catch (err) {
    notify.error(err.message);
  }
});

$('btn-key-off').addEventListener('click', async () => {
  try {
    await api.del(`${base}/enroll-key`);
    detail.course.enrollKey = null;
    renderKey();
  } catch (err) {
    notify.error(err.message);
  }
});

// ============================================================ bài kiểm tra

function renderAssessments() {
  const box = $('assessment-list');
  if (detail.assessments.length === 0) {
    box.innerHTML = '<div class="empty-state"><i class="fas fa-file-signature"></i>Chưa có bài kiểm tra nào</div>';
    return;
  }
  box.innerHTML = detail.assessments.map((a) => `
    <div class="card card-outline card-light mb-2">
      <div class="card-body py-2">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            ${typeBadge(a.type)} ${statusBadge(a.status)}
            <h6 class="mb-1 mt-1">${esc(a.title)}</h6>
          </div>
          <button class="btn btn-xs btn-outline-danger" data-del-assessment="${esc(a.id)}" data-name="${esc(a.title)}" title="Xóa bài"><i class="fas fa-trash"></i></button>
        </div>
        ${a.description ? `<div class="small mb-1">${esc(a.description)}</div>` : ''}
        <div class="small text-muted">${timeRange(a)}</div>
        <div class="small">${a.paperFileId ? `<i class="fas fa-file-pdf text-danger mr-1"></i>Đề: ${fileLink(a.paperFileId, a.paperFileName, 'application/pdf')}` : '<span class="text-muted">Không có file đề</span>'}</div>
      </div>
    </div>`).join('');
}

function renderPaperOptions() {
  const pdfs = detail.files.filter((f) => f.contentType === 'application/pdf');
  $('a-paper').innerHTML = '<option value="">— Không có đề —</option>'
    + pdfs.map((f) => `<option value="${esc(f.id)}">${esc(f.name)}${f.hidden ? ' (ẩn)' : ''}</option>`).join('');
}

$('assessment-list').addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-del-assessment]');
  if (!btn || !window.confirm(`Xóa bài "${btn.dataset.name}"? File đề vẫn được giữ trong tài liệu.`)) return;
  try {
    await api.del(`${base}/assessments/${encodeURIComponent(btn.dataset.delAssessment)}`);
    await loadDetail();
  } catch (err) {
    notify.error(err.message);
  }
});

$('assessment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const err = $('a-error');
  const body = {
    type: Number($('a-type').value),
    title: $('a-title').value.trim(),
    description: $('a-desc').value.trim(),
    paperFileId: $('a-paper').value || null,
    opensAt: localInputToIso($('a-open').value),
    closesAt: localInputToIso($('a-close').value),
  };
  const fail = (m) => {
    err.textContent = m;
    err.classList.remove('d-none');
  };
  err.classList.add('d-none');
  if (!body.title) {
    fail('Nhập tiêu đề.');
    return;
  }
  if (body.opensAt && body.closesAt && new Date(body.closesAt) <= new Date(body.opensAt)) {
    fail('Giờ đóng phải sau giờ mở.');
    return;
  }
  if (body.type === 2 && !body.paperFileId) {
    fail('Bài thi cần chọn file đề (PDF).');
    return;
  }
  withBusy($('btn-assessment'), async () => {
    try {
      await api.post(`${base}/assessments`, body);
      notify.success('Đã tạo bài.');
      e.target.reset();
      await loadDetail();
    } catch (ex) {
      fail(ex.message);
    }
  });
});

// ============================================================ xóa course

$('btn-delete-course').addEventListener('click', async () => {
  const c = detail.course;
  if (!window.confirm(`XÓA khóa học "${c.code} – ${c.title}"?\nToàn bộ tài liệu, bài kiểm tra và danh sách sinh viên sẽ bị xóa vĩnh viễn.`)) return;
  try {
    await api.del(base);
    notify.success('Đã xóa khóa học.');
    setTimeout(() => window.location.replace('/teacher/'), 600);
  } catch (err) {
    notify.error(err.message);
  }
});

await loadDetail();
await loadStudents();
await searchStudents();
