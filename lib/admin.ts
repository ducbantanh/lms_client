import type { Role } from './types';

/** Kiểu dữ liệu khớp record của Spring: UserView, PageResult, PresenceSnapshot, ImportReport. */
export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  roleName: string;
  /** 1 hoạt động, 0 bị khóa. */
  status: 0 | 1;
  mustChangePassword: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface PageResult<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface OnlineUser {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  connections: number;
  since: string;
}

export interface PresenceSnapshot {
  onlineUsers: number;
  users: OnlineUser[];
}

/** data của sự kiện WebSocket presence.changed. */
export interface PresenceChanged {
  userId: string;
  username: string;
  fullName: string;
  role: Role;
  online: boolean;
  connections: number;
}

export interface ImportIssue {
  line: number;
  studentId: string | null;
  reason: string;
}

export interface ImportReport {
  totalLines: number;
  created: { line: number; username: string; fullName: string }[];
  duplicates: ImportIssue[];
  errors: ImportIssue[];
}

const IMPORT_REASONS: Record<string, string> = {
  INVALID_FORMAT: 'Sai định dạng (cần đúng 3 phần ngăn bởi |)',
  INVALID_STUDENT_ID: 'Mã sinh viên không hợp lệ',
  INVALID_DATE: 'Ngày sinh không hợp lệ (ddmmyyyy)',
  INVALID_NAME: 'Họ tên không hợp lệ',
  DUPLICATE_IN_INPUT: 'Trùng với dòng khác trong danh sách',
  ALREADY_EXISTS: 'Tài khoản đã tồn tại',
};

export function importReason(code: string) {
  return IMPORT_REASONS[code] ?? code;
}

const DATE_TIME = new Intl.DateTimeFormat('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const TIME = new Intl.DateTimeFormat('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export function formatDateTime(iso: string | null | undefined) {
  return iso ? DATE_TIME.format(new Date(iso)) : '—';
}

export function formatTime(date: Date) {
  return TIME.format(date);
}

/** Đếm dòng dữ liệu import: bỏ dòng trống và dòng bắt đầu bằng #, giống server. */
export function countImportLines(text: string) {
  return text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith('#')).length;
}
