'use client';

import type { ViewMode } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';

/** Kiểu hiển thị lưới/danh sách nhớ trong localStorage theo `key` (đã gồm id user). */
export function useViewMode(key: string, fallback: ViewMode = 'list') {
  const [saved, save] = useLocalStorage(key);
  const view: ViewMode = saved === 'grid' || saved === 'list' ? saved : fallback;
  return [view, save as (view: ViewMode) => void] as const;
}
