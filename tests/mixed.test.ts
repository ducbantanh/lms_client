import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultWeights, mixedWeightsProblem, parseWeight, weightTotal } from '../src/lib/mixed.ts';
import { examProblem } from '../src/lib/quiz.ts';
import type { ExamForm } from '../src/lib/quiz.ts';
import { mixedParts, quizSummary, type Assessment } from '../src/lib/teaching.ts';

test('defaultWeights chia đều 10 điểm, phần lẻ dồn vào phần đầu', () => {
  assert.deepEqual(defaultWeights(['quiz', 'code']), { quiz: '5', code: '5' });
  assert.deepEqual(defaultWeights(['quiz', 'code', 'file']), { quiz: '4', code: '3', file: '3' });
  assert.deepEqual(defaultWeights([]), {});
});

test('parseWeight nhận dấu phẩy, tối đa 2 chữ số thập phân', () => {
  assert.equal(parseWeight('2,5'), 2.5);
  assert.equal(parseWeight(' 4 '), 4);
  assert.ok(Number.isNaN(parseWeight('1,234')));
  assert.ok(Number.isNaN(parseWeight('abc')));
});

test('mixedWeightsProblem: ít nhất hai phần, mỗi phần > 0, tổng đúng 10 (không sai số số thực)', () => {
  assert.equal(mixedWeightsProblem(['quiz', 'code'], { quiz: '5', code: '5' }), null);
  // 3,3 + 3,3 + 3,4 = 10 (cộng số thực ra 9,999…)
  assert.equal(
    mixedWeightsProblem(['quiz', 'code', 'file'], { quiz: '3,3', code: '3,3', file: '3,4' }),
    null,
  );
  assert.match(mixedWeightsProblem(['quiz'], { quiz: '10' })!, /hai phần/);
  assert.match(mixedWeightsProblem(['quiz', 'code'], { quiz: '0', code: '10' })!, /lớn hơn 0/);
  assert.match(mixedWeightsProblem(['quiz', 'code'], { quiz: '4', code: '5' })!, /bằng 10/);
  assert.equal(weightTotal(['quiz', 'code'], { quiz: '4', code: 'x' }), 4);
});

const form = (patch: Partial<ExamForm> = {}): ExamForm => ({
  mode: 'mixed',
  type: 2,
  courseId: 'c',
  title: 'Giữa kỳ',
  opensAt: null,
  closesAt: null,
  timeLimit: '90',
  questionCount: 0,
  hasPaper: false,
  scoreRelease: 0,
  parts: ['code', 'file'],
  ...patch,
});

test('examProblem với bài tổng hợp: cần câu hỏi khi có phần trắc nghiệm, bài tập không có trắc nghiệm', () => {
  assert.equal(examProblem(form()), null);
  assert.match(examProblem(form({ parts: ['quiz', 'code'] }))!, /câu hỏi/);
  assert.equal(examProblem(form({ parts: ['quiz', 'code'], questionCount: 5 })), null);
  assert.match(
    examProblem(form({ type: 0, parts: ['quiz', 'file'], questionCount: 5 }))!,
    /Bài tập/,
  );
  assert.match(examProblem(form({ timeLimit: '0' }))!, /số phút/);
});

test('mixedParts và quizSummary của bài tổng hợp', () => {
  const assessment = {
    answerMode: 3,
    questionCount: 20,
    timeLimitMinutes: 90,
    quizWeight: 4,
    codeWeight: null,
    fileWeight: 6,
  } as unknown as Assessment;
  assert.deepEqual(
    mixedParts(assessment).map((part) => part.key),
    ['quiz', 'file'],
  );
  assert.equal(quizSummary(assessment), 'Tổng hợp: trắc nghiệm 4đ · nộp file 6đ · 90 phút');
});
