/**
 * FILE 1/4 — CHẠY BẢN FRONTEND ĐÃ BUILD
 *
 * Lệnh: npm run preview
 * Luồng: kiểm tra out/index.html → đặt cấu hình → chạy server.js.
 * File này không build giao diện và không xử lý API.
 */
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// import.meta.url là địa chỉ file hiện tại; ../out/ là thư mục do Next.js build ra.
// Cách này không phụ thuộc terminal đang đứng ở thư mục nào.
const exportedWebsiteDirectory = fileURLToPath(new URL('../out/', import.meta.url));
const exportedHomePage = new URL('../out/index.html', import.meta.url);
const defaultPreviewPort = '3100';

/** Báo lỗi dễ hiểu nếu người dùng chưa chạy npm run build. */
async function checkBuildExists() {
  try {
    await access(exportedHomePage);
  } catch {
    console.error('Chưa có bản export. Hãy chạy npm run build trước.');
    process.exit(1);
  }
}

// Bước 1: phải có HTML đã build trước khi mở server.
await checkBuildExists();

// Bước 2: truyền cấu hình cho server.js qua biến môi trường.
process.env.CLIENT_STATIC_ROOT = exportedWebsiteDirectory;
if (!process.env.PORT) {
  process.env.PORT = defaultPreviewPort;
}

// Bước 3: import sau khi đặt cấu hình để server.js đọc được các giá trị ở trên.
await import('./server.js');
