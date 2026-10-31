'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH, hasPermission } from '@/lib/auth';
import { courseLabel, normalizeSearch } from '@/lib/course-utils';
import type { TeacherOverview } from '@/lib/teaching';
import type { User } from '@/lib/types';
import { Icon, type IconName } from '@/components/ui/icon';

export interface PaletteLink {
  href: string;
  label: string;
  icon: IconName;
}

interface Item extends PaletteLink {
  group: 'Trang' | 'Khóa học';
  hint?: string;
}

/** Khóa học để tìm nhanh: sinh viên lấy khóa đã ghi danh, giảng viên / admin lấy khóa mình quản lý. */
async function loadCourses(user: User, area: 'learn' | 'manage'): Promise<Item[]> {
  if (area === 'learn') {
    const data = await apiRequest<{
      courses: { id: string; code: string; group: string | null; title: string }[];
    }>('/student/dashboard');
    return data.courses.map((course) => ({
      group: 'Khóa học',
      href: `/course/?id=${encodeURIComponent(course.id)}`,
      label: course.title,
      hint: courseLabel(course.code, course.group),
      icon: 'book',
    }));
  }
  if (!hasPermission(user, 'courses.manage')) return [];
  const data = await apiRequest<TeacherOverview>('/teacher/overview');
  return data.courses.map((course) => ({
    group: 'Khóa học',
    href: `${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}`,
    label: course.title,
    hint: courseLabel(course.code, course.group),
    icon: 'book',
  }));
}

const noopSubscribe = () => () => {};

/** Ô tìm nhanh trên thanh trên cùng; Ctrl+K / ⌘K mở hộp tìm trang và khóa học. */
export function CommandPalette({
  links,
  user,
  area,
}: {
  links: PaletteLink[];
  user: User | null;
  area: 'learn' | 'manage';
}) {
  const [open, setOpen] = useState(false);
  // Bản export tĩnh render sẵn "Ctrl"; trình duyệt Mac đổi thành ⌘ sau khi nạp
  const mac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-10 w-full max-w-sm items-center gap-2.5 rounded-xl border border-line/80 bg-surface/70 px-3.5 text-left text-sm text-ink-muted shadow-xs transition-all hover:border-primary-500/60 hover:bg-surface hover:shadow-sm md:flex"
      >
        <Icon name="search" size={13} />
        <span className="flex-1 truncate">Tìm trang, khóa học…</span>
        <kbd className="rounded-lg border border-line-strong/60 bg-surface-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-muted shadow-xs">
          {mac ? '⌘' : 'Ctrl'} K
        </kbd>
      </button>
      <button
        type="button"
        aria-label="Tìm nhanh"
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-surface-muted md:hidden"
      >
        <Icon name="search" size={15} />
      </button>
      {open && user && (
        <PaletteDialog links={links} user={user} area={area} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function PaletteDialog({
  links,
  user,
  area,
  onClose,
}: {
  links: PaletteLink[];
  user: User;
  area: 'learn' | 'manage';
  onClose: () => void;
}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [courses, setCourses] = useState<Item[] | null>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  useEffect(() => {
    let alive = true;
    loadCourses(user, area)
      .then((items) => alive && setCourses(items))
      .catch(() => alive && setCourses([]));
    return () => {
      alive = false;
    };
  }, [user, area]);

  const items = useMemo(() => {
    const needle = normalizeSearch(query);
    const pages: Item[] = links.map((link) => ({ ...link, group: 'Trang' }));
    return [...pages, ...(courses ?? [])].filter(
      (item) =>
        !needle ||
        normalizeSearch(item.label).includes(needle) ||
        normalizeSearch(item.hint ?? '').includes(needle),
    );
  }, [links, courses, query]);
  const current = Math.min(active, Math.max(0, items.length - 1));

  function go(item: Item | undefined) {
    if (!item) return;
    onClose();
    router.push(item.href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      setActive(next);
      list.current?.children[next]?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(items[current]);
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Tìm nhanh"
      onCancel={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto mt-[12vh] w-[min(580px,calc(100vw-32px))] max-w-none overflow-hidden rounded-2xl border border-line/80 bg-surface p-0 text-ink shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Icon name="search" size={14} className="text-ink-subtle" />
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Tìm trang, khóa học…"
          className="h-14 flex-1 appearance-none border-0 bg-transparent text-[15px] outline-none placeholder:text-ink-subtle"
        />
        <kbd className="rounded-lg border border-line-strong/60 bg-surface-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-muted shadow-xs">
          Esc
        </kbd>
      </div>
      <ul
        ref={list}
        className="scroll-thin m-0 max-h-[52vh] list-none overflow-y-auto p-1.5"
        role="listbox"
      >
        {items.map((item, index) => {
          const first = index === 0 || items[index - 1].group !== item.group;
          return (
            <li key={`${item.group}-${item.href}`} role="option" aria-selected={index === current}>
              {first && (
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-ink-subtle uppercase">
                  {item.group}
                </p>
              )}
              <button
                type="button"
                onMouseMove={() => setActive(index)}
                onClick={() => go(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all ${
                  index === current ? 'bg-primary-50 text-primary-700 font-semibold dark:bg-primary-950/60 dark:text-primary-300' : 'text-ink hover:bg-surface-muted'
                }`}
              >
                <span
                  className={`grid size-8.5 shrink-0 place-items-center rounded-xl transition-transform ${
                    index === current
                      ? 'bg-primary-600 text-white shadow-xs scale-105'
                      : 'bg-surface-muted text-ink-muted'
                  }`}
                >
                  <Icon name={item.icon} size={13} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{item.label}</span>
                  {item.hint && (
                    <span className="block truncate text-xs text-ink-subtle">{item.hint}</span>
                  )}
                </span>
                {index === current && <Icon name="chevron" size={10} />}
              </button>
            </li>
          );
        })}
        {!items.length && (
          <li className="px-3 py-8 text-center text-sm text-ink-subtle">
            {courses ? 'Không tìm thấy kết quả.' : 'Đang tải khóa học…'}
          </li>
        )}
      </ul>
    </dialog>
  );
}
