import type { IconName } from '@/components/ui/icon';
import { courseLabel, normalizeSearch } from './course-utils.ts';

/** Kiểu dữ liệu khớp record CourseViews của Spring (lms.course); mọi id là public_id. */
export interface TeacherCourse {
  id: string;
  code: string;
  /** Nhóm của học phần; null = không chia nhóm. */
  group: string | null;
  title: string;
  format: CourseFormat;
  studentCount: number;
  teacherName: string | null;
  createdAt: string;
}

export interface CourseInfo {
  id: string;
  code: string;
  group: string | null;
  title: string;
  description: string | null;
  format: CourseFormat;
  /** Luôn null ở góc nhìn sinh viên; null ở góc nhìn giảng viên nghĩa là đang tắt. */
  enrollKey: string | null;
  studentCount: number;
  /** Public id giảng viên phụ trách; null ở góc nhìn sinh viên hoặc khi chưa phân công. */
  teacherId: string | null;
  teacherName: string | null;
  createdAt: string;
}

export interface Section {
  id: string;
  position: number;
  title: string;
}

export interface Lesson {
  id: string;
  /** null = chưa phân mục. */
  sectionId: string | null;
  position: number;
  title: string;
  /** Văn bản thuần, giữ xuống dòng; null khi bài chỉ có tài liệu đính kèm. */
  body: string | null;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseFile {
  id: string;
  sectionId: string | null;
  /** Khác null: tài liệu đính kèm của bài học đó. */
  lessonId: string | null;
  name: string;
  contentType: string;
  size: number;
  hidden: boolean;
  createdAt: string;
}

export type AssessmentStatus = 'upcoming' | 'open' | 'closed';

export interface Assessment {
  id: string;
  type: AssessmentType;
  title: string;
  description: string | null;
  /** null khi không có đề, hoặc sinh viên chưa đến giờ mở. */
  paperFileId: string | null;
  paperFileName: string | null;
  opensAt: string | null;
  closesAt: string | null;
  status: AssessmentStatus;
}

export interface CourseContent {
  course: CourseInfo;
  sections: Section[];
  lessons: Lesson[];
  files: CourseFile[];
  assessments: Assessment[];
}

export interface EnrolledStudent {
  id: string;
  username: string;
  fullName: string;
  method: EnrollMethod;
  enrolledAt: string;
}

export interface StudentPick {
  id: string;
  username: string;
  fullName: string;
}

export interface EnrollReport {
  added: StudentPick[];
  alreadyEnrolled: string[];
  notFound: string[];
  notStudent: string[];
}

export type CourseFormat = 0 | 1 | 2;
export type AssessmentType = 0 | 1 | 2;
export type EnrollMethod = 0 | 1 | 2;

/** Khớp hằng số FORMAT_* của Course.java. */
export const COURSE_FORMATS: Record<CourseFormat, string> = {
  0: 'Theo mục',
  1: 'Theo tuần',
  2: 'Chỉ danh sách tài liệu',
};

/** Khớp hằng số TYPE_* của Assessment.java. */
export const ASSESSMENT_TYPES: Record<AssessmentType, string> = {
  0: 'Bài tập',
  1: 'Thực hành',
  2: 'Kiểm tra',
};

/** Giống Assessment.isLocked: bài kiểm tra đã kết thúc là hồ sơ thi, không sửa, không xóa. */
export function canDeleteAssessment(assessment: Assessment) {
  return assessment.type !== 2 || assessment.status !== 'closed';
}

export const canEditAssessment = canDeleteAssessment;

/** Đổi chỗ phần tử index với phần tử kế bên (delta -1: lên, +1: xuống); trả về mảng id mới. */
export function moveId(ids: string[], index: number, delta: -1 | 1) {
  const target = index + delta;
  if (target < 0 || target >= ids.length) return ids;
  const next = [...ids];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Mỗi loại bài có tab/khung riêng: tiêu đề và danh từ dùng trong câu thông báo. */
export const ASSESSMENT_GROUPS: Record<AssessmentType, { title: string; noun: string }> = {
  0: { title: 'Bài tập', noun: 'bài tập' },
  1: { title: 'Bài thực hành', noun: 'bài thực hành' },
  2: { title: 'Bài kiểm tra', noun: 'bài kiểm tra' },
};

export const ASSESSMENT_STATUS: Record<AssessmentStatus, { label: string; tone: string }> = {
  upcoming: { label: 'Chưa mở', tone: 'muted' },
  open: { label: 'Đang mở', tone: 'ok' },
  closed: { label: 'Đã đóng', tone: 'locked' },
};

/** Khớp hằng số METHOD_* của Enrollment.java. */
export const ENROLL_METHODS: Record<EnrollMethod, string> = {
  0: 'Dán MSSV',
  1: 'Chọn từ danh sách',
  2: 'Mã tham gia',
};

/** Giống giới hạn của server (CourseContentService + spring.servlet.multipart). */
export const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'pptx'];
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
export const PDF = 'application/pdf';

const FILE_ICONS: Record<string, IconName> = {
  [PDF]: 'filePdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fileWord',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'filePpt',
  'application/zip': 'fileZip',
};

export function fileIcon(contentType: string): IconName {
  return FILE_ICONS[contentType] ?? 'file';
}

/** Icon theo tên file, dùng cho file đã chọn nhưng chưa tải lên (chưa có contentType từ server). */
export function fileIconByName(name: string): IconName {
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  const icons: Record<string, IconName> = {
    pdf: 'filePdf',
    docx: 'fileWord',
    pptx: 'filePpt',
    zip: 'fileZip',
  };
  return icons[extension] ?? 'file';
}

/** Link tải qua API; server kiểm tra quyền (file ẩn, đề chưa mở) ở mỗi lần tải. */
export function fileUrl(fileId: string) {
  return `/api/v1/files/${encodeURIComponent(fileId)}`;
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Kiểm tra trước khi gửi để báo lỗi ngay; server vẫn kiểm tra lại đuôi file và nội dung. */
export function uploadProblem(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED_EXTENSIONS.includes(extension)) return 'Chỉ nhận file PDF, DOCX hoặc PPTX.';
  if (file.size > MAX_UPLOAD_BYTES) return 'File quá lớn (tối đa 20 MB).';
  return null;
}

export interface LessonGroup {
  lesson: Lesson;
  files: CourseFile[];
}

export interface ContentGroup {
  section: Section | null;
  /** Bài học trong mục, theo thứ tự position, kèm tài liệu đính kèm. */
  lessons: LessonGroup[];
  /** Tài liệu nằm trực tiếp trong mục (không thuộc bài nào). */
  files: CourseFile[];
}

/**
 * Gom bài học và tài liệu theo mục. Mục null là "Chưa phân mục" (chỉ hiện khi có nội dung);
 * khóa học dạng "chỉ danh sách tài liệu" trả về một nhóm duy nhất, không có bài học.
 * Tài liệu trỏ tới bài không có trong danh sách được coi là tài liệu của mục.
 */
export function groupContent(content: CourseContent): ContentGroup[] {
  if (content.course.format === 2) return [{ section: null, lessons: [], files: content.files }];
  const lessonIds = new Set(content.lessons.map((lesson) => lesson.id));
  const sectionIds = new Set(content.sections.map((section) => section.id));
  const inSection = (sectionId: string | null, key: string | null) =>
    key === null ? !sectionId || !sectionIds.has(sectionId) : sectionId === key;
  const build = (key: string | null) => ({
    lessons: content.lessons
      .filter((lesson) => inSection(lesson.sectionId, key))
      .sort((a, b) => a.position - b.position)
      .map((lesson) => ({
        lesson,
        files: content.files.filter((file) => file.lessonId === lesson.id),
      })),
    files: content.files.filter(
      (file) => (!file.lessonId || !lessonIds.has(file.lessonId)) && inSection(file.sectionId, key),
    ),
  });
  const groups: ContentGroup[] = content.sections.map((section) => ({
    section,
    ...build(section.id),
  }));
  const loose = build(null);
  if (loose.lessons.length || loose.files.length) groups.push({ section: null, ...loose });
  return groups;
}

/** Tách văn bản thành đoạn chữ và link http(s) để hiển thị link bấm được mà không chèn HTML. */
export function splitLinks(text: string): { text: string; href?: string }[] {
  const parts: { text: string; href?: string }[] = [];
  let last = 0;
  for (const match of text.matchAll(/https?:\/\/[^\s<>"]+[^\s<>".,;:!?)\]]/g)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ text: text.slice(last, start) });
    parts.push({ text: match[0], href: match[0] });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

/** Ô datetime-local (giờ máy người dùng) → ISO UTC cho server; ô trống → null. */
export function localInputToIso(value: string) {
  return value ? new Date(value).toISOString() : null;
}

/** Ngược lại: ISO từ server → giá trị ô datetime-local theo giờ máy ("2026-10-20T08:30"); null → ''. */
export function isoToLocalInput(iso: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Bảng điểm CSV của khóa học (server trả file, trình duyệt tự tải về). */
export function gradebookUrl(courseId: string) {
  return `/api/v1/teacher/courses/${encodeURIComponent(courseId)}/gradebook.csv`;
}

/** ZIP các bài đã nộp của một bài, mỗi sinh viên một thư mục. */
export function submissionsZipUrl(courseId: string, assessmentId: string) {
  return `/api/v1/teacher/courses/${encodeURIComponent(courseId)}/assessments/${encodeURIComponent(assessmentId)}/submissions.zip`;
}

// ---------------------------------------------------------------- làm bài (lms.submission)

/** Khớp hằng số trong SubmissionViews.java. */
export type SubmissionStatus =
  'not_started' | 'in_progress' | 'submitted' | 'auto_submitted' | 'missed';

export interface SubmissionFile {
  id: string;
  name: string;
  contentType: string;
  size: number;
  createdAt: string;
}

export interface Grade {
  /** Thang 10, tối đa 2 chữ số thập phân. */
  score: number;
  feedback: string | null;
  gradedAt: string;
  /** Họ tên người chấm; null nếu tài khoản đã bị xóa. */
  gradedBy: string | null;
}

export interface Submission {
  status: SubmissionStatus;
  /** Lúc bấm nộp; null khi chưa nộp hoặc hết giờ tự tính bài nộp. */
  submittedAt: string | null;
  /** Còn thêm/xóa file và bấm nộp được. */
  editable: boolean;
  files: SubmissionFile[];
  /** null = chưa chấm. */
  grade: Grade | null;
}

/** Một dòng trong danh sách bài nộp của giảng viên (mọi sinh viên đã ghi danh). */
export interface SubmissionRow {
  studentId: string;
  username: string;
  fullName: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  /** Lần thêm/xóa file gần nhất; null khi không có file. */
  updatedAt: string | null;
  files: SubmissionFile[];
  grade: Grade | null;
}

export interface AssessmentSubmissions {
  course: { id: string; code: string; title: string };
  assessment: Assessment;
  summary: { students: number; submitted: number; graded: number; average: number | null };
  rows: SubmissionRow[];
  /** Người xem là giảng viên phụ trách; admin chỉ xem, không chấm. */
  canGrade: boolean;
}

export const MAX_SCORE = 10;

/** Chỉ chấm bài đã chốt, giống GradingService.GRADABLE. */
export function isGradable(status: SubmissionStatus) {
  return status === 'submitted' || status === 'auto_submitted' || status === 'missed';
}

/** "8,5" theo cách viết số của Việt Nam. */
export function formatScore(score: number) {
  return score.toLocaleString('vi-VN', { maximumFractionDigits: 2 });
}

/**
 * Ô điểm → số (chấp nhận dấu phẩy hoặc chấm thập phân); trống → null (xóa điểm).
 * Sai định dạng, ngoài 0–10 hoặc quá 2 chữ số thập phân thì trả lỗi để báo ngay.
 */
export function parseScore(text: string): { value: number | null } | { error: string } {
  const trimmed = text.trim().replace(',', '.');
  if (!trimmed) return { value: null };
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(trimmed))
    return { error: 'Điểm là số, tối đa 2 chữ số thập phân.' };
  const value = Number(trimmed);
  if (value > MAX_SCORE) return { error: `Điểm từ 0 đến ${MAX_SCORE}.` };
  return { value };
}

export interface StudentAssessment {
  course: { id: string; code: string; title: string };
  assessment: Assessment;
  submission: Submission;
  /** Giờ server lúc trả về, để đếm ngược không lệ thuộc đồng hồ máy sinh viên. */
  serverTime: string;
}

export const SUBMISSION_STATUS: Record<SubmissionStatus, { label: string; tone: string }> = {
  not_started: { label: 'Chưa mở', tone: 'muted' },
  in_progress: { label: 'Chưa nộp', tone: 'warn' },
  submitted: { label: 'Đã nộp', tone: 'ok' },
  auto_submitted: { label: 'Đã nộp khi hết giờ', tone: 'ok' },
  missed: { label: 'Không nộp bài', tone: 'locked' },
};

/** Giống UploadChecker.SUBMISSION và SubmissionService.MAX_FILES của server. */
export const SUBMISSION_EXTENSIONS = [...ALLOWED_EXTENSIONS, 'zip'];
export const MAX_SUBMISSION_FILES = 10;

export function submissionProblem(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!SUBMISSION_EXTENSIONS.includes(extension)) return 'Chỉ nhận file PDF, DOCX, PPTX hoặc ZIP.';
  if (file.size > MAX_UPLOAD_BYTES) return 'File quá lớn (tối đa 20 MB).';
  return null;
}

/** Server chỉ cho chủ bài nộp hoặc người quản lý khóa học tải. */
export function submissionFileUrl(fileId: string) {
  return `/api/v1/submission-files/${encodeURIComponent(fileId)}`;
}

/** Loại bài có trang làm bài + nộp file phía sinh viên (hiện chỉ bài kiểm tra). */
export const SUBMITTABLE_TYPES: AssessmentType[] = [2];

/** Trạng thái và điểm của sinh viên ở một bài (GET /student/assessments?course=...). */
export interface MyResult {
  assessmentId: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  score: number | null;
}

export interface UpcomingItem {
  assessment: Assessment;
  /** due: đang mở, sắp hết hạn nộp; opens: sắp mở. */
  kind: 'due' | 'opens';
  at: string;
  result: MyResult | undefined;
}

/** Bài đang mở còn hạn và bài sắp mở, sắp theo mốc thời gian gần nhất. */
export function upcomingItems(
  assessments: Assessment[],
  results: MyResult[],
  now: number,
  limit = 5,
): UpcomingItem[] {
  const byId = new Map(results.map((result) => [result.assessmentId, result]));
  return assessments
    .flatMap((assessment): UpcomingItem[] => {
      const result = byId.get(assessment.id);
      if (
        assessment.closesAt &&
        Date.parse(assessment.closesAt) > now &&
        assessment.status === 'open'
      )
        return [{ assessment, kind: 'due', at: assessment.closesAt, result }];
      if (assessment.opensAt && Date.parse(assessment.opensAt) > now)
        return [{ assessment, kind: 'opens', at: assessment.opensAt, result }];
      return [];
    })
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
    .slice(0, limit);
}

/**
 * Tổng hợp kết quả: số bài đã nộp trên số bài nộp được đã mở (SUBMITTABLE_TYPES),
 * điểm trung bình các bài đã chấm (làm tròn 2 chữ số).
 */
export function resultSummary(assessments: Assessment[], results: MyResult[]) {
  const types = new Map(assessments.map((assessment) => [assessment.id, assessment.type]));
  const counted = results.filter((result) => {
    const type = types.get(result.assessmentId);
    return (
      type !== undefined && SUBMITTABLE_TYPES.includes(type) && result.status !== 'not_started'
    );
  });
  const submitted = counted.filter(
    (result) => result.status === 'submitted' || result.status === 'auto_submitted',
  ).length;
  const scores = results.flatMap((result) => (result.score === null ? [] : [result.score]));
  const average = scores.length
    ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100) / 100
    : null;
  return { total: counted.length, submitted, graded: scores.length, average };
}

// ---------------------------------------------------------------- tiến độ (lms.progress)

/** Bài học đầu tiên chưa học; sectionId null = chưa phân mục. */
export interface NextLesson {
  id: string;
  sectionId: string | null;
  title: string;
}

/**
 * Tiến độ của mình ở một khóa học (GET /student/courses/{id}/progress): bài học đã đánh dấu học
 * + bài kiểm tra đã nộp. percent làm tròn xuống, null khi khóa học chưa có gì để tính.
 */
export interface CourseProgress {
  lessonsDone: number;
  lessonsTotal: number;
  assessmentsDone: number;
  assessmentsTotal: number;
  percent: number | null;
  nextLesson: NextLesson | null;
  completedLessonIds: string[];
}

export interface StudentProgress {
  studentId: string;
  lessonsDone: number;
  assessmentsDone: number;
  percent: number | null;
}

/** GET /teacher/courses/{id}/progress. */
export interface CourseProgressReport {
  lessonsTotal: number;
  assessmentsTotal: number;
  students: StudentProgress[];
}

// ---------------------------------------------------------------- tổng quan giảng viên (lms.report)

/** Bài có bài nộp chưa chấm; pending = đã nộp mà chưa chấm. */
export interface GradingTask {
  courseId: string;
  courseCode: string;
  assessmentId: string;
  type: AssessmentType;
  title: string;
  closesAt: string | null;
  pending: number;
  submitted: number;
  students: number;
}

/** open: đang mở (closesAt null = không hạn); upcoming: sẽ mở trong 14 ngày tới. */
export interface ScheduleItem {
  courseId: string;
  courseCode: string;
  assessmentId: string;
  type: AssessmentType;
  title: string;
  kind: 'open' | 'upcoming';
  opensAt: string | null;
  closesAt: string | null;
  submitted: number;
  students: number;
}

export interface OverviewCourse {
  id: string;
  code: string;
  group: string | null;
  title: string;
  format: CourseFormat;
  teacherName: string | null;
  studentCount: number;
  /** Tiến độ trung bình của lớp; null khi chưa có sinh viên hoặc chưa có gì để tính. */
  averageProgress: number | null;
  toGrade: number;
  openAssessments: number;
  createdAt: string;
}

/** GET /teacher/overview. toGradeMore/scheduleMore: số mục bị cắt (server trả tối đa 10). */
export interface TeacherOverview {
  stats: { courses: number; students: number; toGrade: number; openAssessments: number };
  toGrade: GradingTask[];
  toGradeMore: number;
  schedule: ScheduleItem[];
  scheduleMore: number;
  courses: OverviewCourse[];
  serverTime: string;
}

/** Tab lọc trang Khóa học của giảng viên/admin; unassigned chỉ admin thấy. */
export type TeacherCourseFilter = 'all' | 'grading' | 'open' | 'unassigned';
export type TeacherCourseSort = 'recent' | 'name' | 'code' | 'grading';

/** Hàm thuần như selectCourses của sinh viên: lọc + sắp xếp trên bản sao. */
export function selectTeacherCourses(
  courses: OverviewCourse[],
  query: { search: string; filter: TeacherCourseFilter; sort: TeacherCourseSort },
): OverviewCourse[] {
  const needle = normalizeSearch(query.search);
  const byName = (a: OverviewCourse, b: OverviewCourse) => a.title.localeCompare(b.title, 'vi');
  return courses
    .filter((course) => {
      if (query.filter === 'grading' && !course.toGrade) return false;
      if (query.filter === 'open' && !course.openAssessments) return false;
      if (query.filter === 'unassigned' && course.teacherName) return false;
      return normalizeSearch(
        `${courseLabel(course.code, course.group)} ${course.title} ${course.teacherName ?? ''}`,
      ).includes(needle);
    })
    .sort((a, b) => {
      if (query.sort === 'name') return byName(a, b);
      if (query.sort === 'code')
        return courseLabel(a.code, a.group).localeCompare(courseLabel(b.code, b.group), 'vi', {
          numeric: true,
        });
      if (query.sort === 'grading') return b.toGrade - a.toGrade || byName(a, b);
      return b.createdAt.localeCompare(a.createdAt);
    });
}

/** Link trang khóa học; có lessonId thì trang mở sẵn bài học đó. */
export function courseHref(courseId: string, lessonId?: string) {
  const query = `id=${encodeURIComponent(courseId)}`;
  return `/course/?${lessonId ? `${query}&lesson=${encodeURIComponent(lessonId)}` : query}`;
}

/** Khoảng thời gian dạng "2 ngày 3 giờ", "3 giờ 15 phút", "25 phút" (tối thiểu 1 phút). */
export function formatRelative(ms: number) {
  const { days, hours, minutes } = splitDuration(ms);
  if (days) return hours ? `${days} ngày ${hours} giờ` : `${days} ngày`;
  if (hours) return minutes ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
  return `${Math.max(1, minutes)} phút`;
}

/** Tên tab trong URL (?tab=...) của trang khóa học sinh viên, theo loại bài. */
export const ASSESSMENT_TAB_PARAM: Record<AssessmentType, string> = {
  0: 'practice',
  1: 'lab',
  2: 'exam',
};

/** Thời gian còn lại → ngày, giờ, phút, giây (không âm) để hiển thị đồng hồ đếm ngược. */
export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** "2 ngày 03:04:05" hoặc "03:04:05". */
export function formatDuration(ms: number) {
  const { days, hours, minutes, seconds } = splitDuration(ms);
  const clock = [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  return days ? `${days} ngày ${clock}` : clock;
}
