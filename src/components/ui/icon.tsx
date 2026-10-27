import type { CSSProperties } from 'react';

/** Font Awesome 5 được lưu local, đúng bộ icon đi cùng AdminLTE 3. */
const icons = {
  search: 'fas fa-search',
  grid: 'fas fa-th-large',
  list: 'fas fa-list',
  starFilled: 'fas fa-star',
  chevron: 'fas fa-chevron-right',
  down: 'fas fa-chevron-down',
  up: 'fas fa-chevron-up',
  download: 'fas fa-download',
  history: 'fas fa-history',
  settings: 'fas fa-cog',
  more: 'fas fa-ellipsis-h',
  eye: 'far fa-eye',
  hidden: 'far fa-eye-slash',
  close: 'fas fa-times',
  menu: 'fas fa-bars',
  dashboard: 'fas fa-th-large',
  users: 'fas fa-users',
  upload: 'fas fa-file-import',
  back: 'fas fa-arrow-left',
  arrowRight: 'fas fa-arrow-right',
  signal: 'fas fa-signal',
  cap: 'fas fa-graduation-cap',
  lock: 'fas fa-lock',
  unlock: 'fas fa-lock-open',
  logout: 'fas fa-sign-out-alt',
  trash: 'far fa-trash-alt',
  book: 'fas fa-book-open',
  clock: 'far fa-clock',
  check: 'fas fa-check',
  shield: 'fas fa-user-shield',
  file: 'far fa-file-alt',
  info: 'fas fa-info',
  plus: 'fas fa-plus',
  minus: 'fas fa-minus',
  bell: 'far fa-bell',
  collapse: 'fas fa-outdent',
  expand: 'fas fa-indent',
  send: 'far fa-paper-plane',
  edit: 'far fa-edit',
  key: 'fas fa-key',
  copy: 'far fa-copy',
  userPlus: 'fas fa-user-plus',
  userMinus: 'fas fa-user-minus',
  calendar: 'far fa-calendar-alt',
  layers: 'fas fa-layer-group',
  exam: 'fas fa-file-signature',
  teach: 'fas fa-chalkboard-teacher',
  join: 'fas fa-sign-in-alt',
  filePdf: 'far fa-file-pdf',
  fileWord: 'far fa-file-word',
  filePpt: 'far fa-file-powerpoint',
  fileZip: 'far fa-file-archive',
  qrcode: 'fas fa-qrcode',
  bank: 'fas fa-database',
  code: 'fas fa-code',
  profile: 'far fa-id-card',
  mail: 'far fa-envelope',
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
