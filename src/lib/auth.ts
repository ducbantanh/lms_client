import type { Role, Session, User } from './types';

/** Tên hiển thị khớp bảng roles của Spring (V2 migration). */
export const ROLE_NAMES: Record<Role, string> = {
  0: 'Quản trị viên',
  1: 'Giảng viên',
  2: 'Trợ giảng',
  3: 'Giám sát',
  4: 'Phụ huynh',
  5: 'Sinh viên',
  6: 'Khách',
};

export function roleName(role: number) {
  return ROLE_NAMES[role as Role] ?? `Role ${role}`;
}

export function hasPermission(user: User | null | undefined, permission: string) {
  return Boolean(user?.permissions.includes(permission));
}

export const LOGIN_PATH = '/login';
export const CHANGE_PASSWORD_PATH = '/change-password';
export const ADMIN_PATH = '/admin';
export const TEACHER_PATH = '/teacher';

/** Trang chủ theo role, giống homeFor() của client cũ: Admin → /admin/, Teacher → /teacher/. */
export function homeFor(user: User) {
  if (user.role === 0) return `${ADMIN_PATH}/`;
  if (user.role === 1) return `${TEACHER_PATH}/`;
  return '/';
}

/** Quyền cần có cho từng khu vực quản lý (quản trị + giảng dạy); route dài hơn đặt trước. */
const MANAGE_ROUTES: { prefix: string; permission: string }[] = [
  { prefix: `${ADMIN_PATH}/users`, permission: 'users.manage' },
  { prefix: `${ADMIN_PATH}/import`, permission: 'users.manage' },
  { prefix: `${ADMIN_PATH}/audit`, permission: 'audit.view' },
  { prefix: `${ADMIN_PATH}/schedule`, permission: 'schedules.manage' },
  { prefix: ADMIN_PATH, permission: 'presence.view' },
  { prefix: TEACHER_PATH, permission: 'courses.manage' },
];

function isUnder(path: string, prefix: string) {
  return path === prefix || path.startsWith(`${prefix}/`);
}

/** Bỏ dấu / cuối để so sánh route (next.config: trailingSlash: true). */
export function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

/**
 * Quyết định chuyển trang cho route hiện tại, giống requirePage() của client cũ.
 * `current` là pathname + query của trình duyệt. Trả về URL đích, hoặc null nếu được ở lại trang.
 */
export function routeRedirect(session: Session | null, current: string): string | null {
  const url = new URL(current, 'http://local');
  const path = normalizePath(url.pathname);
  const search = url.search;
  if (!session) {
    if (path === LOGIN_PATH) return null;
    return `${LOGIN_PATH}/?next=${encodeURIComponent(current)}`;
  }
  const user = session.user;
  if (user.mustChangePassword)
    return path === CHANGE_PASSWORD_PATH ? null : `${CHANGE_PASSWORD_PATH}/`;
  if (path === LOGIN_PATH) return safeNext(search) ?? homeFor(user);

  const home = homeFor(user);
  const manageRoute = MANAGE_ROUTES.find((route) => isUnder(path, route.prefix));
  if (manageRoute) {
    // Thiếu quyền thì về trang chủ của mình; tránh vòng lặp nếu trang chủ cũng chính là trang này.
    if (hasPermission(user, manageRoute.permission)) return null;
    return normalizePath(home) === path ? null : home;
  }
  // Admin và giảng viên có khu riêng, không ở lại giao diện học tập của sinh viên.
  if ((user.role === 0 || user.role === 1) && path !== CHANGE_PASSWORD_PATH) return home;
  return null;
}

/** Chỉ chấp nhận đường dẫn nội bộ để tránh open redirect (?next=https://evil). */
function safeNext(search: string) {
  const next = new URLSearchParams(search).get('next');
  if (next && next.startsWith('/') && !next.startsWith('//') && !next.startsWith(LOGIN_PATH))
    return next;
  return null;
}
