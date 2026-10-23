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
import { AdminHeading } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { StatCard } from '@/components/ui/stat-card';
import { TeacherSelect } from '@/components/teacher-select';
import { TeacherCourseCard } from './teacher-course-card';
import { ViewToggle } from '@/components/ui/view-toggle';

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

/** Trang /teacher/: việc cần làm (bài chờ chấm) và lịch bài đang/sắp mở của các khóa mình phụ trách. */
export function TeacherOverviewView() {
  const { user } = useSession();
  const { data, error } = useTeacherOverview();
  // Cập nhật "còn bao lâu" mỗi phút
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const firstName = user?.fullName.split(' ').at(-1);

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title={firstName ? `Xin chào, ${firstName}` : 'Tổng quan'}
        description="Bài chờ chấm và lịch bài của các khóa học bạn phụ trách."
      />
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
      {data && (
        <div className="columns even">
          <GradingPanel tasks={data.toGrade} more={data.toGradeMore} />
          <SchedulePanel items={data.schedule} more={data.scheduleMore} now={now} />
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
        <div className="course-grid" aria-label="Đang tải khóa học" aria-busy="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="course-skeleton" key={index} />
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
        <div
          className={`course-grid ${view === 'list' ? 'is-list' : ''}`}
          aria-label="Danh sách khóa học"
        >
          {filtered.slice(0, visibleCount).map((course) => (
            <TeacherCourseCard key={course.id} course={course} showTeacher={isAdmin} />
          ))}
        </div>
      )}

      {courses && filtered.length > 0 && (
        <div className="results-footer">
          <span aria-live="polite">
            {Math.min(visibleCount, filtered.length)} / {filtered.length} khóa học
          </span>
          {visibleCount < filtered.length && (
            <button
              className="button"
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
function GradingPanel({ tasks, more }: { tasks: GradingTask[]; more: number }) {
  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon red">
            <Icon name="check" size={11} />
          </i>
          Cần chấm
        </h2>
      </div>
      {tasks.length ? (
        <ul className="upcoming-list">
          {tasks.map((task) => (
            <li key={task.assessmentId}>
              <span className="upcoming-type">
                {task.courseCode} · {ASSESSMENT_TYPES[task.type]}
              </span>
              <Link href={gradingHref(task.courseId, task.assessmentId)}>{task.title}</Link>
              <small>
                {task.closesAt ? `Đóng ${formatDateTime(task.closesAt)}` : 'Không hạn'} · đã nộp{' '}
                {task.submitted}/{task.students}
              </small>
              <span className="badge warn">{task.pending} chờ chấm</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cell">Không còn bài nộp nào chờ chấm.</p>
      )}
      {more > 0 && <p className="panel-more">và {more} bài khác</p>}
    </section>
  );
}

/** Bài đang mở (sắp hết hạn trước) và bài sẽ mở trong 14 ngày tới. */
function SchedulePanel({ items, more, now }: { items: ScheduleItem[]; more: number; now: number }) {
  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="calendar" size={11} />
          </i>
          Lịch bài
        </h2>
      </div>
      {items.length ? (
        <ul className="upcoming-list">
          {items.map((item) => {
            const open = item.kind === 'open';
            const at = open ? item.closesAt : item.opensAt;
            const left = at ? Date.parse(at) - now : null;
            const urgent = open && left !== null && left < URGENT_MS;
            return (
              <li key={item.assessmentId} className={urgent ? 'urgent' : ''}>
                <span className="upcoming-type">
                  {item.courseCode} · {ASSESSMENT_TYPES[item.type]}
                </span>
                <Link
                  href={
                    open
                      ? gradingHref(item.courseId, item.assessmentId)
                      : courseHref(item.courseId, ASSESSMENT_TAB_PARAM[item.type])
                  }
                >
                  {item.title}
                </Link>
                <small>
                  {open
                    ? `${left !== null ? `Còn ${formatRelative(left)}` : 'Không hạn'} · đã nộp ${item.submitted}/${item.students}`
                    : `Mở sau ${formatRelative(left ?? 0)} · ${formatDateTime(at)}`}
                </small>
                <span className={`badge ${open ? 'ok' : 'muted'}`}>
                  {open ? 'Đang mở' : 'Sắp mở'}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty-cell">Không có bài nào đang mở hoặc sắp mở trong 14 ngày tới.</p>
      )}
      {more > 0 && <p className="panel-more">và {more} bài khác</p>}
    </section>
  );
}

/** Tạo xong thì mở luôn trang quản lý khóa học để thêm nội dung. */
function CreateCourseDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [code, setCode] = useState('');
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
