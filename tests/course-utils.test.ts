import test from 'node:test';
import assert from 'node:assert/strict';
import { selectCourses, normalizeSearch, initials, courseLabel } from '../src/lib/course-utils.ts';
import type { Course } from '../src/lib/types.ts';

// Fixture nhỏ để kiểm tra phối hợp bộ lọc, không sao chép thuật toán triển khai.
const courses: Course[] = [
  {
    id: 'a',
    code: 'NET01',
    title: 'Lập trình mạng',
    subtitle: 'Network',
    teacher: 'Đỗ Anh',
    semester: '2026',
    semesterLabel: '',
    status: 'current',
    progress: 40,
    nextLesson: null,
    lessons: 10,
    cover: 'blue',
    updatedAt: '2026-10-15',
  },
  {
    id: 'b',
    code: 'DB01',
    title: 'Cơ sở dữ liệu',
    subtitle: 'Database',
    teacher: 'Hà',
    semester: '2025',
    semesterLabel: '',
    status: 'completed',
    progress: 100,
    nextLesson: null,
    lessons: 10,
    cover: 'rose',
    updatedAt: '2025-10-15',
  },
  {
    id: 'c',
    code: 'WEB01',
    title: 'Lập trình Web',
    subtitle: 'Web',
    teacher: 'Nam',
    semester: '2026',
    semesterLabel: '',
    status: 'current',
    progress: 20,
    nextLesson: null,
    lessons: 10,
    cover: 'slate',
    updatedAt: '2026-10-16',
  },
];
const base = {
  search: '',
  filter: 'all' as const,
  semester: 'all',
  sort: 'recent' as const,
  starred: [],
  hidden: [],
};

test('search supports Vietnamese without accents, code and teacher', () => {
  assert.equal(normalizeSearch(' Đỗ Anh '), 'do anh');
  for (const search of ['lap trinh mang', 'NET01', 'do anh'])
    assert.deepEqual(
      selectCourses(courses, { ...base, search }).map((course) => course.id),
      ['a'],
    );
});
test('hidden courses stay out of All and Favorites but can be restored from Hidden', () => {
  const query = { ...base, hidden: ['a'], starred: ['a', 'c'] };
  assert.deepEqual(
    selectCourses(courses, query).map((course) => course.id),
    ['c', 'b'],
  );
  assert.deepEqual(
    selectCourses(courses, { ...query, filter: 'starred' }).map((course) => course.id),
    ['c'],
  );
  assert.deepEqual(
    selectCourses(courses, { ...query, filter: 'hidden' }).map((course) => course.id),
    ['a'],
  );
});
test('semester/status filters combine and sorting does not mutate source', () => {
  assert.equal(
    selectCourses(courses, { ...base, semester: '2026', filter: 'completed' }).length,
    0,
  );
  assert.deepEqual(
    selectCourses(courses, { ...base, sort: 'name' }).map((course) => course.id),
    ['b', 'a', 'c'],
  );
  assert.deepEqual(
    courses.map((course) => course.id),
    ['a', 'b', 'c'],
  );
  assert.equal(initials('Nguyễn Văn Quang'), 'VQ');
});

test('course label shows the group only when the course has one', () => {
  // Cùng định dạng Course.displayCode() của server
  assert.equal(courseLabel('INT1340', '01'), 'INT1340 · Nhóm 01');
  assert.equal(courseLabel('INT1340', null), 'INT1340');
  assert.equal(courseLabel('INT1340', ''), 'INT1340');
});
