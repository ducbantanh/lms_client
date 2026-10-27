import type { Session } from './types';

const API_BASE = '/api/v1';
/** Biến module này không được ghi vào localStorage hay URL. */
let csrfToken: string | null = null;

const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu chưa đúng.',
  UNAUTHENTICATED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  ACCOUNT_DISABLED: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.',
  PASSWORD_CHANGE_REQUIRED: 'Bạn cần đổi mật khẩu trước khi tiếp tục.',
  CSRF_INVALID: 'Phiên làm việc không hợp lệ. Vui lòng tải lại trang.',
  FORBIDDEN: 'Tài khoản chưa có quyền truy cập chức năng này.',
  TOO_MANY_ATTEMPTS: 'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau.',
  VALIDATION_FAILED: 'Vui lòng kiểm tra lại thông tin đã nhập.',
  BAD_REQUEST: 'Yêu cầu không hợp lệ.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  CONFLICT:
    'Không thể thực hiện thao tác này (ví dụ: với chính tài khoản của bạn hoặc admin cuối cùng).',
  PAYLOAD_TOO_LARGE: 'Dữ liệu gửi lên quá lớn.',
  UNSUPPORTED_FILE_TYPE: 'Chỉ nhận file PDF, DOCX hoặc PPTX.',
  INVALID_ENROLL_KEY: 'Mã tham gia không đúng hoặc đã bị tắt.',
  TEACHER_ONLY: 'Chỉ giảng viên phụ trách khóa học mới làm được việc này.',
  INVALID_TEACHER: 'Giảng viên không tồn tại hoặc tài khoản đã bị khóa.',
  COURSE_GROUP_TAKEN: 'Học phần này đã có khóa học cùng nhóm. Kiểm tra lại mã học phần hoặc nhóm.',
  USERNAME_TAKEN: 'Mã đăng nhập này đã có người dùng.',
  BIRTH_DATE_REQUIRED: 'Tài khoản chưa có ngày sinh. Thêm ngày sinh trước khi đặt lại mật khẩu.',
  ASSESSMENT_CLOSED: 'Bài kiểm tra đã kết thúc nên không thể sửa hoặc xóa.',
  STALE_ORDER: 'Danh sách vừa được thay đổi ở nơi khác. Tải lại trang rồi sắp xếp lại.',
  ASSESSMENT_NOT_OPEN: 'Bài chưa đến giờ mở.',
  SUBMISSION_LOCKED: 'Bài đã nộp hoặc đã hết giờ làm bài, không thể thay đổi.',
  SUBMISSION_NOT_FINAL: 'Sinh viên còn đang làm bài, chưa chấm được.',
  ATTENDANCE_CODE_INVALID:
    'Mã QR đã hết hạn hoặc không hợp lệ. Quét lại mã đang hiển thị trên màn chiếu.',
  ATTENDANCE_CLOSED: 'Giảng viên đã dừng điểm danh bằng QR cho buổi này.',
  NOT_ENROLLED: 'Bạn không có tên trong danh sách lớp của khóa học này.',
  QUESTION_LIMIT: 'Mỗi lần nhập tối đa 500 câu, mỗi ngân hàng tối đa 2000 câu hỏi.',
  JUDGE_BUSY: 'Lần chạy trước vẫn đang được chấm. Đợi có kết quả rồi chạy hoặc nộp tiếp.',
  ATTEMPT_LIMIT: 'Bạn đã dùng hết số lần nộp bài giảng viên cho phép.',
  SCHEDULE_CONFLICT: 'Lịch bị trùng với buổi học khác (cùng phòng, cùng giảng viên hoặc cùng lớp).',
  ROOM_NAME_TAKEN: 'Danh mục đã có phòng cùng tên.',
  ROOM_IN_USE:
    'Phòng đã được xếp lịch nên không xóa được. Chuyển phòng sang "Ngừng dùng" thay vì xóa.',
  ROOM_INACTIVE: 'Phòng đã ngừng dùng, không xếp được lịch mới.',
  MEETING_HAS_ATTENDANCE: 'Buổi học đã được điểm danh nên không dời, hủy hay xóa được.',
  MEETING_CANCELLED: 'Buổi học này đã bị hủy.',
  MEETING_NOT_STARTED: 'Chưa đến ngày học của buổi này.',
  LEAVE_DEADLINE_PASSED: 'Đã quá hạn gửi đơn xin nghỉ cho buổi này.',
  LEAVE_ALREADY_REQUESTED: 'Bạn đã gửi đơn xin nghỉ cho buổi này.',
  LEAVE_ALREADY_REVIEWED: 'Đơn đã được giảng viên duyệt nên không rút được.',
  INTERNAL_ERROR: 'Máy chủ gặp lỗi. Vui lòng thử lại sau.',
  NETWORK_ERROR: 'Không kết nối được máy chủ. Kiểm tra mạng LAN và thử lại.',
};

export class ApiError extends Error {
  /** details của lỗi, vd. danh sách buổi trùng của SCHEDULE_CONFLICT. */
  constructor(
    public code: string,
    public details?: unknown,
  ) {
    super(MESSAGES[code] ?? 'Không thể xử lý yêu cầu. Vui lòng thử lại.');
  }
}

/** Cập nhật CSRF sau login/me; truyền null khi kết thúc phiên. */
export function setApiSession(session: Session | null) {
  csrfToken = session?.csrfToken ?? null;
}

/**
 * Fetch tập trung, cùng origin, không tự retry mutation để tránh gửi trùng.
 * body là FormData (tải file) thì gửi nguyên multipart và chờ lâu hơn request JSON.
 */
export async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const { method = 'GET', body, signal } = options;
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  signal?.addEventListener('abort', abort, { once: true });
  const isForm = body instanceof FormData;
  const timer = setTimeout(abort, isForm ? 300_000 : 15_000);
  try {
    const response = await fetch(API_BASE + path, {
      method,
      credentials: 'same-origin',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && !isForm ? { 'Content-Type': 'application/json' } : {}),
        ...(method !== 'GET' && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
    const envelope = await response.json().catch(() => null);
    if (!response.ok || envelope?.success !== true)
      throw new ApiError(
        envelope?.error?.code ?? (response.status === 401 ? 'UNAUTHENTICATED' : 'NETWORK_ERROR'),
        envelope?.error?.details,
      );
    return envelope.data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('NETWORK_ERROR');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}
