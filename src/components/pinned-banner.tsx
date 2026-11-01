'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import type { PinnedAnnouncement } from '@/lib/pinned-announcements';

interface PinnedBannerProps {
  announcement: PinnedAnnouncement;
  onDismiss?: () => void;
  canUnpin?: boolean;
  onUnpin?: () => void;
}

export function PinnedBanner({
  announcement,
  onDismiss,
  canUnpin,
  onUnpin,
}: PinnedBannerProps) {
  return (
    <aside
      role="region"
      aria-label="Thông báo ghim của khóa học"
      className="mb-5 overflow-hidden rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-transparent p-4 shadow-xs transition-all dark:border-amber-800/60 dark:from-amber-950/40 dark:via-amber-950/20"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-amber-200/90 bg-amber-100 text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/70 dark:text-amber-300">
          <Icon name="pin" size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-amber-300/90 bg-amber-100 px-2.5 py-0.5 text-xs font-bold tracking-wider text-amber-950 uppercase dark:border-amber-800/80 dark:bg-amber-950/70 dark:text-amber-200">
              <Icon name="pin" size={11} className="text-amber-800 dark:text-amber-300" />
              Thông báo ghim
            </span>
            {announcement.teacherName && (
              <span className="text-xs text-ink-muted">
                Đăng bởi {announcement.teacherName}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-base font-semibold text-ink">
            {announcement.title}
          </h3>
          {announcement.body && (
            <p className="mt-1 text-sm text-ink-muted whitespace-pre-wrap">
              {announcement.body}
            </p>
          )}
          {announcement.link && (
            <div className="mt-2.5">
              <Link
                href={announcement.link}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
              >
                Xem chi tiết
                <Icon name="arrowRight" size={12} />
              </Link>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {canUnpin && onUnpin && (
            <button
              type="button"
              onClick={onUnpin}
              className="button subtle text-xs"
              title="Bỏ ghim thông báo này"
              aria-label="Bỏ ghim thông báo này"
            >
              Bỏ ghim
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink transition-colors"
              title="Đóng thông báo này"
              aria-label="Đóng thông báo này"
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
