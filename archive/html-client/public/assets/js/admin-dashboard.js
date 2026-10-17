// Trang /admin/: thống kê + danh sách online cập nhật realtime qua presence.changed.

import { api, requirePage, hasPermission } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';
import { esc, fmtTime, fmtDateTime, debounce } from './ui.js';
import { roleName, ROLE } from './messages-vi.js';
import { notify } from './notifications.js';

const MAX_FEED = 30;

const user = await requirePage({ permission: 'presence.view' });
const layout = initAdminLayout({ active: 'dashboard', user });
const canManage = hasPermission(user, 'users.manage');
const canKick = canManage && hasPermission(user, 'sessions.manage');

document.querySelectorAll('.stat-admin-only').forEach((el) => el.classList.toggle('d-none', !canManage));

async function totalOf(query) {
  const page = await api.get(`/admin/users?size=1${query}`);
  return page.total;
}

async function loadStats() {
  if (!canManage) return;
  const [total, students, locked] = await Promise.all([totalOf(''), totalOf(`&role=${ROLE.STUDENT}`), totalOf('&status=0')]);
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-students').textContent = students;
  document.getElementById('stat-locked').textContent = locked;
}

async function loadPresence() {
  const snap = await api.get('/admin/presence');
  document.getElementById('stat-online').textContent = snap.onlineUsers;
  const body = document.getElementById('online-body');
  if (snap.users.length === 0) {
    body.innerHTML = '<tr><td colspan="6" class="empty-state"><i class="fas fa-user-slash"></i>Không có ai online</td></tr>';
    return;
  }
  body.innerHTML = snap.users.map((u) => `
    <tr>
      <td class="text-mono">${esc(u.username)}</td>
      <td>${esc(u.fullName)}</td>
      <td class="d-none d-md-table-cell">${esc(roleName(u.role))}</td>
      <td class="d-none d-md-table-cell"><span class="badge badge-light">${u.connections}</span></td>
      <td class="d-none d-sm-table-cell">${esc(fmtDateTime(u.since))}</td>
      <td class="text-right">
        ${canKick && u.id !== user.id ? `
          <button class="btn btn-xs btn-outline-danger text-nowrap" data-kick="${esc(u.id)}" data-name="${esc(u.username)}">
            <i class="fas fa-sign-out-alt"></i> Đăng xuất
          </button>` : ''}
      </td>
    </tr>`).join('');
}

function pushFeed(data) {
  const feed = document.getElementById('feed');
  feed.querySelector('.empty-state')?.remove();
  const li = document.createElement('li');
  li.className = 'list-group-item py-2';
  li.innerHTML = `
    <i class="fas fa-circle status-dot mr-1 ${data.online ? 'text-success' : 'text-secondary'}"></i>
    <b>${esc(data.username)}</b> ${data.online ? 'vừa online' : 'đã offline'}
    <small class="text-muted float-right">${esc(fmtTime(new Date().toISOString()))}</small>`;
  feed.prepend(li);
  while (feed.children.length > MAX_FEED) feed.lastElementChild.remove();
}

document.getElementById('online-body').addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-kick]');
  if (!btn) return;
  if (!window.confirm(`Đăng xuất "${btn.dataset.name}" khỏi mọi thiết bị?`)) return;
  try {
    const r = await api.post(`/admin/users/${encodeURIComponent(btn.dataset.kick)}/force-logout`);
    notify.success(`Đã đăng xuất ${btn.dataset.name} (${r.revokedSessions} phiên).`);
  } catch (err) {
    notify.error(err.message);
  }
});

const refresh = debounce(() => {
  loadPresence().catch((err) => notify.error(err.message));
  loadStats().catch(() => {});
}, 200);

const rt = connectRealtime();
rt.on('status', (s) => layout.setWsStatus(s));
rt.on('presence.changed', (data) => {
  pushFeed(data);
  refresh();
});

await Promise.all([loadPresence(), loadStats()]).catch((err) => notify.error(err.message));
