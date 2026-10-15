// Khung giao diện chung cho các trang quản lý (admin + giảng viên): navbar + sidebar phong cách FIT LMS HANU.
// Mục menu hiện theo permission nên giảng viên chỉ thấy "Khóa học".
// Trang mới chỉ cần thêm 1 mục vào MENU và gọi initAdminLayout().

import { esc } from './ui.js';
import { logout, hasPermission, homeFor } from './api.js';
import { roleName } from './messages-vi.js';

const MENU = [
  { key: 'dashboard', href: '/admin/', icon: 'fas fa-tachometer-alt', label: 'Tổng quan hệ thống', permission: 'presence.view' },
  { key: 'users', href: '/admin/users.html', icon: 'fas fa-users-cog', label: 'Quản lý người dùng', permission: 'users.manage' },
  { key: 'import', href: '/admin/import.html', icon: 'fas fa-file-import', label: 'Import sinh viên', permission: 'users.manage' },
  { key: 'courses', href: '/teacher/', icon: 'fas fa-chalkboard-teacher', label: 'Quản lý khóa học', permission: 'courses.manage' },
];

const WS_STATUS = {
  connecting: { cls: 'badge-warning', text: 'Đang kết nối' },
  open: { cls: 'badge-success', text: '● Realtime' },
  closed: { cls: 'badge-secondary', text: 'Mất kết nối' },
  revoked: { cls: 'badge-danger', text: 'Đã đăng xuất' },
};

export function initAdminLayout({ active, user }) {
  document.getElementById('app-navbar').innerHTML = `
    <ul class="navbar-nav align-items-center">
      <li class="nav-item">
        <a class="nav-link text-dark" data-widget="pushmenu" href="#" role="button" aria-label="Thu gọn menu">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <li class="nav-item d-none d-md-block">
        <span class="text-muted small font-weight-bold ml-2">
          TRƯỜNG ĐẠI HỌC HÀ NỘI · <span class="text-fit-orange font-weight-bold">KHOA CÔNG NGHỆ THÔNG TIN</span>
        </span>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto align-items-center">
      <li class="nav-item mr-3">
        <span id="ws-status" class="badge badge-secondary py-1 px-2">Mất kết nối</span>
      </li>
      <li class="nav-item d-none d-sm-flex align-items-center mr-3">
        <i class="fas fa-user-circle fa-lg mr-2 text-fit-orange"></i>
        <div class="d-flex flex-column text-left">
          <span class="text-dark font-weight-bold" style="font-size: 0.9rem; line-height: 1.2;">${esc(user.fullName)}</span>
          <span class="text-muted small" style="font-size: 0.75rem;">${esc(roleName(user.role))}</span>
        </div>
      </li>
      <li class="nav-item">
        <button type="button" id="btn-logout" class="btn btn-sm btn-outline-danger">
          <i class="fas fa-sign-out-alt mr-1"></i>Đăng xuất
        </button>
      </li>
    </ul>`;

  const items = MENU.filter((m) => !m.permission || hasPermission(user, m.permission))
    .map((m) => `
      <li class="nav-item">
        <a href="${m.href}" class="nav-link ${m.key === active ? 'active' : ''}">
          <i class="nav-icon ${m.icon}"></i>
          <p>${esc(m.label)}</p>
        </a>
      </li>`).join('');

  const initialLetter = (user.fullName || user.username || 'U').charAt(0).toUpperCase();

  document.getElementById('app-sidebar').innerHTML = `
    <a href="${homeFor(user)}" class="brand-link">
      <div class="brand-logo-fit">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div>
        <span class="brand-text">FIT <span>LMS</span></span>
        <span class="brand-sub">Khoa CNTT · ĐH Hà Nội</span>
      </div>
    </a>
    <div class="sidebar">
      <div class="user-panel d-flex align-items-center mt-3 pb-3 mb-3">
        <div class="user-avatar-circle mr-2">
          ${esc(initialLetter)}
        </div>
        <div class="info">
          <span class="d-block text-white font-weight-bold" style="font-size: 0.92rem;">${esc(user.username)}</span>
          <span class="badge badge-fit-orange mt-1" style="font-size: 0.72rem;">${esc(roleName(user.role))}</span>
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-header text-uppercase text-muted" style="font-size: 0.72rem; letter-spacing: 0.8px;">Phân hệ quản trị</li>
          ${items}
        </ul>
      </nav>
    </div>`;

  document.getElementById('btn-logout').addEventListener('click', logout);
  document.body.classList.remove('app-loading');

  return {
    setWsStatus(status) {
      const s = WS_STATUS[status] || WS_STATUS.closed;
      const el = document.getElementById('ws-status');
      if (el) {
        el.className = `badge ${s.cls} py-1 px-2`;
        el.textContent = s.text;
      }
    },
  };
}
