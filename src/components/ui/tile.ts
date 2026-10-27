/**
 * Class của thẻ khóa học / ngân hàng câu hỏi (sinh viên, giảng viên dùng chung một khung): dải màu bìa theo mã
 * môn, mã, tên, dòng phụ, chân thẻ. Dạng danh sách: đặt data-view="list" trên lưới, thẻ tự nằm ngang.
 */
export const TILE_GRID =
  'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 data-[view=list]:grid-cols-1 data-[view=list]:gap-3';

export const TILE =
  'relative flex min-w-0 flex-col rounded-lg border border-line bg-white shadow-card transition hover:border-line-strong hover:shadow-[0_4px_14px_rgb(16_24_40/0.06)] in-data-[view=list]:flex-row';

/** Dải màu bìa: màu lấy từ lớp cover-* (ui.css) qua biến --cover. */
export const TILE_COVER =
  'block h-22 rounded-t-[7px] bg-(--cover) bg-linear-135 from-white/15 to-transparent to-60% max-md:h-14 in-data-[view=list]:h-auto! in-data-[view=list]:w-1.5 in-data-[view=list]:shrink-0 in-data-[view=list]:rounded-l-[7px] in-data-[view=list]:rounded-tr-none';

export const TILE_BODY = 'flex min-w-0 flex-1 flex-col px-4 pt-3 pb-4';
export const TILE_META = '-mr-2 flex items-center justify-between gap-2';
export const TILE_CODE =
  'flex items-center gap-1.5 text-xs font-semibold tracking-[0.02em] text-ink-subtle';
/** Link bao tiêu đề (h2 dùng TILE_HEADING): rê chuột vào link thì tiêu đề đổi màu. */
export const TILE_TITLE = 'group/title';
export const TILE_HEADING =
  'line-clamp-2 text-base leading-[1.35] transition-colors group-hover/title:text-primary-600';
export const TILE_LINE = 'mt-0.5 truncate text-[13px] text-ink-muted';
export const TILE_FOOTER = 'mt-auto flex justify-between gap-2 pt-4 text-xs text-ink-subtle';
export const TILE_FOOTER_VALUE = 'font-semibold text-ink-muted tabular-nums';
/** Nút "..." mở menu của thẻ. */
export const TILE_MENU_BUTTON = 'icon-button size-7';
export const TILE_SKELETON = 'skeleton h-55 rounded-lg';

/** Dòng dưới lưới: đếm số thẻ, nút Xem thêm, link phụ. */
export const RESULTS_FOOTER =
  'mt-6 flex items-center justify-between gap-3 text-[13px] text-ink-muted max-md:flex-wrap';
