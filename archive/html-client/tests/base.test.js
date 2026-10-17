import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { homeFor, safeNext } from '../public/assets/js/routing.js';
import { ROLE } from '../public/assets/js/messages-vi.js';
import { request, setSession, getUser, loadSession } from '../public/assets/js/api.js';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; setSession(null); });
const response = (data, status = 200) => new Response(JSON.stringify(data), { status });

test('numeric roles and permission-based landing pages match Spring', () => {
  assert.equal(ROLE.STUDENT, 5);
  assert.equal(ROLE.VISITOR, 6);
  assert.equal(homeFor({ role: 0, permissions: ['users.manage', 'presence.view'] }), '/admin/');
  assert.equal(homeFor({ role: 1, permissions: ['courses.view', 'presence.view'] }), '/admin/');
  assert.equal(homeFor({ role: 2, permissions: ['courses.view'] }), '/student/');
  for (const role of [3, 4]) assert.equal(homeFor({ role, permissions: [] }), '/account.html');
  assert.equal(homeFor({ role: 5, permissions: ['courses.view'] }), '/student/');
});

test('next accepts UI paths and rejects external redirects including backslashes', () => {
  const origin = 'http://localhost:8090';
  assert.equal(safeNext('/student/course.html?id=abc', origin), '/student/course.html?id=abc');
  for (const next of ['//evil.test', '/\\evil.test', '/%5cevil.test', 'https://evil.test', '/login.html', '/api/v1/auth/logout', '/\n/evil.test', null]) {
    assert.equal(safeNext(next, origin), null, String(next));
  }
});

test('mutations attach CSRF, GET omits it, multipart preserves browser boundary', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, ...options }); return response({ success: true, data: { ok: true } }); };
  setSession({ user: { id: 'u1' }, csrfToken: 'csrf-test' });
  await request('post', '/example', { name: 'A' });
  await request('GET', '/example');
  const form = new FormData(); form.append('file', new Blob(['hello']), 'students.txt');
  await request('POST', '/admin/users/import-file', form);
  assert.equal(calls[0].headers['X-CSRF-Token'], 'csrf-test');
  assert.equal(calls[0].credentials, 'same-origin');
  assert.equal(calls[0].body, '{"name":"A"}');
  assert.equal(calls[1].headers['X-CSRF-Token'], undefined);
  assert.equal(calls[2].headers['Content-Type'], undefined);
  assert.equal(calls[2].body, form);
});

test('HTTP errors cannot masquerade as success and internal messages stay hidden', async () => {
  globalThis.fetch = async () => response({ success: true, data: 'wrong' }, 500);
  await assert.rejects(request('GET', '/example'), { code: 'INTERNAL_ERROR' });
  globalThis.fetch = async () => response({ success: false, error: { code: 'FORBIDDEN', message: 'private database path' } }, 403);
  await assert.rejects(request('GET', '/example'), (err) => err.code === 'FORBIDDEN' && !err.message.includes('database'));
  globalThis.fetch = async () => new Response('<html>proxy failure</html>', { status: 502 });
  await assert.rejects(request('GET', '/example'), { code: 'INTERNAL_ERROR' });
});

test('request timeout and cancellation finish with predictable error codes', async () => {
  globalThis.fetch = (_, { signal }) => new Promise((resolve, reject) => {
    if (signal.aborted) reject(new Error('aborted'));
    else signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  });
  await assert.rejects(request('GET', '/example', undefined, { timeoutMs: 10 }), { code: 'REQUEST_TIMEOUT' });
  const controller = new AbortController(); controller.abort();
  await assert.rejects(request('GET', '/example', undefined, { signal: controller.signal }), { code: 'REQUEST_CANCELLED' });
});

test('expired session clears cached user; password-change errors redirect', async () => {
  setSession({ user: { id: 'u1' }, csrfToken: 'old' });
  globalThis.fetch = async () => response({ success: false, error: { code: 'UNAUTHENTICATED' } }, 401);
  assert.equal(await loadSession(), null);
  assert.equal(getUser(), null);
  let redirected;
  globalThis.window = { location: { replace: (path) => { redirected = path; } } };
  globalThis.fetch = async () => response({ success: false, error: { code: 'PASSWORD_CHANGE_REQUIRED' } }, 403);
  await assert.rejects(request('GET', '/student/dashboard'), { code: 'PASSWORD_CHANGE_REQUIRED' });
  assert.equal(redirected, '/change-password.html');
});
