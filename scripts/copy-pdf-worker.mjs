/**
 * CHÉP WORKER VÀ DỮ LIỆU CỦA PDF.JS VÀO public/vendor/pdfjs/
 *
 * npm tự chạy file này qua script "postinstall" sau npm install / npm ci.
 * Trang làm bài vẽ đề PDF bằng pdf.js; worker phải nằm cùng origin (LAN, không CDN)
 * và cùng phiên bản với pdfjs-dist đã cài, nên chép từ node_modules thay vì lưu sẵn trong Git.
 * Đổi đuôi .mjs → .js để mọi server tĩnh (gateway preview, Spring, nginx) trả đúng MIME JavaScript.
 * Kèm theo: cmaps + standard_fonts (PDF không nhúng font, ví dụ xuất từ Word), wasm (ảnh scan
 * JBIG2/JPEG 2000) và iccs (hồ sơ màu); thiếu chúng pdf.js vẫn chạy nhưng có thể vẽ sai chữ/ảnh.
 */
import { copyFile, cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const packageDirectory = fileURLToPath(new URL('../node_modules/pdfjs-dist/', import.meta.url));
const targetDirectory = fileURLToPath(new URL('../public/vendor/pdfjs/', import.meta.url));

await mkdir(targetDirectory, { recursive: true });
await copyFile(
  `${packageDirectory}build/pdf.worker.min.mjs`,
  `${targetDirectory}pdf.worker.min.js`,
);
for (const folder of ['cmaps', 'standard_fonts', 'wasm', 'iccs']) {
  await cp(`${packageDirectory}${folder}`, `${targetDirectory}${folder}`, { recursive: true });
}
console.log('pdf.js: copied worker and data to public/vendor/pdfjs/');
