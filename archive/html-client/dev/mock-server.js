// MOCK SERVER — CHỈ DÙNG KHI PHÁT TRIỂN GIAO DIỆN.
//
// Giả lập API /api/v1 và WebSocket /ws của lms-server (dữ liệu trong RAM, mất khi tắt)
// để làm frontend mà không cần chạy Java + MySQL. Hợp đồng API CHUẨN nằm ở README của lms-server;
// nếu mock và server thật khác nhau thì server thật đúng.
//
//   npm install
//   npm run mock            -> http://localhost:8090
//
// Tài khoản: admin / admin12345, teacher01 / teacher12345, student01 / student12345,
//            B21DCCN001..023 / 01012003 (bị bắt đổi mật khẩu lần đầu)
// Gửi thử thông báo: http://localhost:8090/__broadcast?m=Noi+dung
import http from 'node:http';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { serveStatic } from './static.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STATIC = path.resolve(process.argv[2] || path.join(__dirname, '..', 'public'));
const PORT = Number(process.argv[3] || process.env.PORT || 8090);

// Role khớp V2; courses.manage chỉ có ở demo giai đoạn 2.
const PERMS = {
  0: ['users.manage', 'sessions.manage', 'presence.view', 'audit.view', 'courses.manage', 'courses.view', 'submissions.create', 'submissions.manage'],
  1: ['courses.manage', 'courses.view', 'submissions.manage', 'presence.view'],
  2: ['courses.view', 'submissions.manage'],
  3: [],
  4: [],
  5: ['courses.view', 'submissions.create'],
  6: ['courses.view', 'submissions.create'],
};
const ROLE_NAMES = { 0: 'ADMIN', 1: 'TEACHER', 2: 'MENTOR', 3: 'SUPERVISOR', 4: 'PARENT', 5: 'STUDENT', 6: 'VISITOR' };
const TYPES_ALLOWED = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

const pid = () => crypto.randomBytes(16).toString('base64url');
const now = () => new Date().toISOString();

// ------------------------------------------------------------------ dữ liệu
let uid = 0;
const users = [];
function addUser(username, fullName, password, role, extra = {}) {
  const u = { id: ++uid, publicId: pid(), username, fullName, password, role, status: 1, mustChangePassword: false, createdAt: now(), lastLoginAt: null, ...extra };
  users.push(u);
  return u;
}
addUser('admin', 'System Administrator', 'admin12345', 0);
addUser('teacher01', 'Demo Teacher', 'teacher12345', 1);
addUser('student01', 'Demo Student', 'student12345', 5);
for (let i = 1; i <= 23; i++) addUser(`B21DCCN${String(i).padStart(3, '0')}`, `Sinh Viên Số ${i}`, '01012003', 5, { mustChangePassword: true });

const courses = []; // {id(public), ownerId, code, title, description, format, enrollKey, createdAt}
const sections = []; // {id, courseId, position, title}
const enrollments = []; // {courseId, userId, method, enrolledAt}
const files = []; // {id, courseId, sectionId, name, contentType, size, hidden, data, createdAt}
const assessments = []; // {id, courseId, type, title, description, paperFileId, opensAt, closesAt}

const sessions = new Map();
let sid = 0;
const sockets = new Set();

// ------------------------------------------------------------------ tiện ích HTTP
const ok = (res, data) => send(res, 200, { success: true, data: data === undefined ? null : data });
const fail = (res, status, code) => send(res, status, { success: false, error: { code, message: code } });
function send(res, status, obj) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); }
async function rawBody(req) { const chunks = []; for await (const c of req) chunks.push(c); return Buffer.concat(chunks); }
async function body(req) { try { return JSON.parse((await rawBody(req)).toString('utf8') || '{}'); } catch { return {}; } }

/** Parser multipart tối giản (đủ cho test): trả { fields, files: {name: {filename, data}} }. */
function parseMultipart(buf, contentType) {
  const m = /boundary=(?:"([^"]+)"|([^;]+))/.exec(contentType || '');
  const out = { fields: {}, files: {} };
  if (!m) return out;
  const boundary = Buffer.from('--' + (m[1] || m[2]));
  let pos = buf.indexOf(boundary);
  while (pos !== -1) {
    const next = buf.indexOf(boundary, pos + boundary.length);
    if (next === -1) break;
    const part = buf.subarray(pos + boundary.length + 2, next - 2);
    const headEnd = part.indexOf('\r\n\r\n');
    if (headEnd !== -1) {
      const head = part.subarray(0, headEnd).toString('utf8');
      const data = part.subarray(headEnd + 4);
      const name = /name="([^"]*)"/.exec(head)?.[1];
      const filename = /filename="([^"]*)"/.exec(head)?.[1];
      if (name && filename !== undefined) out.files[name] = { filename, data };
      else if (name) out.fields[name] = data.toString('utf8');
    }
    pos = next;
  }
  return out;
}

const view = (u) => ({ id: u.publicId, username: u.username, fullName: u.fullName, role: u.role, roleName: ROLE_NAMES[u.role], status: u.status, mustChangePassword: u.mustChangePassword, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt });
const me = (u, s) => ({ user: { id: u.publicId, username: u.username, fullName: u.fullName, role: u.role, roleName: ROLE_NAMES[u.role], mustChangePassword: u.mustChangePassword, permissions: PERMS[u.role] }, csrfToken: s.csrf });

function cookie(req) { const m = /(?:^|;\s*)SID=([^;]+)/.exec(req.headers.cookie || ''); return m && m[1]; }
function auth(req) {
  const t = cookie(req); const s = t && sessions.get(t); if (!s) return null;
  const u = users.find((x) => x.id === s.userId); if (!u || u.status !== 1) return null; return { u, s, t };
}
function online(u) { return [...sockets].filter((c) => c.user.id === u.id).length; }
function broadcastPresence(u, isOnline) {
  const msg = JSON.stringify({ type: 'presence.changed', data: { userId: u.publicId, username: u.username, fullName: u.fullName, role: u.role, online: isOnline, connections: online(u) }, ts: now() });
  for (const c of sockets) if (PERMS[c.user.role].includes('presence.view')) c.ws.send(msg);
}
function disconnectUser(u, reason) {
  for (const c of [...sockets]) if (c.user.id === u.id) { c.ws.send(JSON.stringify({ type: 'session.revoked', data: { reason } })); c.ws.close(4001, 'session revoked'); }
}
function revokeAll(u) { for (const [t, s] of sessions) if (s.userId === u.id) sessions.delete(t); }

// ------------------------------------------------------------------ course helpers
const canManage = (c, u) => u.role === 0 || c.ownerId === u.id;
const isEnrolled = (c, u) => enrollments.some((e) => e.courseId === c.id && e.userId === u.id);
const studentCount = (c) => enrollments.filter((e) => e.courseId === c.id).length;
const teacherName = (c) => users.find((u) => u.id === c.ownerId)?.fullName || null;
const opened = (a) => !a.opensAt || new Date(a.opensAt) <= new Date();
const statusOf = (a) => (!opened(a) ? 'upcoming' : a.closesAt && new Date(a.closesAt) < new Date() ? 'closed' : 'open');
const summary = (c) => ({ id: c.id, code: c.code, title: c.title, format: c.format, studentCount: studentCount(c), teacherName: teacherName(c), createdAt: c.createdAt });
function detail(c, studentView) {
  const fileViews = files.filter((f) => f.courseId === c.id && !(studentView && f.hidden))
    .map((f) => ({ id: f.id, sectionId: f.sectionId, name: f.name, contentType: f.contentType, size: f.size, hidden: f.hidden, createdAt: f.createdAt }));
  const av = assessments.filter((a) => a.courseId === c.id).map((a) => {
    const paper = files.find((f) => f.id === a.paperFileId);
    const show = paper && (!studentView || opened(a));
    return { id: a.id, type: a.type, title: a.title, description: a.description, paperFileId: show ? paper.id : null, paperFileName: show ? paper.name : null, opensAt: a.opensAt, closesAt: a.closesAt, status: statusOf(a) };
  });
  return {
    course: { id: c.id, code: c.code, title: c.title, description: c.description, format: c.format, enrollKey: studentView ? null : c.enrollKey, studentCount: studentCount(c), teacherName: teacherName(c), createdAt: c.createdAt },
    sections: sections.filter((s) => s.courseId === c.id).sort((x, y) => x.position - y.position).map((s) => ({ id: s.id, position: s.position, title: s.title })),
    files: fileViews,
    assessments: av,
  };
}
function enroll(c, cands, method, notFound) {
  const added = [], alreadyEnrolled = [], notStudent = [];
  for (const u of cands) {
    if (u.role !== 5) notStudent.push(u.username);
    else if (isEnrolled(c, u)) alreadyEnrolled.push(u.username);
    else { enrollments.push({ courseId: c.id, userId: u.id, method, enrolledAt: now() }); added.push({ id: u.publicId, username: u.username, fullName: u.fullName }); }
  }
  return { added, alreadyEnrolled, notFound, notStudent };
}
function newKey() { const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; let k; do { k = [...crypto.randomBytes(8)].map((b) => A[b % A.length]).join(''); } while (courses.some((c) => c.enrollKey === k)); return k; }

function parseImport(content) {
  const created = [], duplicates = [], errors = []; const seen = new Set(); let n = 0;
  content.replace(/^﻿/, '').split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim(); if (!line || line.startsWith('#')) return; n++;
    const p = line.split('|'); if (p.length !== 3) return errors.push({ line: i + 1, studentId: null, reason: 'INVALID_FORMAT' });
    const [id, d, name] = p.map((x) => x.trim());
    if (!/^[A-Za-z0-9][A-Za-z0-9_.-]{2,31}$/.test(id)) return errors.push({ line: i + 1, studentId: id, reason: 'INVALID_STUDENT_ID' });
    const date = new Date(`${d.slice(4)}-${d.slice(2, 4)}-${d.slice(0, 2)}T00:00:00Z`);
    if (!/^\d{8}$/.test(d) || !Number.isFinite(date.getTime()) || date.getUTCDate() !== Number(d.slice(0, 2)) || date.getUTCMonth() + 1 !== Number(d.slice(2, 4)) || date.getUTCFullYear() < 1900 || date > new Date()) return errors.push({ line: i + 1, studentId: id, reason: 'INVALID_DATE' });
    if (name.length < 2 || name.length > 100 || !/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(name)) return errors.push({ line: i + 1, studentId: id, reason: 'INVALID_NAME' });
    const key = id.toUpperCase();
    if (seen.has(key)) return duplicates.push({ line: i + 1, studentId: id, reason: 'DUPLICATE_IN_INPUT' });
    seen.add(key);
    if (users.some((u) => u.username.toUpperCase() === key)) return duplicates.push({ line: i + 1, studentId: id, reason: 'ALREADY_EXISTS' });
    addUser(id, name, d, 5, { mustChangePassword: true }); created.push({ line: i + 1, username: id, fullName: name });
  });
  return { totalLines: n, created, duplicates, errors };
}

// ------------------------------------------------------------------ API
async function api(req, res, url) {
  const p = url.pathname.slice('/api/v1'.length); const m = req.method; const a = auth(req);
  if (p === '/auth/login' && m === 'POST') {
    const b = await body(req); const u = users.find((x) => x.username.toLowerCase() === String(b.username).toLowerCase());
    if (!u || u.password !== b.password) return fail(res, 401, 'INVALID_CREDENTIALS');
    if (u.status !== 1) return fail(res, 403, 'ACCOUNT_DISABLED');
    const t = crypto.randomBytes(32).toString('base64url'); const s = { id: ++sid, userId: u.id, csrf: crypto.randomBytes(32).toString('base64url') };
    sessions.set(t, s); u.lastLoginAt = now();
    res.setHeader('Set-Cookie', `SID=${t}; Path=/; HttpOnly; SameSite=Lax`); return ok(res, me(u, s));
  }
  if (!a) return fail(res, 401, 'UNAUTHENTICATED');
  if (m !== 'GET' && req.headers['x-csrf-token'] !== a.s.csrf) return fail(res, 403, 'CSRF_INVALID');
  if (a.u.mustChangePassword && !p.startsWith('/auth/')) return fail(res, 403, 'PASSWORD_CHANGE_REQUIRED');
  const need = (perm) => { if (!PERMS[a.u.role].includes(perm)) { fail(res, 403, 'FORBIDDEN'); return false; } return true; };
  let mm;

  // ---- auth
  if (p === '/auth/me') return ok(res, me(a.u, a.s));
  if (p === '/auth/logout' && m === 'POST') { sessions.delete(a.t); for (const c of [...sockets]) if (c.sessionId === a.s.id) c.ws.close(4001); res.setHeader('Set-Cookie', 'SID=; Path=/; Max-Age=0'); return ok(res); }
  if (p === '/auth/change-password' && m === 'POST') {
    const b = await body(req); if (b.currentPassword !== a.u.password) return fail(res, 401, 'INVALID_CREDENTIALS');
    if (typeof b.newPassword !== 'string' || b.newPassword.length < 8 || b.newPassword.length > 128 || b.newPassword === b.currentPassword) return fail(res, 400, 'VALIDATION_FAILED');
    for (const [token, session] of sessions) if (session.userId === a.u.id && token !== a.t) sessions.delete(token);
    for (const c of sockets) if (c.user.id === a.u.id && c.sessionId !== a.s.id) {
      c.ws.send(JSON.stringify({ type: 'session.revoked', data: { reason: 'password_changed' } }));
      c.ws.close(4001, 'session revoked');
    }
    a.u.password = b.newPassword; a.u.mustChangePassword = false; return ok(res);
  }

  // ---- tải file
  if ((mm = /^\/files\/([^/]+)$/.exec(p)) && m === 'GET') {
    const f = files.find((x) => x.id === decodeURIComponent(mm[1])); const c = f && courses.find((x) => x.id === f.courseId);
    const paperOpen = f && assessments.some((x) => x.paperFileId === f.id && opened(x));
    if (!f || !(canManage(c, a.u) || (isEnrolled(c, a.u) && (!f.hidden || paperOpen)))) return fail(res, 404, 'NOT_FOUND');
    const inline = f.contentType === TYPES_ALLOWED.pdf && url.searchParams.get('download') !== '1';
    res.writeHead(200, { 'Content-Type': f.contentType, 'Content-Length': f.data.length, 'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(f.name)}`, 'X-Content-Type-Options': 'nosniff' });
    return res.end(f.data);
  }

  // ---- sinh viên
  if (p === '/student/dashboard') { if (!need('courses.view')) return; return ok(res, { profile: { id: a.u.publicId, username: a.u.username, fullName: a.u.fullName }, courses: courses.filter((c) => isEnrolled(c, a.u)).map(summary) }); }
  if (p === '/student/courses' && m === 'GET') { if (!need('courses.view')) return; return ok(res, courses.filter((c) => isEnrolled(c, a.u)).reverse().map(summary)); }
  if (p === '/student/courses/join' && m === 'POST') {
    if (!need('courses.view')) return; if (a.u.role !== 5 && a.u.role !== 6) return fail(res, 403, 'FORBIDDEN');
    const key = String((await body(req)).key || '').trim().toUpperCase().replace(/[-\s]/g, '');
    const c = courses.find((x) => x.enrollKey && x.enrollKey === key); if (!c) return fail(res, 400, 'INVALID_ENROLL_KEY');
    if (!isEnrolled(c, a.u)) enrollments.push({ courseId: c.id, userId: a.u.id, method: 2, enrolledAt: now() });
    return ok(res, summary(c));
  }
  if ((mm = /^\/student\/courses\/([^/]+)$/.exec(p)) && m === 'GET') {
    if (!need('courses.view')) return; const c = courses.find((x) => x.id === decodeURIComponent(mm[1]));
    if (!c || !(canManage(c, a.u) || isEnrolled(c, a.u))) return fail(res, 404, 'NOT_FOUND'); return ok(res, detail(c, true));
  }

  // ---- presence
  if (p === '/admin/presence') {
    if (!need('presence.view')) return;
    const by = new Map(); for (const c of sockets) { const e = by.get(c.user.id) || { u: c.user, n: 0, since: c.since }; e.n++; by.set(c.user.id, e); }
    const list = [...by.values()].map((e) => ({ id: e.u.publicId, username: e.u.username, fullName: e.u.fullName, role: e.u.role, connections: e.n, since: e.since }));
    return ok(res, { onlineUsers: list.length, users: list });
  }

  // ---- giảng viên
  if (p.startsWith('/teacher/')) {
    if (!need('courses.manage')) return;
    if (p === '/teacher/students' && m === 'GET') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      return ok(res, users.filter((u) => u.role === 5 && u.status === 1 && (!q || u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q))).sort((x, y) => x.username.localeCompare(y.username)).slice(0, 50).map((u) => ({ id: u.publicId, username: u.username, fullName: u.fullName })));
    }
    if (p === '/teacher/courses' && m === 'GET') return ok(res, courses.filter((c) => canManage(c, a.u)).slice().reverse().map(summary));
    if (p === '/teacher/courses' && m === 'POST') {
      const b = await body(req); if (!b.code || !b.title || ![0, 1, 2].includes(b.format)) return fail(res, 400, 'VALIDATION_FAILED');
      const c = { id: pid(), ownerId: a.u.id, code: b.code.trim(), title: b.title.trim(), description: b.description || null, format: b.format, enrollKey: null, createdAt: now() };
      courses.push(c); return ok(res, detail(c, false).course);
    }
    mm = /^\/teacher\/courses\/([^/]+)(\/.*)?$/.exec(p); if (!mm) return fail(res, 404, 'NOT_FOUND');
    const c = courses.find((x) => x.id === decodeURIComponent(mm[1])); if (!c || !canManage(c, a.u)) return fail(res, 404, 'NOT_FOUND');
    const sub = mm[2] || '';
    if (sub === '' && m === 'GET') return ok(res, detail(c, false));
    if (sub === '' && m === 'DELETE') { courses.splice(courses.indexOf(c), 1); return ok(res); }
    if (sub === '/sections' && m === 'POST') {
      if (c.format === 2) return fail(res, 400, 'VALIDATION_FAILED');
      const b = await body(req); const pos = Math.max(0, ...sections.filter((s) => s.courseId === c.id).map((s) => s.position)) + 1;
      const s = { id: pid(), courseId: c.id, position: pos, title: String(b.title).trim() }; sections.push(s); return ok(res, s);
    }
    if ((mm = /^\/sections\/([^/]+)$/.exec(sub)) && m === 'DELETE') {
      const s = sections.find((x) => x.id === mm[1] && x.courseId === c.id); if (!s) return fail(res, 404, 'NOT_FOUND');
      sections.splice(sections.indexOf(s), 1); files.forEach((f) => { if (f.sectionId === s.id) f.sectionId = null; }); return ok(res);
    }
    if (sub === '/students' && m === 'GET') {
      return ok(res, enrollments.filter((e) => e.courseId === c.id).map((e) => { const u = users.find((x) => x.id === e.userId); return { id: u.publicId, username: u.username, fullName: u.fullName, method: e.method, enrolledAt: e.enrolledAt }; }).sort((x, y) => x.username.localeCompare(y.username)));
    }
    if (sub === '/students/paste' && m === 'POST') {
      const tokens = [...new Set(String((await body(req)).content || '').split(/[\s,;]+/).filter(Boolean))];
      const notFound = []; const cands = [];
      tokens.forEach((t) => { const u = users.find((x) => x.username.toUpperCase() === t.toUpperCase()); if (u) cands.push(u); else notFound.push(t); });
      return ok(res, enroll(c, cands, 0, notFound));
    }
    if (sub === '/students' && m === 'POST') {
      const ids = (await body(req)).userIds || []; const cands = users.filter((u) => ids.includes(u.publicId));
      return ok(res, enroll(c, cands, 1, ids.filter((i) => !cands.some((u) => u.publicId === i))));
    }
    if ((mm = /^\/students\/([^/]+)$/.exec(sub)) && m === 'DELETE') {
      const u = users.find((x) => x.publicId === decodeURIComponent(mm[1])); const i = enrollments.findIndex((e) => u && e.courseId === c.id && e.userId === u.id);
      if (i < 0) return fail(res, 404, 'NOT_FOUND'); enrollments.splice(i, 1); return ok(res);
    }
    if (sub === '/enroll-key' && m === 'POST') { c.enrollKey = newKey(); return ok(res, { enrollKey: c.enrollKey }); }
    if (sub === '/enroll-key' && m === 'DELETE') { c.enrollKey = null; return ok(res); }
    if (sub === '/files' && m === 'POST') {
      const mp = parseMultipart(await rawBody(req), req.headers['content-type']); const up = mp.files.file;
      if (!up || up.data.length === 0) return fail(res, 400, 'VALIDATION_FAILED');
      if (up.data.length > 20 * 1024 * 1024) return fail(res, 413, 'PAYLOAD_TOO_LARGE');
      const ext = up.filename.split('.').pop().toLowerCase(); const ct = TYPES_ALLOWED[ext];
      const magicOk = ext === 'pdf' ? up.data.subarray(0, 5).toString() === '%PDF-' : up.data.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 3, 4]));
      if (!ct || !magicOk) return fail(res, 400, 'UNSUPPORTED_FILE_TYPE');
      const secId = c.format === 2 ? null : (mp.fields.sectionId || null);
      if (secId && !sections.some((s) => s.id === secId && s.courseId === c.id)) return fail(res, 404, 'NOT_FOUND');
      const f = { id: pid(), courseId: c.id, sectionId: secId, name: path.basename(up.filename), contentType: ct, size: up.data.length, hidden: mp.fields.hidden === 'true', data: up.data, createdAt: now() };
      files.push(f); return ok(res, { id: f.id, sectionId: f.sectionId, name: f.name, contentType: ct, size: f.size, hidden: f.hidden, createdAt: f.createdAt });
    }
    if ((mm = /^\/files\/([^/]+)$/.exec(sub))) {
      const f = files.find((x) => x.id === mm[1] && x.courseId === c.id); if (!f) return fail(res, 404, 'NOT_FOUND');
      if (m === 'PATCH') { f.hidden = Boolean((await body(req)).hidden); return ok(res); }
      if (m === 'DELETE') { files.splice(files.indexOf(f), 1); assessments.forEach((x) => { if (x.paperFileId === f.id) x.paperFileId = null; }); return ok(res); }
    }
    if (sub === '/assessments' && m === 'POST') {
      const b = await body(req); if (![0, 1, 2].includes(b.type) || !b.title) return fail(res, 400, 'VALIDATION_FAILED');
      if (b.opensAt && b.closesAt && new Date(b.closesAt) <= new Date(b.opensAt)) return fail(res, 400, 'VALIDATION_FAILED');
      let paper = null;
      if (b.paperFileId) { paper = files.find((f) => f.id === b.paperFileId && f.courseId === c.id); if (!paper) return fail(res, 404, 'NOT_FOUND'); if (paper.contentType !== TYPES_ALLOWED.pdf) return fail(res, 400, 'UNSUPPORTED_FILE_TYPE'); if (b.type === 2) paper.hidden = true; }
      const x = { id: pid(), courseId: c.id, type: b.type, title: b.title, description: b.description || null, paperFileId: paper ? paper.id : null, opensAt: b.opensAt || null, closesAt: b.closesAt || null };
      assessments.push(x); return ok(res, detail(c, false).assessments.find((y) => y.id === x.id));
    }
    if ((mm = /^\/assessments\/([^/]+)$/.exec(sub)) && m === 'DELETE') {
      const i = assessments.findIndex((x) => x.id === mm[1] && x.courseId === c.id); if (i < 0) return fail(res, 404, 'NOT_FOUND'); assessments.splice(i, 1); return ok(res);
    }
    return fail(res, 404, 'NOT_FOUND');
  }

  // ---- admin
  if (!need('users.manage')) return;
  if (p === '/admin/users' && m === 'GET') {
    const q = (url.searchParams.get('q') || '').toLowerCase(); const role = url.searchParams.get('role'); const st = url.searchParams.get('status');
    const page = Number(url.searchParams.get('page') || 0); const size = Number(url.searchParams.get('size') || 20);
    const all = users.filter((u) => (!q || u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)) && (role === null || u.role === Number(role)) && (st === null || u.status === Number(st))).sort((x, y) => y.id - x.id);
    return ok(res, { items: all.slice(page * size, page * size + size).map(view), page, size, total: all.length, totalPages: Math.ceil(all.length / size) });
  }
  if (p === '/admin/users' && m === 'POST') {
    const b = await body(req);
    if (!/^[A-Za-z0-9][A-Za-z0-9_.-]{2,31}$/.test(b.username || '') || !b.fullName || ![0, 1, 2, 3, 4, 5, 6].includes(b.role) || String(b.password || '').length < 8) return fail(res, 400, 'VALIDATION_FAILED');
    if (users.some((u) => u.username.toLowerCase() === b.username.toLowerCase())) return fail(res, 409, 'USERNAME_TAKEN');
    return ok(res, view(addUser(b.username, b.fullName, b.password, b.role, { mustChangePassword: true })));
  }
  if (p === '/admin/users/import' && m === 'POST') { const b = await body(req); return ok(res, parseImport(b.content || '')); }
  if (p === '/admin/users/import-file' && m === 'POST') {
    const upload = parseMultipart(await rawBody(req), req.headers['content-type']).files.file;
    if (!upload || !upload.filename.toLowerCase().endsWith('.txt') || !upload.data.length) return fail(res, 400, 'VALIDATION_FAILED');
    if (upload.data.length > 262144) return fail(res, 413, 'PAYLOAD_TOO_LARGE');
    return ok(res, parseImport(upload.data.toString('utf8')));
  }
  mm = /^\/admin\/users\/([^/]+)(?:\/(lock|unlock|force-logout))?$/.exec(p);
  if (mm) {
    const u = users.find((x) => x.publicId === decodeURIComponent(mm[1])); if (!u) return fail(res, 404, 'NOT_FOUND');
    if (u.id === a.u.id) return fail(res, 409, 'CONFLICT');
    if (mm[2] === 'lock' && m === 'POST') { u.status = 0; revokeAll(u); disconnectUser(u, 'locked'); return ok(res, view(u)); }
    if (mm[2] === 'unlock' && m === 'POST') { u.status = 1; return ok(res, view(u)); }
    if (mm[2] === 'force-logout' && m === 'POST') { const n = [...sessions.values()].filter((s) => s.userId === u.id).length; revokeAll(u); disconnectUser(u, 'forced'); return ok(res, { revokedSessions: n }); }
    if (m === 'DELETE' && !mm[2]) {
      if (courses.some((c) => c.ownerId === u.id)) return fail(res, 409, 'USER_HAS_COURSES');
      disconnectUser(u, 'deleted'); revokeAll(u); users.splice(users.indexOf(u), 1); return ok(res);
    }
  }
  return fail(res, 404, 'NOT_FOUND');
}

// ------------------------------------------------------------------ static + WebSocket
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/api/')) {
    try { return await api(req, res, url); } catch (e) { console.error(e); return fail(res, 500, 'INTERNAL_ERROR'); }
  }
  if (url.pathname === '/__broadcast') { for (const c of sockets) c.ws.send(JSON.stringify({ type: 'notification.created', data: { title: 'Thông báo thử', message: url.searchParams.get('m') } })); res.end('ok'); return; }
  if (url.pathname === '/assets/js/config.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' });
    return res.end('export const config = Object.freeze({ apiBase: "/api/v1", socketPath: "/ws", requestTimeoutMs: 15000, features: Object.freeze({ courses: true, createUser: true }) });');
  }
  return serveStatic(req, res, STATIC);
});
const wss = new WebSocketServer({ noServer: true });
server.on('upgrade', (req, socket, head) => {
  const a = auth(req); if (!a || req.url !== '/ws') { socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n'); return socket.destroy(); }
  wss.handleUpgrade(req, socket, head, (ws) => {
    const c = { ws, user: a.u, sessionId: a.s.id, since: now() }; sockets.add(c);
    ws.send(JSON.stringify({ type: 'connected', data: { userId: a.u.publicId } }));
    if (online(a.u) === 1) broadcastPresence(a.u, true);
    ws.on('message', (d) => { try { if (JSON.parse(d).type === 'ping') ws.send(JSON.stringify({ type: 'pong', data: null })); } catch {} });
    ws.on('close', () => { sockets.delete(c); if (online(a.u) === 0) broadcastPresence(a.u, false); });
  });
});
server.listen(PORT, process.env.HOST || '127.0.0.1', () => console.log(`Mock server: http://127.0.0.1:${server.address().port}  (phục vụ ${STATIC})`));
