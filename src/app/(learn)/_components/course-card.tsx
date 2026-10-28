'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Icon } from '@/components/ui/icon';
import {
  TILE,
  TILE_BODY,
  TILE_CODE,
  TILE_COVER,
  TILE_FOOTER,
  TILE_FOOTER_VALUE,
  TILE_HEADING,
  TILE_LINE,
  TILE_MENU_BUTTON,
  TILE_META,
  TILE_TITLE,
} from '@/components/ui/tile';

interface Props {
  course: Course;
  starred: boolean;
  hidden: boolean;
  onStar: () => void;
  onHide: () => void;
}

/** Cùng một component cho grid/list (lưới đặt data-view), logic hành động giữ nguyên. */
export function CourseCard({ course, starred, hidden, onStar, onHide }: Props) {
  const href = `/course/?id=${encodeURIComponent(course.id)}`;
  return (
    <article className={`${TILE} ${hidden ? 'opacity-60' : ''} group/card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift`}>
      <Link
        href={href}
        className={`${TILE_COVER} cover-${course.cover}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className={TILE_BODY}>
        <div className={TILE_META}>
          <span className={TILE_CODE}>
            {course.code}
            {starred && <Icon name="starFilled" size={11} className="text-[#d99a1e]" />}
          </span>
          <details className="dropdown">
            <summary className={TILE_MENU_BUTTON} aria-label={`Tùy chọn ${course.title}`}>
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
        <Link href={href} className={TILE_TITLE}>
          <h2 className={TILE_HEADING}>{course.title}</h2>
        </Link>
        {course.subtitle && <p className={TILE_LINE}>{course.subtitle}</p>}
        <p className={`${TILE_LINE} mt-1.5`}>{course.teacher || 'Chưa có thông tin giảng viên'}</p>
        <div className={TILE_FOOTER}>
          <span>{course.semesterLabel}</span>
          {course.status === 'completed' ? (
            <b className={`${TILE_FOOTER_VALUE} text-emerald-700`}>Đã hoàn thành</b>
          ) : (
            course.progress !== null && <b className={`${TILE_FOOTER_VALUE} bg-blue-50 text-primary-600 px-2 py-0.5 rounded-full ring-1 ring-blue-600/20`}>{course.progress}%</b>
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
