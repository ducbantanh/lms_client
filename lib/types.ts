/** Role số giữ nguyên hợp đồng của lms.auth.Role, không dùng số thứ tự trên UI. */
export type Role = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  mustChangePassword: boolean;
  permissions: string[];
}

/** CSRF chỉ giữ trong bộ nhớ; session thật được browser quản lý qua cookie HttpOnly. */
export interface Session {
  user: User;
  csrfToken: string;
}

export type CoverStyle =
  | 'rose'
  | 'slate'
  | 'amber'
  | 'sand'
  | 'violet'
  | 'emerald'
  | 'aqua'
  | 'blue'
  | 'pink'
  | 'ink'
  | 'sage'
  | 'orange';

/** Model hiển thị cho một thẻ khóa học. null nghĩa là server chưa cung cấp tiến độ. */
export interface Course {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  teacher: string;
  semester: string;
  semesterLabel: string;
  status: 'current' | 'completed';
  progress: number | null;
  lessons: number | null;
  cover: CoverStyle;
  updatedAt: string;
}

export type CourseFilter = 'all' | 'current' | 'completed' | 'starred' | 'hidden';
export type SortOrder = 'name' | 'recent';
export type ViewMode = 'grid' | 'list';

/** Kết quả phân trang dùng chung với PageResult<T> của Spring Boot. */
export interface PageResult<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  roleName: string;
  status: number;
  mustChangePassword: boolean;
  createdAt: string;
  lastLoginAt: string | null;
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

export interface PresenceChangedEvent {
  userId: string;
  username: string;
  fullName: string;
  role: Role;
  online: boolean;
  connections: number;
}

export interface AuditEntry {
  id: number;
  actorUserId: number | null;
  action: string;
  target: string | null;
  detail: string | null;
  ip: string | null;
  createdAt: string;
}

/** Mọi event realtime giữ cùng envelope với RealtimeEvent của server. */
export interface RealtimeEvent<T = unknown> {
  type: string;
  data: T;
  ts?: string;
}
