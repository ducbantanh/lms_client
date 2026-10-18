import type { AdminUser, AuditEntry, OnlineUser } from './types';

const now = Date.now();
const ago = (minutes: number) => new Date(now - minutes * 60_000).toISOString();

/** Dữ liệu minh họa giúp xem dashboard Admin khi Spring Boot chưa chạy. */
export const DEMO_ADMIN_USERS: AdminUser[] = [
  {
    id: 'demo-admin',
    username: 'admin.demo',
    fullName: 'Nguyễn Minh Quản Trị',
    role: 0,
    roleName: 'ADMIN',
    status: 1,
    mustChangePassword: false,
    createdAt: ago(50_000),
    lastLoginAt: ago(2),
  },
  {
    id: 'teacher-01',
    username: 'teacher01',
    fullName: 'Trần Thu Hà',
    role: 1,
    roleName: 'TEACHER',
    status: 1,
    mustChangePassword: false,
    createdAt: ago(42_000),
    lastLoginAt: ago(8),
  },
  {
    id: 'student-01',
    username: 'B21DCCN001',
    fullName: 'Nguyễn Văn An',
    role: 5,
    roleName: 'STUDENT',
    status: 1,
    mustChangePassword: false,
    createdAt: ago(30_000),
    lastLoginAt: ago(1),
  },
  {
    id: 'student-02',
    username: 'B21DCCN002',
    fullName: 'Lê Minh Anh',
    role: 5,
    roleName: 'STUDENT',
    status: 1,
    mustChangePassword: true,
    createdAt: ago(29_000),
    lastLoginAt: ago(12),
  },
  {
    id: 'student-03',
    username: 'B21DCCN003',
    fullName: 'Phạm Gia Bảo',
    role: 5,
    roleName: 'STUDENT',
    status: 0,
    mustChangePassword: false,
    createdAt: ago(28_000),
    lastLoginAt: ago(1_400),
  },
];

export const DEMO_ONLINE_USERS: OnlineUser[] = [
  {
    id: 'demo-admin',
    username: 'admin.demo',
    fullName: 'Nguyễn Minh Quản Trị',
    role: 0,
    connections: 1,
    since: ago(25),
  },
  {
    id: 'teacher-01',
    username: 'teacher01',
    fullName: 'Trần Thu Hà',
    role: 1,
    connections: 1,
    since: ago(18),
  },
  {
    id: 'student-01',
    username: 'B21DCCN001',
    fullName: 'Nguyễn Văn An',
    role: 5,
    connections: 2,
    since: ago(9),
  },
  {
    id: 'student-02',
    username: 'B21DCCN002',
    fullName: 'Lê Minh Anh',
    role: 5,
    connections: 1,
    since: ago(4),
  },
];

export const DEMO_AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: 5,
    actorUserId: 1,
    action: 'user.imported',
    target: 'users',
    detail: 'Đã tạo 24 tài khoản sinh viên',
    ip: '192.168.1.10',
    createdAt: ago(14),
  },
  {
    id: 4,
    actorUserId: 1,
    action: 'user.unlocked',
    target: 'B21DCCN010',
    detail: null,
    ip: '192.168.1.10',
    createdAt: ago(31),
  },
  {
    id: 3,
    actorUserId: null,
    action: 'auth.login_failed',
    target: 'teacher02',
    detail: null,
    ip: '192.168.1.23',
    createdAt: ago(47),
  },
  {
    id: 2,
    actorUserId: 1,
    action: 'session.force_logout',
    target: 'B21DCCN019',
    detail: 'Thu hồi 1 phiên',
    ip: '192.168.1.10',
    createdAt: ago(70),
  },
  {
    id: 1,
    actorUserId: 1,
    action: 'auth.login',
    target: 'admin.demo',
    detail: null,
    ip: '192.168.1.10',
    createdAt: ago(92),
  },
];

/** Tổng lớn hơn danh sách mẫu vì dashboard chỉ hiển thị một vài bản ghi đại diện. */
export const DEMO_ADMIN_TOTALS = { users: 128, students: 116, locked: 3 };
