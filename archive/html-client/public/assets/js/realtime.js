// Kết nối WebSocket dùng chung. Mọi trang nhận sự kiện realtime qua file này.
//
//   const rt = connectRealtime();
//   rt.on('presence.changed', data => ...);
//   rt.on('status', s => ...);   // 'connecting' | 'open' | 'closed' | 'revoked'
//
// - Tự reconnect với backoff 1s, 2s, 4s ... tối đa 30s.
// - Mã đóng 4001 hoặc sự kiện session.revoked: KHÔNG reconnect, báo người dùng rồi về trang login.
// - Trước khi reconnect kiểm tra /auth/me; nếu session đã mất thì về trang login.

import { loadSession, goLogin, getUser, setSession } from './api.js';
import { revokeReason } from './messages-vi.js';
import { config } from './config.js';

const CLOSE_SESSION_REVOKED = 4001;
const MAX_BACKOFF_MS = 30_000;
const CLIENT_PING_MS = 25_000;
let activeConnection = null;

export function connectRealtime(options = {}) {
  if (activeConnection) return activeConnection;
  if (!getUser()) throw new Error('Load the session before connecting realtime');
  const { onRevoked = defaultOnRevoked } = options;
  const listeners = new Map();
  let ws = null;
  let attempt = 0;
  let stopped = false;
  let revoked = false;
  let pingTimer = null;
  let reconnectTimer = null;
  let status = 'connecting';

  function emit(type, data) {
    if (type === 'status') status = data;
    (listeners.get(type) || []).forEach((fn) => {
      try {
        fn(data);
      } catch (e) {
        console.error('[realtime] listener error', type, e);
      }
    });
    (listeners.get('*') || []).forEach((fn) => {
      try { fn({ type, data }); } catch (e) { console.error('[realtime] listener error', type, e); }
    });
  }

  function handleRevoked(reason) {
    if (revoked) return;
    revoked = true;
    stopped = true;
    clearInterval(pingTimer);
    clearTimeout(reconnectTimer);
    setSession(null);
    ws?.close(1000);
    emit('status', 'revoked');
    onRevoked(reason);
  }

  function open() {
    if (stopped) return;
    emit('status', 'connecting');
    const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
    ws = new WebSocket(`${proto}://${window.location.host}${config.socketPath}`);

    ws.addEventListener('open', () => {
      if (stopped) { ws.close(1000); return; }
      attempt = 0;
      emit('status', 'open');
      clearInterval(pingTimer);
      pingTimer = setInterval(() => send({ type: 'ping' }), CLIENT_PING_MS);
    });

    ws.addEventListener('message', (e) => {
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }
      if (stopped || !msg || typeof msg.type !== 'string') return;
      if (msg.type === 'session.revoked') {
        handleRevoked(msg.data?.reason);
        return;
      }
      emit(msg.type, msg.data);
    });

    ws.addEventListener('close', (e) => {
      clearInterval(pingTimer);
      if (stopped) return;
      if (e.code === CLOSE_SESSION_REVOKED) {
        handleRevoked('forced');
        return;
      }
      emit('status', 'closed');
      scheduleReconnect();
    });
  }

  function scheduleReconnect() {
    const delay = Math.min(1000 * 2 ** attempt, MAX_BACKOFF_MS);
    attempt += 1;
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(async () => {
      if (stopped) return;
      try {
        const session = await loadSession();
        if (!session) {
          handleRevoked('expired');
          return;
        }
      } catch {
        if (!stopped) scheduleReconnect();
        return;
      }
      open();
    }, delay);
  }

  function send(obj) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(obj));
    }
  }

  const connection = {
    on(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
      if (type === 'status') fn(status);
      return this;
    },
    off(type, fn) {
      const callbacks = listeners.get(type) || [];
      listeners.set(type, callbacks.filter((callback) => callback !== fn));
      return this;
    },
    close() {
      stopped = true;
      clearInterval(pingTimer);
      clearTimeout(reconnectTimer);
      if (ws) ws.close(1000);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      if (activeConnection === connection) activeConnection = null;
      listeners.clear();
    },
  };
  function onPageHide(event) {
    if (!event.persisted) { connection.close(); return; }
    stopped = true;
    clearInterval(pingTimer);
    clearTimeout(reconnectTimer);
    ws?.close(1000);
  }
  function onPageShow(event) {
    if (event.persisted && !revoked) window.location.reload();
  }
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  activeConnection = connection;
  open();
  return connection;
}

function defaultOnRevoked(reason) {
  showRevokedOverlay(revokeReason(reason));
  setTimeout(goLogin, 2500);
}

/** Lớp phủ toàn màn hình, không phụ thuộc AdminLTE. */
function showRevokedOverlay(message) {
  const el = document.createElement('div');
  el.className = 'session-revoked-overlay';
  el.setAttribute('role', 'alertdialog');
  const box = document.createElement('div');
  box.className = 'session-revoked-box';
  const title = document.createElement('h4');
  title.textContent = 'Phiên đăng nhập đã kết thúc';
  const text = document.createElement('p');
  text.textContent = message;
  const hint = document.createElement('small');
  hint.textContent = 'Đang chuyển về trang đăng nhập...';
  box.append(title, text, hint);
  el.append(box);
  document.body.append(el);
}
