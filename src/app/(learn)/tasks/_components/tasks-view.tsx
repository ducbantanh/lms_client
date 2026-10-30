'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import {
  addDays,
  scheduleQuery,
  toIsoDate,
  type Deadline,
  type ScheduleFeed,
} from '@/lib/schedule';
import { buildLearningTasks, taskCounts, type LearningTask, type TaskState } from '@/lib/tasks';
import {
  ASSESSMENT_GROUPS,
  SUBMISSION_STATUS,
  type AssessmentType,
  type MyResult,
} from '@/lib/teaching';
import { useCourses } from '@/hooks/use-courses';
import { useToday } from '@/hooks/use-schedule';
import { AdminHeading } from '@/components/admin-ui';
import { Icon, type IconName } from '@/components/ui/icon';

const LOOK_BACK_DAYS = 14;
const LOOK_AHEAD_DAYS = 45;

interface LoadedTasks {
  key: string;
  deadlines: Deadline[];
  results: MyResult[];
  error: string;
}

const FILTERS: { value: TaskState; label: string }[] = [
  { value: 'upcoming', label: 'Sắp tới' },
  { value: 'overdue', label: 'Quá hạn' },
  { value: 'done', label: 'Đã hoàn thành' },
];

export function TasksView() {
  const today = useToday();
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
    reload: reloadCourses,
  } = useCourses();
  const [filter, setFilter] = useState<TaskState>('upcoming');
  const [course, setCourse] = useState('');
  const [version, setVersion] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const from = addDays(today, -LOOK_BACK_DAYS);
  const to = addDays(today, LOOK_AHEAD_DAYS);
  const courseIds = useMemo(() => courses.map((item) => item.id), [courses]);
  const key = `${today}|${courseIds.join(',')}|${version}`;
  const [loaded, setLoaded] = useState<LoadedTasks>({
    key: '',
    deadlines: [],
    results: [],
    error: '',
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (coursesLoading || coursesError) return;
    const controller = new AbortController();
    Promise.all([
      apiRequest<ScheduleFeed>(scheduleQuery(from, to), { signal: controller.signal }),
      Promise.all(
        courseIds.map((id) =>
          apiRequest<MyResult[]>(`/student/assessments?course=${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
        ),
      ),
    ])
      .then(([feed, pages]) => {
        if (controller.signal.aborted) return;
        setLoaded({
          key,
          deadlines: feed.deadlines,
          results: pages.flat(),
          error: '',
        });
      })
      .catch((reason) => {
        if (!controller.signal.aborted)
          setLoaded({
            key,
            deadlines: [],
            results: [],
            error:
              reason instanceof Error ? reason.message : 'Không tải được danh sách việc cần làm.',
          });
      });
    return () => controller.abort();
  }, [key, from, to, coursesLoading, coursesError, courseIds]);

  const active = loaded.key === key;
  const tasks = useMemo(
    () => (active ? buildLearningTasks(loaded.deadlines, loaded.results, now) : []),
    [active, loaded.deadlines, loaded.results, now],
  );
  const loading = coursesLoading || (!coursesError && !active);
  const error = coursesError || (active ? loaded.error : '');
  const counts = taskCounts(tasks);
  const courseOptions = useMemo(() => {
    const values = new Map<string, string>();
    tasks.forEach((task) => values.set(task.deadline.course.id, task.deadline.course.code));
    return [...values].sort((a, b) => a[1].localeCompare(b[1], 'vi'));
  }, [tasks]);
  const shown = tasks
    .filter((task) => task.state === filter && (!course || task.deadline.course.id === course))
    .sort((a, b) =>
      filter === 'done'
        ? Date.parse(b.deadline.at) - Date.parse(a.deadline.at)
        : Date.parse(a.deadline.at) - Date.parse(b.deadline.at),
    );

  function reload() {
    reloadCourses();
    setVersion((value) => value + 1);
  }

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Việc cần làm"
        description={`Hạn bài trong ${LOOK_BACK_DAYS} ngày gần đây và ${LOOK_AHEAD_DAYS} ngày sắp tới.`}
      >
        <button type="button" className="button" disabled={loading} onClick={reload}>
          <Icon name="history" size={12} />
          Làm mới
        </button>
      </AdminHeading>

      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <TaskStat
          label="Sắp tới"
          value={counts.upcoming}
          icon="clock"
          tone="blue"
          selected={filter === 'upcoming'}
          onClick={() => setFilter('upcoming')}
        />
        <TaskStat
          label="Quá hạn"
          value={counts.overdue}
          icon="info"
          tone="red"
          selected={filter === 'overdue'}
          onClick={() => setFilter('overdue')}
        />
        <TaskStat
          label="Đã hoàn thành"
          value={counts.done}
          icon="check"
          tone="green"
          selected={filter === 'done'}
          onClick={() => setFilter('done')}
        />
      </div>

      <section className="panel flush">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="tabs m-0 border-0" role="tablist" aria-label="Trạng thái công việc">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={filter === item.value}
                className={filter === item.value ? 'selected' : ''}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
                <span className="count">{counts[item.value]}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
            Khóa học
            <select
              className="select h-9 w-auto min-w-44"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            >
              <option value="">Tất cả</option>
              {courseOptions.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading ? (
          <div className="space-y-3 p-5" role="status">
            <div className="skeleton h-20" />
            <div className="skeleton h-20" />
            <div className="skeleton h-20" />
          </div>
        ) : shown.length ? (
          <ul className="m-0 list-none divide-y divide-line p-0">
            {shown.map((task) => (
              <TaskRow key={task.deadline.assessmentId} task={task} today={today} now={now} />
            ))}
          </ul>
        ) : (
          <div className="empty-state m-5">
            <Icon name={filter === 'done' ? 'check' : 'calendar'} size={26} />
            <h3>{emptyTitle(filter)}</h3>
            <p>{course ? 'Hãy thử chọn tất cả khóa học.' : emptyText(filter)}</p>
          </div>
        )}
      </section>
    </main>
  );
}

function TaskStat({
  label,
  value,
  icon,
  tone,
  selected,
  onClick,
}: {
  label: string;
  value: number;
  icon: IconName;
  tone: 'blue' | 'red' | 'green';
  selected: boolean;
  onClick: () => void;
}) {
  const colors = {
    blue: 'bg-primary-50 text-primary-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-emerald-50 text-emerald-600',
  }[tone];
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-card border bg-surface p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${selected ? 'border-primary-400 ring-2 ring-primary-100' : 'border-line'}`}
    >
      <span className={`grid size-10 place-items-center rounded-lg ${colors}`}>
        <Icon name={icon} size={15} />
      </span>
      <span>
        <b className="block text-2xl leading-none text-ink tabular-nums">{value}</b>
        <small className="mt-1 block text-xs font-medium text-ink-muted">{label}</small>
      </span>
    </button>
  );
}

function TaskRow({ task, today, now }: { task: LearningTask; today: string; now: number }) {
  const { deadline, result, state } = task;
  const group = ASSESSMENT_GROUPS[deadline.type as AssessmentType];
  const dueDay = toIsoDate(new Date(deadline.at));
  const stateInfo = {
    upcoming: { label: dueDay === today ? 'Hạn hôm nay' : 'Sắp tới', badge: 'warn' },
    overdue: { label: 'Quá hạn', badge: 'locked' },
    done: { label: 'Đã hoàn thành', badge: 'ok' },
  }[state];
  return (
    <li className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-muted/70 max-sm:items-start">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-lg ${state === 'done' ? 'bg-emerald-50 text-emerald-600' : state === 'overdue' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}
      >
        <Icon
          name={state === 'done' ? 'check' : state === 'overdue' ? 'info' : 'clock'}
          size={15}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 flex flex-wrap items-center gap-2">
          <b className="truncate text-sm font-semibold text-ink">{deadline.title}</b>
          <span className={`badge ${stateInfo.badge}`}>{stateInfo.label}</span>
        </span>
        <small className="block text-xs text-ink-muted">
          {deadline.course.code} · {group?.title ?? 'Bài học'} · Hạn {formatDateTime(deadline.at)}
        </small>
        <small className="mt-1 block text-xs text-ink-subtle">
          {result
            ? SUBMISSION_STATUS[result.status].label
            : task.opensAt && Date.parse(task.opensAt) > now
              ? `Mở ${formatDateTime(task.opensAt)}`
              : 'Chưa nộp'}
          {result?.score !== null && result?.score !== undefined && ` · ${result.score}/10 điểm`}
        </small>
      </span>
      <Link
        className="button small shrink-0 max-sm:px-2"
        href={`/course/assessment/?id=${encodeURIComponent(deadline.assessmentId)}`}
      >
        {state === 'done' ? 'Xem kết quả' : 'Mở bài'}
        <Icon name="chevron" size={9} />
      </Link>
    </li>
  );
}

function emptyTitle(filter: TaskState) {
  if (filter === 'overdue') return 'Không có bài quá hạn';
  if (filter === 'done') return 'Chưa có bài hoàn thành trong khoảng này';
  return 'Không có hạn bài sắp tới';
}

function emptyText(filter: TaskState) {
  if (filter === 'overdue') return 'Bạn đang theo kịp các hạn bài gần đây.';
  if (filter === 'done') return 'Bài đã nộp sẽ xuất hiện tại đây.';
  return 'Các hạn bài mới sẽ xuất hiện khi giảng viên cập nhật.';
}
