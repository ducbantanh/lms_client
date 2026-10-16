import test from 'node:test';
import assert from 'node:assert/strict';
import { setSession, getUser } from '../public/assets/js/api.js';
import { connectRealtime } from '../public/assets/js/realtime.js';

test('one socket per page, unsubscribe, malformed frames and terminal revocation', () => {
  const sockets = [];
  class FakeSocket extends EventTarget {
    static OPEN = 1;
    readyState = 0;
    constructor(url) { super(); this.url = url; sockets.push(this); }
    send() {}
    close() { this.readyState = 3; this.dispatchEvent(new Event('close')); }
    message(data) { this.dispatchEvent(new MessageEvent('message', { data })); }
  }
  const events = new EventTarget();
  globalThis.window = {
    location: { protocol: 'https:', host: 'lms.test' },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  };
  globalThis.WebSocket = FakeSocket;
  setSession({ user: { id: 'student' }, csrfToken: 'csrf' });
  let reason;
  const rt = connectRealtime({ onRevoked: (value) => { reason = value; } });
  try {
    assert.equal(connectRealtime(), rt);
    assert.equal(sockets.length, 1);
    assert.equal(sockets[0].url, 'wss://lms.test/ws');
    const statuses = [];
    rt.on('status', (s) => statuses.push(s));
    assert.deepEqual(statuses, ['connecting']);
    sockets[0].readyState = 1;
    sockets[0].dispatchEvent(new Event('open'));
    let count = 0;
    const callback = () => count++;
    rt.on('presence.changed', callback);
    sockets[0].message('not JSON');
    sockets[0].message('null');
    sockets[0].message('{"type":"presence.changed","data":{}}');
    rt.off('presence.changed', callback);
    sockets[0].message('{"type":"presence.changed","data":{}}');
    assert.equal(count, 1);
    sockets[0].message('{"type":"session.revoked","data":{"reason":"forced"}}');
    assert.equal(reason, 'forced');
    assert.equal(getUser(), null);
    assert.equal(sockets[0].readyState, 3);
    assert.deepEqual(statuses, ['connecting', 'open', 'revoked']);
  } finally { rt.close(); setSession(null); }
});
