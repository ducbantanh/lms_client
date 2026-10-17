import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import http from 'node:http';
import { WebSocket } from 'ws';

function start(script, env = {}) {
  const child = spawn(process.execPath, [script], { env: { ...process.env, HOST: '127.0.0.1', PORT: '0', ...env }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  return new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => { child.kill(); reject(new Error('Server startup timed out')); }, 8000);
    child.on('error', (err) => { clearTimeout(timeout); reject(err); });
    child.stderr.on('data', (data) => { output += data; });
    child.on('exit', (code) => { clearTimeout(timeout); reject(new Error(`Server exited ${code}: ${output}`)); });
    child.stdout.on('data', (data) => {
      output += data;
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) { clearTimeout(timeout); resolve({ child, origin: match[0] }); }
    });
  });
}

test('gateway + mock: cookie, CSRF, import, presence, revoke and public boundary', { timeout: 20_000 }, async (t) => {
  const backend = await start('dev/mock-server.js');
  t.after(() => backend.child.kill());
  const gateway = await start('dev/server.js', { API_TARGET: backend.origin });
  t.after(() => gateway.child.kill());
  const call = async (path, session, body, extra = {}) => {
    const res = await fetch(gateway.origin + '/api/v1' + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { ...(session ? { Cookie: session.cookie, 'X-CSRF-Token': session.csrfToken } : {}), ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...extra },
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    });
    return { res, json: await res.json() };
  };
  const login = async (username, password) => {
    const { res, json } = await call('/auth/login', null, { username, password });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('set-cookie'), /HttpOnly/);
    return { ...json.data, cookie: res.headers.get('set-cookie').split(';')[0] };
  };
  const admin = await login('admin', 'admin12345');
  const student = await login('student01', 'student12345');
  assert.equal(student.user.role, 5);
  assert.equal((await call('/admin/users', student)).res.status, 403);
  assert.equal((await call('/admin/users/import', admin, { content: 'ABC|01012003|Nguyễn Văn A' }, { 'X-CSRF-Token': '' })).json.error.code, 'CSRF_INVALID');
  const report = (await call('/admin/users/import', admin, { content: 'ABC|01012003|Nguyễn Văn A\nABC|01012003|Nguyễn Văn A\nDEF|31022003|Nguyễn Văn B' })).json.data;
  assert.equal(report.created.length, 1);
  assert.equal(report.duplicates.length, 1);
  assert.equal(report.errors[0].reason, 'INVALID_DATE');
  const form = new FormData(); form.append('file', new Blob(['GHI|01012003|Nguyễn Văn C']), 'students.txt');
  assert.equal((await call('/admin/users/import-file', admin, form)).json.data.created.length, 1);
  const imported = await login('ABC', '01012003');
  assert.equal((await call('/student/dashboard', imported)).json.error.code, 'PASSWORD_CHANGE_REQUIRED');
  assert.equal((await call('/auth/change-password', imported, { currentPassword: '01012003', newPassword: 'new-password-123' })).res.status, 200);
  assert.equal((await call('/student/dashboard', imported)).res.status, 200);

  const ws = new WebSocket(gateway.origin.replace('http:', 'ws:') + '/ws', { headers: { Cookie: student.cookie, Origin: gateway.origin } });
  t.after(() => ws.terminate());
  await once(ws, 'open');
  const presence = (await call('/admin/presence', admin)).json.data;
  assert.equal(presence.users.some((u) => u.id === student.user.id), true);
  const revoked = new Promise((resolve) => ws.on('message', (data) => { const event = JSON.parse(data); if (event.type === 'session.revoked') resolve(event); }));
  const closed = once(ws, 'close');
  await call(`/admin/users/${student.user.id}/force-logout`, admin, {});
  assert.equal((await revoked).data.reason, 'forced');
  assert.equal((await closed)[0], 4001);
  assert.equal((await call('/auth/me', student)).res.status, 401);

  for (const route of ['/', '/login.html', '/admin/', '/student/', '/account.html', '/assets/js/config.js', '/vendor/fonts/source-sans-pro.css']) {
    assert.equal((await fetch(gateway.origin + route)).status, 200, route);
  }
  assert.match(await (await fetch(gateway.origin + '/assets/js/config.js')).text(), /courses: false/);
  for (const route of ['/README.md', '/.env', '/dev/mock-server.js', '/node_modules/ws/package.json', '/%2e%2e%5cpackage.json', '/%ZZ']) {
    const status = await new Promise((resolve, reject) => { http.get(gateway.origin + route, (res) => { res.resume(); resolve(res.statusCode); }).on('error', reject); });
    assert.equal(status, 404, route);
  }
  assert.equal((await fetch(gateway.origin + '/api/v1/auth/logout', { method: 'POST', headers: { Origin: 'http://evil.test' } })).status, 403);
});
