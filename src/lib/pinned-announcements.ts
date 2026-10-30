import { useEffect, useState, useCallback } from 'react';

export interface PinnedAnnouncement {
  id: string;
  courseId: string;
  title: string;
  body?: string | null;
  type?: 'exam' | 'assignment' | 'lesson' | 'general';
  link?: string;
  createdAt: string;
  teacherName?: string | null;
}

const STORAGE_PREFIX = 'lms.pinned_announcement.';
const DISMISSED_PREFIX = 'lms.pinned_dismissed.';
const EVENT_NAME = 'lms:pinned_announcement_updated';

export function getPinnedAnnouncement(courseId: string): PinnedAnnouncement | null {
  if (typeof window === 'undefined' || !courseId) return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${courseId}`);
    if (!raw) return null;
    return JSON.parse(raw) as PinnedAnnouncement;
  } catch {
    return null;
  }
}

export function setPinnedAnnouncement(
  courseId: string,
  data: {
    title: string;
    body?: string | null;
    type?: 'exam' | 'assignment' | 'lesson' | 'general';
    link?: string;
    teacherName?: string | null;
  },
): PinnedAnnouncement {
  const item: PinnedAnnouncement = {
    id: `pin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    courseId,
    title: data.title,
    body: data.body ?? null,
    type: data.type ?? 'general',
    link: data.link,
    createdAt: new Date().toISOString(),
    teacherName: data.teacherName ?? undefined,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${courseId}`, JSON.stringify(item));
      // Xoa trang thai da dong cua thong bao cu de sinh vien nhin thay thong bao moi
      localStorage.removeItem(`${DISMISSED_PREFIX}${courseId}`);
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { courseId, item } }));
    } catch {
      // Bo qua loi quota
    }
  }

  return item;
}

export function removePinnedAnnouncement(courseId: string): void {
  if (typeof window === 'undefined' || !courseId) return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${courseId}`);
    localStorage.removeItem(`${DISMISSED_PREFIX}${courseId}`);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { courseId, item: null } }));
  } catch {
    // Bo qua
  }
}

export function dismissPinnedAnnouncement(courseId: string, announcementId: string): void {
  if (typeof window === 'undefined' || !courseId) return;
  try {
    localStorage.setItem(`${DISMISSED_PREFIX}${courseId}`, announcementId);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { courseId } }));
  } catch {
    // Bo qua
  }
}

export function isPinnedDismissed(courseId: string, announcementId: string): boolean {
  if (typeof window === 'undefined' || !courseId || !announcementId) return false;
  try {
    return localStorage.getItem(`${DISMISSED_PREFIX}${courseId}`) === announcementId;
  } catch {
    return false;
  }
}

/** Hook dung tren trang hoc sinh va giao vien */
export function usePinnedAnnouncement(courseId: string) {
  const [announcement, setAnnouncement] = useState<PinnedAnnouncement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const refresh = useCallback(() => {
    if (!courseId) {
      setAnnouncement(null);
      setDismissed(false);
      return;
    }
    const item = getPinnedAnnouncement(courseId);
    setAnnouncement(item);
    setDismissed(item ? isPinnedDismissed(courseId, item.id) : false);
  }, [courseId]);

  useEffect(() => {
    const initTimer = setTimeout(refresh, 0);

    const onCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (!detail || detail.courseId === courseId) {
        refresh();
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === `${STORAGE_PREFIX}${courseId}` ||
        e.key === `${DISMISSED_PREFIX}${courseId}`
      ) {
        refresh();
      }
    };

    window.addEventListener(EVENT_NAME, onCustomEvent);
    window.addEventListener('storage', onStorage);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener(EVENT_NAME, onCustomEvent);
      window.removeEventListener('storage', onStorage);
    };
  }, [courseId, refresh]);

  const dismiss = useCallback(() => {
    if (announcement) {
      dismissPinnedAnnouncement(courseId, announcement.id);
      setDismissed(true);
    }
  }, [courseId, announcement]);

  const unpin = useCallback(() => {
    removePinnedAnnouncement(courseId);
  }, [courseId]);

  return {
    announcement: dismissed ? null : announcement,
    rawAnnouncement: announcement,
    isDismissed: dismissed,
    dismiss,
    unpin,
    refresh,
  };
}

