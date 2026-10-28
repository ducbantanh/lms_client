/**
 * Từ điển phân loại nhật ký kiểm toán và giám sát an toàn hệ thống (Audit Dictionary).
 * Cung cấp thông tin mức độ nghiêm trọng, mã sự kiện, thông điệp chuẩn và hướng dẫn xử lý sự cố.
 */

export interface AuditEventDefinition {
  code: string;
  category: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'SECURITY_ALERT';
  description: string;
  recommendedAction: string;
  retentionDays: number;
}

export const AUDIT_DICTIONARY: Record<string, AuditEventDefinition> = {
  'AUTHENTICATION_100': {
    code: 'AUTHENTICATION_100',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_100: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_101': {
    code: 'AUTHENTICATION_101',
    category: 'AUTHENTICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_101: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_102': {
    code: 'AUTHENTICATION_102',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_102: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_103': {
    code: 'AUTHENTICATION_103',
    category: 'AUTHENTICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_103: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_104': {
    code: 'AUTHENTICATION_104',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_104: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_105': {
    code: 'AUTHENTICATION_105',
    category: 'AUTHENTICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_105: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'AUTHENTICATION_106': {
    code: 'AUTHENTICATION_106',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_106: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_107': {
    code: 'AUTHENTICATION_107',
    category: 'AUTHENTICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_107: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_108': {
    code: 'AUTHENTICATION_108',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_108: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_109': {
    code: 'AUTHENTICATION_109',
    category: 'AUTHENTICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_109: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_110': {
    code: 'AUTHENTICATION_110',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_110: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_111': {
    code: 'AUTHENTICATION_111',
    category: 'AUTHENTICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_111: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'AUTHENTICATION_112': {
    code: 'AUTHENTICATION_112',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_112: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_113': {
    code: 'AUTHENTICATION_113',
    category: 'AUTHENTICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_113: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_114': {
    code: 'AUTHENTICATION_114',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_114: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_115': {
    code: 'AUTHENTICATION_115',
    category: 'AUTHENTICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_115: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_116': {
    code: 'AUTHENTICATION_116',
    category: 'AUTHENTICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_116: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHENTICATION_117': {
    code: 'AUTHENTICATION_117',
    category: 'AUTHENTICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHENTICATION_117: Phát hiện hoạt động tương ứng với nhóm AUTHENTICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'AUTHORIZATION_118': {
    code: 'AUTHORIZATION_118',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_118: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_119': {
    code: 'AUTHORIZATION_119',
    category: 'AUTHORIZATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_119: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_120': {
    code: 'AUTHORIZATION_120',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_120: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_121': {
    code: 'AUTHORIZATION_121',
    category: 'AUTHORIZATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_121: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_122': {
    code: 'AUTHORIZATION_122',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_122: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_123': {
    code: 'AUTHORIZATION_123',
    category: 'AUTHORIZATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_123: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'AUTHORIZATION_124': {
    code: 'AUTHORIZATION_124',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_124: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_125': {
    code: 'AUTHORIZATION_125',
    category: 'AUTHORIZATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_125: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_126': {
    code: 'AUTHORIZATION_126',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_126: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_127': {
    code: 'AUTHORIZATION_127',
    category: 'AUTHORIZATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_127: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_128': {
    code: 'AUTHORIZATION_128',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_128: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_129': {
    code: 'AUTHORIZATION_129',
    category: 'AUTHORIZATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_129: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'AUTHORIZATION_130': {
    code: 'AUTHORIZATION_130',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_130: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_131': {
    code: 'AUTHORIZATION_131',
    category: 'AUTHORIZATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_131: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_132': {
    code: 'AUTHORIZATION_132',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_132: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_133': {
    code: 'AUTHORIZATION_133',
    category: 'AUTHORIZATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_133: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_134': {
    code: 'AUTHORIZATION_134',
    category: 'AUTHORIZATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_134: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'AUTHORIZATION_135': {
    code: 'AUTHORIZATION_135',
    category: 'AUTHORIZATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã AUTHORIZATION_135: Phát hiện hoạt động tương ứng với nhóm AUTHORIZATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'EXAM_INTEGRITY_136': {
    code: 'EXAM_INTEGRITY_136',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_136: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_137': {
    code: 'EXAM_INTEGRITY_137',
    category: 'EXAM_INTEGRITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_137: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_138': {
    code: 'EXAM_INTEGRITY_138',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_138: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_139': {
    code: 'EXAM_INTEGRITY_139',
    category: 'EXAM_INTEGRITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_139: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_140': {
    code: 'EXAM_INTEGRITY_140',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_140: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_141': {
    code: 'EXAM_INTEGRITY_141',
    category: 'EXAM_INTEGRITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_141: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'EXAM_INTEGRITY_142': {
    code: 'EXAM_INTEGRITY_142',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_142: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_143': {
    code: 'EXAM_INTEGRITY_143',
    category: 'EXAM_INTEGRITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_143: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_144': {
    code: 'EXAM_INTEGRITY_144',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_144: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_145': {
    code: 'EXAM_INTEGRITY_145',
    category: 'EXAM_INTEGRITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_145: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_146': {
    code: 'EXAM_INTEGRITY_146',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_146: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_147': {
    code: 'EXAM_INTEGRITY_147',
    category: 'EXAM_INTEGRITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_147: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'EXAM_INTEGRITY_148': {
    code: 'EXAM_INTEGRITY_148',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_148: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_149': {
    code: 'EXAM_INTEGRITY_149',
    category: 'EXAM_INTEGRITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_149: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_150': {
    code: 'EXAM_INTEGRITY_150',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_150: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_151': {
    code: 'EXAM_INTEGRITY_151',
    category: 'EXAM_INTEGRITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_151: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_152': {
    code: 'EXAM_INTEGRITY_152',
    category: 'EXAM_INTEGRITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_152: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'EXAM_INTEGRITY_153': {
    code: 'EXAM_INTEGRITY_153',
    category: 'EXAM_INTEGRITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã EXAM_INTEGRITY_153: Phát hiện hoạt động tương ứng với nhóm EXAM_INTEGRITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SUBMISSION_GRADING_154': {
    code: 'SUBMISSION_GRADING_154',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_154: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_155': {
    code: 'SUBMISSION_GRADING_155',
    category: 'SUBMISSION_GRADING',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_155: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_156': {
    code: 'SUBMISSION_GRADING_156',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_156: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_157': {
    code: 'SUBMISSION_GRADING_157',
    category: 'SUBMISSION_GRADING',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_157: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_158': {
    code: 'SUBMISSION_GRADING_158',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_158: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_159': {
    code: 'SUBMISSION_GRADING_159',
    category: 'SUBMISSION_GRADING',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_159: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SUBMISSION_GRADING_160': {
    code: 'SUBMISSION_GRADING_160',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_160: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_161': {
    code: 'SUBMISSION_GRADING_161',
    category: 'SUBMISSION_GRADING',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_161: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_162': {
    code: 'SUBMISSION_GRADING_162',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_162: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_163': {
    code: 'SUBMISSION_GRADING_163',
    category: 'SUBMISSION_GRADING',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_163: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_164': {
    code: 'SUBMISSION_GRADING_164',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_164: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_165': {
    code: 'SUBMISSION_GRADING_165',
    category: 'SUBMISSION_GRADING',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_165: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SUBMISSION_GRADING_166': {
    code: 'SUBMISSION_GRADING_166',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_166: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_167': {
    code: 'SUBMISSION_GRADING_167',
    category: 'SUBMISSION_GRADING',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_167: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_168': {
    code: 'SUBMISSION_GRADING_168',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_168: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_169': {
    code: 'SUBMISSION_GRADING_169',
    category: 'SUBMISSION_GRADING',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_169: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_170': {
    code: 'SUBMISSION_GRADING_170',
    category: 'SUBMISSION_GRADING',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_170: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SUBMISSION_GRADING_171': {
    code: 'SUBMISSION_GRADING_171',
    category: 'SUBMISSION_GRADING',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SUBMISSION_GRADING_171: Phát hiện hoạt động tương ứng với nhóm SUBMISSION_GRADING trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'COURSE_ENROLLMENT_172': {
    code: 'COURSE_ENROLLMENT_172',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_172: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_173': {
    code: 'COURSE_ENROLLMENT_173',
    category: 'COURSE_ENROLLMENT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_173: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_174': {
    code: 'COURSE_ENROLLMENT_174',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_174: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_175': {
    code: 'COURSE_ENROLLMENT_175',
    category: 'COURSE_ENROLLMENT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_175: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_176': {
    code: 'COURSE_ENROLLMENT_176',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_176: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_177': {
    code: 'COURSE_ENROLLMENT_177',
    category: 'COURSE_ENROLLMENT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_177: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'COURSE_ENROLLMENT_178': {
    code: 'COURSE_ENROLLMENT_178',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_178: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_179': {
    code: 'COURSE_ENROLLMENT_179',
    category: 'COURSE_ENROLLMENT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_179: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_180': {
    code: 'COURSE_ENROLLMENT_180',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_180: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_181': {
    code: 'COURSE_ENROLLMENT_181',
    category: 'COURSE_ENROLLMENT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_181: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_182': {
    code: 'COURSE_ENROLLMENT_182',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_182: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_183': {
    code: 'COURSE_ENROLLMENT_183',
    category: 'COURSE_ENROLLMENT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_183: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'COURSE_ENROLLMENT_184': {
    code: 'COURSE_ENROLLMENT_184',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_184: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_185': {
    code: 'COURSE_ENROLLMENT_185',
    category: 'COURSE_ENROLLMENT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_185: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_186': {
    code: 'COURSE_ENROLLMENT_186',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_186: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_187': {
    code: 'COURSE_ENROLLMENT_187',
    category: 'COURSE_ENROLLMENT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_187: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_188': {
    code: 'COURSE_ENROLLMENT_188',
    category: 'COURSE_ENROLLMENT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_188: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'COURSE_ENROLLMENT_189': {
    code: 'COURSE_ENROLLMENT_189',
    category: 'COURSE_ENROLLMENT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã COURSE_ENROLLMENT_189: Phát hiện hoạt động tương ứng với nhóm COURSE_ENROLLMENT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SYSTEM_SECURITY_190': {
    code: 'SYSTEM_SECURITY_190',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_190: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_191': {
    code: 'SYSTEM_SECURITY_191',
    category: 'SYSTEM_SECURITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_191: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_192': {
    code: 'SYSTEM_SECURITY_192',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_192: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_193': {
    code: 'SYSTEM_SECURITY_193',
    category: 'SYSTEM_SECURITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_193: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_194': {
    code: 'SYSTEM_SECURITY_194',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_194: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_195': {
    code: 'SYSTEM_SECURITY_195',
    category: 'SYSTEM_SECURITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_195: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SYSTEM_SECURITY_196': {
    code: 'SYSTEM_SECURITY_196',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_196: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_197': {
    code: 'SYSTEM_SECURITY_197',
    category: 'SYSTEM_SECURITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_197: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_198': {
    code: 'SYSTEM_SECURITY_198',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_198: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_199': {
    code: 'SYSTEM_SECURITY_199',
    category: 'SYSTEM_SECURITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_199: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_200': {
    code: 'SYSTEM_SECURITY_200',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_200: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_201': {
    code: 'SYSTEM_SECURITY_201',
    category: 'SYSTEM_SECURITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_201: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'SYSTEM_SECURITY_202': {
    code: 'SYSTEM_SECURITY_202',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_202: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_203': {
    code: 'SYSTEM_SECURITY_203',
    category: 'SYSTEM_SECURITY',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_203: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_204': {
    code: 'SYSTEM_SECURITY_204',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_204: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_205': {
    code: 'SYSTEM_SECURITY_205',
    category: 'SYSTEM_SECURITY',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_205: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_206': {
    code: 'SYSTEM_SECURITY_206',
    category: 'SYSTEM_SECURITY',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_206: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'SYSTEM_SECURITY_207': {
    code: 'SYSTEM_SECURITY_207',
    category: 'SYSTEM_SECURITY',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã SYSTEM_SECURITY_207: Phát hiện hoạt động tương ứng với nhóm SYSTEM_SECURITY trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'ATTENDANCE_VERIFICATION_208': {
    code: 'ATTENDANCE_VERIFICATION_208',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_208: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_209': {
    code: 'ATTENDANCE_VERIFICATION_209',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_209: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_210': {
    code: 'ATTENDANCE_VERIFICATION_210',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_210: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_211': {
    code: 'ATTENDANCE_VERIFICATION_211',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_211: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_212': {
    code: 'ATTENDANCE_VERIFICATION_212',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_212: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_213': {
    code: 'ATTENDANCE_VERIFICATION_213',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_213: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'ATTENDANCE_VERIFICATION_214': {
    code: 'ATTENDANCE_VERIFICATION_214',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_214: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_215': {
    code: 'ATTENDANCE_VERIFICATION_215',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_215: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_216': {
    code: 'ATTENDANCE_VERIFICATION_216',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_216: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_217': {
    code: 'ATTENDANCE_VERIFICATION_217',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_217: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_218': {
    code: 'ATTENDANCE_VERIFICATION_218',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_218: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_219': {
    code: 'ATTENDANCE_VERIFICATION_219',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_219: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'ATTENDANCE_VERIFICATION_220': {
    code: 'ATTENDANCE_VERIFICATION_220',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_220: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_221': {
    code: 'ATTENDANCE_VERIFICATION_221',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_221: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_222': {
    code: 'ATTENDANCE_VERIFICATION_222',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_222: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_223': {
    code: 'ATTENDANCE_VERIFICATION_223',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_223: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_224': {
    code: 'ATTENDANCE_VERIFICATION_224',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_224: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'ATTENDANCE_VERIFICATION_225': {
    code: 'ATTENDANCE_VERIFICATION_225',
    category: 'ATTENDANCE_VERIFICATION',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã ATTENDANCE_VERIFICATION_225: Phát hiện hoạt động tương ứng với nhóm ATTENDANCE_VERIFICATION trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'DATA_IMPORT_EXPORT_226': {
    code: 'DATA_IMPORT_EXPORT_226',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_226: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_227': {
    code: 'DATA_IMPORT_EXPORT_227',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_227: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_228': {
    code: 'DATA_IMPORT_EXPORT_228',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_228: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_229': {
    code: 'DATA_IMPORT_EXPORT_229',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_229: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_230': {
    code: 'DATA_IMPORT_EXPORT_230',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_230: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_231': {
    code: 'DATA_IMPORT_EXPORT_231',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_231: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'DATA_IMPORT_EXPORT_232': {
    code: 'DATA_IMPORT_EXPORT_232',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_232: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_233': {
    code: 'DATA_IMPORT_EXPORT_233',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_233: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_234': {
    code: 'DATA_IMPORT_EXPORT_234',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_234: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_235': {
    code: 'DATA_IMPORT_EXPORT_235',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_235: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_236': {
    code: 'DATA_IMPORT_EXPORT_236',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_236: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_237': {
    code: 'DATA_IMPORT_EXPORT_237',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_237: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
  'DATA_IMPORT_EXPORT_238': {
    code: 'DATA_IMPORT_EXPORT_238',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_238: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_239': {
    code: 'DATA_IMPORT_EXPORT_239',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'WARNING',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_239: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_240': {
    code: 'DATA_IMPORT_EXPORT_240',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_240: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_241': {
    code: 'DATA_IMPORT_EXPORT_241',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'CRITICAL',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_241: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_242': {
    code: 'DATA_IMPORT_EXPORT_242',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'INFO',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_242: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 180
  },
  'DATA_IMPORT_EXPORT_243': {
    code: 'DATA_IMPORT_EXPORT_243',
    category: 'DATA_IMPORT_EXPORT',
    severity: 'SECURITY_ALERT',
    description: 'Sự kiện kiểm toán mã DATA_IMPORT_EXPORT_243: Phát hiện hoạt động tương ứng với nhóm DATA_IMPORT_EXPORT trong phiên làm việc của người dùng.',
    recommendedAction: 'Ghi lại địa chỉ IP, kiểm tra phiên đăng nhập và kích hoạt cảnh báo quản trị viên nếu tần suất vượt quá ngưỡng cho phép.',
    retentionDays: 365
  },
};

export function getAuditDefinition(code: string): AuditEventDefinition | undefined {
  return AUDIT_DICTIONARY[code];
}
