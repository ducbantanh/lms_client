import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupContent,
  isoToLocalInput,
  localInputToIso,
  moveId,
  selectTeacherCourses,
  splitLinks,
} from '../src/lib/teaching.ts';
import type { TeacherCourseFilter, TeacherCourseSort } from '../src/lib/teaching.ts';
import type { CourseContent, CourseFile, Lesson } from '../src/lib/teaching.ts';

const lesson = (id: string, sectionId: string | null, position: number): Lesson => ({
  id,
  sectionId,
  position,
  title: id,
  body: null,
  hidden: false,
  createdAt: '2026-10-01T00:00:00Z',
  updatedAt: '2026-10-01T00:00:00Z',
});

const file = (id: string, sectionId: string | null, lessonId: string | null): CourseFile => ({
  id,
  sectionId,
  lessonId,
  name: `${id}.pdf`,
  contentType: 'application/pdf',
  size: 1,
  hidden: false,
  createdAt: '2026-10-01T00:00:00Z',
});

function content(format: 0 | 1 | 2, lessons: Lesson[], files: CourseFile[]): CourseContent {
  return {
    course: {
      id: 'c',
      code: 'NET01',
      title: 'Lập trình mạng',
      description: null,
      format,
      enrollKey: null,
      studentCount: 0,
      teacherName: null,
      createdAt: '2026-10-01T00:00:00Z',
    },
    sections: [
      { id: 's1', position: 1, title: 'Tuần 1' },
      { id: 's2', position: 2, title: 'Tuần 2' },
    ],
    lessons,
    files,
    assessments: [],
  };
}

test('bài học theo mục và thứ tự, file đính kèm nằm trong bài', () => {
  const groups = groupContent(
    content(
      1,
      [lesson('b', 's1', 2), lesson('a', 's1', 1), lesson('c', 's2', 1)],
      [file('fa', 's1', 'a'), file('f1', 's1', null)],
    ),
  );
  assert.equal(groups.length, 2);
  assert.deepEqual(
    groups[0].lessons.map((group) => group.lesson.id),
    ['a', 'b'],
  );
  assert.deepEqual(
    groups[0].lessons[0].files.map((item) => item.id),
    ['fa'],
  );
  assert.deepEqual(
    groups[0].files.map((item) => item.id),
    ['f1'],
  );
  assert.deepEqual(
    groups[1].lessons.map((group) => group.lesson.id),
    ['c'],
  );
});

test('nhóm "chưa phân mục" chỉ xuất hiện khi có nội dung; file trỏ bài lạ về mục', () => {
  assert.equal(groupContent(content(1, [], [])).length, 2);
  const groups = groupContent(
    content(1, [lesson('x', null, 1)], [file('orphan', 's2', 'missing')]),
  );
  assert.equal(groups.length, 3);
  assert.equal(groups[2].section, null);
  assert.deepEqual(
    groups[2].lessons.map((group) => group.lesson.id),
    ['x'],
  );
  assert.deepEqual(
    groups[1].files.map((item) => item.id),
    ['orphan'],
  );
});

test('khóa học chỉ danh sách tài liệu không có bài học', () => {
  const groups = groupContent(content(2, [lesson('a', 's1', 1)], [file('f', null, null)]));
  assert.equal(groups.length, 1);
  assert.equal(groups[0].lessons.length, 0);
  assert.equal(groups[0].files.length, 1);
});

test('splitLinks tách link http(s), bỏ dấu câu cuối', () => {
  assert.deepEqual(splitLinks('Xem https://example.com/a?b=1. Hết'), [
    { text: 'Xem ' },
    { text: 'https://example.com/a?b=1', href: 'https://example.com/a?b=1' },
    { text: '. Hết' },
  ]);
  assert.deepEqual(splitLinks('javascript:alert(1)'), [{ text: 'javascript:alert(1)' }]);
});

test('moveId đổi chỗ với phần tử kế bên, giữ nguyên khi ở đầu/cuối', () => {
  assert.deepEqual(moveId(['a', 'b', 'c'], 1, -1), ['b', 'a', 'c']);
  assert.deepEqual(moveId(['a', 'b', 'c'], 1, 1), ['a', 'c', 'b']);
  assert.deepEqual(moveId(['a', 'b'], 0, -1), ['a', 'b']);
  assert.deepEqual(moveId(['a', 'b'], 1, 1), ['a', 'b']);
});

test('isoToLocalInput là nghịch đảo của localInputToIso (theo phút)', () => {
  assert.equal(isoToLocalInput(null), '');
  const local = '2026-10-20T08:30';
  assert.equal(isoToLocalInput(localInputToIso(local)), local);
});

test('selectTeacherCourses lọc theo việc cần làm và sắp xếp', () => {
  const base = {
    format: 0 as const,
    teacherName: 'GV',
    studentCount: 1,
    averageProgress: null,
    openAssessments: 0,
    toGrade: 0,
  };
  const list = [
    { ...base, id: 'a', code: 'INT10', title: 'Mạng', createdAt: '2026-01-01', toGrade: 2 },
    {
      ...base,
      id: 'b',
      code: 'INT9',
      title: 'An toàn',
      createdAt: '2026-03-01',
      openAssessments: 1,
    },
    {
      ...base,
      id: 'c',
      code: 'INT11',
      title: 'Cơ sở dữ liệu',
      createdAt: '2026-02-01',
      teacherName: null,
    },
  ];
  const ids = (filter: TeacherCourseFilter, sort: TeacherCourseSort, search = '') =>
    selectTeacherCourses(list, { search, filter, sort }).map((course) => course.id);
  assert.deepEqual(ids('all', 'recent'), ['b', 'c', 'a']);
  assert.deepEqual(ids('all', 'name'), ['b', 'c', 'a']);
  assert.deepEqual(ids('all', 'code'), ['b', 'a', 'c']); // INT9 < INT10 < INT11 (so số)
  assert.deepEqual(ids('all', 'grading'), ['a', 'b', 'c']);
  assert.deepEqual(ids('grading', 'recent'), ['a']);
  assert.deepEqual(ids('open', 'recent'), ['b']);
  assert.deepEqual(ids('unassigned', 'recent'), ['c']);
  assert.deepEqual(ids('all', 'recent', 'co so'), ['c']); // tìm không dấu
});
