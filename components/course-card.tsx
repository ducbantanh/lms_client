'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Icon } from './icon';

interface Props {
  course: Course;
  starred: boolean;
  hidden: boolean;
  onStar: () => void;
  onHide: () => void;
}

/** Cùng một component cho grid/list; CSS bố trí lại, logic hành động giữ nguyên. */
export function CourseCard({ course, starred, hidden, onStar, onHide }: Props) {
  const href = `/course/?id=${encodeURIComponent(course.id)}`;
  return (
    <article className={`course-card ${hidden ? 'is-hidden' : ''}`}>
      <Link
        href={href}
        className={`course-cover cover-${course.cover}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="course-body">
        <div className="course-meta">
          <span className="course-code">
            {course.code}
            {starred && <Icon name="starFilled" size={11} className="star-mark" />}
          </span>
          <details className="dropdown course-options">
            <summary className="icon-button" aria-label={`Tùy chọn ${course.title}`}>
              <Icon name="more" size={15} />
            </summary>
            <div className="dropdown-panel">
              <button
                onClick={(event) => {
                  onStar();
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }}
              >
                {starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
              </button>
              <button
                onClick={(event) => {
                  onHide();
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }}
              >
                {hidden ? 'Hiện lại khóa học' : 'Ẩn khỏi danh sách'}
              </button>
            </div>
          </details>
        </div>
        <Link href={href} className="course-title">
          <h2>{course.title}</h2>
        </Link>
        {course.subtitle && <p className="course-subtitle">{course.subtitle}</p>}
        <p className="course-teacher">{course.teacher || 'Chưa có thông tin giảng viên'}</p>
        <div className="course-footer">
          <span>{course.semesterLabel}</span>
          {course.status === 'completed' ? (
            <b className="is-done">Đã hoàn thành</b>
          ) : (
            course.progress !== null && <b>{course.progress}%</b>
          )}
        </div>
        {course.progress !== null && (
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`Tiến độ ${course.title}`}
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>
    </article>
  );
}
