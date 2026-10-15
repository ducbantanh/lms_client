// Trang /student/course.html?id=...: tài liệu theo mục và danh sách bài kiểm tra.
// Server đã lọc file ẩn và chỉ trả file đề khi bài đã tới giờ mở.

import { api, requirePage, logout } from './api.js';
import { connectRealtime } from './realtime.js';
import { esc } from './ui.js';
import { notify } from './notifications.js';
import { courseIdFromUrl, fileIcon, fileLink, fmtSize, groupFiles, statusBadge, timeRange, typeBadge } from './course-common.js';

const MAX_TIMER_MS = 24 * 60 * 60 * 1000;
let openTimer = null;

const user = await requirePage({ permission: 'courses.view' });
document.getElementById('nav-name').textContent = user.fullName;
document.getElementById('btn-logout').addEventListener('click', logout);

const courseId = courseIdFromUrl();
if (!courseId) window.location.replace('/student/');

const WS = { connecting: ['badge-warning', 'Đang kết nối'], open: ['badge-success', 'Online'], closed: ['badge-secondary', 'Mất kết nối'], revoked: ['badge-danger', 'Đã đăng xuất'] };
connectRealtime()
  .on('status', (s) => {
    const [cls, text] = WS[s] || WS.closed;
    const el = document.getElementById('ws-status');
    el.className = `badge ${cls}`;
    el.textContent = text;
  })
  .on('notification.created', (d) => notify.info(d?.message || 'Bạn có thông báo mới', d?.title));

function render(detail) {
  const c = detail.course;
  document.title = `${c.title} · LAN LMS`;
  document.getElementById('c-title').textContent = c.title;
  document.getElementById('c-code').textContent = c.code;
  document.getElementById('c-teacher').textContent = c.teacherName ? `Giảng viên: ${c.teacherName}` : '';
  document.getElementById('c-desc').textContent = c.description || '';

  const groups = groupFiles(detail).filter((g) => g.section || g.files.length);
  document.getElementById('sections').innerHTML = groups.length === 0
    ? '<div class="card"><div class="card-body empty-state"><i class="fas fa-folder-open"></i>Giảng viên chưa đăng tài liệu</div></div>'
    : groups.map(({ section, files }) => `
      <div class="card card-outline card-primary">
        <div class="card-header py-2"><h3 class="card-title">${section ? esc(section.title) : 'Tài liệu'}</h3></div>
        <ul class="list-group list-group-flush">
          ${files.length ? files.map((f) => `
            <li class="list-group-item d-flex align-items-center">
              <i class="${fileIcon(f.contentType)} mr-2"></i>
              <span class="flex-fill text-truncate">${fileLink(f.id, f.name, f.contentType)}</span>
              <small class="text-muted ml-2">${fmtSize(f.size)}</small>
            </li>`).join('') : '<li class="list-group-item text-muted small">Chưa có tài liệu</li>'}
        </ul>
      </div>`).join('');

  document.getElementById('assessments').innerHTML = detail.assessments.length === 0
    ? '<div class="empty-state small">Chưa có bài kiểm tra</div>'
    : `<ul class="list-group list-group-flush">${detail.assessments.map((a) => `
        <li class="list-group-item">
          <div>${typeBadge(a.type)} ${statusBadge(a.status)}</div>
          <div class="font-weight-bold mt-1">${esc(a.title)}</div>
          ${a.description ? `<div class="small">${esc(a.description)}</div>` : ''}
          <div class="small text-muted">${timeRange(a)}</div>
          ${a.paperFileId
            ? `<a class="btn btn-sm btn-outline-danger mt-1" href="/api/v1/files/${encodeURIComponent(a.paperFileId)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf mr-1"></i>Xem đề</a>`
            : a.status === 'upcoming' ? '<div class="small text-muted mt-1"><i class="fas fa-lock mr-1"></i>Đề sẽ hiện khi tới giờ mở</div>' : ''}
        </li>`).join('')}</ul>`;
}

/** Hẹn giờ tải lại đúng lúc bài sớm nhất tới giờ mở (không polling liên tục). */
function scheduleNextOpen(detail) {
  clearTimeout(openTimer);
  const now = Date.now();
  const next = detail.assessments
    .filter((a) => a.status === 'upcoming' && a.opensAt)
    .map((a) => new Date(a.opensAt).getTime())
    .filter((t) => t > now)
    .sort((x, y) => x - y)[0];
  if (next) {
    openTimer = setTimeout(load, Math.min(next - now + 1000, MAX_TIMER_MS));
  }
}

async function load() {
  try {
    const detail = await api.get(`/student/courses/${encodeURIComponent(courseId)}`);
    render(detail);
    scheduleNextOpen(detail);
    document.body.classList.remove('app-loading');
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      notify.error('Bạn chưa tham gia khóa học này.');
      setTimeout(() => window.location.replace('/student/'), 1200);
      return;
    }
    notify.error(err.message);
  }
}

await load();
