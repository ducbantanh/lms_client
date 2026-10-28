import test from 'node:test';
import assert from 'node:assert/strict';
import { homeFor, routeRedirect } from '../src/lib/auth.ts';
import type { Role, Session } from '../src/lib/types.ts';

// Quyền giống seed V2 + V4 của Spring cho từng vai trò.
const PERMISSIONS: Partial<Record<Role, string[]>> = {
  0: ['users.manage', 'sessions.manage', 'presence.view', 'courses.view', 'courses.manage'],
  1: ['courses.view', 'submissions.manage', 'presence.view', 'courses.manage'],
  5: ['courses.view', 'submissions.create'],
};

function session(role: Role): Session {
  return {
    csrfToken: 'x',
    user: {
      id: 'u',
      username: 'u',
      fullName: 'U',
      role,
      mustChangePassword: false,
      permissions: PERMISSIONS[role] ?? [],
    },
  };
}

test('each role lands on its own home after login', () => {
  assert.equal(routeRedirect(session(0), '/login/'), '/admin/');
  assert.equal(routeRedirect(session(1), '/login/'), '/teacher/');
  assert.equal(routeRedirect(session(5), '/login/'), '/');
  assert.equal(homeFor(session(1).user), '/teacher/');
});

test('teachers and admins leave the student area, students stay', () => {
  assert.equal(routeRedirect(session(1), '/'), '/teacher/');
  assert.equal(routeRedirect(session(1), '/course/?id=abc'), '/teacher/');
  assert.equal(routeRedirect(session(0), '/dashboard/'), '/admin/');
  assert.equal(routeRedirect(session(5), '/course/?id=abc'), null);
});

test('management routes follow permissions', () => {
  assert.equal(routeRedirect(session(1), '/teacher/course/?id=abc'), null);
  assert.equal(routeRedirect(session(0), '/teacher/'), null);
  // Giảng viên xem được tổng quan phòng máy nhưng không quản lý tài khoản.
  assert.equal(routeRedirect(session(1), '/admin/'), null);
  assert.equal(routeRedirect(session(1), '/admin/users/'), '/teacher/');
  assert.equal(routeRedirect(session(5), '/teacher/'), '/');
  assert.equal(routeRedirect(session(5), '/admin/'), '/');
});

test('each role opens the profile page of its own area', () => {
  assert.equal(routeRedirect(session(5), '/profile/'), null);
  assert.equal(routeRedirect(session(1), '/teacher/profile/'), null);
  // Giảng viên dùng hồ sơ trong khu giảng dạy; sinh viên không vào được khu giảng dạy
  assert.equal(routeRedirect(session(1), '/profile/'), '/teacher/');
  assert.equal(routeRedirect(session(5), '/teacher/profile/'), '/');
});
