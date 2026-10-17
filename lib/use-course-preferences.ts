'use client';

import { useEffect, useState } from 'react';
import type { ViewMode } from '@/lib/types';

interface Preferences {
  starred: string[];
  hidden: string[];
  view: ViewMode;
}
const EMPTY: Preferences = { starred: [], hidden: [], view: 'grid' };

/** Lưu tùy chọn trình bày theo user; tuyệt đối không lưu credential hay CSRF. */
export function useCoursePreferences(userId: string) {
  const key = `lms.ui.courses.${userId}`;
  const [preferences, setPreferences] = useState<Preferences>(EMPTY);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  // Effect chỉ đọc storage sau mount để HTML export và lần render đầu không khác nhau.
  useEffect(() => {
    let next = EMPTY;
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
      if (saved)
        next = {
          starred: Array.isArray(saved.starred)
            ? saved.starred.filter((id: unknown) => typeof id === 'string')
            : [],
          hidden: Array.isArray(saved.hidden)
            ? saved.hidden.filter((id: unknown) => typeof id === 'string')
            : [],
          view: saved.view === 'list' ? 'list' : 'grid',
        };
    } catch {
      /* Storage có thể bị chặn; giao diện vẫn hoạt động bằng state. */
    }
    setPreferences(next);
    setLoadedKey(key);
  }, [key]);

  // Chỉ ghi khi đã đọc đúng user, tránh đè tùy chọn cũ hoặc ghi nhầm khi chuyển tài khoản.
  useEffect(() => {
    if (loadedKey !== key) return;
    try {
      localStorage.setItem(key, JSON.stringify(preferences));
    } catch {
      /* Không bắt buộc storage. */
    }
  }, [key, loadedKey, preferences]);

  function toggle(collection: 'starred' | 'hidden', id: string) {
    setPreferences((previous) => ({
      ...previous,
      [collection]: previous[collection].includes(id)
        ? previous[collection].filter((value) => value !== id)
        : [...previous[collection], id],
    }));
  }

  return {
    ...preferences,
    toggleStar: (id: string) => toggle('starred', id),
    toggleHidden: (id: string) => toggle('hidden', id),
    setView: (view: ViewMode) => setPreferences((previous) => ({ ...previous, view })),
  };
}
