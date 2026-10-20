'use client';

import { useEffect } from 'react';

/** Đóng mọi dropdown <details> khi click ra ngoài hoặc nhấn Escape; mount một lần ở root layout. */
export function DropdownDismiss() {
  useEffect(() => {
    function dismiss(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      document.querySelectorAll<HTMLDetailsElement>('details.dropdown[open]').forEach((element) => {
        if (event instanceof KeyboardEvent || !element.contains(event.target as Node))
          element.open = false;
      });
    }
    document.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('click', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);
  return null;
}
