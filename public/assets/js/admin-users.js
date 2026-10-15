// Trang /admin/users.html: tìm kiếm, phân trang, khóa/mở khóa, xóa, ép đăng xuất.

import { api, requirePage, hasPermission } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';
import { esc, fmtDateTime, debounce, withBusy } from './ui.js';
import { roleName } from './messages-vi.js';
import { notify } from './notifications.js';

const PAGE_SIZE = 20;

const user = await requirePage({ permission: 'users.manage' });
const layout = initAdminLayout({ active: 'users', user });
const canKick = hasPermission(user, 'sessions.manage');

const params = new URLSearchParams(window.location.search);
const state = {
  q: params.get('q') || '',
  role: params.get('role') || '',
  status: params.get('status') || '',
  page: 0,
};
const online = new Set();
let lastItems = [];

const $q = document.getElementById('q');
const $role = document.getElementById('role');
const $status = document.getElementById('status');
$q.value = state.q;
$role.value = state.role;
$status.value = state.status;

async function load() {
  const qs = new URLSearchParams({ page: state.page, size: PAGE_SIZE });
  if (state.q) qs.set('q', state.q);
  if (state.role !== '') qs.set('role', state.role);
  if (state.status !== '') qs.set('status', state.status);
  try {
    const data = await api.get(`/admin/users?${qs}`);
    // Trang hiện tại bị trống (vd vừa xóa phần tử cuối) thì lùi 1 trang
    if (data.items.length === 0 && state.page > 0) {
      state.page -= 1;
      return load();
    }
    lastItems = data.items;
    renderRows();
    renderPager(data);
  } catch (err) {
    notify.error(err.message);
  }
}

function renderRows() {
  const body = document.getElementById('user-body');
  if (lastItems.length === 0) {
    body.innerHTML = '<tr><td colspan="6" class="empty-state"><i class="fas fa-search"></i>Không có tài khoản phù hợp</td></tr>';
    return;
  }
  body.innerHTML = lastItems.map((u) => {
    const self = u.id === user.id;
    const isOnline = online.has(u.id);
    const status = u.status === 1
      ? '<span class="badge badge-success">Hoạt động</span>'
      : '<span class="badge badge-danger">Bị khóa</span>';
    const flags = u.mustChangePassword ? ' <span class="badge badge-warning d-none d-sm-inline-block" title="Chưa đổi mật khẩu lần đầu">MK mặc định</span>' : '';
    return `
      <tr>
        <td>
          <i class="fas fa-circle status-dot mr-1 ${isOnline ? 'text-success' : 'text-gray'}" title="${isOnline ? 'Đang online' : 'Offline'}"></i><span class="text-mono">${esc(u.username)}</span>
          ${self ? '<span class="badge badge-info ml-1">Bạn</span>' : ''}
          <div class="d-md-none small text-muted">${esc(u.fullName)}</div>
        </td>
        <td class="d-none d-md-table-cell">${esc(u.fullName)}</td>
        <td class="d-none d-md-table-cell">${esc(roleName(u.role))}</td>
        <td>${status}${flags}</td>
        <td class="d-none d-lg-table-cell">${esc(fmtDateTime(u.lastLoginAt))}</td>
        <td class="text-right text-nowrap">
          ${self ? '' : actionButtons(u, isOnline)}
        </td>
      </tr>`;
  }).join('');
}

function actionButtons(u, isOnline) {
  const id = esc(u.id);
  const name = esc(u.username);
  const kick = canKick
    ? `<button class="btn btn-xs btn-outline-secondary" data-action="kick" data-id="${id}" data-name="${name}" ${isOnline ? '' : 'disabled'} title="Đăng xuất khỏi mọi thiết bị"><i class="fas fa-sign-out-alt"></i></button>`
    : '';
  const lock = u.status === 1
    ? `<button class="btn btn-xs btn-outline-warning" data-action="lock" data-id="${id}" data-name="${name}" title="Khóa tài khoản"><i class="fas fa-lock"></i></button>`
    : `<button class="btn btn-xs btn-outline-success" data-action="unlock" data-id="${id}" data-name="${name}" title="Mở khóa"><i class="fas fa-lock-open"></i></button>`;
  const del = `<button class="btn btn-xs btn-outline-danger" data-action="delete" data-id="${id}" data-name="${name}" title="Xóa tài khoản"><i class="fas fa-trash"></i></button>`;
  return `${kick} ${lock} ${del}`;
}

function renderPager({ page, totalPages, total }) {
  const from = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const to = Math.min((page + 1) * PAGE_SIZE, total);
  document.getElementById('page-info').textContent = `Hiển thị ${from}–${to} / ${total} tài khoản`;

  const pager = document.getElementById('pager');
  if (totalPages <= 1) {
    pager.innerHTML = '';
    return;
  }
  const start = Math.max(0, page - 2);
  const end = Math.min(totalPages - 1, page + 2);
  const item = (p, label, disabled, active) => `
    <li class="page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}">
      <a class="page-link" href="#" data-page="${p}">${label}</a>
    </li>`;
  let html = item(page - 1, '«', page === 0, false);
  for (let p = start; p <= end; p += 1) html += item(p, p + 1, false, p === page);
  html += item(page + 1, '»', page >= totalPages - 1, false);
  pager.innerHTML = html;
}

const ACTIONS = {
  kick: { confirm: (n) => `Đăng xuất "${n}" khỏi mọi thiết bị?`, run: (id) => api.post(`/admin/users/${id}/force-logout`), ok: (n) => `Đã đăng xuất ${n}.` },
  lock: { confirm: (n) => `Khóa tài khoản "${n}"? Người dùng sẽ bị đăng xuất ngay.`, run: (id) => api.post(`/admin/users/${id}/lock`), ok: (n) => `Đã khóa ${n}.` },
  unlock: { confirm: null, run: (id) => api.post(`/admin/users/${id}/unlock`), ok: (n) => `Đã mở khóa ${n}.` },
  delete: { confirm: (n) => `XÓA vĩnh viễn tài khoản "${n}"? Không thể hoàn tác.`, run: (id) => api.del(`/admin/users/${id}`), ok: (n) => `Đã xóa ${n}.` },
};

document.getElementById('user-body').addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = ACTIONS[btn.dataset.action];
  const { name } = btn.dataset;
  if (action.confirm && !window.confirm(action.confirm(name))) return;
  btn.disabled = true;
  try {
    await action.run(encodeURIComponent(btn.dataset.id));
    notify.success(action.ok(name));
    await load();
  } catch (err) {
    notify.error(err.message);
    btn.disabled = false;
  }
});

document.getElementById('pager').addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (!link) return;
  e.preventDefault();
  if (link.parentElement.classList.contains('disabled')) return;
  state.page = Number(link.dataset.page);
  load();
});

function applyFilters() {
  state.q = $q.value.trim();
  state.role = $role.value;
  state.status = $status.value;
  state.page = 0;
  const qs = new URLSearchParams();
  if (state.q) qs.set('q', state.q);
  if (state.role) qs.set('role', state.role);
  if (state.status) qs.set('status', state.status);
  window.history.replaceState(null, '', qs.toString() ? `?${qs}` : window.location.pathname);
  load();
}

document.getElementById('filter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  applyFilters();
});
$q.addEventListener('input', debounce(applyFilters, 350));
$role.addEventListener('change', applyFilters);
$status.addEventListener('change', applyFilters);

// ------------------------------------------------------------ thêm tài khoản

const $createErr = document.getElementById('create-error');
document.getElementById('create-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    role: Number(document.getElementById('c-role').value),
    username: document.getElementById('c-username').value.trim(),
    fullName: document.getElementById('c-fullname').value.trim(),
    password: document.getElementById('c-password').value,
  };
  const fail = (msg) => {
    $createErr.textContent = msg;
    $createErr.classList.remove('d-none');
  };
  $createErr.classList.add('d-none');
  if (!/^[A-Za-z0-9][A-Za-z0-9_.-]{2,31}$/.test(body.username)) {
    fail('Tên đăng nhập 3–32 ký tự, chỉ gồm chữ, số và _ . -');
    return;
  }
  if (body.fullName.length < 2) {
    fail('Nhập họ và tên.');
    return;
  }
  if (body.password.length < 8) {
    fail('Mật khẩu ban đầu tối thiểu 8 ký tự.');
    return;
  }
  withBusy(document.getElementById('btn-create'), async () => {
    try {
      const u = await api.post('/admin/users', body);
      window.jQuery('#create-modal').modal('hide');
      e.target.reset();
      notify.success(`Đã tạo tài khoản ${u.username}.`);
      await load();
    } catch (err) {
      fail(err.message);
    }
  });
});

async function loadOnline() {
  try {
    const snap = await api.get('/admin/presence');
    online.clear();
    snap.users.forEach((u) => online.add(u.id));
  } catch {
    // không có quyền presence.view thì bỏ qua chấm online
  }
}

const rt = connectRealtime();
rt.on('status', (s) => layout.setWsStatus(s));
rt.on('presence.changed', (d) => {
  if (d.online) online.add(d.userId);
  else online.delete(d.userId);
  renderRows();
});

await loadOnline();
await load();
