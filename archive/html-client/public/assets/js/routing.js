import { config } from './config.js';

export function hasPermission(user, permission) {
  return Array.isArray(user?.permissions) && user.permissions.includes(permission);
}

// Chọn trang thực sự được cấp quyền, tránh vòng lặp redirect theo role.
export function homeFor(user) {
  if (hasPermission(user, 'users.manage') && hasPermission(user, 'presence.view')) return '/admin/';
  if (config.features.courses && hasPermission(user, 'courses.manage')) return '/teacher/';
  if (hasPermission(user, 'presence.view')) return '/admin/';
  if (hasPermission(user, 'users.manage')) return '/admin/users.html';
  if (hasPermission(user, 'courses.view')) return '/student/';
  return '/account.html';
}

export function safeNext(value, origin = window.location.origin) {
  if (typeof value !== 'string' || !value.startsWith('/') || /[\\\u0000-\u0020]/.test(value)) return null;
  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || url.pathname.startsWith('/login')) return null;
    // Chỉ điều hướng tới trang UI, không tới API hoặc file tải xuống.
    if (!/^\/(?:$|account\.html$|change-password\.html$|(?:admin|teacher|student)\/(?:[a-z-]+\.html)?)$/.test(url.pathname)) return null;
    return url.pathname + url.search + url.hash;
  } catch {
    return null;
  }
}
