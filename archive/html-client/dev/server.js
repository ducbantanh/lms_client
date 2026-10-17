// Dev gateway: public assets + same-origin HTTP/WS proxy tới Spring Boot.
import http from 'node:http';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { serveStatic } from './static.js';

const target = new URL(process.env.API_TARGET || 'http://127.0.0.1:8080');
if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password || target.pathname !== '/' || target.search || target.hash) {
  throw new Error('API_TARGET must be an HTTP(S) origin without credentials or path');
}
const transport = target.protocol === 'https:' ? https : http;
// Next.js export có thể chọn out/; mặc định vẫn phục vụ client HTML hiện tại.
const root = process.env.CLIENT_STATIC_ROOT
  ? path.resolve(process.env.CLIENT_STATIC_ROOT)
  : fileURLToPath(new URL('../public/', import.meta.url));
const port = Number(process.env.PORT || 8090);

function headersFor(req) {
  const headers = { ...req.headers, host: target.host };
  if (headers.origin) headers.origin = target.origin;
  return headers;
}
function validOrigin(req) {
  return !req.headers.origin || req.headers.origin === `http://${req.headers.host}`;
}
function gatewayError(res) {
  if (res.headersSent) return res.destroy();
  res.writeHead(502, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify({ success: false, error: { code: 'NETWORK_ERROR' } }));
}

const server = http.createServer((req, res) => {
  if (!req.url.startsWith('/api/')) return serveStatic(req, res, root);
  if (!validOrigin(req)) { res.writeHead(403); return res.end(); }
  const upstream = transport.request(target, { path: req.url, method: req.method, headers: headersFor(req) }, (response) => {
    res.writeHead(response.statusCode, { ...response.headers, 'cache-control': 'no-store' });
    response.pipe(res);
    response.on('error', () => res.destroy());
  });
  upstream.setTimeout(30_000, () => upstream.destroy(new Error('Upstream timeout')));
  upstream.on('error', () => gatewayError(res));
  req.on('aborted', () => upstream.destroy());
  res.on('close', () => { if (!res.writableEnded) upstream.destroy(); });
  req.pipe(upstream);
});

server.on('upgrade', (req, socket, head) => {
  if (req.url !== '/ws' || !validOrigin(req)) {
    socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
    return;
  }
  const upstream = transport.request(target, { path: '/ws', headers: headersFor(req) });
  upstream.setTimeout(10_000, () => upstream.destroy());
  upstream.on('upgrade', (response, peer, peerHead) => {
    upstream.setTimeout(0);
    peer.setTimeout(0);
    const headers = response.rawHeaders.reduce((lines, value, index, all) => index % 2 ? lines : [...lines, `${value}: ${all[index + 1]}`], []);
    socket.write(`HTTP/1.1 101 Switching Protocols\r\n${headers.join('\r\n')}\r\n\r\n`);
    if (peerHead.length) socket.write(peerHead);
    if (head.length) peer.write(head);
    socket.pipe(peer).pipe(socket);
    socket.on('error', () => peer.destroy());
    peer.on('error', () => socket.destroy());
    socket.on('close', () => peer.destroy());
    peer.on('close', () => socket.destroy());
  });
  upstream.on('response', (response) => {
    socket.end(`HTTP/1.1 ${response.statusCode} Rejected\r\nConnection: close\r\n\r\n`);
    response.resume();
  });
  upstream.on('error', () => socket.destroy());
  socket.on('error', () => upstream.destroy());
  upstream.end();
});

server.listen(port, process.env.HOST || '127.0.0.1', () => {
  console.log(`LMS Client: http://127.0.0.1:${server.address().port} -> ${target.origin}`);
});
