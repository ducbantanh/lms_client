'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/icon';

const THEME_KEY = 'lms.theme';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  function toggle() {
    const nextDark = !dark;
    setDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem(THEME_KEY, 'dark');
      } catch {
        // Safe fallback if storage blocked
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem(THEME_KEY, 'light');
      } catch {
        // Safe fallback
      }
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className={`icon-button size-8 text-ink-muted ${className}`}
        aria-label="Đổi giao diện sáng/tối"
        disabled
      >
        <span className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`icon-button size-8 rounded-lg text-ink-muted transition-all hover:bg-surface-muted hover:text-ink active:scale-95 ${className}`}
      aria-label={dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
    >
      <Icon
        name={dark ? 'sun' : 'moon'}
        size={15}
        className={`transition-transform duration-200 ${dark ? 'text-amber-400 rotate-0' : 'text-slate-600 -rotate-12'}`}
      />
    </button>
  );
}
