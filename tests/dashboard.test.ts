import test from 'node:test';
import assert from 'node:assert/strict';
import {
  average,
  firstName,
  greeting,
  percent,
  progressBuckets,
  topWithOther,
} from '../src/lib/dashboard.ts';

test('lời chào theo giờ', () => {
  assert.equal(greeting(6), 'Chào buổi sáng');
  assert.equal(greeting(11), 'Chào buổi trưa');
  assert.equal(greeting(13), 'Chào buổi chiều');
  assert.equal(greeting(17), 'Chào buổi chiều');
  assert.equal(greeting(18), 'Chào buổi tối');
});

test('tên gọi là chữ cuối của họ tên', () => {
  assert.equal(firstName('Bùi Hải Sơn'), 'Sơn');
  assert.equal(firstName('  Trần   Minh Đức '), 'Đức');
  assert.equal(firstName(undefined), '');
});

test('chia khóa học theo tiến độ', () => {
  assert.deepEqual(progressBuckets([100, 40, 0, null, 99, 100]), {
    done: 2,
    learning: 2,
    notStarted: 2,
  });
  assert.deepEqual(progressBuckets([]), { done: 0, learning: 0, notStarted: 0 });
});

test('trung bình bỏ giá trị null', () => {
  assert.equal(average([50, null, 75]), 63);
  assert.equal(average([null, null]), null);
  assert.equal(average([]), null);
});

test('gộp phần nhỏ thành "Khác"', () => {
  const items = [
    { name: 'A', n: 10 },
    { name: 'B', n: 0 },
    { name: 'C', n: 30 },
    { name: 'D', n: 5 },
    { name: 'E', n: 8 },
    { name: 'F', n: 2 },
    { name: 'G', n: 1 },
  ];
  assert.deepEqual(
    topWithOther(
      items,
      (item) => item.n,
      (item) => item.name,
      3,
    ),
    [
      { label: 'C', value: 30 },
      { label: 'A', value: 10 },
      { label: 'E', value: 8 },
      { label: 'Khác', value: 8 },
    ],
  );
  // Vừa đủ thì không gộp (một mục "Khác" không có ý nghĩa)
  assert.deepEqual(
    topWithOther(
      items.slice(0, 5),
      (item) => item.n,
      (item) => item.name,
      3,
    ).map((item) => item.label),
    ['C', 'A', 'E', 'D'],
  );
});

test('phần trăm', () => {
  assert.equal(percent(1, 3), 33);
  assert.equal(percent(5, 0), 0);
});
