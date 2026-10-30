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
      className="mb-5 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 shadow-xs transition-all dark:border-amber-400/25 dark:from-amber-400/10"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300">
          <Icon name="pin" size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-semibold tracking-wide text-amber-700 uppercase dark:bg-amber-400/25 dark:text-amber-200">
              <Icon name="pin" size={10} />
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
