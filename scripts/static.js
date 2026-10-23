/**
 * FILE 3/4 — TRẢ FILE GIAO DIỆN CHO TRÌNH DUYỆT
 *
 * Ví dụ: GET /favicon.svg → đọc file trong thư mục giao diện → trả SVG.
 * Hàm serveStatic() được server.js gọi; file này không tự mở cổng mạng.
 */
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';

// Content-Type giúp browser hiểu dữ liệu nhận về là HTML, CSS, JavaScript hay font.
// .txt còn dùng cho dữ liệu điều hướng RSC của Next.js static export.
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  // pdf.js nạp bộ giải mã ảnh scan bằng WebAssembly.instantiateStreaming, cần đúng MIME này
  '.wasm': 'application/wasm',
};

/** Chỉ cho đọc file nằm trong thư mục giao diện, không cho truy cập source/.env bên ngoài. */
function isInsideDirectory(directoryPath, filePath) {
  const isDirectoryItself = filePath === directoryPath;
  const isChildPath = filePath.startsWith(directoryPath + path.sep);
  return isDirectoryItself || isChildPath;
}

/** Bỏ query string và giải mã URL, ví dụ /course/?id=abc → /course/. */
function getRequestPath(requestUrl) {
  const pathWithoutQuery = requestUrl.split('?')[0];
  const decodedPath = decodeURIComponent(pathWithoutQuery);
  const hasBackslash = decodedPath.includes('\\');
  const hasNullCharacter = decodedPath.includes('\0');
  const hasHiddenOrParentPart = decodedPath.split('/').some((part) => part.startsWith('.'));

  // Chặn dấu phân cách Windows, ký tự null và các đoạn như .env, .. trước khi đọc ổ đĩa.
  if (hasBackslash || hasNullCharacter || hasHiddenOrParentPart) {
    throw new Error('Invalid path');
  }
  return decodedPath;
}

/**
 * request: yêu cầu browser gửi lên. response: đối tượng dùng để trả dữ liệu về browser.
 * staticDirectory: thư mục được phép phục vụ, thường là out/ khi chạy preview.
 */
export async function serveStatic(request, response, staticDirectory) {
  // GET lấy nội dung file; HEAD chỉ lấy header (loại file, dung lượng...), không lấy nội dung.
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  try {
    const requestPath = getRequestPath(request.url);
    const allowedDirectory = await realpath(staticDirectory);

    // Dấu chấm biến /login/ thành ./login/, giữ đường dẫn nằm dưới allowedDirectory.
    let requestedFile = path.resolve(allowedDirectory, '.' + requestPath);
    if (!isInsideDirectory(allowedDirectory, requestedFile)) {
      throw new Error('Outside public');
    }

    const fileInfo = await stat(requestedFile);
    if (fileInfo.isDirectory()) {
      // Chuẩn hóa /login thành /login/ rồi dùng file index.html trong thư mục đó.
      if (!requestPath.endsWith('/')) {
        response.writeHead(308, { Location: encodeURI(requestPath + '/') });
        response.end();
        return;
      }
      requestedFile = path.join(requestedFile, 'index.html');
    }

    // realpath theo đường dẫn thực, tránh symlink trỏ từ out/ ra file bên ngoài.
    requestedFile = await realpath(requestedFile);
    if (!isInsideDirectory(allowedDirectory, requestedFile)) {
      throw new Error('Outside public');
    }

    const fileContent = await readFile(requestedFile);
    const extension = path.extname(requestedFile);
    const contentType = CONTENT_TYPES[extension] || 'application/octet-stream';

    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': fileContent.length,
      'Cache-Control': 'no-store', // Khi phát triển, tải lại trang sẽ lấy bản mới.
      'X-Content-Type-Options': 'nosniff', // Browser dùng đúng loại file server khai báo.
    });

    if (request.method === 'HEAD') {
      response.end();
    } else {
      response.end(fileContent);
    }
  } catch {
    // Không trả đường dẫn ổ đĩa hoặc thông tin lỗi nội bộ ra trình duyệt.
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}
