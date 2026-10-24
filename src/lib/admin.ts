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
  /** yyyy-mm-dd; null khi chưa có (không đặt lại mật khẩu về ngày sinh được). */
  birthDate: string | null;
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
  username: string | null;
  reason: string;
}

export interface ImportReport {
  totalLines: number;
  created: { line: number; username: string; fullName: string }[];
  duplicates: ImportIssue[];
  errors: ImportIssue[];
}

const IMPORT_REASONS: Record<string, string> = {
  INVALID_FORMAT: 'Sai định dạng (cần đúng 3 cột: mã, ngày sinh, họ tên)',
  INVALID_USERNAME: 'Mã đăng nhập không hợp lệ (3–32 ký tự: chữ, số, _ . -)',
  INVALID_DATE: 'Ngày sinh không hợp lệ (ddmmyyyy, dd/mm/yyyy hoặc yyyy-mm-dd)',
  INVALID_NAME: 'Họ tên không hợp lệ',
  DUPLICATE_IN_INPUT: 'Trùng với dòng khác trong danh sách',
  ALREADY_EXISTS: 'Tài khoản đã tồn tại',
};

export function importReason(code: string) {
  return IMPORT_REASONS[code] ?? code;
}

/** IdleTimeoutService.Settings: số phút không hoạt động trước khi tự đăng xuất, theo vai trò. */
export interface IdleTimeoutSettings {
  studentMinutes: number;
  teacherMinutes: number;
  minMinutes: number;
  maxMinutes: number;
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
  { value: 'attendance', label: 'Điểm danh' },
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
  'user.updated': 'Sửa tài khoản',
  'user.password_reset': 'Đặt lại mật khẩu',
  'user.imported': 'Tạo tài khoản hàng loạt',
  'session.force_logout': 'Ép đăng xuất',
  'session.idle_timeout_updated': 'Đổi thời gian tự đăng xuất',
  'course.created': 'Tạo khóa học',
  'course.updated': 'Sửa khóa học',
  'course.assigned': 'Phân công giảng viên',
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
  'attendance.session_created': 'Tạo buổi điểm danh',
  'attendance.session_updated': 'Đổi tên buổi điểm danh',
  'attendance.session_deleted': 'Xóa buổi điểm danh',
  'attendance.qr_opened': 'Mở điểm danh QR',
  'attendance.qr_closed': 'Dừng điểm danh QR',
  'attendance.checked_in': 'Quét QR điểm danh',
  'attendance.marked': 'Điểm danh thủ công',
  'attendance.exported': 'Xuất bảng điểm danh',
  'question_bank.created': 'Tạo ngân hàng câu hỏi',
  'question_bank.updated': 'Sửa ngân hàng câu hỏi',
  'question_bank.deleted': 'Xóa ngân hàng câu hỏi',
  'question.created': 'Thêm câu hỏi',
  'question.updated': 'Sửa câu hỏi',
  'question.deleted': 'Xóa câu hỏi',
  'question.imported': 'Nhập câu hỏi từ văn bản',
  'submission.quiz_started': 'Bắt đầu làm bài trắc nghiệm',
  'submission.quiz_timed_out': 'Hết giờ làm bài trắc nghiệm (tự nộp)',
  'submission.code_rejudged': 'Chấm lại bài lập trình',
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

/**
 * Đếm dòng dữ liệu import giống AccountImportParser của server: bỏ dòng trống, dòng bắt đầu bằng #,
 * và dòng tiêu đề CSV (dòng đầu có cột ngày sinh không chứa chữ số).
 */
export function countImportLines(text: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith('#'));
  const first = lines[0]?.split(/[|\t;,]/);
  const header = first?.length === 3 && !/\d/.test(first[1]);
  return lines.length - (header ? 1 : 0);
}

/**
 * Đọc file .txt/.csv: UTF-8 nếu hợp lệ, ngược lại Windows-1258 (Excel tiếng Việt lưu "CSV" thường),
 * rồi gộp dấu kết hợp (NFC) để họ tên hiển thị và so sánh đúng.
 */
export async function readImportFile(file: File) {
  const bytes = await file.arrayBuffer();
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    text = new TextDecoder('windows-1258').decode(bytes);
  }
  return text.normalize('NFC');
}
