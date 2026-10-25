import { TEACHER_PATH } from './auth';
import type { Role, User } from './types';

/** Khớp ProfileService.ProfileView của server; birthDate dạng yyyy-mm-dd, null = chưa có. */
export interface Profile {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  roleName: string;
  birthDate: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

/** Giống UpdateRequest của server: chuỗi trống = xóa thông tin đó. */
export const PROFILE_LIMITS = { email: 100, phone: 20, bio: 500 };

/** Trang hồ sơ theo khu: sinh viên ở /profile/, giảng viên ở /teacher/profile/; admin không có. */
export function profileHref(user: User) {
  if (user.role === 0) return null;
  if (user.role === 1) return `${TEACHER_PATH}/profile/`;
  return '/profile/';
}

/** Mã đăng nhập là MSSV hoặc mã giảng viên tùy vai trò. */
export function usernameLabel(role: Role) {
  if (role === 5 || role === 6) return 'Mã sinh viên';
  if (role === 1 || role === 2) return 'Mã giảng viên';
  return 'Tài khoản';
}

const DATE = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(iso: string) {
  return DATE.format(new Date(iso));
}

/** yyyy-mm-dd → dd/mm/yyyy; không qua Date để tránh lệch ngày theo múi giờ. */
export function formatBirthDate(value: string | null) {
  if (!value) return '—';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
