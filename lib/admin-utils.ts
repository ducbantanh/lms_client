import type { AuditEntry, OnlineUser, PresenceChangedEvent, Role, User } from './types';

const ROLE_NAMES: Record<Role, string> = {
  0: 'Quản trị viên',
  1: 'Giảng viên',
  2: 'Cố vấn',
  3: 'Giám sát viên',
  4: 'Phụ huynh',
  5: 'Sinh viên',
  6: 'Khách',
};

const AUDIT_LABELS: Record<string, string> = {
  'auth.login': 'Đăng nhập thành công',
  'auth.login_failed': 'Đăng nhập thất bại',
  'auth.logout': 'Đăng xuất',
  'auth.password_changed': 'Đổi mật khẩu',
  'user.locked': 'Khóa tài khoản',
  'user.unlocked': 'Mở khóa tài khoản',
  'user.deleted': 'Xóa tài khoản',
  'user.imported': 'Import sinh viên',
  'session.force_logout': 'Ép đăng xuất',
  'course.created': 'Tạo khóa học',
  'course.deleted': 'Xóa khóa học',
};

export function roleName(role: Role) {
  return ROLE_NAMES[role] ?? `Vai trò ${role}`;
}

export function hasPermission(user: User, permission: string) {
  return user.permissions.includes(permission);
}

/**
 * Áp dụng một event presence vào snapshot hiện tại mà không sửa mảng cũ.
 * Server chỉ phát online/offline và số connection, nên thời điểm mới dùng giờ nhận event.
 */
export function applyPresenceChange(
  currentUsers: OnlineUser[],
  event: PresenceChangedEvent,
  receivedAt = new Date().toISOString(),
) {
  if (!event.online) {
    return currentUsers.filter((user) => user.id !== event.userId);
  }

  const existing = currentUsers.find((user) => user.id === event.userId);
  const updatedUser: OnlineUser = {
    id: event.userId,
    username: event.username,
    fullName: event.fullName,
    role: event.role,
    connections: event.connections,
    since: existing?.since ?? receivedAt,
  };
  return [updatedUser, ...currentUsers.filter((user) => user.id !== event.userId)];
}

export function auditLabel(action: string) {
  return AUDIT_LABELS[action] ?? action.replaceAll('_', ' ').toLocaleLowerCase('vi');
}

export function auditTone(entry: AuditEntry) {
  if (/failed|locked|deleted/.test(entry.action)) return 'danger';
  if (/login$|unlocked|imported|created/.test(entry.action)) return 'success';
  return 'neutral';
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatRelativeTime(value: string) {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
  if (Math.abs(seconds) < 60) return formatter.format(seconds, 'second');
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return formatter.format(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return formatter.format(hours, 'hour');
  return formatter.format(Math.round(hours / 24), 'day');
}
