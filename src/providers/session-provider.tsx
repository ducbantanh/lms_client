'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ApiError, apiRequest, setApiSession } from '@/lib/api';
import { routeRedirect } from '@/lib/auth';
import { unreadBannerKey } from '@/lib/notifications';
import type { Session, User } from '@/lib/types';
import { removeLocalStorage } from '@/hooks/use-local-storage';

type ConnectionStatus = 'connecting' | 'online' | 'offline';
type RealtimeHandler = (data: unknown) => void;
interface SessionContextValue {
  user: User | null;
  loading: boolean;
  error: string;
  notice: string;
  connection: ConnectionStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  subscribe: (type: string, handler: RealtimeHandler) => () => void;
}
const SessionContext = createContext<SessionContextValue | null>(null);

const REVOKE_REASONS: Record<string, string> = {
  logout: 'Ban da dang xuat.',
  forced: 'Quan tri vien da dang xuat phien cua ban.',
  locked: 'Tai khoan cua ban da bi khoa.',
  deleted: 'Tai khoan cua ban da bi xoa.',
  password_changed: 'Mat khau da duoc doi o thiet bi khac.',
  idle: 'Ban da bi dang xuat do khong hoat dong trong thoi gian dai.',
  expired: 'Phien dang nhap da het han.',
};

const ACTIVITY_EVENTS = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'scroll', 'touchstart'];
const ACTIVITY_INTERVAL = 15_000;
const DEMO_SESSION_KEY = 'lms_demo_session';

function makeDemoSession(username: string): Session {
  const clean = username.trim().toLowerCase();
  if (clean === 'admin' || clean.startsWith('admin')) {
    return {
      user: {
        id: 'demo-admin',
        username: 'admin',
        fullName: 'Quan tri vien He thong (Demo)',
        role: 0,
        mustChangePassword: false,
        permissions: ['users.manage', 'audit.view', 'schedules.manage', 'presence.view', 'courses.manage'],
      },
      csrfToken: 'demo-csrf',
    };
  }
  if (clean.startsWith('gv') || clean.startsWith('teacher')) {
    return {
      user: {
        id: 'demo-teacher',
        username: clean,
        fullName: 'TS. Nguyen Van A (Demo)',
        role: 1,
        mustChangePassword: false,
        permissions: ['courses.manage'],
      },
      csrfToken: 'demo-csrf',
    };
  }
  return {
    user: {
      id: 'demo-student',
      username: clean || 'sv_demo',
      fullName: 'Tran Van B - B21DCCN001 (Demo)',
      role: 5,
      mustChangePassword: false,
      permissions: [],
    },
    csrfToken: 'demo-csrf',
  };
}

function isDemoSession(s: Session | null) {
  return s?.csrfToken === 'demo-csrf';
}

function saveDemoSession(s: Session) {
  try { localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(s)); } catch {}
}

function loadDemoSession(): Session | null {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    return parsed?.user ? parsed : null;
  } catch { return null; }
}

function clearDemoSession() {
  try { localStorage.removeItem(DEMO_SESSION_KEY); } catch {}
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [connection, setConnection] = useState<ConnectionStatus>('offline');
  const listeners = useRef(new Map<string, Set<RealtimeHandler>>());

  const subscribe = useCallback((type: string, handler: RealtimeHandler) => {
    const set = listeners.current.get(type) ?? new Set<RealtimeHandler>();
    set.add(handler);
    listeners.current.set(type, set);
    return () => { set.delete(handler); };
  }, []);

  const acceptSession = useCallback((value: Session) => {
    setApiSession(value);
    setSession(value);
    setError('');
    setNotice('');
  }, []);

  const clearSession = useCallback(() => {
    setApiSession(null);
    setSession(null);
    setConnection('offline');
  }, []);

  const checkSession = useCallback(
    () =>
      apiRequest<Session>('/auth/me')
        .then((value) => { acceptSession(value); return true; })
        .catch((reason) => {
          if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
            clearDemoSession();
            clearSession();
          } else if (reason instanceof ApiError && reason.code === 'NETWORK_ERROR') {
            const demo = loadDemoSession();
            if (demo) { acceptSession(demo); return true; }
            clearSession();
          } else {
            setError(reason instanceof Error ? reason.message : 'Khong the tai phien dang nhap.');
          }
          return false;
        })
        .finally(() => setChecking(false)),
    [acceptSession, clearSession],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try { return await checkSession(); }
    finally { setLoading(false); }
  }, [checkSession]);

  useEffect(() => { void checkSession(); }, [checkSession]);

  useEffect(() => {
    if (checking || error) return;
    const target = routeRedirect(session, window.location.pathname + window.location.search);
    if (target) router.replace(target);
  }, [checking, error, session, pathname, router]);

  const sessionUserId = session?.user.id;
  const isDemo = isDemoSession(session);
  useEffect(() => {
    if (!sessionUserId || isDemo) return;
    let socket: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let attempt = 0;
    function endSession(reason?: string) {
      stopped = true;
      clearTimeout(retry);
      socket?.close();
      clearSession();
      setNotice(REVOKE_REASONS[reason ?? ''] ?? 'Phien dang nhap da ket thuc.');
    }
    function connect() {
      if (stopped) return;
      setConnection('connecting');
      socket = new WebSocket(
        `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`,
      );
      socket.onopen = () => { attempt = 0; setConnection('online'); };
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message?.type === 'session.revoked') endSession(message.data?.reason);
          else listeners.current.get(message?.type)?.forEach((handler) => {
            try { handler(message.data); }
            catch (reason) { console.error('[realtime] listener error', message.type, reason); }
          });
        } catch { /* ignore */ }
      };
      socket.onclose = (event) => {
        if (stopped) return;
        if (event.code === 4001) { endSession('forced'); return; }
        setConnection('offline');
        retry = setTimeout(async () => {
          try {
            const value = await apiRequest<Session>('/auth/me');
            if (!stopped) setApiSession(value);
          } catch (reason) {
            if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
              endSession('expired'); return;
            }
          }
          connect();
        }, Math.min(1_000 * 2 ** attempt++, 30_000));
      };
    }
    connect();

    let lastActivitySent = 0;
    let activityPending = false;
    function sendActivity() {
      if (socket?.readyState !== WebSocket.OPEN) { activityPending = true; return; }
      socket.send(JSON.stringify({ type: 'activity' }));
      lastActivitySent = Date.now();
      activityPending = false;
    }
    function onActivity() {
      if (Date.now() - lastActivitySent >= ACTIVITY_INTERVAL) sendActivity();
      else activityPending = true;
    }
    const flushActivity = setInterval(() => { if (activityPending) sendActivity(); }, ACTIVITY_INTERVAL);
    const listenerOptions = { passive: true, capture: true };
    ACTIVITY_EVENTS.forEach((type) => window.addEventListener(type, onActivity, listenerOptions));

    return () => {
      stopped = true;
      clearTimeout(retry);
      clearInterval(flushActivity);
      ACTIVITY_EVENTS.forEach((type) => window.removeEventListener(type, onActivity, listenerOptions));
      socket?.close();
    };
  }, [sessionUserId, isDemo, clearSession]);

  async function login(username: string, password: string) {
    let value: Session;
    try {
      value = await apiRequest<Session>('/auth/login', { method: 'POST', body: { username, password } });
    } catch (err) {
      if (err instanceof ApiError && err.code === 'NETWORK_ERROR') {
        value = makeDemoSession(username);
        saveDemoSession(value);
      } else { throw err; }
    }
    removeLocalStorage(unreadBannerKey(value.user.id));
    acceptSession(value);
  }

  async function logout() {
    if (isDemoSession(session)) {
      clearDemoSession();
      clearSession();
      return;
    }
    try {
      if (session) await apiRequest('/auth/logout', { method: 'POST', body: {} });
    } catch (reason) {
      if (!(reason instanceof ApiError && reason.code === 'UNAUTHENTICATED')) throw reason;
    }
    clearSession();
  }

  const waiting = checking || routeRedirect(session, pathname) !== null;

  return (
    <SessionContext.Provider
      value={{ user: session?.user ?? null, loading, error, notice, connection, login, logout, refresh, subscribe }}
    >
      {error && checking === false && !session ? (
        <main id="main-content" className="mx-auto w-[min(1200px,calc(100%-48px))] max-md:w-[calc(100%-32px)] pt-8 pb-12 max-md:pt-6 max-md:pb-10">
          <div className="empty-state" role="alert">
            <p>{error}</p>
            <button className="button primary" onClick={() => void refresh()}>Thu lai</button>
          </div>
        </main>
      ) : waiting ? (
        <main id="main-content" className="mx-auto w-[min(1200px,calc(100%-48px))] max-md:w-[calc(100%-32px)] pt-8 pb-12 max-md:pt-6 max-md:pb-10">
          <p className="empty-state" role="status">Dang kiem tra phien dang nhap…</p>
        </main>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
}
