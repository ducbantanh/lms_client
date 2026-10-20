'use client';

import { useEffect, useState } from 'react';
import type { ViewMode } from '@/lib/types';

/**
 * Kiểu hiển thị lưới/danh sách nhớ trong localStorage theo `key` (đã gồm id user).
 * Như useCoursePreferences: chỉ đọc storage sau mount, storage bị chặn thì vẫn chạy bằng state.
 */
export function useViewMode(key: string, fallback: ViewMode = 'list') {
  const [view, setView] = useState<ViewMode>(fallback);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(key);
    } catch {
      /* Storage có thể bị chặn. */
    }
    setView(saved === 'grid' || saved === 'list' ? saved : fallback);
    setLoadedKey(key);
  }, [key, fallback]);

  // Chỉ ghi khi đã đọc đúng key, tránh ghi đè lựa chọn cũ lúc vừa mount hoặc đổi tài khoản
  useEffect(() => {
    if (loadedKey !== key) return;
    try {
      localStorage.setItem(key, view);
    } catch {
      /* Không bắt buộc storage. */
    }
  }, [key, loadedKey, view]);

  return [view, setView] as const;
}
