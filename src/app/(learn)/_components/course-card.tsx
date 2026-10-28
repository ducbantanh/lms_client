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
    <article className={`${TILE} ${hidden ? 'opacity-60' : ''}`}>
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
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onStar}
              className={`icon-button size-7 transition hover:scale-110 ${
                starred ? 'text-amber-500 hover:text-amber-600' : 'text-ink-subtle hover:text-amber-500'
              }`}
              aria-label={starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
              title={starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
            >
              <Icon name="starFilled" size={13} />
            </button>
            <details className="dropdown">
              <summary className={TILE_MENU_BUTTON} aria-label={`Tùy chọn ${course.title}`}>
                <Icon name="more" size={14} />
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
        </div>
        <Link href={href} className={TILE_TITLE}>
          <h2 className={TILE_HEADING}>{course.title}</h2>
        </Link>
        {course.subtitle && <p className={TILE_LINE}>{course.subtitle}</p>}
        <p className={`${TILE_LINE} mt-1 text-ink-muted`}>
          <Icon name="teach" size={12} className="mr-1 inline text-ink-subtle" />
          {course.teacher || 'Chưa có thông tin giảng viên'}
        </p>

        {course.nextLesson && (
          <div className="mt-3">
            <Link
              href={`/course/lesson/?courseId=${encodeURIComponent(course.id)}&lessonId=${encodeURIComponent(course.nextLesson.id)}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 bg-primary-50/60 px-2.5 py-1 text-xs font-medium text-primary-700 transition hover:bg-primary-100/80"
            >
              <span className="text-[10px]">▶</span>
              <span className="max-w-[190px] truncate">{course.nextLesson.title}</span>
            </Link>
          </div>
        )}

        <div className={TILE_FOOTER}>
          <span className="text-xs text-ink-subtle">{course.semesterLabel}</span>
          {course.status === 'completed' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <Icon name="check" size={10} />
              Hoàn thành
            </span>
          ) : (
            course.progress !== null && (
              <b className={TILE_FOOTER_VALUE}>{course.progress}%</b>
            )
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
