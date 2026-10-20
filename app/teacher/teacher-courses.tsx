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
  COURSE_FORMATS,
  type CourseFormat,
  type CourseInfo,
  type TeacherCourse,
} from '@/lib/teaching';
import { AdminHeading } from '@/components/admin-ui';
import { Icon } from '@/components/icon';
import { Modal } from '@/components/modal';
import { StatCard } from '@/components/stat-card';

/** Trang /teacher/: khóa học mình phụ trách (admin thấy mọi khóa học) và tạo khóa học mới. */
export function TeacherCourses() {
  const { user } = useSession();
  const isAdmin = user?.role === 0;
  const [courses, setCourses] = useState<TeacherCourse[] | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const needle = normalizeSearch(useDeferredValue(search));

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<TeacherCourse[]>('/teacher/courses', { signal: controller.signal })
      .then(setCourses)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được khóa học.');
      });
    return () => controller.abort();
  }, []);

  const shown = (courses ?? []).filter((course) =>
    normalizeSearch(`${course.code} ${course.title} ${course.teacherName ?? ''}`).includes(needle),
  );
  const students = courses?.reduce((sum, course) => sum + course.studentCount, 0);

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Khóa học giảng dạy"
        description={
          isAdmin
            ? 'Mọi khóa học trong hệ thống: nội dung, sinh viên và bài kiểm tra.'
            : 'Khóa học bạn phụ trách: nội dung, sinh viên và bài kiểm tra.'
        }
      >
        <button className="button primary" onClick={() => setCreating(true)}>
          <Icon name="plus" size={13} />
          Tạo khóa học
        </button>
      </AdminHeading>
      <div className="stats">
        <StatCard label="Khóa học" value={courses?.length} icon="book" tone="blue" />
        <StatCard label="Lượt ghi danh" value={students} icon="users" tone="violet" />
      </div>
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
                <th className="hide-sm">Định dạng</th>
                <th className="numeric">Sinh viên</th>
                <th className="hide-sm">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {!courses ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    {error ? 'Chưa tải được danh sách.' : 'Đang tải…'}
                  </td>
                </tr>
              ) : shown.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    {courses.length ? 'Không có khóa học phù hợp.' : 'Chưa có khóa học nào.'}
                  </td>
                </tr>
              ) : (
                shown.map((course) => (
                  <tr key={course.id}>
                    <td className="mono">{course.code}</td>
                    <td>
                      <Link
                        className="table-link"
                        href={`${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}`}
                      >
                        {course.title}
                      </Link>
                    </td>
                    {isAdmin && <td className="hide-sm">{course.teacherName ?? '—'}</td>}
                    <td className="hide-sm">{COURSE_FORMATS[course.format]}</td>
                    <td className="numeric">{course.studentCount}</td>
                    <td className="hide-sm">{formatDateTime(course.createdAt)}</td>
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
