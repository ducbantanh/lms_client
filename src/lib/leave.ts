/** Kiểu dữ liệu khớp LeaveViews của Spring (lms.leave); mọi id là public_id. */

/** Khớp LeaveRequest.STATUS_*: 0 chờ duyệt, 1 đồng ý, 2 từ chối. */
export type LeaveStatus = 0 | 1 | 2;

export interface LeaveFile {
  id: string;
  name: string;
  contentType: string;
  size: number;
}

export interface LeaveRequest {
  id: string;
  meeting: {
    id: string;
    date: string;
    startPeriod: number;
    periods: number;
    room: string | null;
    startsAt: string;
    cancelled: boolean;
  };
  student: { id: string; username: string; fullName: string } | null;
  reason: string;
  status: LeaveStatus;
  teacherNote: string | null;
  reviewerName: string | null;
  reviewedAt: string | null;
  createdAt: string;
  files: LeaveFile[];
}

export interface CourseLeaves {
  noticeHours: number;
  maxNoticeHours: number;
  requests: LeaveRequest[];
}

/** Đơn của chính sinh viên ở một buổi (MeetingView.leave). */
export interface MyLeave {
  id: string;
  status: LeaveStatus;
  teacherNote: string | null;
}

export const LEAVE_STATUS: Record<LeaveStatus, { label: string; badge: string }> = {
  0: { label: 'Chờ duyệt', badge: 'warn' },
  1: { label: 'Đã duyệt', badge: 'ok' },
  2: { label: 'Không duyệt', badge: 'locked' },
};

/** Khớp LeaveService: tối đa 3 file minh chứng, ảnh JPG/PNG hoặc PDF, lý do 5–1000 ký tự. */
export const LEAVE_MAX_FILES = 3;
export const LEAVE_REASON_MIN = 5;
export const LEAVE_REASON_MAX = 1000;
/** Khớp app.storage.max-file-bytes (20 MB). */
export const LEAVE_MAX_FILE_BYTES = 20 * 1024 * 1024;
export const LEAVE_FILE_ACCEPT = '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png';

export function leaveFileUrl(fileId: string) {
  return `/api/v1/leave-files/${encodeURIComponent(fileId)}`;
}

export function leaveRequestPath(meetingId: string) {
  return `/student/meetings/${encodeURIComponent(meetingId)}/leave-request`;
}

export function leaveBase(courseId: string) {
  return `/teacher/courses/${encodeURIComponent(courseId)}`;
}

/** Lỗi của file minh chứng (đuôi, dung lượng); null nếu dùng được. */
export function evidenceProblem(file: { name: string; size: number }) {
  if (!/\.(pdf|jpe?g|png)$/i.test(file.name))
    return `${file.name}: chỉ nhận ảnh JPG, PNG hoặc file PDF.`;
  if (file.size > LEAVE_MAX_FILE_BYTES) return `${file.name}: quá 20 MB.`;
  return null;
}

/** "24 giờ", "2 ngày", "1 ngày 6 giờ", "0 giờ" → "trước giờ học". */
export function noticeLabel(hours: number) {
  if (hours === 0) return 'trước giờ học';
  const days = Math.floor(hours / 24);
  const rest = hours % 24;
  if (!days) return `${hours} giờ`;
  return rest ? `${days} ngày ${rest} giờ` : `${days} ngày`;
}

/** Còn gửi đơn được: buổi chưa hủy, chưa có đơn, chưa qua hạn. */
export function canRequestLeave(
  meeting: { cancelled: boolean; leave: MyLeave | null; leaveDeadline: string },
  now = Date.now(),
) {
  return !meeting.cancelled && !meeting.leave && Date.parse(meeting.leaveDeadline) > now;
}

/** Đơn chờ duyệt lên trước, trong mỗi nhóm buổi học gần nhất trước. */
export function sortLeaves(list: LeaveRequest[]) {
  return [...list].sort(
    (a, b) =>
      Number(a.status !== 0) - Number(b.status !== 0) ||
      a.meeting.startsAt.localeCompare(b.meeting.startsAt),
  );
}
