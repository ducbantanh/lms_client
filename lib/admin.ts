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

/** Một dòng audit (AuditController.AuditView); actor null = hệ thống hoặc tài khoản đã bị xóa. */
export interface AuditEntry {
  actorUsername: string | null;
  actorName: string | null;
  action: string;
  target: string | null;
  detail: string | null;
  ip: string | null;
  createdAt: string;
}

/** Nhóm lọc = phần trước dấu chấm của action (server lọc theo tiền tố). */
export const AUDIT_CATEGORIES: { value: string; label: string }[] = [
  { value: 'auth', label: 'Đăng nhập' },
  { value: 'user', label: 'Tài khoản' },
  { value: 'session', label: 'Phiên' },
  { value: 'course', label: 'Khóa học' },
  { value: 'section', label: 'Mục / tuần' },
  { value: 'lesson', label: 'Bài học' },
  { value: 'file', label: 'Tài liệu' },
  { value: 'assessment', label: 'Bài kiểm tra' },
  { value: 'enrollment', label: 'Ghi danh' },
  { value: 'submission', label: 'Bài nộp' },
  { value: 'grade', label: 'Bảng điểm' },
  { value: 'notification', label: 'Thông báo' },
  { value: 'system', label: 'Hệ thống' },
];

/** Khớp hằng số trong AuditService.java và scripts/*.ps1 (system.*). */
const AUDIT_ACTIONS: Record<string, string> = {
  'auth.login': 'Đăng nhập',
  'auth.login_failed': 'Đăng nhập sai',
  'auth.logout': 'Đăng xuất',
  'auth.password_changed': 'Đổi mật khẩu',
  'user.locked': 'Khóa tài khoản',
  'user.unlocked': 'Mở khóa tài khoản',
  'user.deleted': 'Xóa tài khoản',
  'user.imported': 'Tạo tài khoản hàng loạt',
  'session.force_logout': 'Ép đăng xuất',
  'course.created': 'Tạo khóa học',
  'course.updated': 'Sửa khóa học',
  'course.deleted': 'Xóa khóa học',
  'section.created': 'Thêm mục',
  'section.updated': 'Đổi tên mục',
  'section.deleted': 'Xóa mục',
  'section.reordered': 'Sắp xếp mục',
  'lesson.created': 'Thêm bài học',
  'lesson.updated': 'Sửa bài học',
  'lesson.deleted': 'Xóa bài học',
  'lesson.reordered': 'Sắp xếp bài học',
  'file.uploaded': 'Tải tài liệu lên',
  'file.hidden': 'Ẩn tài liệu',
  'file.shown': 'Hiện tài liệu',
  'file.deleted': 'Xóa tài liệu',
  'assessment.created': 'Tạo bài',
  'assessment.updated': 'Sửa bài',
  'assessment.deleted': 'Xóa bài',
  'enrollment.added': 'Thêm sinh viên',
  'enrollment.removed': 'Xóa sinh viên khỏi lớp',
  'enrollment.joined': 'Tham gia bằng mã',
  'enrollment.key_created': 'Tạo mã tham gia',
  'enrollment.key_disabled': 'Tắt mã tham gia',
  'notification.sent': 'Gửi thông báo',
  'submission.file_added': 'Tải file bài làm',
  'submission.file_removed': 'Xóa file bài làm',
  'submission.submitted': 'Nộp bài',
  'submission.graded': 'Chấm điểm',
  'submission.downloaded': 'Tải bài nộp (ZIP)',
  'grade.exported': 'Xuất bảng điểm',
  'system.backup': 'Sao lưu',
  'system.restored': 'Khôi phục',
  'system.restore_tested': 'Thử khôi phục',
};

/** Action lạ (bản server mới hơn client) hiện nguyên mã. */
export function auditActionLabel(action: string) {
  return AUDIT_ACTIONS[action] ?? action;
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
