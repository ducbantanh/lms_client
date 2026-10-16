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
    <article className={`card course-card ${hidden ? 'is-hidden' : ''}`}>
      <Link
        href={href}
        className={`course-cover cover-${course.cover}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="cover-pattern" />
        <span className="cover-label">
          FIT <span>/</span> LEARNING
        </span>
        <span className="cover-ornament" />
      </Link>
      <button
        className={`favorite-button ${starred ? 'is-starred' : ''}`}
        onClick={onStar}
        aria-label={`${starred ? 'Bỏ yêu thích' : 'Yêu thích'} ${course.title}`}
        aria-pressed={starred}
        title={starred ? 'Bỏ yêu thích' : 'Yêu thích'}
      >
        <Icon name="star" size={17} />
      </button>
      <div className="card-body course-card-content">
        <div className="course-meta">
          <span className="course-code">{course.code}</span>
          <details className="dropdown course-options">
            <summary className="icon-button" aria-label={`Tùy chọn ${course.title}`}>
              <Icon name="more" size={19} />
            </summary>
            <div className="dropdown-menu dropdown-panel">
              <button
                onClick={(event) => {
                  onStar();
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }}
              >
                <Icon name="star" size={16} />
                {starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
              </button>
              <button
                onClick={(event) => {
                  onHide();
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }}
              >
                <Icon name={hidden ? 'eye' : 'hidden'} size={16} />
                {hidden ? 'Hiện lại khóa học' : 'Ẩn khỏi tổng quan'}
              </button>
            </div>
          </details>
        </div>
        <Link href={href} className="course-title">
          <h2>{course.title}</h2>
          <p>{course.subtitle || 'Khóa học của bạn'}</p>
        </Link>
        <p className="course-teacher">
          <Icon name="user" size={13} />
          {course.teacher || 'Chưa có thông tin giảng viên'}
        </p>
        <div className="course-semester">
          <Icon name="calendar" size={14} />
          <span>{course.semesterLabel}</span>
        </div>
        <div className="course-progress-heading">
          <span>
            {course.status === 'completed' ? (
              <>
                <Icon name="check" size={13} />
                Đã hoàn thành
              </>
            ) : (
              'Tiến độ học tập'
            )}
          </span>
          <b>{course.progress === null ? '—' : `${course.progress}%`}</b>
        </div>
        <div
          className="progress progress-track"
          role={course.progress === null ? undefined : 'progressbar'}
          aria-label={`Tiến độ ${course.title}`}
          aria-valuenow={course.progress ?? undefined}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="progress-bar" style={{ width: `${course.progress ?? 0}%` }} />
        </div>
      </div>
    </article>
  );
}
