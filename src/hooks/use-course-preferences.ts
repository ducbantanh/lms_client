'use client';

import { useMemo } from 'react';
import type { ViewMode } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';

interface Preferences {
  starred: string[];
  hidden: string[];
  view: ViewMode;
}
const EMPTY: Preferences = { starred: [], hidden: [], view: 'grid' };

/** Đọc JSON đã lưu; dữ liệu hỏng hoặc sai kiểu thì dùng giá trị mặc định. */
function parse(text: string | null): Preferences {
  try {
    const saved = JSON.parse(text ?? 'null');
    if (!saved) return EMPTY;
    return {
      starred: Array.isArray(saved.starred)
        ? saved.starred.filter((id: unknown) => typeof id === 'string')
        : [],
      hidden: Array.isArray(saved.hidden)
        ? saved.hidden.filter((id: unknown) => typeof id === 'string')
        : [],
      view: saved.view === 'list' ? 'list' : 'grid',
    };
  } catch {
    return EMPTY;
  }
}

/** Lưu tùy chọn trình bày theo user; tuyệt đối không lưu credential hay CSRF. */
export function useCoursePreferences(userId: string) {
  const [saved, save] = useLocalStorage(`lms.ui.courses.${userId}`);
  const preferences = useMemo(() => parse(saved), [saved]);

  function update(change: (previous: Preferences) => Preferences) {
    save((previous) => JSON.stringify(change(parse(previous))));
  }

  function toggle(collection: 'starred' | 'hidden', id: string) {
    update((previous) => ({
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
    setView: (view: ViewMode) => update((previous) => ({ ...previous, view })),
  };
}
