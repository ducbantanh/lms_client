import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLearningTasks, taskCounts } from '../src/lib/tasks.ts';
import type { Deadline } from '../src/lib/schedule.ts';
import type { MyResult } from '../src/lib/teaching.ts';

const course = { id: 'c1', code: 'INT1340', title: 'Lập trình mạng', teacherName: 'GV' };
const deadline = (assessmentId: string, kind: Deadline['kind'], at: string): Deadline => ({
  assessmentId,
  course,
  type: 2,
  title: `Bài ${assessmentId}`,
  kind,
  at,
});
const result = (assessmentId: string, status: MyResult['status']): MyResult => ({
  assessmentId,
  status,
  submittedAt: status === 'submitted' ? '2026-10-29T01:00:00Z' : null,
  score: null,
});

test('việc cần làm ghép hạn đóng, mốc mở và trạng thái bài', () => {
  const tasks = buildLearningTasks(
    [
      deadline('a', 'opens', '2026-10-28T00:00:00Z'),
      deadline('a', 'closes', '2026-11-01T00:00:00Z'),
      deadline('b', 'closes', '2026-10-29T00:00:00Z'),
      deadline('c', 'closes', '2026-11-02T00:00:00Z'),
    ],
    [result('b', 'submitted'), result('c', 'missed')],
    Date.parse('2026-10-30T00:00:00Z'),
  );

  assert.deepEqual(
    tasks.map((task) => [task.deadline.assessmentId, task.state]),
    [
      ['b', 'done'],
      ['a', 'upcoming'],
      ['c', 'overdue'],
    ],
  );
  assert.equal(tasks[1].opensAt, '2026-10-28T00:00:00Z');
  assert.deepEqual(taskCounts(tasks), { upcoming: 1, overdue: 1, done: 1 });
});

test('bài chưa nộp đã qua hạn là quá hạn, bài tự nộp là hoàn thành', () => {
  const tasks = buildLearningTasks(
    [
      deadline('a', 'closes', '2026-10-29T00:00:00Z'),
      deadline('b', 'closes', '2026-10-29T00:00:00Z'),
    ],
    [result('a', 'in_progress'), result('b', 'auto_submitted')],
    Date.parse('2026-10-30T00:00:00Z'),
  );
  assert.deepEqual(
    tasks.map((task) => task.state),
    ['overdue', 'done'],
  );
});
