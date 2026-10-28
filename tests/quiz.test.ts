import test from 'node:test';
import assert from 'node:assert/strict';
import {
  answeredCount,
  examProblem,
  modeAllowed,
  parseTimeLimit,
  pickRandom,
  toggleChoice,
} from '../src/lib/quiz.ts';
import type { ExamForm } from '../src/lib/quiz.ts';
import type { Difficulty } from '../src/lib/question-bank.ts';

test('toggleChoice: câu chọn một thay đáp án, câu chọn nhiều bật/tắt và giữ thứ tự', () => {
  assert.deepEqual(toggleChoice([0], 2, false), [2]);
  assert.deepEqual(toggleChoice([2], 0, true), [0, 2]);
  assert.deepEqual(toggleChoice([0, 2], 2, true), [0]);
});

test('answeredCount đếm câu đã chọn ít nhất một đáp án', () => {
  assert.equal(answeredCount([{ chosen: [] }, { chosen: [1] }, { chosen: [0, 2] }]), 2);
});

test('pickRandom lấy đúng số câu từng mức độ, báo thiếu khi không đủ', () => {
  const pool = [0, 0, 0, 1, 1, 2].map((difficulty, index) => ({
    id: String(index),
    difficulty: difficulty as Difficulty,
  }));
  const { picked, missing } = pickRandom(pool, { 0: 2, 1: 1, 2: 3 }, () => 0.3);
  assert.equal(picked.filter((item) => item.difficulty === 0).length, 2);
  assert.equal(picked.filter((item) => item.difficulty === 1).length, 1);
  assert.equal(picked.filter((item) => item.difficulty === 2).length, 1);
  assert.deepEqual(missing, { 0: 0, 1: 0, 2: 2 });
  assert.equal(new Set(picked.map((item) => item.id)).size, picked.length);
  assert.deepEqual(pickRandom(pool, { 0: 0, 1: 0, 2: 0 }).picked, []);
});

const form = (patch: Partial<ExamForm> = {}): ExamForm => ({
  mode: 'quiz',
  type: 2,
  courseId: 'c1',
  title: 'Kiểm tra giữa kỳ',
  opensAt: '2026-10-24T01:00:00.000Z',
  closesAt: '2026-10-24T02:00:00.000Z',
  timeLimit: '45',
  questionCount: 30,
  hasPaper: false,
  scoreRelease: 0,
  ...patch,
});

test('examProblem kiểm tra khóa học, tiêu đề, giờ, số phút và số câu', () => {
  assert.equal(examProblem(form()), null);
  assert.equal(examProblem(form({ timeLimit: '' })), null);
  assert.match(examProblem(form({ courseId: '' })) ?? '', /khóa học/);
  assert.match(examProblem(form({ title: ' ' })) ?? '', /tiêu đề/);
  assert.match(
    examProblem(form({ closesAt: '2026-10-24T00:00:00.000Z' })) ?? '',
    /Giờ đóng phải sau/,
  );
  assert.match(examProblem(form({ timeLimit: '0' })) ?? '', /số phút/);
  assert.match(examProblem(form({ timeLimit: '1.5' })) ?? '', /số phút/);
  assert.match(examProblem(form({ questionCount: 0 })) ?? '', /ít nhất một câu/);
  assert.match(examProblem(form({ questionCount: 201 })) ?? '', /tối đa 200/);
});

test('examProblem với bài tải đề lên: bỏ qua câu hỏi, bài kiểm tra bắt buộc có đề PDF', () => {
  const file = { mode: 'file' as const, questionCount: 0, timeLimit: 'abc' };
  assert.match(examProblem(form(file)) ?? '', /file đề/);
  assert.equal(examProblem(form({ ...file, hasPaper: true })), null);
  assert.equal(examProblem(form({ ...file, type: 1 })), null);
  assert.match(examProblem(form({ ...file, title: '' })) ?? '', /tiêu đề/);
});

test('examProblem: công bố điểm sau giờ đóng thì cần giờ đóng', () => {
  assert.equal(examProblem(form({ scoreRelease: 1 })), null);
  assert.match(examProblem(form({ scoreRelease: 1, closesAt: null })) ?? '', /cần chọn giờ đóng/);
  assert.match(
    examProblem(form({ mode: 'file', hasPaper: true, scoreRelease: 1, closesAt: null })) ?? '',
    /cần chọn giờ đóng/,
  );
  // Không công bố điểm thì không cần giờ đóng
  assert.equal(examProblem(form({ scoreRelease: 2, closesAt: null })), null);
});

test('parseTimeLimit: ô trống là không giới hạn', () => {
  assert.equal(parseTimeLimit(''), null);
  assert.equal(parseTimeLimit(' 45 '), 45);
});

test('bài tập: tạo được dạng tải đề lên và lập trình, không có trắc nghiệm', () => {
  assert.equal(modeAllowed('quiz', 0), false);
  assert.equal(modeAllowed('code', 0), true);
  assert.equal(modeAllowed('file', 0), true);
  assert.equal(modeAllowed('quiz', 1), true);
  assert.match(examProblem(form({ type: 0 })) ?? '', /Bài tập chỉ tạo được/);
  assert.equal(examProblem(form({ type: 0, mode: 'code', questionCount: 0 })), null);
  // Bài tập nộp file không bắt buộc đề PDF như bài kiểm tra
  assert.equal(examProblem(form({ type: 0, mode: 'file', questionCount: 0 })), null);
});
