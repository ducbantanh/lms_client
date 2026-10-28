/**
 * Class của thẻ khóa học / ngân hàng câu hỏi (sinh viên, giảng viên dùng chung một khung): dải màu bìa theo mã
 * môn, mã, tên, dòng phụ, chân thẻ. Dạng danh sách: đặt data-view="list" trên lưới, thẻ tự nằm ngang.
 * Phong cách Modern UI: bo góc lớn rounded-2xl, đổ bóng đa tầng shadow-card / shadow-lift, hiệu ứng hover nhấc nhẹ.
 */
export const TILE_GRID =
  'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 data-[view=list]:grid-cols-1 data-[view=list]:gap-3';

export const TILE =
  'relative flex min-w-0 flex-col rounded-2xl border border-line/80 bg-white/95 backdrop-blur-xs shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift in-data-[view=list]:flex-row in-data-[view=list]:hover:-translate-y-0 in-data-[view=list]:hover:translate-x-1';

/** Dải màu bìa: màu lấy từ lớp cover-* (ui.css) qua biến --cover. */
export const TILE_COVER =
  'block h-24 rounded-t-2xl bg-(--cover) bg-linear-135 from-white/20 via-white/5 to-black/10 max-md:h-16 in-data-[view=list]:h-auto! in-data-[view=list]:w-2.5 in-data-[view=list]:shrink-0 in-data-[view=list]:rounded-l-2xl in-data-[view=list]:rounded-tr-none';

export const TILE_BODY = 'flex min-w-0 flex-1 flex-col px-4.5 pt-3.5 pb-4';
export const TILE_META = '-mr-1 flex items-center justify-between gap-2';
export const TILE_CODE =
  'flex items-center gap-1.5 text-xs font-semibold tracking-[0.02em] text-ink-subtle';
/** Link bao tiêu đề (h2 dùng TILE_HEADING): rê chuột vào link thì tiêu đề đổi màu. */
export const TILE_TITLE = 'group/title';
export const TILE_HEADING =
  'line-clamp-2 text-base leading-[1.35] font-semibold transition-colors group-hover/title:text-primary-600';
export const TILE_LINE = 'mt-1 truncate text-[13px] text-ink-muted';
export const TILE_FOOTER = 'mt-auto flex justify-between gap-2 pt-4 text-xs text-ink-subtle border-t border-line/60';
export const TILE_FOOTER_VALUE = 'font-semibold text-ink-muted tabular-nums';
/** Nút "..." mở menu của thẻ. */
export const TILE_MENU_BUTTON = 'icon-button size-7.5 rounded-lg';
export const TILE_SKELETON = 'skeleton h-55 rounded-2xl';

/** Dòng dưới lưới: đếm số thẻ, nút Xem thêm, link phụ. */
export const RESULTS_FOOTER =
  'mt-6 flex items-center justify-between gap-3 text-[13px] text-ink-muted max-md:flex-wrap';
