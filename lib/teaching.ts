import type { IconName } from '@/components/icon';

/** Kiểu dữ liệu khớp record CourseViews của Spring (lms.course); mọi id là public_id. */
export interface TeacherCourse {
  id: string;
  code: string;
  title: string;
  format: CourseFormat;
  studentCount: number;
  teacherName: string | null;
  createdAt: string;
}

export interface CourseInfo {
  id: string;
  code: string;
  title: string;
  description: string | null;
  format: CourseFormat;
  /** Luôn null ở góc nhìn sinh viên; null ở góc nhìn giảng viên nghĩa là đang tắt. */
  enrollKey: string | null;
  studentCount: number;
  teacherName: string | null;
  createdAt: string;
}

export interface Section {
  id: string;
  position: number;
  title: string;
}

export interface CourseFile {
  id: string;
  sectionId: string | null;
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
  0: 'Luyện tập',
  1: 'Thực hành',
  2: 'Thi',
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
};

export function fileIcon(contentType: string): IconName {
  return FILE_ICONS[contentType] ?? 'file';
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

export interface FileGroup {
  section: Section | null;
  files: CourseFile[];
}

/**
 * Gom tài liệu theo mục. Mục null là "Chưa phân mục" (chỉ hiện khi có file);
 * khóa học dạng "chỉ danh sách tài liệu" trả về một nhóm duy nhất.
 */
export function groupFiles(content: CourseContent): FileGroup[] {
  if (content.course.format === 2) return [{ section: null, files: content.files }];
  const known = new Set(content.sections.map((section) => section.id));
  const groups: FileGroup[] = content.sections.map((section) => ({
    section,
    files: content.files.filter((file) => file.sectionId === section.id),
  }));
  const loose = content.files.filter((file) => !file.sectionId || !known.has(file.sectionId));
  if (loose.length) groups.push({ section: null, files: loose });
  return groups;
}

/** Ô datetime-local (giờ máy người dùng) → ISO UTC cho server; ô trống → null. */
export function localInputToIso(value: string) {
  return value ? new Date(value).toISOString() : null;
}
