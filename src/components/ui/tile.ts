/**
 * Class của thẻ khóa học / ngân hàng câu hỏi (sinh viên, giảng viên dùng chung một khung): dải màu bìa theo mã
 * môn, mã, tên, dòng phụ, chân thẻ. Dạng danh sách: đặt data-view="list" trên lưới, thẻ tự nằm ngang.
 */
export const TILE_GRID =
  'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 data-[view=list]:grid-cols-1 data-[view=list]:gap-3.5';

export const TILE =
  'group relative flex min-w-0 flex-col rounded-2xl border border-line/80 bg-surface shadow-card transition-all duration-250 hover:-translate-y-1.5 hover:border-primary-400/60 hover:shadow-lift in-data-[view=list]:flex-row in-data-[view=list]:hover:-translate-y-0 in-data-[view=list]:hover:translate-x-1.5 dark:hover:border-primary-500/50';

/** Dải màu bìa: kết hợp --cover-gradient từ ui.css với hiệu ứng phủ ánh sáng mềm */
export const TILE_COVER =
  'relative block h-28 overflow-hidden rounded-t-[15px] bg-(--cover) [background:var(--cover-gradient,var(--cover))] max-md:h-20 in-data-[view=list]:h-auto! in-data-[view=list]:w-2.5 in-data-[view=list]:shrink-0 in-data-[view=list]:rounded-l-[15px] in-data-[view=list]:rounded-tr-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4),transparent_65%)] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.18))]';

export const TILE_BODY = 'flex min-w-0 flex-1 flex-col p-5 pt-3.5';
export const TILE_META = '-mr-1.5 flex items-center justify-between gap-2';
export const TILE_CODE =
  'flex items-center gap-1.5 text-xs font-bold tracking-wider text-ink-subtle uppercase';
/** Link bao tiêu đề (h2 dùng TILE_HEADING): rê chuột vào link thì tiêu đề đổi màu. */
export const TILE_TITLE = 'group/title mt-1.5';
export const TILE_HEADING =
  'line-clamp-2 text-base font-bold leading-snug tracking-tight text-ink transition-colors group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400';
export const TILE_LINE = 'mt-1 truncate text-[13px] text-ink-muted';
export const TILE_FOOTER = 'mt-auto flex justify-between items-center gap-2 pt-4 text-xs text-ink-subtle';
export const TILE_FOOTER_VALUE = 'font-bold text-ink-muted tabular-nums';
/** Nút "..." mở menu của thẻ. */
export const TILE_MENU_BUTTON = 'icon-button size-8 rounded-lg';
export const TILE_SKELETON = 'skeleton h-60 rounded-2xl';

/** Dòng dưới lưới: đếm số thẻ, nút Xem thêm, link phụ. */
export const RESULTS_FOOTER =
  'mt-8 flex items-center justify-between gap-3 text-[13px] text-ink-muted max-md:flex-wrap';
