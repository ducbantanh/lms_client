// Trang /student/: profile, khóa học (giai đoạn 2), thông báo realtime.
// Bị admin đăng xuất / khóa tài khoản -> realtime.js hiện thông báo và đưa về trang login.

import { api, requirePage, logout } from './api.js';
import { config } from './config.js';
import { connectRealtime } from './realtime.js';
import { esc, fmtTime, withBusy } from './ui.js';
import { roleName } from './messages-vi.js';
import { notify } from './notifications.js';

const MAX_NOTICES = 20;

const user = await requirePage({ permission: 'courses.view' });
document.getElementById('join-form').classList.toggle('d-none', !config.features.courses);

document.getElementById('nav-name').textContent = user.fullName;
document.getElementById('hello-name').textContent = user.fullName;
document.getElementById('btn-logout').addEventListener('click', logout);
document.body.classList.remove('app-loading');

const WS = {
  connecting: ['badge-warning', 'Đang kết nối', '<span class="text-warning">Đang kết nối</span>'],
  open: ['badge-success', 'Online', '<span class="text-success"><i class="fas fa-circle status-dot"></i> Online</span>'],
  closed: ['badge-secondary', 'Mất kết nối', '<span class="text-muted">Mất kết nối</span>'],
  revoked: ['badge-danger', 'Đã đăng xuất', '<span class="text-danger">Đã đăng xuất</span>'],
};

function setStatus(s) {
  const [cls, text, html] = WS[s] || WS.closed;
  const badge = document.getElementById('ws-status');
  badge.className = `badge ${cls}`;
  badge.textContent = text;
  document.getElementById('p-online').innerHTML = html;
}

function renderCourses(courses) {
  const box = document.getElementById('courses');
  if (!courses || courses.length === 0) {
    box.innerHTML = `<div class="empty-state"><i class="fas fa-book-open"></i>Bạn chưa tham gia khóa học nào.<br><small>${config.features.courses ? 'Nhập mã tham gia ở trên, hoặc chờ giảng viên thêm bạn vào lớp.' : 'Khóa học sẽ xuất hiện khi nhà trường mở lớp.'}</small></div>`;
    return;
  }
  box.innerHTML = courses.map((c) => `
    <a href="/student/course.html?id=${encodeURIComponent(c.id)}" class="list-group-item list-group-item-action d-flex align-items-center">
      <i class="fas fa-book text-primary mr-3"></i>
      <div class="flex-fill">
        <div><span class="badge badge-light text-mono mr-1">${esc(c.code)}</span><b>${esc(c.title)}</b></div>
        <small class="text-muted">${esc(c.teacherName || '')}</small>
      </div>
      <i class="fas fa-chevron-right text-muted"></i>
    </a>`).join('');
}

async function loadCourses() {
  try {
    renderCourses((await api.get('/student/dashboard')).courses);
  } catch (err) {
    notify.error(err.message);
  }
}

document.getElementById('join-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!config.features.courses) return;
  const key = document.getElementById('join-key').value.trim();
  if (!key) {
    notify.warning('Nhập mã tham gia.');
    return;
  }
  withBusy(document.getElementById('btn-join'), async () => {
    try {
      const c = await api.post('/student/courses/join', { key });
      notify.success(`Đã tham gia ${c.code} – ${c.title}.`);
      document.getElementById('join-key').value = '';
      await loadCourses();
    } catch (err) {
      notify.error(err.message);
    }
  });
});

function addNotice(data) {
  const list = document.getElementById('notices');
  list.querySelector('.empty-state')?.remove();
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <div class="d-flex justify-content-between">
      <b>${esc(data?.title || 'Thông báo')}</b>
      <small class="text-muted">${esc(fmtTime(new Date().toISOString()))}</small>
    </div>
    <div>${esc(data?.message || '')}</div>`;
  list.prepend(li);
  while (list.children.length > MAX_NOTICES) list.lastElementChild.remove();
}

try {
  const dash = await api.get('/student/dashboard');
  document.getElementById('p-name').textContent = dash.profile.fullName;
  document.getElementById('p-username').textContent = dash.profile.username;
  document.getElementById('p-role').textContent = roleName(user.role);
  renderCourses(dash.courses);
} catch (err) {
  notify.error(err.message);
}

const rt = connectRealtime();
rt.on('status', setStatus);
// P3 sẽ thêm API gửi thông báo; data dự kiến: { title, message }
rt.on('notification.created', (data) => {
  addNotice(data);
  notify.info(data?.message || 'Bạn có thông báo mới', data?.title);
});
