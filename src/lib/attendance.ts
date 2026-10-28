import qrcode from 'qrcode-generator';
import { normalizeSearch } from './course-utils.ts';

/** Kiểu dữ liệu khớp AttendanceViews của Spring (lms.attendance); mọi id là public_id. */

/** Khớp AttendanceRecord.STATUS_*; null = vắng (không có dòng điểm danh). */
export type AttendanceStatus = 0 | 1 | 2;
/** Khớp AttendanceRecord.METHOD_*: 0 sinh viên tự quét QR, 1 giảng viên điểm danh thủ công. */
export type AttendanceMethod = 0 | 1;

export interface AttendanceSessionSummary {
  id: string;
  title: string;
  qrOpen: boolean;
  createdAt: string;
  present: number;
  late: number;
  excused: number;
}

export interface AttendanceOverview {
  students: number;
  sessions: AttendanceSessionSummary[];
}

export interface AttendanceRow {
  studentId: string;
  username: string;
  fullName: string;
  status: AttendanceStatus | null;
  method: AttendanceMethod | null;
  checkedAt: string | null;
  /** IP lúc tự quét QR; null khi điểm danh thủ công hoặc vắng. */
  ip: string | null;
}

export interface AttendanceSessionDetail {
  session: AttendanceSessionSummary;
  students: number;
  rows: AttendanceRow[];
}

export interface AttendanceQrCode {
  /** Mã học phần kèm nhóm, vd. "INT1340 · Nhóm 01". */
  course: string;
  session: string;
  token: string;
  expiresAt: string;
  serverTime: string;
  periodSeconds: number;
  checkedIn: number;
  students: number;
}

/** Sự kiện realtime attendance.checked_in (chỉ giảng viên phụ trách nhận). */
export interface AttendanceCheckedIn {
  courseId: string;
  sessionId: string;
  row: AttendanceRow;
}

export interface CheckInResult {
  courseId: string;
  /** Mã học phần kèm nhóm, vd. "INT1340 · Nhóm 01". */
  course: string;
  courseTitle: string;
  session: string;
  status: AttendanceStatus;
  checkedAt: string;
  alreadyRecorded: boolean;
}

export interface MyAttendance {
  sessionId: string;
  title: string;
  createdAt: string;
  status: AttendanceStatus | null;
  checkedAt: string | null;
}

/** Nhãn và màu badge theo trạng thái; khóa 'absent' cho null. */
export const ATTENDANCE_STATUS: Record<
  AttendanceStatus | 'absent',
  { label: string; tone: string }
> = {
  0: { label: 'Có mặt', tone: 'ok' },
  1: { label: 'Đi muộn', tone: 'warn' },
  2: { label: 'Có phép', tone: 'muted' },
  absent: { label: 'Vắng', tone: 'locked' },
};

/** Thứ tự nút trạng thái khi điểm danh thủ công. */
export const STATUS_CHOICES: (AttendanceStatus | null)[] = [0, 1, 2, null];

export function statusInfo(status: AttendanceStatus | null) {
  return ATTENDANCE_STATUS[status ?? 'absent'];
}

export function attendanceBase(courseId: string) {
  return `/teacher/courses/${encodeURIComponent(courseId)}/attendance`;
}

/** File CSV do server trả kèm Content-Disposition: attachment nên dùng link thường. */
export function attendanceCsvUrl(courseId: string) {
  return `/api/v1/teacher/courses/${encodeURIComponent(courseId)}/attendance.csv`;
}

/** Trang chiếu mã QR (mở tab riêng để đưa lên máy chiếu). */
export function projectorHref(courseId: string, sessionId: string) {
  return `/teacher/course/attendance/?course=${encodeURIComponent(courseId)}&id=${encodeURIComponent(sessionId)}`;
}

/** Link mã hóa trong QR: camera điện thoại mở thẳng trang điểm danh của sinh viên. */
export function checkInUrl(origin: string, token: string) {
  return `${origin}/attend/?t=${encodeURIComponent(token)}`;
}

/** Vắng = sĩ số − có mặt − đi muộn − có phép (không âm khi sĩ số vừa giảm). */
export function absentCount(session: AttendanceSessionSummary, students: number) {
  return Math.max(0, students - session.present - session.late - session.excused);
}

export type RowFilter = 'all' | 'absent' | 'present';

/** Lọc bảng điểm danh theo ô tìm (MSSV, họ tên không dấu) và nhóm trạng thái. */
export function filterRows(rows: AttendanceRow[], query: string, filter: RowFilter) {
  const needle = normalizeSearch(query);
  return rows.filter(
    (row) =>
      (filter === 'all' || (filter === 'absent' ? row.status === null : row.status !== null)) &&
      (!needle ||
        normalizeSearch(row.username).includes(needle) ||
        normalizeSearch(row.fullName).includes(needle)),
  );
}

/** Ghép một dòng nhận qua realtime vào chi tiết buổi: thay dòng cũ, tính lại số đếm. */
export function applyCheckIn(
  detail: AttendanceSessionDetail,
  row: AttendanceRow,
): AttendanceSessionDetail {
  if (!detail.rows.some((item) => item.studentId === row.studentId)) return detail;
  const rows = detail.rows.map((item) => (item.studentId === row.studentId ? row : item));
  const count = (status: AttendanceStatus) => rows.filter((item) => item.status === status).length;
  return {
    ...detail,
    rows,
    session: { ...detail.session, present: count(0), late: count(1), excused: count(2) },
  };
}

/**
 * Mã QR dạng path SVG (mỗi ô đen một hình vuông 1×1), kèm số ô mỗi cạnh để đặt viewBox.
 * Mức sửa lỗi M: chịu được màn chiếu mờ/lóa mà mã vẫn nhỏ để quét từ xa.
 */
export function qrPath(text: string) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  let path = '';
  for (let row = 0; row < size; row++)
    for (let col = 0; col < size; col++) if (qr.isDark(row, col)) path += `M${col} ${row}h1v1h-1z`;
  return { size, path };
}

/**
 * IP dùng chung bởi từ 2 sinh viên tự quét trở lên (dấu hiệu điểm danh hộ trên một máy), kèm số người.
 * Bỏ qua khi mọi người cùng một IP (mạng đi qua NAT/proxy): khi đó cảnh báo không còn ý nghĩa.
 */
export function sharedIps(rows: AttendanceRow[]) {
  const counts = new Map<string, number>();
  rows.forEach((row) => row.ip && counts.set(row.ip, (counts.get(row.ip) ?? 0) + 1));
  if (counts.size < 2) return new Map<string, number>();
  return new Map([...counts].filter(([, count]) => count > 1));
}
