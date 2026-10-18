import test from 'node:test';
import assert from 'node:assert/strict';
import { applyPresenceChange, auditLabel, roleName } from '../lib/admin-utils.ts';
import type { OnlineUser, PresenceChangedEvent } from '../lib/types.ts';

const onlineUser: OnlineUser = {
  id: 'u1',
  username: 'student01',
  fullName: 'Nguyễn Văn A',
  role: 5,
  connections: 1,
  since: '2026-10-18T01:00:00Z',
};

test('presence event updates and removes a user without mutating the snapshot', () => {
  const original = [onlineUser];
  const update: PresenceChangedEvent = {
    userId: 'u1',
    username: 'student01',
    fullName: 'Nguyễn Văn A',
    role: 5,
    online: true,
    connections: 2,
  };

  const updated = applyPresenceChange(original, update, '2026-10-18T02:00:00Z');
  assert.notEqual(updated, original);
  assert.equal(updated[0].connections, 2);
  assert.equal(updated[0].since, onlineUser.since);
  assert.equal(original[0].connections, 1);

  const removed = applyPresenceChange(updated, { ...update, online: false, connections: 0 });
  assert.deepEqual(removed, []);
});

test('admin labels match the Spring role and audit contracts', () => {
  assert.equal(roleName(0), 'Quản trị viên');
  assert.equal(roleName(5), 'Sinh viên');
  assert.equal(auditLabel('session.force_logout'), 'Ép đăng xuất');
  assert.equal(auditLabel('course.created'), 'Tạo khóa học');
});
