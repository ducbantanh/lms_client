import type { MyLeave } from './leave.ts';

/** Kiểu dữ liệu khớp ScheduleViews của Spring (lms.schedule); mọi id là public_id, ngày dạng yyyy-MM-dd. */

/** Khớp CourseSchedule.KIND_*: 0 lý thuyết, 1 thực hành. */
export type MeetingKind = 0 | 1;

export interface CourseRef {
  id: string;
  /** Mã học phần kèm nhóm, vd. "INT1340 · Nhóm 01". */
  code: string;
  title: string;
  teacherName: string | null;
}

export interface RoomRef {
  id: string;
  name: string;
  building: string | null;
}

export interface Room extends RoomRef {
  capacity: number | null;
  note: string | null;
  active: boolean;
}

/** 1 tiết = 1 giờ; tiết 1 bắt đầu lúc firstHour giờ. */
export interface PeriodConfig {
  firstHour: number;
  periodsPerDay: number;
}

export interface Meeting {
  id: string;
  course: CourseRef;
  room: RoomRef;
  /** null = buổi lẻ (buổi bù) hoặc quy tắc đã bị xóa. */
  scheduleId: string | null;
  date: string;
  startPeriod: number;
  periods: number;
  startsAt: string;
  endsAt: string;
  kind: MeetingKind;
  cancelled: boolean;
  /** Buổi đã dời: ngày, tiết ban đầu. */
  originalDate: string | null;
  originalStartPeriod: number | null;
  note: string | null;
  /** Người xem là giảng viên phụ trách: mở điểm danh được. */
  teaching: boolean;
  /** Buổi điểm danh đã mở từ buổi học (chỉ người quản lý khóa học thấy). */
  attendanceSessionId: string | null;
  /** Hạn gửi đơn xin nghỉ (giờ bắt đầu trừ số giờ giảng viên quy định). */
  leaveDeadline: string;
  /** Đơn xin nghỉ của chính người xem ở buổi này. */
  leave: MyLeave | null;
  /** Số đơn xin nghỉ chờ duyệt (người quản lý khóa học; còn lại 0). */
  pendingLeaves: number;
}

export interface Deadline {
  assessmentId: string;
  course: CourseRef;
  type: number;
  title: string;
  kind: 'opens' | 'closes';
  at: string;
}

export interface ScheduleFeed {
  periods: PeriodConfig;
  from: string;
  to: string;
  meetings: Meeting[];
  deadlines: Deadline[];
}

export interface ScheduleRule {
  id: string;
  course: CourseRef;
  room: RoomRef;
  /** 1 thứ 2 … 7 chủ nhật. */
  weekday: number;
  startPeriod: number;
  periods: number;
  kind: MeetingKind;
  startsOn: string;
  endsOn: string;
  /** Số buổi chưa hủy đang gắn với quy tắc. */
  meetings: number;
}

export interface ScheduleResult {
  schedule: ScheduleRule;
  created: number;
  removed: number;
}

/** details của lỗi SCHEDULE_CONFLICT. */
export interface ScheduleConflict {
  date: string;
  startPeriod: number;
  periods: number;
  reason: 'room' | 'teacher' | 'course';
  course: CourseRef | null;
  room: RoomRef | null;
}

export const WEEKDAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
export const MEETING_KINDS: Record<MeetingKind, string> = { 0: 'Lý thuyết', 1: 'Thực hành' };
const CONFLICT_REASONS: Record<ScheduleConflict['reason'], string> = {
  room: 'trùng phòng',
  teacher: 'giảng viên đang dạy lớp khác',
  course: 'lớp đã có buổi học',
};

// ---------------------------------------------------------------- ngày (theo giờ máy, yyyy-MM-dd)

const pad = (value: number) => String(value).padStart(2, '0');

export function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** yyyy-MM-dd → Date lúc 00:00 giờ máy (new Date('yyyy-MM-dd') là giờ UTC, lệch ngày ở múi âm). */
export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso: string, days: number) {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** Thứ hai của tuần chứa ngày đã cho. */
export function weekStart(iso: string) {
  const day = parseIsoDate(iso).getDay(); // 0 chủ nhật
  return addDays(iso, day === 0 ? -6 : 1 - day);
}

/** 7 ngày thứ 2 → chủ nhật của tuần bắt đầu từ monday. */
export function weekDays(monday: string) {
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

/** 1 thứ 2 … 7 chủ nhật (như DayOfWeek của Java). */
export function isoWeekday(iso: string) {
  const day = parseIsoDate(iso).getDay();
  return day === 0 ? 7 : day;
}

/** "Thứ 3 27/10". */
export function dayLabel(iso: string) {
  const [, month, day] = iso.split('-');
  return `${WEEKDAYS[isoWeekday(iso) - 1]} ${day}/${month}`;
}

/** "27/10/2026". */
export function shortDate(iso: string) {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

/** "27/10 – 02/11/2026" cho tiêu đề tuần. */
export function weekLabel(monday: string) {
  const sunday = addDays(monday, 6);
  const [, month, day] = monday.split('-');
  return `${day}/${month} – ${shortDate(sunday)}`;
}

// ---------------------------------------------------------------- tiết học

/** "tiết 4" / "tiết 1–3". */
export function periodLabel(startPeriod: number, periods: number) {
  return periods === 1 ? `tiết ${startPeriod}` : `tiết ${startPeriod}–${startPeriod + periods - 1}`;
}

/** "07:00 – 10:00" từ cấu hình tiết (không cần startsAt/endsAt). */
export function periodTime(config: PeriodConfig, startPeriod: number, periods: number) {
  const start = config.firstHour + startPeriod - 1;
  return `${pad(start)}:00 – ${pad(start + periods)}:00`;
}

/** "Thứ 3, tiết 1–3, phòng 402-A2". */
export function ruleLabel(
  rule: Pick<ScheduleRule, 'weekday' | 'startPeriod' | 'periods' | 'room'>,
) {
  return `${WEEKDAYS[rule.weekday - 1]}, ${periodLabel(rule.startPeriod, rule.periods)}, phòng ${rule.room.name}`;
}

/** Buổi đã dời: "Dời từ Thứ 3 27/10, tiết 1"; null khi chưa dời. */
export function movedLabel(meeting: Meeting) {
  if (!meeting.originalDate || meeting.originalStartPeriod === null) return null;
  return `Dời từ ${dayLabel(meeting.originalDate)}, tiết ${meeting.originalStartPeriod}`;
}

/** Buổi theo ngày, mỗi ngày theo tiết bắt đầu. */
export function meetingsByDay(meetings: Meeting[]) {
  const result = new Map<string, Meeting[]>();
  for (const meeting of [...meetings].sort(
    (a, b) => a.date.localeCompare(b.date) || a.startPeriod - b.startPeriod,
  ))
    result.set(meeting.date, [...(result.get(meeting.date) ?? []), meeting]);
  return result;
}

/** Giảng viên mở điểm danh được: buổi chưa hủy, không phải ngày sau hôm nay. */
export function canTakeAttendance(meeting: Meeting, today: string) {
  return meeting.teaching && !meeting.cancelled && meeting.date <= today;
}

/** Buổi sắp tới hoặc đang học (chưa hủy, chưa kết thúc), sớm nhất trước. */
export function upcomingMeetings(meetings: Meeting[], now = Date.now()) {
  return meetings
    .filter((meeting) => !meeting.cancelled && Date.parse(meeting.endsAt) > now)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

/** Một dòng mô tả buổi trùng cho thông báo lỗi khi xếp lịch. */
export function conflictLabel(conflict: ScheduleConflict) {
  const course = conflict.course ? `${conflict.course.code}` : 'lớp khác';
  const room = conflict.room ? `, phòng ${conflict.room.name}` : '';
  return `${dayLabel(conflict.date)}, ${periodLabel(conflict.startPeriod, conflict.periods)}${room}: ${course} (${CONFLICT_REASONS[conflict.reason]})`;
}

/** Số buổi quy tắc sẽ sinh trong [startsOn, endsOn] (xem trước khi lưu). */
export function countWeekly(weekday: number, startsOn: string, endsOn: string) {
  if (!startsOn || !endsOn || endsOn < startsOn) return 0;
  const offset = (weekday - isoWeekday(startsOn) + 7) % 7;
  const first = addDays(startsOn, offset);
  if (first > endsOn) return 0;
  const days = Math.round(
    (parseIsoDate(endsOn).getTime() - parseIsoDate(first).getTime()) / 86_400_000,
  );
  return Math.floor(days / 7) + 1;
}

export function scheduleQuery(
  from: string,
  to: string,
  filter: { course?: string; room?: string } = {},
) {
  const params = new URLSearchParams({ from, to });
  if (filter.course) params.set('course', filter.course);
  if (filter.room) params.set('room', filter.room);
  return `/schedule?${params}`;
}

// ---------------------------------------------------------------- nhập phòng hàng loạt

/** RoomImportParser.LineIssue; name null khi dòng sai định dạng. */
export interface RoomImportIssue {
  line: number;
  name: string | null;
  reason: string;
}

export interface RoomImportReport {
  totalLines: number;
  created: Room[];
  duplicates: RoomImportIssue[];
  errors: RoomImportIssue[];
}

const ROOM_IMPORT_REASONS: Record<string, string> = {
  INVALID_FORMAT: 'Sai định dạng (tối đa 4 cột: tên phòng, tòa nhà, sức chứa, ghi chú)',
  INVALID_NAME: 'Tên phòng không hợp lệ (tối đa 32 ký tự, bắt đầu bằng chữ hoặc số)',
  INVALID_BUILDING: 'Tên tòa nhà quá dài (tối đa 64 ký tự)',
  INVALID_CAPACITY: 'Sức chứa phải là số nguyên từ 1 đến 2000',
  INVALID_NOTE: 'Ghi chú quá dài (tối đa 200 ký tự)',
  DUPLICATE_IN_INPUT: 'Trùng với dòng khác trong danh sách',
  ALREADY_EXISTS: 'Phòng đã có trong danh mục',
};

export function roomImportReason(code: string) {
  return ROOM_IMPORT_REASONS[code] ?? code;
}

/** Tiêu đề cột đầu được bỏ qua (khớp HEADER_WORDS của RoomImportParser, đã bỏ dấu). */
const ROOM_HEADER_WORDS = ['phong', 'ten phong', 'phong hoc', 'room', 'name'];

/** Số dòng dữ liệu (bỏ dòng trống, dòng #, dòng tiêu đề đầu tiên) để hiện trước khi gửi. */
export function countRoomLines(text: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith('#'));
  const first = (lines[0]?.split(/[|\t;,]/)[0] ?? '')
    .trim()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
  return lines.length - (ROOM_HEADER_WORDS.includes(first) ? 1 : 0);
}

export const ROOM_IMPORT_SAMPLE = [
  'Phòng,Tòa nhà,Sức chứa,Ghi chú',
  '402-A2,Nhà A2,60,Có máy chiếu',
  'Lab 1,Nhà A3,40,Phòng máy 40 máy',
  '105-A1,,120,',
];

// ---------------------------------------------------------------- nhập thời khóa biểu

/** ScheduleViews.PlannedRule: một dòng hợp lệ, lịch sẽ tạo (hoặc đã tạo) và số buổi. */
export interface PlannedRule {
  line: number;
  course: CourseRef;
  room: RoomRef;
  weekday: number;
  startPeriod: number;
  periods: number;
  kind: MeetingKind;
  startsOn: string;
  endsOn: string;
  meetings: number;
}

export interface ScheduleImportIssue {
  line: number;
  label: string | null;
  reason: string;
  /** CONFLICT_IN_FILE: dòng bị trùng trong cùng file. */
  otherLine: number | null;
  conflicts: ScheduleConflict[] | null;
}

/** imported: đã lưu; có dòng lỗi (hoặc chỉ kiểm tra) thì không lưu dòng nào. */
export interface ScheduleImportReport {
  totalLines: number;
  imported: boolean;
  rules: PlannedRule[];
  meetings: number;
  errors: ScheduleImportIssue[];
}

const SCHEDULE_IMPORT_REASONS: Record<string, string> = {
  INVALID_FORMAT: 'Sai định dạng (cần 8–9 cột, xem hướng dẫn)',
  INVALID_COURSE: 'Mã học phần hoặc nhóm không hợp lệ',
  INVALID_WEEKDAY: 'Thứ không hợp lệ (2–7 hoặc CN)',
  INVALID_PERIODS: 'Tiết bắt đầu / số tiết không hợp lệ hoặc vượt quá ngày học',
  INVALID_ROOM: 'Thiếu tên phòng',
  INVALID_DATE: 'Ngày không hợp lệ (dd/mm/yyyy hoặc yyyy-mm-dd)',
  INVALID_RANGE: 'Khoảng ngày sai (đến ngày trước từ ngày, hoặc dài quá 1 năm)',
  INVALID_KIND: 'Hình thức không hợp lệ (LT hoặc TH)',
  COURSE_NOT_FOUND: 'Không có khóa học với mã và nhóm này',
  COURSE_AMBIGUOUS: 'Học phần có nhiều nhóm: cần ghi nhóm',
  ROOM_NOT_FOUND: 'Phòng chưa có trong danh mục',
  ROOM_INACTIVE: 'Phòng đã ngừng dùng',
  NO_MEETINGS: 'Khoảng ngày không có ngày nào trùng thứ đã ghi',
  CONFLICT: 'Trùng với lịch đã có',
  CONFLICT_IN_FILE: 'Trùng với dòng khác trong file',
};

export function scheduleImportReason(issue: ScheduleImportIssue) {
  const text = SCHEDULE_IMPORT_REASONS[issue.reason] ?? issue.reason;
  return issue.otherLine ? `${text} (dòng ${issue.otherLine})` : text;
}

/** Tiêu đề cột đầu được bỏ qua (khớp HEADER_WORDS của ScheduleImportParser, đã bỏ dấu). */
const SCHEDULE_HEADER_WORDS = [
  'ma hoc phan',
  'ma hp',
  'ma mon',
  'ma mh',
  'ma mon hoc',
  'hoc phan',
  'course',
  'code',
];

/** Số dòng dữ liệu (bỏ dòng trống, dòng #, dòng tiêu đề đầu tiên) để hiện trước khi gửi. */
export function countScheduleLines(text: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith('#'));
  const first = (lines[0]?.split(/[|\t;,]/)[0] ?? '')
    .trim()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd')
    .toLowerCase();
  return lines.length - (SCHEDULE_HEADER_WORDS.includes(first) ? 1 : 0);
}

export const SCHEDULE_IMPORT_SAMPLE = [
  'Mã học phần,Nhóm,Thứ,Tiết bắt đầu,Số tiết,Phòng,Từ ngày,Đến ngày,Hình thức',
  'INT1340,01,2,1,3,402-A2,07/09/2026,20/12/2026,LT',
  'INT1340,01,5,7,2,Lab 1,07/09/2026,20/12/2026,TH',
  'INT1339,,CN,4,2,Hội trường A,07/09/2026,20/12/2026,',
];
