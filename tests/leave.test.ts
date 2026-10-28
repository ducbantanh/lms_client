import test from 'node:test';
import assert from 'node:assert/strict';
import { canRequestLeave, evidenceProblem, noticeLabel, sortLeaves } from '../src/lib/leave.ts';
import type { LeaveRequest } from '../src/lib/leave.ts';

test('nhãn số giờ báo trước', () => {
  assert.equal(noticeLabel(0), 'trước giờ học');
  assert.equal(noticeLabel(12), '12 giờ');
  assert.equal(noticeLabel(24), '1 ngày');
  assert.equal(noticeLabel(30), '1 ngày 6 giờ');
  assert.equal(noticeLabel(72), '3 ngày');
});

test('chỉ xin nghỉ được trước hạn, buổi chưa hủy và chưa có đơn', () => {
  const now = Date.parse('2026-10-26T00:00:00Z');
  const meeting = { cancelled: false, leave: null, leaveDeadline: '2026-10-26T02:00:00Z' };
  assert.equal(canRequestLeave(meeting, now), true);
  assert.equal(canRequestLeave({ ...meeting, leaveDeadline: '2026-10-25T23:59:00Z' }, now), false);
  assert.equal(canRequestLeave({ ...meeting, cancelled: true }, now), false);
  assert.equal(
    canRequestLeave({ ...meeting, leave: { id: 'x', status: 2, teacherNote: null } }, now),
    false,
  );
});

test('minh chứng chỉ nhận ảnh JPG/PNG, PDF tới 20 MB', () => {
  assert.equal(evidenceProblem({ name: 'giay-kham.JPG', size: 1000 }), null);
  assert.equal(evidenceProblem({ name: 'scan.pdf', size: 20 * 1024 * 1024 }), null);
  assert.match(evidenceProblem({ name: 'don.docx', size: 10 }) ?? '', /chỉ nhận/);
  assert.match(evidenceProblem({ name: 'anh.png', size: 20 * 1024 * 1024 + 1 }) ?? '', /20 MB/);
});

const request = (id: string, status: 0 | 1 | 2, startsAt: string): LeaveRequest => ({
  id,
  meeting: {
    id: `m-${id}`,
    date: startsAt.slice(0, 10),
    startPeriod: 1,
    periods: 3,
    room: '401-A2',
    startsAt,
    cancelled: false,
  },
  student: null,
  reason: 'Ốm',
  status,
  teacherNote: null,
  reviewerName: null,
  reviewedAt: null,
  createdAt: startsAt,
  files: [],
});

test('đơn chờ duyệt lên trước, trong nhóm buổi sớm hơn trước', () => {
  const sorted = sortLeaves([
    request('a', 1, '2026-10-20T00:00:00Z'),
    request('b', 0, '2026-10-29T00:00:00Z'),
    request('c', 0, '2026-10-27T00:00:00Z'),
    request('d', 2, '2026-10-19T00:00:00Z'),
  ]);
  assert.deepEqual(
    sorted.map((item) => item.id),
    ['c', 'b', 'd', 'a'],
  );
});
