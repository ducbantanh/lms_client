import type { CSSProperties } from 'react';

/** Font Awesome 5 được lưu local, đúng bộ icon đi cùng AdminLTE 3. */
const icons = {
  search: 'fas fa-search',
  grid: 'fas fa-th-large',
  list: 'fas fa-list',
  book: 'fas fa-book-open',
  star: 'far fa-star',
  bell: 'far fa-bell',
  chevron: 'fas fa-chevron-right',
  down: 'fas fa-chevron-down',
  arrow: 'fas fa-arrow-right',
  home: 'fas fa-home',
  dashboard: 'fas fa-tachometer-alt',
  calendar: 'far fa-calendar-alt',
  clock: 'far fa-clock',
  user: 'far fa-user',
  more: 'fas fa-ellipsis-h',
  eye: 'far fa-eye',
  hidden: 'far fa-eye-slash',
  check: 'fas fa-check',
  close: 'fas fa-times',
  menu: 'fas fa-bars',
  help: 'far fa-question-circle',
  logout: 'fas fa-sign-out-alt',
  lock: 'fas fa-lock',
  cap: 'fas fa-graduation-cap',
  file: 'far fa-file-alt',
  users: 'fas fa-users',
  shield: 'fas fa-user-shield',
  activity: 'fas fa-wave-square',
  audit: 'fas fa-clipboard-list',
  sync: 'fas fa-sync-alt',
  ban: 'fas fa-user-times',
  server: 'fas fa-server',
} as const;

export type IconName = keyof typeof icons;

/** Giữ API component cũ; các trang không cần biết tên class cụ thể của Font Awesome. */
export function Icon({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <i
      className={`${icons[name]} icon ${className}`}
      aria-hidden="true"
      style={{ fontSize: size, width: size, ...style }}
    />
  );
}
