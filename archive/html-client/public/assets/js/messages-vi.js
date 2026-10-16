// Đổi mã lỗi / mã nghiệp vụ của server sang câu tiếng Việt hiển thị cho người dùng.
// Giao diện KHÔNG hiển thị error.message của server (chỉ để debug).

const ERRORS = {
  UNAUTHENTICATED: 'Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.',
  INVALID_CREDENTIALS: 'Sai tên đăng nhập hoặc mật khẩu.',
  ACCOUNT_DISABLED: 'Tài khoản đã bị khóa. Liên hệ quản trị viên.',
  TOO_MANY_ATTEMPTS: 'Bạn nhập sai quá nhiều lần. Thử lại sau vài phút.',
  PASSWORD_CHANGE_REQUIRED: 'Bạn cần đổi mật khẩu trước khi tiếp tục.',
  FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này.',
  CSRF_INVALID: 'Phiên làm việc không hợp lệ. Tải lại trang rồi thử lại.',
  VALIDATION_FAILED: 'Dữ liệu không hợp lệ.',
  BAD_REQUEST: 'Yêu cầu không hợp lệ.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  METHOD_NOT_ALLOWED: 'Thao tác không được hỗ trợ.',
  CONFLICT: 'Không thể thực hiện thao tác này.',
  USERNAME_TAKEN: 'Tên đăng nhập đã tồn tại.',
  USER_HAS_COURSES: 'Giảng viên này còn khóa học. Xóa hoặc chuyển khóa học trước khi xóa tài khoản.',
  INVALID_ENROLL_KEY: 'Mã tham gia không đúng.',
  UNSUPPORTED_FILE_TYPE: 'Chỉ nhận file PDF, DOCX hoặc PPTX hợp lệ.',
  PAYLOAD_TOO_LARGE: 'Dữ liệu gửi lên quá lớn.',
  INTERNAL_ERROR: 'Máy chủ gặp lỗi. Thử lại sau.',
  NETWORK_ERROR: 'Không kết nối được tới máy chủ. Kiểm tra mạng LAN.',
  REQUEST_TIMEOUT: 'Máy chủ phản hồi quá lâu. Kiểm tra trạng thái trước khi gửi lại thao tác.',
  REQUEST_CANCELLED: 'Yêu cầu đã được hủy.',
};

const IMPORT_REASONS = {
  INVALID_FORMAT: 'Sai định dạng (cần đúng 3 phần ngăn bởi |)',
  INVALID_STUDENT_ID: 'Mã sinh viên không hợp lệ',
  INVALID_DATE: 'Ngày sinh không hợp lệ (ddmmyyyy)',
  INVALID_NAME: 'Họ tên không hợp lệ',
  DUPLICATE_IN_INPUT: 'Trùng với dòng khác trong danh sách',
  ALREADY_EXISTS: 'Tài khoản đã tồn tại',
};

const REVOKE_REASONS = {
  logout: 'Bạn đã đăng xuất.',
  forced: 'Quản trị viên đã đăng xuất phiên của bạn.',
  locked: 'Tài khoản của bạn đã bị khóa.',
  deleted: 'Tài khoản của bạn đã bị xóa.',
  password_changed: 'Mật khẩu đã được đổi ở thiết bị khác.',
  expired: 'Phiên đăng nhập đã hết hạn.',
};

// Khớp lms.auth.Role và V2__seed_roles_permissions.sql.
export const ROLE = { ADMIN: 0, TEACHER: 1, MENTOR: 2, SUPERVISOR: 3, PARENT: 4, STUDENT: 5, VISITOR: 6 };

export const ROLE_NAMES = {
  0: 'Quản trị viên',
  1: 'Giảng viên',
  2: 'Cố vấn',
  3: 'Giám sát viên',
  4: 'Phụ huynh',
  5: 'Sinh viên',
  6: 'Khách (tự luyện)',
};

export const COURSE_FORMATS = {
  0: 'Mặc định (mục tự đặt tên)',
  1: 'Theo tuần',
  2: 'Chỉ danh sách file',
};

export const ASSESSMENT_TYPES = {
  0: 'Luyện tập',
  1: 'Thực hành',
  2: 'Thi',
};

export const ASSESSMENT_STATUS = {
  upcoming: 'Chưa mở',
  open: 'Đang mở',
  closed: 'Đã đóng',
};

export function errorMessage(code) {
  return ERRORS[code] || 'Đã có lỗi xảy ra.';
}

export function importReason(code) {
  return IMPORT_REASONS[code] || code;
}

export function revokeReason(code) {
  return REVOKE_REASONS[code] || 'Phiên đăng nhập đã kết thúc.';
}

export function roleName(code) {
  return ROLE_NAMES[code] ?? `Role ${code}`;
}
