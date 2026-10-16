// Client HTTP dùng chung cho mọi trang. Mọi lời gọi API PHẢI đi qua file này.
//
// - Gửi cookie session (same-origin), tự gắn header X-CSRF-Token cho POST/PUT/PATCH/DELETE.
// - CSRF token chỉ giữ trong bộ nhớ (biến JS), không lưu localStorage.
// - Lỗi từ server được ném ra dưới dạng ApiError với message tiếng Việt.

import { errorMessage } from './messages-vi.js';
import { config } from './config.js';
import { hasPermission, homeFor } from './routing.js';
import { showPageError } from './ui.js';
export { hasPermission, homeFor } from './routing.js';

const BASE = config.apiBase;
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

let csrfToken = null;
let currentUser = null;

export class ApiError extends Error {
  constructor(code, status, details) {
    super(errorMessage(code));
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Gọi API. body là object (gửi JSON) hoặc FormData (upload file).
 * options.handleAuth = false: không tự chuyển trang khi 401 / bắt đổi mật khẩu (dùng cho trang login).
 */
export async function request(method, path, body, options = {}) {
  const { handleAuth = true, signal, timeoutMs = config.requestTimeoutMs } = options;
  method = method.toUpperCase();
  if (!path.startsWith('/') || path.startsWith('//')) throw new TypeError('API path must be relative to apiBase');
  const headers = { Accept: 'application/json' };
  let payload;

  if (body instanceof FormData) {
    payload = body; // trình duyệt tự đặt Content-Type multipart
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  if (csrfToken && !SAFE_METHODS.has(method)) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  let res;
  let json;
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, timeoutMs);
  try {
    res = await fetch(BASE + path, { method, headers, body: payload, credentials: 'same-origin', signal: controller.signal });
    const raw = await res.text();
    try { json = JSON.parse(raw); } catch { json = null; }
  } catch {
    throw new ApiError(signal?.aborted ? 'REQUEST_CANCELLED' : controller.signal.aborted ? 'REQUEST_TIMEOUT' : 'NETWORK_ERROR', 0);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
  if (res.ok && json?.success === true) {
    return json.data ?? null;
  }

  const code = json?.error?.code || (res.status === 401 ? 'UNAUTHENTICATED' : 'INTERNAL_ERROR');
  if (handleAuth) {
    if (code === 'UNAUTHENTICATED') {
      setSession(null);
      goLogin();
    } else if (code === 'PASSWORD_CHANGE_REQUIRED') {
      window.location.replace('/change-password.html');
    }
  }
  throw new ApiError(code, res.status, json?.error?.details);
}

export const api = {
  get: (path, opts) => request('GET', path, undefined, opts),
  post: (path, body, opts) => request('POST', path, body ?? {}, opts),
  patch: (path, body, opts) => request('PATCH', path, body ?? {}, opts),
  put: (path, body, opts) => request('PUT', path, body ?? {}, opts),
  del: (path, opts) => request('DELETE', path, undefined, opts),
  upload: (path, formData, opts) => request('POST', path, formData, opts),
};

// ------------------------------------------------------------ phiên đăng nhập

export function setSession(session) {
  csrfToken = session?.csrfToken ?? null;
  currentUser = session?.user ?? null;
}

export function getUser() {
  return currentUser;
}

export function goLogin() {
  const here = window.location.pathname + window.location.search;
  const next = here.startsWith('/login') ? '' : `?next=${encodeURIComponent(here)}`;
  window.location.replace('/login.html' + next);
}

/** Lấy phiên hiện tại. Trả null nếu chưa đăng nhập (không tự chuyển trang). */
export async function loadSession() {
  try {
    const session = await request('GET', '/auth/me', undefined, { handleAuth: false });
    setSession(session);
    return session;
  } catch (e) {
    if (e.code === 'UNAUTHENTICATED') {
      setSession(null);
      return null;
    }
    throw e;
  }
}

/**
 * Bảo vệ trang: chưa đăng nhập -> login; phải đổi mật khẩu -> trang đổi mật khẩu;
 * thiếu quyền -> về trang chủ của mình. Trả về user khi được phép ở lại trang.
 */
export async function requirePage({ permission, feature } = {}) {
  let session;
  try {
    session = await loadSession();
  } catch (err) {
    showPageError(err.message);
    return new Promise(() => {});
  }
  if (!session) {
    goLogin();
    return new Promise(() => {}); // dừng luồng của trang trong lúc chuyển hướng
  }
  const user = session.user;
  if (user.mustChangePassword && !window.location.pathname.startsWith('/change-password')) {
    window.location.replace('/change-password.html');
    return new Promise(() => {});
  }
  if ((permission && !hasPermission(user, permission)) || (feature && !config.features[feature])) {
    window.location.replace(homeFor(user));
    return new Promise(() => {});
  }
  return user;
}

export async function logout() {
  try {
    await request('POST', '/auth/logout', {}, { handleAuth: false });
  } catch (err) {
    if (err.code !== 'UNAUTHENTICATED') {
      // Không báo đăng xuất thành công khi cookie HttpOnly vẫn còn hiệu lực.
      showPageError(err.message);
      return;
    }
  }
  setSession(null);
  window.location.replace('/login.html');
}
