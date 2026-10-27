import type { StudentAssessment } from './teaching';

/**
 * Giám sát bài kiểm tra (chống gian lận), khớp lms.proctor.ProctorViews của server. Server chặn chắc chắn: mạng
 * phòng thi, mã phòng thi, một máy, trong giờ thi chỉ mở được trang làm bài. Trình duyệt chỉ báo sự việc (rời
 * trang, thoát toàn màn hình, dán từ ngoài vào); server quyết định việc nào tính là vi phạm.
 */

/** Trạng thái phòng thi của sinh viên ở máy đang dùng. */
export type ProctorStatus = 'none' | 'active' | 'locked' | 'finished' | 'other_device';

export interface StudentProctor {
  status: ProctorStatus;
  violations: number;
  /** null = chỉ ghi lại vi phạm, không tự khóa bài. */
  maxViolations: number | null;
  /** Phải nhập mã phòng thi giám thị đọc (đổi mỗi phút). */
  accessCode: boolean;
  fullscreen: boolean;
  networkRestricted: boolean;
  /** IP hiện tại thuộc mạng phòng thi. */
  networkAllowed: boolean;
  lockReason: string | null;
  startedAt: string | null;
  /** Bài lập trình kết thúc bằng nút "Kết thúc bài thi"; trắc nghiệm, nộp file kết thúc khi nộp bài. */
  canFinish: boolean;
}

export interface ProctorSettings {
  enabled: boolean;
  /** IP / dải CIDR ngăn bằng dấu phẩy; null = mọi mạng. */
  networks: string | null;
  accessCode: boolean;
  fullscreen: boolean;
  maxViolations: number | null;
}

export interface AccessCode {
  code: string;
  expiresAt: string;
  periodSeconds: number;
}

/** not_started: chưa vào phòng thi. */
export type BoardStatus = 'not_started' | 'active' | 'locked' | 'finished';

export interface ProctorEventView {
  type: string;
  counted: boolean;
  durationMs: number | null;
  detail: string | null;
  ip: string | null;
  /** Giám thị khóa / mở khóa / cho đổi máy. */
  actorName: string | null;
  at: string;
}

export interface BoardRow {
  studentId: string;
  username: string;
  fullName: string;
  status: BoardStatus;
  /** Trạng thái bài làm như danh sách bài nộp. */
  work: string;
  /** Còn nhịp trong 45 giây. */
  online: boolean;
  /** Đang rời trang bài thi từ lúc này. */
  awaySince: string | null;
  fullscreen: boolean;
  violations: number;
  startedAt: string | null;
  lastSeenAt: string | null;
  finishedAt: string | null;
  ip: string | null;
  ipAllowed: boolean;
  lockReason: string | null;
  lastEvent: ProctorEventView | null;
}

export interface BoardSummary {
  students: number;
  notStarted: number;
  active: number;
  /** Đang thi nhưng mất nhịp. */
  offline: number;
  locked: number;
  finished: number;
  /** Có ít nhất một vi phạm. */
  flagged: number;
}

export interface ProctorBoard {
  course: { id: string; code: string; title: string };
  assessment: {
    id: string;
    title: string;
    answerMode: number;
    opensAt: string | null;
    closesAt: string | null;
    status: 'upcoming' | 'open' | 'closed';
  };
  settings: ProctorSettings;
  /** null khi không dùng mã phòng thi. */
  accessCode: AccessCode | null;
  summary: BoardSummary;
  rows: BoardRow[];
  /** Giảng viên phụ trách: sửa cài đặt; admin chỉ xem, vẫn khóa / mở khóa được. */
  canEdit: boolean;
  serverTime: string;
}

export interface StudentLog {
  row: BoardRow;
  userAgent: string | null;
  startIp: string | null;
  events: ProctorEventView[];
}

/** Sự kiện WebSocket proctor.updated gửi giảng viên phụ trách. */
export interface ProctorRowChanged {
  courseId: string;
  assessmentId: string;
  row: BoardRow;
}

/** details của lỗi PROCTOR_IN_EXAM. */
export interface InExam {
  assessmentId: string;
  courseId: string;
  title: string;
}

// ---------------------------------------------------------------- trang làm bài

export type ClientEventType =
  | 'left_page'
  | 'fullscreen_exit'
  | 'paste_blocked'
  | 'copy_blocked'
  | 'shortcut_blocked'
  | 'multi_screen'
  | 'reloaded';

export interface ClientEvent {
  type: ClientEventType;
  /** Giờ xảy ra theo giờ server. */
  at: string;
  durationMs?: number;
  detail?: string;
}

/** Khớp ProctorRules.MIN_AWAY_MS: rời trang ngắn hơn chỉ ghi lại. */
export const MIN_AWAY_MS = 2_000;
/** Nhịp gửi trạng thái; server coi là mất kết nối sau 45 giây không có nhịp. */
export const HEARTBEAT_MS = 15_000;
/** Mỗi lần gửi tối đa bấy nhiêu sự kiện (ReportRequest), giữ tối đa MAX_QUEUE khi mất mạng. */
export const EVENT_BATCH = 50;
export const MAX_QUEUE = 200;
/** Khớp ProctorRules.MAX_VIOLATION_LIMIT. */
export const MAX_VIOLATION_LIMIT = 100;

/**
 * Trang làm bài vào chế độ thi khi bài có giám sát đang mở và sinh viên chưa kết thúc: chưa nộp (trắc nghiệm,
 * nộp file), hoặc chưa bấm kết thúc (lập trình, nộp nhiều lần được).
 */
export function inExamMode(data: StudentAssessment): boolean {
  const { proctor, assessment, submission } = data;
  if (!proctor || assessment.status !== 'open' || proctor.status === 'finished') return false;
  return assessment.answerMode === 2 || submission.editable;
}

export interface KeyLike {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

/**
 * Phím tắt bị chặn trong giờ thi (in, lưu trang, xem mã nguồn, công cụ dành cho nhà phát triển, mở tab / cửa sổ
 * mới); trả về tên tổ hợp để ghi nhật ký, null = cho phép. Chép / dán xử lý riêng qua sự kiện copy / paste.
 */
export function blockedShortcut(event: KeyLike): string | null {
  const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;
  if (key === 'F12') return 'F12';
  const mod = event.ctrlKey || event.metaKey;
  if (!mod) return null;
  const name = `${event.metaKey ? 'Cmd' : 'Ctrl'}+${event.shiftKey ? 'Shift+' : ''}${key}`;
  if (event.shiftKey && ['I', 'J', 'C', 'K'].includes(key)) return name;
  if (!event.shiftKey && !event.altKey && ['P', 'S', 'U', 'O', 'N', 'T'].includes(key)) return name;
  if (event.shiftKey && ['N', 'T'].includes(key)) return name;
  return null;
}

/** "12 giây", "2 phút 5 giây", "1 giờ 3 phút". */
export function formatAway(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours) return `${hours} giờ${minutes ? ` ${minutes} phút` : ''}`;
  if (minutes) return `${minutes} phút${seconds ? ` ${seconds} giây` : ''}`;
  return `${seconds} giây`;
}

// ---------------------------------------------------------------- nhật ký, bảng giám thị

const EVENT_LABELS: Record<string, string> = {
  left_page: 'Rời trang bài thi',
  fullscreen_exit: 'Thoát toàn màn hình',
  paste_blocked: 'Dán nội dung từ ngoài vào (bị chặn)',
  copy_blocked: 'Chép đề ra ngoài (bị chặn)',
  shortcut_blocked: 'Phím tắt bị chặn',
  multi_screen: 'Máy nối thêm màn hình',
  reloaded: 'Tải lại trang',
  started: 'Vào phòng thi',
  device_changed: 'Vào thi từ máy mới',
  ip_changed: 'Đổi địa chỉ IP',
  other_device: 'Thử vào thi từ máy khác (bị chặn)',
  code_rejected: 'Nhập sai mã phòng thi',
  locked: 'Bài bị khóa',
  unlocked: 'Giám thị mở khóa',
  device_reset: 'Giám thị cho đổi máy',
  finished: 'Kết thúc bài thi',
};

const AWAY_KINDS: Record<string, string> = {
  tab: 'chuyển tab',
  window: 'chuyển cửa sổ / ứng dụng',
  file_picker: 'chọn file bài làm',
};

const FINISH_REASONS: Record<string, string> = {
  submitted: 'nộp bài',
  timed_out: 'hết giờ làm bài',
  finished: 'bấm kết thúc',
};

export function eventLabel(type: string): string {
  return EVENT_LABELS[type] ?? type;
}

/** Mô tả một dòng nhật ký: nhãn, thời gian rời trang, chi tiết đã dịch. */
export function describeEvent(
  event: Pick<ProctorEventView, 'type' | 'durationMs' | 'detail'>,
): string {
  const parts = [eventLabel(event.type)];
  if (event.type === 'left_page') {
    if (event.durationMs !== null) parts.push(formatAway(event.durationMs));
    if (event.detail) parts.push(`(${AWAY_KINDS[event.detail] ?? event.detail})`);
  } else if (event.type === 'paste_blocked' && event.detail) {
    parts.push(/^\d+$/.test(event.detail) ? `· ${event.detail} ký tự` : `· ${event.detail}`);
  } else if (event.type === 'finished' && event.detail) {
    parts.push(`· ${FINISH_REASONS[event.detail] ?? event.detail}`);
  } else if (event.detail) {
    parts.push(`· ${event.detail}`);
  }
  return parts.join(' ');
}

export const BOARD_STATUS: Record<BoardStatus, { label: string; tone: string }> = {
  not_started: { label: 'Chưa vào', tone: 'muted' },
  active: { label: 'Đang làm', tone: 'ok' },
  locked: { label: 'Bị khóa', tone: 'locked' },
  finished: { label: 'Đã kết thúc', tone: 'muted' },
};

/** Đang thi (đang làm hoặc bị khóa) mà mất nhịp. */
export function isOffline(row: BoardRow): boolean {
  return (row.status === 'active' || row.status === 'locked') && !row.online;
}

/** Cần giám thị để ý: bị khóa, mất kết nối, đang rời trang, đang ra khỏi toàn màn hình, IP ngoài mạng phòng thi. */
export function needsAttention(row: BoardRow, fullscreenRequired: boolean): boolean {
  if (row.status === 'locked') return true;
  if (row.status !== 'active') return false;
  return (
    !row.online || !!row.awaySince || (fullscreenRequired && !row.fullscreen) || !row.ipAllowed
  );
}

/** Tóm tắt tính lại ở client khi một dòng đổi qua WebSocket (khớp ProctorService.summary). */
export function summarize(rows: BoardRow[]): BoardSummary {
  const summary: BoardSummary = {
    students: rows.length,
    notStarted: 0,
    active: 0,
    offline: 0,
    locked: 0,
    finished: 0,
    flagged: 0,
  };
  for (const row of rows) {
    if (row.status === 'not_started') summary.notStarted++;
    else if (row.status === 'locked') summary.locked++;
    else if (row.status === 'finished') summary.finished++;
    else summary.active++;
    if (isOffline(row)) summary.offline++;
    if (row.violations > 0) summary.flagged++;
  }
  return summary;
}

// ---------------------------------------------------------------- cài đặt

/** Form cài đặt (chuỗi như người dùng gõ); maxViolations trống = chỉ ghi lại. */
export interface ProctorForm {
  enabled: boolean;
  networks: string;
  accessCode: boolean;
  fullscreen: boolean;
  maxViolations: string;
}

/** Mặc định khi tạo bài kiểm tra mới: bật giám sát, toàn màn hình, khóa khi vi phạm 5 lần. */
export const DEFAULT_PROCTOR_FORM: ProctorForm = {
  enabled: true,
  networks: '',
  accessCode: false,
  fullscreen: true,
  maxViolations: '5',
};

export function proctorForm(settings: ProctorSettings): ProctorForm {
  return {
    enabled: settings.enabled,
    networks: settings.networks ?? '',
    accessCode: settings.accessCode,
    fullscreen: settings.fullscreen,
    maxViolations: settings.maxViolations === null ? '' : String(settings.maxViolations),
  };
}

export function proctorRequest(form: ProctorForm): ProctorSettings {
  const max = form.maxViolations.trim();
  return {
    enabled: form.enabled,
    networks: form.networks.trim() || null,
    accessCode: form.accessCode,
    fullscreen: form.fullscreen,
    maxViolations: max ? Number(max) : null,
  };
}

/** Các mục IP / CIDR, ngăn như server (IpRanges): dấu phẩy, chấm phẩy, khoảng trắng, xuống dòng. */
export function networkEntries(text: string): string[] {
  return text.split(/[,;\s]+/).filter(Boolean);
}

const IPV4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

function validEntry(entry: string): boolean {
  const [host, bits, ...rest] = entry.split('/');
  if (rest.length) return false;
  const v4 = IPV4.exec(host);
  if (v4) {
    if (v4.slice(1).some((part) => Number(part) > 255)) return false;
    return bits === undefined || (/^\d{1,2}$/.test(bits) && Number(bits) <= 32);
  }
  // IPv6: server kiểm tra kỹ; ở đây chỉ chặn chữ thường gặp như tên phòng
  if (!/^[0-9a-f:.]+$/i.test(host) || !host.includes(':')) return false;
  return bits === undefined || (/^\d{1,3}$/.test(bits) && Number(bits) <= 128);
}

/** Lỗi của form cài đặt; null = hợp lệ. closesAt: giờ đóng bài (bật giám sát thì bắt buộc). */
export function proctorFormProblem(form: ProctorForm, closesAt: string | null): string | null {
  if (!form.enabled) return null;
  if (!closesAt)
    return 'Bài kiểm tra có giám sát cần giờ đóng: hết giờ thì sinh viên tự ra khỏi chế độ thi.';
  const entries = networkEntries(form.networks);
  const invalid = entries.filter((entry) => !validEntry(entry));
  if (invalid.length)
    return `Địa chỉ mạng không hợp lệ: ${invalid.join(', ')}. Ghi IP (vd. 10.0.0.5) hoặc dải CIDR (vd. 192.168.10.0/24).`;
  if (entries.length > 20) return 'Tối đa 20 địa chỉ / dải mạng.';
  const max = form.maxViolations.trim();
  if (max && (!/^\d+$/.test(max) || Number(max) < 1 || Number(max) > MAX_VIOLATION_LIMIT))
    return `Số lần vi phạm để khóa bài là số từ 1 đến ${MAX_VIOLATION_LIMIT}, hoặc để trống để chỉ ghi lại.`;
  return null;
}

/** Mô tả ngắn cài đặt cho thẻ bài, trang giám thị. */
export function describeSettings(settings: ProctorSettings): string {
  if (!settings.enabled) return 'Chưa bật giám sát';
  const parts = ['Giám sát'];
  if (settings.fullscreen) parts.push('toàn màn hình');
  if (settings.accessCode) parts.push('mã phòng thi');
  if (settings.networks) parts.push(`mạng ${settings.networks}`);
  parts.push(
    settings.maxViolations === null
      ? 'chỉ ghi lại vi phạm'
      : `khóa bài khi vi phạm ${settings.maxViolations} lần`,
  );
  return parts.join(' · ');
}

export function proctorBoardPath(courseId: string, assessmentId: string): string {
  return `/teacher/courses/${encodeURIComponent(courseId)}/assessments/${encodeURIComponent(assessmentId)}/proctor`;
}
