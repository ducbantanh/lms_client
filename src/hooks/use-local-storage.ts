'use client';

import { useCallback, useSyncExternalStore } from 'react';

/** Hook đang đọc storage; sự kiện 'storage' của trình duyệt chỉ báo thay đổi từ tab khác. */
const listeners = new Set<() => void>();
/** Dự phòng khi trình duyệt chặn storage: lựa chọn vẫn giữ được tới khi tải lại trang. */
const memory = new Map<string, string>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function read(key: string) {
  if (memory.has(key)) return memory.get(key)!;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Xóa giá trị của `key` (về null) từ ngoài component, vd. khi đăng nhập lại. */
export function removeLocalStorage(key: string) {
  memory.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {
    /* Storage bị chặn: chỉ còn bản trong bộ nhớ, đã xóa ở trên. */
  }
  listeners.forEach((listener) => listener());
}

/**
 * Chuỗi lưu trong localStorage theo `key` (null = chưa có), dùng chung cho mọi tùy chọn giao diện.
 * Lúc export tĩnh và lần hydrate đầu luôn là null nên HTML không lệch; sau đó React tự đọc giá trị thật.
 * Không lưu credential hay CSRF ở đây.
 */
export function useLocalStorage(key: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  const setValue = useCallback(
    (next: string | ((previous: string | null) => string)) => {
      const text = typeof next === 'function' ? next(read(key)) : next;
      try {
        localStorage.setItem(key, text);
        memory.delete(key);
      } catch {
        memory.set(key, text);
      }
      listeners.forEach((listener) => listener());
    },
    [key],
  );
  return [value, setValue] as const;
}
