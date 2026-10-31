'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Icon } from '@/components/ui/icon';
import { initials } from '@/lib/course-utils';
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
      >
        {course.semesterLabel && (
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-white/95 border border-white/20 shadow-xs max-md:hidden">
            {course.semesterLabel}
          </span>
        )}
      </Link>
      <div className={TILE_BODY}>
        <div className={TILE_META}>
          <span className={TILE_CODE}>
            {course.code}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onStar}
              className={`icon-button size-7.5 rounded-lg transition hover:scale-110 ${
                starred ? 'text-amber-500 hover:text-amber-600' : 'text-ink-subtle hover:text-amber-500'
              }`}
              aria-label={starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
              title={starred ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
            >
              <Icon name="starFilled" size={14} />
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
        
        <div className="mt-2.5 flex items-center gap-2">
          {course.teacher ? (
            <>
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-600 ring-1 ring-primary-200/80 dark:bg-primary-950/60 dark:text-primary-300 dark:ring-primary-800/80">
                {initials(course.teacher)}
              </span>
              <span className="truncate text-xs font-medium text-ink-muted">
                {course.teacher}
              </span>
            </>
          ) : (
            <span className="truncate text-xs text-ink-subtle">
              Chưa có thông tin giảng viên
            </span>
          )}
        </div>

        {course.nextLesson && (
          <div className="mt-3">
            <Link
              href={`/course/lesson/?courseId=${encodeURIComponent(course.id)}&lessonId=${encodeURIComponent(course.nextLesson.id)}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200/80 bg-primary-50/70 px-2.5 py-1 text-xs font-semibold text-primary-700 transition hover:bg-primary-100/90 hover:shadow-xs dark:bg-primary-950/40 dark:border-primary-800/50 dark:text-primary-300"
            >
              <span className="text-[10px] text-primary-600 dark:text-primary-400">▶</span>
              <span className="max-w-[190px] truncate">{course.nextLesson.title}</span>
            </Link>
          </div>
        )}

        <div className={TILE_FOOTER}>
          <span className="text-xs font-medium text-ink-subtle">{course.semesterLabel}</span>
          {course.status === 'completed' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40">
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
