// Khung giao diện chung cho các trang quản lý (admin + giảng viên): navbar + sidebar AdminLTE.
// Mục menu hiện theo permission nên giảng viên chỉ thấy "Khóa học".
// Trang mới chỉ cần thêm 1 mục vào MENU và gọi initAdminLayout().

import { esc } from './ui.js';
import { logout, hasPermission, homeFor } from './api.js';
import { roleName } from './messages-vi.js';

const MENU = [
  { key: 'dashboard', href: '/admin/', icon: 'fas fa-tachometer-alt', label: 'Tổng quan', permission: 'presence.view' },
  { key: 'users', href: '/admin/users.html', icon: 'fas fa-users', label: 'Người dùng', permission: 'users.manage' },
  { key: 'import', href: '/admin/import.html', icon: 'fas fa-file-import', label: 'Import sinh viên', permission: 'users.manage' },
  { key: 'courses', href: '/teacher/', icon: 'fas fa-chalkboard-teacher', label: 'Khóa học', permission: 'courses.manage' },
  // P1: { key: 'audit', href: '/admin/audit.html', icon: 'fas fa-clipboard-list', label: 'Nhật ký', permission: 'audit.view' },
  // P3: { key: 'notifications', href: '/admin/notifications.html', icon: 'fas fa-bullhorn', label: 'Gửi thông báo', permission: 'users.manage' },
];

const WS_STATUS = {
  connecting: { cls: 'badge-warning', text: 'Đang kết nối' },
  open: { cls: 'badge-success', text: 'Realtime' },
  closed: { cls: 'badge-secondary', text: 'Mất kết nối' },
  revoked: { cls: 'badge-danger', text: 'Đã đăng xuất' },
};

export function initAdminLayout({ active, user }) {
  document.getElementById('app-navbar').innerHTML = `
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button" aria-label="Thu gọn menu"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto align-items-center">
      <li class="nav-item mr-3"><span id="ws-status" class="badge badge-secondary">Mất kết nối</span></li>
      <li class="nav-item d-none d-sm-block mr-2 text-muted">${esc(user.fullName)}</li>
      <li class="nav-item">
        <button type="button" id="btn-logout" class="btn btn-sm btn-outline-secondary">
          <i class="fas fa-sign-out-alt mr-1"></i>Đăng xuất
        </button>
      </li>
    </ul>`;

  const items = MENU.filter((m) => !m.permission || hasPermission(user, m.permission))
    .map((m) => `
      <li class="nav-item">
        <a href="${m.href}" class="nav-link ${m.key === active ? 'active' : ''}">
          <i class="nav-icon ${m.icon}"></i><p>${esc(m.label)}</p>
        </a>
      </li>`).join('');

  document.getElementById('app-sidebar').innerHTML = `
    <a href="${homeFor(user)}" class="brand-link">
      <i class="fas fa-network-wired brand-image ml-3 mt-1"></i>
      <span class="brand-text font-weight-light">LAN LMS</span>
    </a>
    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <span class="d-block text-white">${esc(user.username)}</span>
          <small class="text-muted">${esc(roleName(user.role))}</small>
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" role="menu">${items}</ul>
      </nav>
    </div>`;

  document.getElementById('btn-logout').addEventListener('click', logout);
  document.body.classList.remove('app-loading');

  return {
    setWsStatus(status) {
      const s = WS_STATUS[status] || WS_STATUS.closed;
      const el = document.getElementById('ws-status');
      el.className = `badge ${s.cls}`;
      el.textContent = s.text;
    },
  };
}
