'use client';

import Link from 'next/link';
import { useSession } from '@/providers/session-provider';
import { useCourses } from '@/hooks/use-courses';
import { initials } from '@/lib/course-utils';
import { courseHref } from '@/lib/teaching';
import { Icon } from '@/components/ui/icon';
import { StatCard } from '@/components/ui/stat-card';
import { UpcomingPanel } from '@/components/schedule/upcoming-panel';

export function StudentDashboard() {
  const { user } = useSession();
  const { courses, loading, error } = useCourses();
  const current = courses.filter((course) => course.status === 'current');
  const completed = courses.filter((course) => course.status === 'completed');
  // Giảng viên lấy từ chính danh sách khóa học, kèm số khóa người học đang theo cùng giảng viên đó.
  const teachers = [
    ...courses
      .filter((course) => course.teacher)
      .reduce(
        (map, course) => map.set(course.teacher, (map.get(course.teacher) ?? 0) + 1),
        new Map<string, number>(),
      ),
  ];

  return (
    <main id="main-content" className="shell-main">
      <div className="page-heading">
        <div>
          <h1>Xin chào, {user?.fullName.split(' ').at(-1)}</h1>
          <p>Tổng quan việc học của bạn.</p>
        </div>
      </div>
      {loading ? (
        <p className="empty-state" role="status">
          Đang tải thông tin học tập…
        </p>
      ) : error ? (
        <div className="notice" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="stats">
            <StatCard
              label="Tổng khóa học"
              value={courses.length}
              icon="book"
              tone="blue"
              href="/"
            />
            <StatCard label="Đang học" value={current.length} icon="clock" tone="violet" href="/" />
            <StatCard
              label="Đã hoàn thành"
              value={completed.length}
              icon="check"
              tone="green"
              href="/"
            />
          </div>
          <UpcomingPanel href="/schedule/" />
          <div className="columns">
            <section className="panel flush">
              <div className="panel-title">
                <h2>Khóa học đang học</h2>
              </div>
              {current.length ? (
                current.slice(0, 5).map((course) => (
                  // Có bài tiếp theo thì mở thẳng bài đó
                  <Link
                    className="list-row"
                    href={courseHref(course.id, course.nextLesson?.id)}
                    key={course.id}
                  >
                    <span className={`course-swatch cover-${course.cover}`}>
                      {initials(course.title)}
                    </span>
                    <span className="list-row-text">
                      <b>{course.title}</b>
                      <small>
                        {course.nextLesson ? `Tiếp theo: ${course.nextLesson.title}` : course.code}
                      </small>
                    </span>
                    <span className="list-row-meta hide-sm">
                      {course.teacher || 'Chưa có giảng viên'}
                    </span>
                    <span className="list-row-end">
                      {course.progress !== null ? `${course.progress}%` : course.semesterLabel}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="empty-cell">Chưa có khóa học đang diễn ra.</p>
              )}
              {current.length > 0 && (
                <Link href="/" className="panel-footer-link">
                  Xem tất cả
                  <Icon name="chevron" size={9} />
                </Link>
              )}
            </section>
            <section className="panel flush">
              <div className="panel-title">
                <h2>Giảng viên của bạn</h2>
              </div>
              {teachers.length ? (
                teachers.map(([name, count]) => (
                  <div className="list-row" key={name}>
                    <span className="avatar">{initials(name)}</span>
                    <span className="list-row-text">
                      <b>{name}</b>
                      <small>{count} khóa học</small>
                    </span>
                  </div>
                ))
              ) : (
                <p className="empty-cell">Chưa có thông tin giảng viên.</p>
              )}
            </section>
          </div>
        </>
      )}
    </main>
  );
}
