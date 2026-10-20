'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDeferredValue, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import { normalizeSearch } from '@/lib/course-utils';
import { useSession } from '@/lib/session-provider';
import {
  ASSESSMENT_TAB_PARAM,
  ASSESSMENT_TYPES,
  COURSE_FORMATS,
  formatRelative,
  type CourseFormat,
  type CourseInfo,
  type GradingTask,
  type ScheduleItem,
  type TeacherOverview,
} from '@/lib/teaching';
import { AdminHeading } from '@/components/admin-ui';
import { Icon } from '@/components/icon';
import { Modal } from '@/components/modal';
import { StatCard } from '@/components/stat-card';

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
      {data && (
        <div className="columns even">
          <GradingPanel tasks={data.toGrade} more={data.toGradeMore} />
          <SchedulePanel items={data.schedule} more={data.scheduleMore} now={now} />
        </div>
      )}
    </main>
  );
}

/**
 * Trang /teacher/courses/: khóa học mình phụ trách (admin thấy mọi khóa học) kèm tiến độ lớp,
 * số bài chờ chấm, bài đang mở; tạo khóa học mới.
 */
export function TeacherCourseList() {
  const { user } = useSession();
  const isAdmin = user?.role === 0;
  const { data, error } = useTeacherOverview();
  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const needle = normalizeSearch(useDeferredValue(search));
  const courses = data?.courses;
  const shown = (courses ?? []).filter((course) =>
    normalizeSearch(`${course.code} ${course.title} ${course.teacherName ?? ''}`).includes(needle),
  );

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Khóa học"
        description={
          isAdmin
            ? 'Mọi khóa học trong hệ thống.'
            : 'Khóa học bạn phụ trách: nội dung, sinh viên, bài kiểm tra.'
        }
      >
        <button className="button primary" onClick={() => setCreating(true)}>
          <Icon name="plus" size={13} />
          Tạo khóa học
        </button>
      </AdminHeading>
      <section className="panel">
        <div className="toolbar">
          <label className="search-field">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm theo mã, tên khóa học</span>
            <input
              className="input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã hoặc tên khóa học…"
              maxLength={64}
            />
          </label>
        </div>
        {error && (
          <div className="notice" role="alert">
            {error}
          </div>
        )}
        <div className="table-responsive">
          <table className="table admin-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên khóa học</th>
                {isAdmin && <th className="hide-sm">Giảng viên</th>}
                <th className="numeric">Sinh viên</th>
                <th>Tiến độ TB</th>
                <th className="numeric">Chờ chấm</th>
                <th className="numeric hide-sm">Đang mở</th>
              </tr>
            </thead>
            <tbody>
              {!courses ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    {error ? 'Chưa tải được danh sách.' : 'Đang tải…'}
                  </td>
                </tr>
              ) : shown.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    {courses.length ? 'Không có khóa học phù hợp.' : 'Chưa có khóa học nào.'}
                  </td>
                </tr>
              ) : (
                shown.map((course) => (
                  <tr key={course.id}>
                    <td className="mono">{course.code}</td>
                    <td>
                      <Link className="table-link" href={courseHref(course.id)}>
                        {course.title}
                      </Link>
                      <small className="table-sub">{COURSE_FORMATS[course.format]}</small>
                    </td>
                    {isAdmin && <td className="hide-sm">{course.teacherName ?? '—'}</td>}
                    <td className="numeric">{course.studentCount}</td>
                    <td className="progress-cell">
                      {course.averageProgress !== null ? (
                        <span title="Trung bình tiến độ của sinh viên trong lớp">
                          <b>{course.averageProgress}%</b>
                          <span
                            className="progress-track"
                            role="progressbar"
                            aria-label={`Tiến độ trung bình ${course.code}`}
                            aria-valuenow={course.averageProgress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <span style={{ width: `${course.averageProgress}%` }} />
                          </span>
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="numeric">
                      {course.toGrade ? <span className="badge warn">{course.toGrade}</span> : '—'}
                    </td>
                    <td className="numeric hide-sm">{course.openAssessments || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const course = await apiRequest<CourseInfo>('/teacher/courses', {
        method: 'POST',
        body: { code: code.trim(), title: title.trim(), description: description.trim(), format },
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
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="button primary" disabled={busy}>
            {busy ? 'Đang tạo…' : 'Tạo khóa học'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
