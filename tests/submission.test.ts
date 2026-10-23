import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDuration,
  formatRelative,
  formatScore,
  parseScore,
  resultSummary,
  scorePending,
  splitDuration,
  upcomingItems,
} from '../src/lib/teaching.ts';
import type { Assessment, MyResult } from '../src/lib/teaching.ts';

const NOW = Date.parse('2026-10-20T08:00:00Z');
const hours = (h: number) => new Date(NOW + h * 3600_000).toISOString();
const assessment = (
  id: string,
  type: 0 | 1 | 2,
  status: Assessment['status'],
  opensAt: string | null,
  closesAt: string | null,
): Assessment => ({
  id,
  type,
  title: id,
  description: null,
  paperFileId: null,
  paperFileName: null,
  opensAt,
  closesAt,
  status,
  answerMode: 0,
  timeLimitMinutes: null,
  questionCount: 0,
  scoreRelease: 0,
});
const result = (
  assessmentId: string,
  status: MyResult['status'],
  score: number | null = null,
): MyResult => ({ assessmentId, status, submittedAt: null, score });

test('upcomingItems: bài đang mở còn hạn và bài sắp mở, gần nhất trước; bỏ bài đã đóng/không hạn', () => {
  const list = [
    assessment('late', 2, 'open', hours(-2), hours(30)),
    assessment('soon', 2, 'open', hours(-1), hours(2)),
    assessment('next', 0, 'upcoming', hours(5), hours(8)),
    assessment('closed', 2, 'closed', hours(-5), hours(-1)),
    assessment('nolimit', 1, 'open', null, null),
  ];
  const items = upcomingItems(list, [result('soon', 'submitted')], NOW);
  assert.deepEqual(
    items.map((item) => [item.assessment.id, item.kind]),
    [
      ['soon', 'due'],
      ['next', 'opens'],
      ['late', 'due'],
    ],
  );
  assert.equal(items[0].result?.status, 'submitted');
});

test('resultSummary chỉ đếm bài nộp được đã mở, trung bình các bài đã chấm', () => {
  const list = [
    assessment('e1', 2, 'closed', hours(-5), hours(-1)),
    assessment('e2', 2, 'open', hours(-1), hours(1)),
    assessment('e3', 2, 'upcoming', hours(1), hours(2)),
    assessment('p1', 0, 'open', null, null),
    // Bài thực hành trắc nghiệm có trang làm bài nên được tính
    { ...assessment('q1', 1, 'open', null, null), answerMode: 1, questionCount: 10 },
  ];
  const summary = resultSummary(list, [
    result('e1', 'auto_submitted', 8.5),
    result('e2', 'in_progress'),
    result('e3', 'not_started'),
    result('p1', 'in_progress'),
    result('q1', 'submitted', 7),
  ]);
  assert.deepEqual(summary, { total: 3, submitted: 2, graded: 2, average: 7.75 });
});

test('scorePending: công bố sau giờ đóng (chưa tới giờ) hoặc không bao giờ công bố', () => {
  const later = assessment('a', 2, 'open', null, hours(2));
  assert.equal(scorePending(later, NOW), null);
  assert.deepEqual(scorePending({ ...later, scoreRelease: 1 }, NOW), { at: later.closesAt });
  assert.equal(
    scorePending({ ...assessment('b', 2, 'closed', null, hours(-1)), scoreRelease: 1 }, NOW),
    null,
  );
  assert.equal(
    scorePending({ ...assessment('c', 2, 'open', null, null), scoreRelease: 1 }, NOW),
    null,
  );
  assert.deepEqual(
    scorePending({ ...assessment('d', 2, 'closed', null, hours(-1)), scoreRelease: 2 }, NOW),
    { at: null },
  );
});

test('formatRelative', () => {
  assert.equal(formatRelative((2 * 24 + 3) * 3600_000), '2 ngày 3 giờ');
  assert.equal(formatRelative((3 * 60 + 15) * 60_000), '3 giờ 15 phút');
  assert.equal(formatRelative(20_000), '1 phút');
});

test('parseScore nhận dấu phẩy/chấm, trống là xóa điểm, chặn ngoài thang 10', () => {
  assert.deepEqual(parseScore('8,5'), { value: 8.5 });
  assert.deepEqual(parseScore(' 10 '), { value: 10 });
  assert.deepEqual(parseScore('0.25'), { value: 0.25 });
  assert.deepEqual(parseScore(''), { value: null });
  assert.ok('error' in parseScore('10.5'));
  assert.ok('error' in parseScore('7.125'));
  assert.ok('error' in parseScore('-1'));
  assert.ok('error' in parseScore('abc'));
});

test('formatScore viết số kiểu Việt Nam', () => {
  assert.equal(formatScore(8.5), '8,5');
  assert.equal(formatScore(10), '10');
});

test('đếm ngược tách ngày/giờ/phút/giây và không âm', () => {
  const ms = ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000 + 999;
  assert.deepEqual(splitDuration(ms), { days: 2, hours: 3, minutes: 4, seconds: 5 });
  assert.deepEqual(splitDuration(-5000), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test('formatDuration chỉ ghi số ngày khi còn từ một ngày trở lên', () => {
  assert.equal(formatDuration(65_000), '00:01:05');
  assert.equal(formatDuration((24 * 3600 + 1) * 1000), '1 ngày 00:00:01');
});
