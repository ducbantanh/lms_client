'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, apiRequest, setApiSession } from '@/lib/api';
import { DEMO_USER } from '@/lib/demo-data';
import type { Session, User } from '@/lib/types';

type ConnectionStatus = 'demo' | 'connecting' | 'online' | 'offline';
interface SessionContextValue {
  user: User;
  isDemo: boolean;
  loading: boolean;
  error: string;
  connection: ConnectionStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  enterDemo: () => void;
  refresh: () => Promise<boolean>;
}
const SessionContext = createContext<SessionContextValue | null>(null);
/** Chỉ lưu lựa chọn demo/server; không lưu user, mật khẩu hay token. */
const MODE_KEY = 'lms.connection-mode';

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [connection, setConnection] = useState<ConnectionStatus>('demo');

  /** Đồng bộ React state và CSRF trong API client mỗi khi server cấp phiên. */
  function acceptSession(value: Session) {
    setApiSession(value);
    setSession(value);
    setIsDemo(false);
    setError('');
    try {
      sessionStorage.setItem(MODE_KEY, 'server');
    } catch {
      /* Chế độ riêng tư vẫn dùng được. */
    }
  }

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const value = await apiRequest<Session>('/auth/me');
      acceptSession(value);
      if (value.user.mustChangePassword) router.replace('/change-password/');
      return true;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không thể tải phiên đăng nhập.');
      if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
        setApiSession(null);
        setSession(null);
        try {
          sessionStorage.removeItem(MODE_KEY);
        } catch {
          /* Tùy chọn không bắt buộc. */
        }
        if (window.location.pathname !== '/login/') router.replace('/login/');
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Khi tải lại trang, chỉ khôi phục phiên nếu người dùng đã chọn đăng nhập server.
  useEffect(() => {
    let live = false;
    try {
      live = sessionStorage.getItem(MODE_KEY) === 'server';
    } catch {
      /* Mặc định demo. */
    }
    if (live) {
      setIsDemo(false);
      void refresh();
    }
    // Chỉ khởi tạo một lần; các lần refresh tiếp theo do người dùng chủ động gọi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Một socket cho toàn ứng dụng, được dọn khi logout/unmount hoặc đổi phiên.
  useEffect(() => {
    if (isDemo || !session) return;
    let socket: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let attempt = 0;
    function endSession() {
      stopped = true;
      clearTimeout(retry);
      socket?.close();
      setApiSession(null);
      setSession(null);
      setConnection('offline');
      try {
        sessionStorage.removeItem(MODE_KEY);
      } catch {
        /* Tùy chọn không bắt buộc. */
      }
      setError('Phiên đã kết thúc. Vui lòng đăng nhập lại.');
      router.replace('/login/');
    }
    function connect() {
      if (stopped) return;
      setConnection('connecting');
      socket = new WebSocket(
        `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`,
      );
      socket.onopen = () => {
        attempt = 0;
        setConnection('online');
      };
      socket.onmessage = (event) => {
        try {
          if (JSON.parse(event.data)?.type === 'session.revoked') endSession();
        } catch {
          /* Bỏ qua frame không đúng định dạng. */
        }
      };
      socket.onclose = (event) => {
        if (stopped) return;
        if (event.code === 4001) {
          endSession();
          return;
        }
        setConnection('offline');
        retry = setTimeout(
          async () => {
            try {
              const value = await apiRequest<Session>('/auth/me');
              if (!stopped) setApiSession(value);
            } catch (reason) {
              if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
                endSession();
                return;
              }
            }
            connect();
          },
          Math.min(1_000 * 2 ** attempt++, 30_000),
        );
      };
    }
    connect();
    return () => {
      stopped = true;
      clearTimeout(retry);
      socket?.close();
    };
  }, [isDemo, session?.user.id, router]);

  async function login(username: string, password: string) {
    const value = await apiRequest<Session>('/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    acceptSession(value);
    router.push(value.user.mustChangePassword ? '/change-password/' : '/');
  }

  function enterDemo() {
    setApiSession(null);
    setSession(null);
    setIsDemo(true);
    setConnection('demo');
    setError('');
    try {
      sessionStorage.removeItem(MODE_KEY);
    } catch {
      /* Không có secret trong storage. */
    }
    router.push('/');
  }

  async function logout() {
    // Chỉ rời phiên khi server xác nhận hoặc session đã hết; lỗi mạng vẫn giữ phiên để thử lại.
    try {
      if (session) await apiRequest('/auth/logout', { method: 'POST', body: {} });
    } catch (reason) {
      if (!(reason instanceof ApiError && reason.code === 'UNAUTHENTICATED')) throw reason;
    }
    setSession(null);
    setApiSession(null);
    setConnection('offline');
    try {
      sessionStorage.removeItem(MODE_KEY);
    } catch {
      /* Tùy chọn không bắt buộc. */
    }
    router.push('/login/');
  }

  return (
    <SessionContext.Provider
      value={{
        user:
          session?.user ??
          (isDemo
            ? DEMO_USER
            : { ...DEMO_USER, id: 'anonymous', fullName: 'Người dùng', permissions: [] }),
        isDemo,
        loading,
        error,
        connection,
        login,
        logout,
        enterDemo,
        refresh,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

/** Hook dùng chung, không để từng trang tự đọc cookie hoặc mở socket riêng. */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
}
