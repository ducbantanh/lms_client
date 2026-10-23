/** Tài nguyên pdf.js chép vào public/vendor/pdfjs (scripts/copy-pdf-worker.mjs), dùng chung khi xem và đọc PDF. */
export const PDFJS_VENDOR = '/vendor/pdfjs/';

/** Nạp pdf.js lúc chạy trên trình duyệt: thư viện cần DOM, không chạy được lúc export tĩnh. */
export async function loadPdfjs() {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS_VENDOR}pdf.worker.min.js`;
  return pdfjs;
}

/** Tham số getDocument để đọc được font CJK, font chuẩn, ảnh JPX và hồ sơ màu. */
export const PDFJS_ASSETS = {
  cMapUrl: `${PDFJS_VENDOR}cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `${PDFJS_VENDOR}standard_fonts/`,
  wasmUrl: `${PDFJS_VENDOR}wasm/`,
  iccUrl: `${PDFJS_VENDOR}iccs/`,
};
