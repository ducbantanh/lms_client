import type { Deadline } from './schedule.ts';
import type { MyResult } from './teaching.ts';

export type TaskState = 'upcoming' | 'overdue' | 'done';

export interface LearningTask {
  deadline: Deadline;
  opensAt: string | null;
  result: MyResult | null;
  state: TaskState;
}

const DONE = new Set<MyResult['status']>(['submitted', 'auto_submitted']);

/**
 * Ghép mốc lịch với kết quả bài làm. Chỉ mốc đóng bài trở thành việc cần làm; mốc mở được giữ để
 * frontend biết bài đã mở hay chưa. Kết quả `missed` luôn là quá hạn dù đồng hồ máy có lệch nhẹ.
 */
export function buildLearningTasks(
  deadlines: Deadline[],
  results: MyResult[],
  now: number,
): LearningTask[] {
  const resultByAssessment = new Map(results.map((result) => [result.assessmentId, result]));
  const opensByAssessment = new Map(
    deadlines
      .filter((deadline) => deadline.kind === 'opens')
      .map((deadline) => [deadline.assessmentId, deadline.at]),
  );

  return deadlines
    .filter((deadline) => deadline.kind === 'closes')
    .map((deadline) => {
      const result = resultByAssessment.get(deadline.assessmentId) ?? null;
      const state: TaskState =
        result && DONE.has(result.status)
          ? 'done'
          : result?.status === 'missed' || Date.parse(deadline.at) < now
            ? 'overdue'
            : 'upcoming';
      return {
        deadline,
        opensAt: opensByAssessment.get(deadline.assessmentId) ?? null,
        result,
        state,
      };
    })
    .sort((a, b) => Date.parse(a.deadline.at) - Date.parse(b.deadline.at));
}

export function taskCounts(tasks: LearningTask[]) {
  return tasks.reduce((counts, task) => ({ ...counts, [task.state]: counts[task.state] + 1 }), {
    upcoming: 0,
    overdue: 0,
    done: 0,
  } satisfies Record<TaskState, number>);
}
