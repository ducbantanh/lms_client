/**
 * FILE 2/4 — SERVER TRUNG GIAN CHO BẢN PREVIEW
 *
 * Browser gọi localhost:3100:
 *   / hoặc /fonts/... → static.js đọc file giao diện.
 *   /api/...          → chuyển HTTP request tới backend, trả kết quả về browser.
 *   /ws               → nối WebSocket giữa browser và backend.
 *
 * Server này không đăng nhập thay người dùng và không truy cập database.
 * Spring Boot vẫn quyết định session, quyền và dữ liệu nghiệp vụ.
 */
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serveStatic } from './static.js';

// 1. CẤU HÌNH — có thể đổi qua biến môi trường PowerShell.
const backendUrl = new URL(process.env.API_TARGET || 'http://127.0.0.1:8080');
const listenHost = process.env.HOST || '127.0.0.1';
const listenPort = Number(process.env.PORT || 8090);
const httpTimeoutMs = 30_000;
const websocketHandshakeTimeoutMs = 10_000;

// preview.mjs truyền đường dẫn out/ vào đây; chạy server.js riêng thì mặc định public/.
const staticDirectory = process.env.CLIENT_STATIC_ROOT
  ? path.resolve(process.env.CLIENT_STATIC_ROOT)
  : fileURLToPath(new URL('../public/', import.meta.url));

/** API_TARGET chỉ được là origin, ví dụ http://127.0.0.1:8080, không kèm /api hoặc mật khẩu. */
function validateBackendUrl() {
  const usesHttp = ['http:', 'https:'].includes(backendUrl.protocol);
  const hasCredentials = Boolean(backendUrl.username || backendUrl.password);
  const hasExtraPath = backendUrl.pathname !== '/' || backendUrl.search || backendUrl.hash;

  if (!usesHttp || hasCredentials || hasExtraPath) {
    throw new Error('API_TARGET must be an HTTP(S) origin without credentials or path');
  }
}
validateBackendUrl();

// Chọn thư viện HTTP hay HTTPS theo địa chỉ backend, không theo URL của browser.
const backendTransport = backendUrl.protocol === 'https:' ? https : http;

// 2. CÁC HÀM DÙNG CHUNG CHO HTTP VÀ WEBSOCKET.

/** Từ chối request có Origin của website khác trước khi chuyển tiếp tới backend. */
function isAllowedOrigin(browserRequest) {
  const requestOrigin = browserRequest.headers.origin;
  const previewOrigin = `http://${browserRequest.headers.host}`;
  return !requestOrigin || requestOrigin === previewOrigin;
}

/**
 * Giữ cookie/CSRF và các header cần thiết, đổi Host/Origin sang địa chỉ backend.
 * Chỉ gọi hàm này sau khi isAllowedOrigin() đã chấp nhận request.
 */
function createBackendHeaders(browserRequest) {
  const forwardedHeaders = { ...browserRequest.headers, host: backendUrl.host };
  if (forwardedHeaders.origin) {
    forwardedHeaders.origin = backendUrl.origin;
  }
  return forwardedHeaders;
}

/** Backend không trả lời: gửi lỗi theo cùng envelope mà API client đang hiểu. */
function sendGatewayError(browserResponse) {
  if (browserResponse.headersSent) {
    // Header đã gửi rồi thì không thể đổi sang HTTP 502; đóng kết nối đang dở.
    browserResponse.destroy();
    return;
  }

  browserResponse.writeHead(502, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  browserResponse.end(JSON.stringify({ success: false, error: { code: 'NETWORK_ERROR' } }));
}

// 3. HTTP — browser → gateway → backend → gateway → browser.

/** Chuyển nguyên phương thức, URL, cookie và body; không tự xử lý nghiệp vụ. */
function forwardApiRequest(browserRequest, browserResponse) {
  const backendRequest = backendTransport.request(
    backendUrl,
    {
      path: browserRequest.url,
      method: browserRequest.method,
      headers: createBackendHeaders(browserRequest),
    },
    (backendResponse) => {
      // Trả nguyên status/header, bao gồm Set-Cookie khi backend tạo hoặc xóa phiên.
      browserResponse.writeHead(backendResponse.statusCode, {
        ...backendResponse.headers,
        'cache-control': 'no-store',
      });
      backendResponse.pipe(browserResponse);
      backendResponse.on('error', () => browserResponse.destroy());
    },
  );

  // pipe() chuyển dữ liệu từng phần; gateway không phải giữ toàn bộ body trong RAM.
  browserRequest.pipe(backendRequest);
  backendRequest.setTimeout(httpTimeoutMs, () => {
    backendRequest.destroy(new Error('Upstream timeout'));
  });
  backendRequest.on('error', () => sendGatewayError(browserResponse));

  // Khi browser hủy request hoặc ngắt kết nối, dừng request tương ứng tới backend.
  browserRequest.on('aborted', () => backendRequest.destroy());
  browserResponse.on('close', () => {
    if (!browserResponse.writableEnded) {
      backendRequest.destroy();
    }
  });
}

/** Phân biệt yêu cầu lấy file và yêu cầu gọi API. */
function handleHttpRequest(browserRequest, browserResponse) {
  if (!browserRequest.url.startsWith('/api/')) {
    return serveStatic(browserRequest, browserResponse, staticDirectory);
  }

  if (!isAllowedOrigin(browserRequest)) {
    browserResponse.writeHead(403);
    browserResponse.end();
    return;
  }
  forwardApiRequest(browserRequest, browserResponse);
}

// 4. WEBSOCKET — giữ kết nối hai chiều sau khi backend chấp nhận đăng nhập.

/** rawHeaders có dạng [tên, giá trị, tên, giá trị]; chuyển thành các dòng HTTP. */
function formatHandshakeHeaders(rawHeaders) {
  const headerLines = [];
  for (let index = 0; index < rawHeaders.length; index += 2) {
    const headerName = rawHeaders[index];
    const headerValue = rawHeaders[index + 1];
    headerLines.push(`${headerName}: ${headerValue}`);
  }
  return headerLines.join('\r\n');
}

/** Nối dữ liệu theo cả hai hướng và đóng đầu còn lại khi một bên lỗi hoặc rời đi. */
function connectSockets(browserSocket, backendSocket) {
  browserSocket.pipe(backendSocket);
  backendSocket.pipe(browserSocket);
  browserSocket.on('error', () => backendSocket.destroy());
  backendSocket.on('error', () => browserSocket.destroy());
  browserSocket.on('close', () => backendSocket.destroy());
  backendSocket.on('close', () => browserSocket.destroy());
}

/**
 * upgrade là yêu cầu chuyển HTTP sang WebSocket.
 * browserHead chứa phần dữ liệu đầu tiên có thể đã tới sau header HTTP.
 */
function handleWebSocketUpgrade(browserRequest, browserSocket, browserHead) {
  if (browserRequest.url !== '/ws' || !isAllowedOrigin(browserRequest)) {
    browserSocket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
    return;
  }

  const backendRequest = backendTransport.request(backendUrl, {
    path: '/ws',
    headers: createBackendHeaders(browserRequest),
  });
  backendRequest.setTimeout(websocketHandshakeTimeoutMs, () => backendRequest.destroy());

  backendRequest.on('upgrade', (backendResponse, backendSocket, backendHead) => {
    // Handshake thành công: không áp timeout HTTP cho kết nối realtime lâu dài.
    backendRequest.setTimeout(0);
    backendSocket.setTimeout(0);

    const handshakeHeaders = formatHandshakeHeaders(backendResponse.rawHeaders);
    browserSocket.write(`HTTP/1.1 101 Switching Protocols\r\n${handshakeHeaders}\r\n\r\n`);

    // Chuyển cả phần dữ liệu đã nhận sớm, tránh làm mất frame đầu tiên.
    if (backendHead.length > 0) {
      browserSocket.write(backendHead);
    }
    if (browserHead.length > 0) {
      backendSocket.write(browserHead);
    }
    connectSockets(browserSocket, backendSocket);
  });

  backendRequest.on('response', (backendResponse) => {
    // Backend trả HTTP thường (ví dụ 401) thay vì đồng ý mở WebSocket.
    browserSocket.end(
      `HTTP/1.1 ${backendResponse.statusCode} Rejected\r\nConnection: close\r\n\r\n`,
    );
    backendResponse.resume(); // Đọc bỏ body để giải phóng luồng phản hồi.
  });
  backendRequest.on('error', () => browserSocket.destroy());
  browserSocket.on('error', () => backendRequest.destroy());
  backendRequest.end(); // Handshake không có body, gửi xong header là kết thúc request.
}

// 5. KHỞI ĐỘNG — đăng ký handler trước, sau đó mới mở cổng lắng nghe.
const server = http.createServer(handleHttpRequest);
server.on('upgrade', handleWebSocketUpgrade);
server.listen(listenPort, listenHost, () => {
  // Dùng cổng thực tế vì khi test PORT=0, hệ điều hành tự chọn một cổng còn trống.
  const actualPort = server.address().port;
  console.log(`LMS Client: http://127.0.0.1:${actualPort} -> ${backendUrl.origin}`);
});
