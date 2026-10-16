// Trang /teacher/: danh sách khóa học của giảng viên (admin thấy tất cả) và tạo khóa học mới.

import { api, requirePage } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';
import { esc, fmtDateTime, withBusy } from './ui.js';
import { COURSE_FORMATS } from './messages-vi.js';
import { notify } from './notifications.js';

const user = await requirePage({ permission: 'courses.manage', feature: 'courses' });
const layout = initAdminLayout({ active: 'courses', user });
connectRealtime().on('status', (s) => layout.setWsStatus(s));

if (user.role === 0) {
  document.getElementById('page-title').textContent = 'Tất cả khóa học';
}

async function load() {
  const box = document.getElementById('course-list');
  try {
    const list = await api.get('/teacher/courses');
    if (list.length === 0) {
      box.innerHTML = `
        <div class="col-12">
          <div class="card"><div class="card-body empty-state">
            <i class="fas fa-chalkboard"></i>Chưa có khóa học nào. Bấm <b>Tạo khóa học</b> để bắt đầu.
          </div></div>
        </div>`;
      return;
    }
    box.innerHTML = list.map((c) => `
      <div class="col-md-6 col-xl-4">
        <a class="card card-outline card-primary course-card" href="/teacher/course.html?id=${encodeURIComponent(c.id)}">
          <div class="card-body">
            <span class="badge badge-light text-mono mb-1">${esc(c.code)}</span>
            <h5 class="mb-1 text-dark">${esc(c.title)}</h5>
            <div class="text-muted small">${esc(COURSE_FORMATS[c.format] || '')}</div>
            ${user.role === 0 ? `<div class="text-muted small"><i class="fas fa-user-tie mr-1"></i>${esc(c.teacherName || '')}</div>` : ''}
          </div>
          <div class="card-footer d-flex justify-content-between small text-muted">
            <span><i class="fas fa-user-graduate mr-1"></i>${c.studentCount} sinh viên</span>
            <span>${esc(fmtDateTime(c.createdAt))}</span>
          </div>
        </a>
      </div>`).join('');
  } catch (err) {
    notify.error(err.message);
  }
}

const $err = document.getElementById('course-error');
document.getElementById('course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    code: document.getElementById('f-code').value.trim(),
    title: document.getElementById('f-title').value.trim(),
    description: document.getElementById('f-desc').value.trim(),
    format: Number(document.querySelector('input[name="format"]:checked').value),
  };
  $err.classList.add('d-none');
  if (!body.code || !body.title) {
    $err.textContent = 'Nhập mã học phần và tên khóa học.';
    $err.classList.remove('d-none');
    return;
  }
  withBusy(document.getElementById('btn-save-course'), async () => {
    try {
      const c = await api.post('/teacher/courses', body);
      window.location.href = `/teacher/course.html?id=${encodeURIComponent(c.id)}`;
    } catch (err) {
      $err.textContent = err.message;
      $err.classList.remove('d-none');
    }
  });
});

await load();
