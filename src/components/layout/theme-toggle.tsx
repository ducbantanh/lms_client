'use client';

import { useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/icon';

const THEME_KEY = 'lms.theme';

function subscribeTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'class') {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('storage', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

const noopSubscribe = () => () => {};

export function ThemeToggle({ className = '' }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const dark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerSnapshot,
  );

  function toggle() {
    const nextDark = !dark;
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
