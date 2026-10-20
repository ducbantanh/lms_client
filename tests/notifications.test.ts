import test from 'node:test';
import assert from 'node:assert/strict';
import { notificationHref, timeAgo } from '../lib/notifications.ts';
import type { AppNotification } from '../lib/notifications.ts';

const base: AppNotification = {
  id: 'n1',
  category: 'announcement',
  title: 'Nghỉ học',
  body: null,
  course: { id: 'c1', code: 'INT1340', title: 'Lập trình mạng' },
  assessmentId: null,
  senderName: 'Thầy A',
  createdAt: '2026-10-20T08:00:00Z',
  read: false,
};

test('notificationHref: bài kiểm tra mở trang làm bài, thực hành/bài tập mở đúng tab, còn lại mở khóa học', () => {
  assert.equal(
    notificationHref({ ...base, category: 'exam', assessmentId: 'a1' }),
    '/course/assessment/?id=a1',
  );
  assert.equal(
    notificationHref({ ...base, category: 'lab', assessmentId: 'a2' }),
    '/course/?id=c1&tab=lab',
  );
  assert.equal(notificationHref({ ...base, category: 'practice' }), '/course/?id=c1&tab=practice');
  assert.equal(notificationHref({ ...base, category: 'content' }), '/course/?id=c1');
  assert.equal(notificationHref(base), '/course/?id=c1');
  assert.equal(notificationHref({ ...base, course: null }), '/');
});

test('timeAgo', () => {
  const now = Date.parse('2026-10-20T08:00:00Z');
  const ago = (minutes: number) => new Date(now - minutes * 60_000).toISOString();
  assert.equal(timeAgo(ago(0.5), now), 'Vừa xong');
  assert.equal(timeAgo(ago(5), now), '5 phút trước');
  assert.equal(timeAgo(ago(180), now), '3 giờ trước');
  assert.equal(timeAgo(ago(26 * 60), now), 'Hôm qua');
  assert.equal(timeAgo(ago(4 * 24 * 60), now), '4 ngày trước');
});
