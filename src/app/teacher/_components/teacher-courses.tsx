'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDeferredValue, useEffect, useMemo, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH, hasPermission } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import { useSession } from '@/providers/session-provider';
import {
  ASSESSMENT_TAB_PARAM,
  ASSESSMENT_TYPES,
  COURSE_FORMATS,
  formatRelative,
  selectTeacherCourses,
  type CourseFormat,
  type CourseInfo,
  type GradingTask,
  type ScheduleItem,
  type TeacherCourseFilter,
  type TeacherCourseSort,
  type TeacherOverview,
} from '@/lib/teaching';
import { useViewMode } from '@/hooks/use-view-mode';
import { courseLabel } from '@/lib/course-utils';
import { CHART_COLORS, average, firstName, greeting, percent, topWithOther } from '@/lib/dashboard';
import { AdminHeading } from '@/components/admin-ui';
import { Card, EmptyHint, PageHeading } from '@/components/ui/card';
import {
  ColumnChart,
  CountUp,
  Donut,
  Legend,
  ProgressBar,
  SegmentBar,
} from '@/components/ui/charts';
import { RatioCard } from '@/components/ui/ratio-card';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { StatCard } from '@/components/ui/stat-card';
import { TeacherSelect } from '@/components/teacher-select';
import { GroupField } from '@/components/course-group-field';
import { TeacherCourseCard } from './teacher-course-card';
import { ViewToggle } from '@/components/ui/view-toggle';
import { RESULTS_FOOTER, TILE_GRID, TILE_SKELETON } from '@/components/ui/tile';
import { UpcomingPanel } from '@/components/schedule/upcoming-panel';

/** Còn dưới 24 giờ tới giờ đóng thì tô đỏ, giống trang sinh viên. */
const URGENT_MS = 24 * 3600_000;

const courseHref = (courseId: string, tab?: string) =>
  `${TEACHER_PATH}/course/?id=${encodeURIComponent(courseId)}${tab ? `&tab=${tab}` : ''}`;
const gradingHref = (courseId: string, assessmentId: string) =>
  `${TEACHER_PATH}/course/submissions/?course=${encodeURIComponent(courseId)}&id=${encodeURIComponent(assessmentId)}`;

/** GET /teacher/overview: dùng chung cho trang Tổng quan (việc cần làm) và trang Khóa học (bảng). */
function useTeacherOverview() {
  const [data, setData] = useState<TeacherOverview | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    apiRequest<TeacherOverview>('/teacher/overview', { signal: controller.signal })
      .then(setData)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được dữ liệu.');
      });
    return () => controller.abort();
  }, []);
  return { data, error };
}

/**
 * Trang /teacher/: số liệu, khóa học mình phụ trách (tiến độ trung bình dạng vạch), sinh viên theo khóa (biểu đồ
 * vòng), bài chờ chấm, lịch bài, bài chờ chấm theo khóa (biểu đồ cột), tiến độ trung bình các lớp, lịch dạy.
 */
export function TeacherOverviewView() {
  const { user } = useSession();
  const { data, error } = useTeacherOverview();
  // Cập nhật "còn bao lâu" mỗi phút
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const name = firstName(user?.fullName);
  const courses = data?.courses ?? [];
  const busiest = [...courses]
    .sort((a, b) => b.toGrade - a.toGrade || b.studentCount - a.studentCount)
    .slice(0, 5);
  const students = topWithOther(
    courses,
    (course) => course.studentCount,
    (course) => courseLabel(course.code, course.group),
  ).map((item, index) => ({ ...item, color: CHART_COLORS[index % CHART_COLORS.length] }));
  const classProgress = average(courses.map((course) => course.averageProgress));

  return (
    <main id="main-content" className="shell-main">
      <PageHeading
        title={name ? `${greeting(new Date().getHours())}, ${name}` : 'Tổng quan'}
        description="Bài chờ chấm, lịch bài và tình hình các khóa học bạn phụ trách."
      >
        {hasPermission(user, 'courses.manage') && (
          <Link href={`${TEACHER_PATH}/create-exam/`} className="button primary">
            <Icon name="exam" size={13} />
            Tạo bài thi
          </Link>
        )}
      </PageHeading>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      <div className="stats cols-4">
        <StatCard
          label="Khóa học"
          value={data?.stats.courses}
          icon="book"
          tone="blue"
          href={`${TEACHER_PATH}/courses/`}
        />
        <StatCard label="Sinh viên" value={data?.stats.students} icon="users" tone="violet" />
        <StatCard label="Bài chờ chấm" value={data?.stats.toGrade} icon="check" tone="red" />
        <StatCard
          label="Bài đang mở"
          value={data?.stats.openAssessments}
          icon="clock"
          tone="green"
        />
      </div>
      {data && data.stats.courses === 0 && (
        <div className="notice" role="status">
          Bạn chưa được phân công khóa học nào. Quản trị viên tạo khóa học và phân công cho bạn.
        </div>
      )}
      {data && data.stats.courses > 0 && (
        <div className="grid gap-5 xl:grid-cols-12">
          <Card
            title="Khóa học của tôi"
            info="Tiến độ trung bình của sinh viên trong lớp, số bài chờ chấm và bài đang mở."
            href={`${TEACHER_PATH}/courses/`}
            hrefLabel="Tất cả khóa học"
            className="xl:col-span-7"
          >
            <div className="-mx-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="text-xs text-ink-subtle">
                    <th className="px-5 pb-2 font-medium">Khóa học</th>
                    <th className="px-3 pb-2 font-medium">Sinh viên</th>
                    <th className="px-3 pb-2 font-medium">Tiến độ lớp</th>
                    <th className="px-5 pb-2 text-right font-medium">Chờ chấm</th>
                  </tr>
                </thead>
                <tbody>
                  {busiest.map((course, index) => (
                    <tr
                      key={course.id}
                      className="group border-t border-line transition-colors hover:bg-surface-muted"
                      style={{ animationDelay: `${120 + index * 50}ms` }}
                    >
                      <td className="max-w-[240px] px-5 py-3">
                        <Link
                          href={courseHref(course.id)}
                          className="block truncate font-semibold text-ink transition-colors group-hover:text-primary-600"
                        >
                          {course.title}
                        </Link>
                        <span className="block truncate text-xs text-ink-subtle">
                          {courseLabel(course.code, course.group)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center">
                          {Array.from({ length: Math.min(3, course.studentCount) }, (_, i) => (
                            <span
                              key={i}
                              className="-ml-1.5 size-6 rounded-full ring-2 ring-white first:ml-0"
                              style={{
                                background: CHART_COLORS[(index + i) % CHART_COLORS.length],
                              }}
                            />
                          ))}
                          <span className="ml-2 text-xs font-medium text-ink-muted tabular-nums">
                            {course.studentCount}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        {course.averageProgress !== null ? (
                          <span className="flex items-center gap-2.5">
                            <SegmentBar value={course.averageProgress} />
                            <b className="w-9 text-right text-xs font-semibold text-ink tabular-nums">
                              {course.averageProgress}%
                            </b>
                          </span>
                        ) : (
                          <span className="text-xs text-ink-subtle">Chưa có số liệu</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        {course.toGrade ? (
                          <span className="badge warn">{course.toGrade} bài</span>
                        ) : (
                          <span className="text-xs text-ink-subtle">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="Sinh viên theo khóa"
            info="Số sinh viên đang ghi danh ở các khóa học bạn phụ trách."
            delay={60}
            className="xl:col-span-5"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Donut
                segments={students}
                center={
                  <div>
                    <b className="block text-4xl font-semibold tracking-tight text-ink">
                      <CountUp value={data.stats.students} />
                    </b>
                    <span className="text-xs text-ink-subtle">sinh viên</span>
                  </div>
                }
              />
              <div className="w-full min-w-0 flex-1">
                <Legend segments={students} />
              </div>
            </div>
          </Card>

          <GradingPanel tasks={data.toGrade} more={data.toGradeMore} className="xl:col-span-4" />
          <SchedulePanel
            items={data.schedule}
            more={data.scheduleMore}
            now={now}
            className="xl:col-span-5"
          />
          <Card
            title="Chờ chấm theo khóa"
            info="Số bài nộp chưa chấm của từng khóa học."
            delay={240}
            className="xl:col-span-3"
          >
            <ColumnChart
              columns={busiest.map((course) => ({
                label: course.code,
                value: course.toGrade,
                hint: `${course.toGrade} bài chờ chấm`,
              }))}
            />
            <p className="mt-3 text-xs text-ink-muted">
              {data.stats.toGrade
                ? `Còn ${data.stats.toGrade} bài nộp chờ bạn chấm.`
                : 'Bạn đã chấm hết các bài nộp.'}
            </p>
          </Card>

          <UpcomingPanel
            href={`${TEACHER_PATH}/schedule/`}
            title="Lịch dạy sắp tới"
            delay={300}
            className="xl:col-span-8"
          />
          <RatioCard
            title="Tiến độ trung bình các lớp"
            info="Trung bình tiến độ học của sinh viên ở các khóa có bài học."
            value={classProgress ?? 0}
            leftLabel="Đã học"
            rightLabel="Còn lại"
            delay={360}
            className="xl:col-span-4"
            note={`${courses.length} khóa học · ${data.stats.students} sinh viên · ${data.stats.openAssessments} bài đang mở.`}
          />
        </div>
      )}
    </main>
  );
}

const COURSE_PAGE = 12;

/**
 * Trang /teacher/courses/: khóa học mình phụ trách (admin thấy mọi khóa học), cùng bố cục với trang
 * khóa học của sinh viên: tab lọc, tìm kiếm, sắp xếp, lưới/danh sách (nhớ theo tài khoản), "Xem thêm".
 */
export function TeacherCourseList() {
  const { user } = useSession();
  const isAdmin = user?.role === 0;
  // Chỉ admin tạo khóa học và phân công giảng viên (courses.assign); giảng viên nhận khóa được giao
  const canAssign = hasPermission(user, 'courses.assign');
  const { data, error } = useTeacherOverview();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TeacherCourseFilter>('all');
  const [sort, setSort] = useState<TeacherCourseSort>('recent');
  const [visibleCount, setVisibleCount] = useState(COURSE_PAGE);
  const [view, setView] = useViewMode(`lms.ui.teacher-courses.${user?.id ?? 'guest'}`, 'grid');
  const [creating, setCreating] = useState(false);
  const deferredSearch = useDeferredValue(search);
  const courses = data?.courses;
  const filtered = useMemo(
    () => selectTeacherCourses(courses ?? [], { search: deferredSearch, filter, sort }),
    [courses, deferredSearch, filter, sort],
  );
  const filters: { value: TeacherCourseFilter; label: string; count: number }[] = [
    { value: 'all', label: 'Tất cả', count: courses?.length ?? 0 },
    { value: 'grading', label: 'Cần chấm', count: courses?.filter((c) => c.toGrade).length ?? 0 },
    {
      value: 'open',
      label: 'Đang mở bài',
      count: courses?.filter((c) => c.openAssessments).length ?? 0,
    },
    ...(isAdmin
      ? [
          {
            value: 'unassigned' as const,
            label: 'Chưa phân công',
            count: courses?.filter((c) => !c.teacherName).length ?? 0,
          },
        ]
      : []),
  ];
  /** Đổi bộ lọc/sắp xếp thì bắt đầu lại từ trang đầu, như trang sinh viên. */
  const resetPage = () => setVisibleCount(COURSE_PAGE);

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Khóa học"
        description={
          isAdmin
            ? 'Mọi khóa học trong hệ thống: tạo khóa học và phân công giảng viên phụ trách.'
            : 'Khóa học được phân công cho bạn: nội dung, sinh viên, bài kiểm tra.'
        }
      >
        {canAssign && (
          <button className="button primary" onClick={() => setCreating(true)}>
            <Icon name="plus" size={13} />
            Tạo khóa học
          </button>
        )}
      </AdminHeading>

      <div className="tabs" aria-label="Lọc khóa học">
        {filters.map((item) => (
          <button
            key={item.value}
            className={filter === item.value ? 'selected' : ''}
            aria-pressed={filter === item.value}
            onClick={() => {
              setFilter(item.value);
              resetPage();
            }}
          >
            {item.label}
            <span className="count">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="toolbar">
        <label className="search-field">
          <Icon name="search" size={14} />
          <span className="sr-only">Tìm khóa học</span>
          <input
            className="input"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            placeholder={
              isAdmin ? 'Tìm theo mã, tên khóa học, giảng viên' : 'Tìm theo mã, tên khóa học'
            }
            maxLength={64}
          />
        </label>
        <div className="toolbar-right">
          <select
            className="select"
            aria-label="Sắp xếp khóa học"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as TeacherCourseSort);
              resetPage();
            }}
          >
            <option value="recent">Mới tạo</option>
            <option value="name">Tên A–Z</option>
            <option value="code">Mã học phần</option>
            <option value="grading">Nhiều bài chờ chấm</option>
          </select>
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      {error ? (
        <div className="empty-state" role="alert">
          <h3>Chưa tải được khóa học</h3>
          <p>{error}</p>
        </div>
      ) : !courses ? (
        <div className={TILE_GRID} aria-label="Đang tải khóa học" aria-busy="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div className={TILE_SKELETON} key={index} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>{courses.length ? 'Không có khóa học phù hợp' : 'Chưa có khóa học nào'}</h3>
          <p>
            {courses.length
              ? 'Thử từ khóa khác hoặc chọn tab "Tất cả".'
              : canAssign
                ? 'Bấm "Tạo khóa học" để tạo và phân công giảng viên phụ trách.'
                : 'Bạn chưa được phân công khóa học nào. Liên hệ quản trị viên.'}
          </p>
          {courses.length > 0 && (
            <button
              className="button"
              onClick={() => {
                setSearch('');
                setFilter('all');
                resetPage();
              }}
            >
              Xem tất cả khóa học
            </button>
          )}
        </div>
      ) : (
        <div className={TILE_GRID} data-view={view} aria-label="Danh sách khóa học">
          {filtered.slice(0, visibleCount).map((course) => (
            <TeacherCourseCard key={course.id} course={course} showTeacher={isAdmin} />
          ))}
        </div>
      )}

      {courses && filtered.length > 0 && (
        <div className={RESULTS_FOOTER}>
          <span className="min-w-30" aria-live="polite">
            {Math.min(visibleCount, filtered.length)} / {filtered.length} khóa học
          </span>
          {visibleCount < filtered.length && (
            <button
              className="button max-md:order-3 max-md:w-full"
              onClick={() => setVisibleCount((count) => count + COURSE_PAGE)}
            >
              Xem thêm
            </button>
          )}
        </div>
      )}
      {creating && <CreateCourseDialog onClose={() => setCreating(false)} />}
    </main>
  );
}

/** Việc cần làm: bài có bài nộp chưa chấm, bài hết hạn sớm nhất trước. */
function GradingPanel({
  tasks,
  more,
  className = '',
}: {
  tasks: GradingTask[];
  more: number;
  className?: string;
}) {
  return (
    <Card
      title="Cần chấm"
      info="Bài có bài nộp chưa chấm, bài đóng sớm nhất trước."
      delay={120}
      className={className}
    >
      {tasks.length ? (
        <ul className="m-0 list-none p-0 space-y-4">
          {tasks.map((task, index) => (
            <li key={task.assessmentId}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold tracking-wide text-ink-subtle uppercase">
                    {task.courseCode} · {ASSESSMENT_TYPES[task.type]}
                  </span>
                  <Link
                    href={gradingHref(task.courseId, task.assessmentId)}
                    className="block truncate text-sm font-semibold text-ink transition-colors hover:text-primary-600"
                  >
                    {task.title}
                  </Link>
                </div>
                <span className="badge warn shrink-0">{task.pending} chờ chấm</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar
                  value={percent(task.submitted, task.students)}
                  color="var(--color-chart-rose)"
                  delay={200 + index * 60}
                  className="flex-1"
                />
                <small className="shrink-0 text-xs text-ink-subtle tabular-nums">
                  nộp {task.submitted}/{task.students}
                </small>
              </div>
              <small className="mt-1 block text-xs text-ink-subtle">
                {task.closesAt ? `Đóng ${formatDateTime(task.closesAt)}` : 'Không hạn'}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyHint>Không còn bài nộp nào chờ chấm.</EmptyHint>
      )}
      {more > 0 && <p className="mt-4 text-xs text-ink-subtle">và {more} bài khác</p>}
    </Card>
  );
}

/** Bài đang mở (sắp hết hạn trước) và bài sẽ mở trong 14 ngày tới. */
function SchedulePanel({
  items,
  more,
  now,
  className = '',
}: {
  items: ScheduleItem[];
  more: number;
  now: number;
  className?: string;
}) {
  return (
    <Card
      title="Lịch bài"
      info="Bài đang mở (sắp đóng trước) và bài sẽ mở trong 14 ngày tới."
      delay={180}
      className={className}
    >
      {items.length ? (
        <ul className="-mx-5 -mb-5 list-none p-0">
          {items.map((item) => {
            const open = item.kind === 'open';
            const at = open ? item.closesAt : item.opensAt;
            const left = at ? Date.parse(at) - now : null;
            const urgent = open && left !== null && left < URGENT_MS;
            return (
              <li
                key={item.assessmentId}
                className="flex items-center gap-3 border-t border-line px-5 py-3 transition-colors first:border-t-0 hover:bg-surface-muted"
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-md ${
                    open ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600'
                  }`}
                >
                  <Icon name={open ? 'clock' : 'calendar'} size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <Link
                    href={
                      open
                        ? gradingHref(item.courseId, item.assessmentId)
                        : courseHref(item.courseId, ASSESSMENT_TAB_PARAM[item.type])
                    }
                    className="block truncate text-sm font-semibold text-ink transition-colors hover:text-primary-600"
                  >
                    {item.title}
                  </Link>
                  <small
                    className={`block truncate text-xs ${urgent ? 'font-semibold text-rose-600' : 'text-ink-subtle'}`}
                  >
                    {item.courseCode} · {ASSESSMENT_TYPES[item.type]} ·{' '}
                    {open
                      ? `${left !== null ? `còn ${formatRelative(left)}` : 'không hạn'} · nộp ${item.submitted}/${item.students}`
                      : `mở sau ${formatRelative(left ?? 0)} · ${formatDateTime(at)}`}
                  </small>
                </div>
                <span className={`badge shrink-0 ${open ? 'ok' : 'muted'}`}>
                  {open ? 'Đang mở' : 'Sắp mở'}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyHint>Không có bài nào đang mở hoặc sắp mở trong 14 ngày tới.</EmptyHint>
      )}
      {more > 0 && <p className="mt-6 text-xs text-ink-subtle">và {more} bài khác</p>}
    </Card>
  );
}

/** Tạo xong thì mở luôn trang quản lý khóa học để thêm nội dung. */
function CreateCourseDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [group, setGroup] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState<CourseFormat>(1);
  const [teacherId, setTeacherId] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const course = await apiRequest<CourseInfo>('/teacher/courses', {
        method: 'POST',
        body: {
          code: code.trim(),
          group: group.trim(),
          title: title.trim(),
          description: description.trim(),
          format,
          teacherId,
        },
      });
      router.push(`${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tạo được khóa học.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Tạo khóa học" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-row">
          <label className="form-field">
            Mã học phần
            <input
              className="input"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="INT1340"
              maxLength={32}
              required
              autoFocus
            />
          </label>
          <GroupField value={group} onChange={setGroup} />
        </div>
        <label className="form-field">
          Tên khóa học
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Lập trình mạng"
            maxLength={200}
            required
          />
        </label>
        <label className="form-field">
          Định dạng
          <select
            className="select"
            value={format}
            onChange={(event) => setFormat(Number(event.target.value) as CourseFormat)}
          >
            {Object.entries(COURSE_FORMATS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>
            Mô tả <span className="optional">(không bắt buộc)</span>
          </span>
          <textarea
            className="input"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
          />
        </label>
        <TeacherSelect value={teacherId} onChange={setTeacherId} />
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="button primary" disabled={busy || !teacherId}>
            {busy ? 'Đang tạo…' : 'Tạo khóa học'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
