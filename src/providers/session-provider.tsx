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
import type { Session, User } from '@/lib/types';

type ConnectionStatus = 'connecting' | 'online' | 'offline';
/** Nhận data của một sự kiện WebSocket ({ type, data, ts }) từ server. */
type RealtimeHandler = (data: unknown) => void;
interface SessionContextValue {
  /** null khi chưa đăng nhập (chỉ xảy ra ở trang /login/). */
  user: User | null;
  loading: boolean;
  error: string;
  /** Lý do phiên trước kết thúc (bị ép đăng xuất, khóa...), hiện ở trang đăng nhập. */
  notice: string;
  connection: ConnectionStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  /** Đăng ký nhận sự kiện realtime (vd. presence.changed); trả về hàm hủy đăng ký. */
  subscribe: (type: string, handler: RealtimeHandler) => () => void;
}
const SessionContext = createContext<SessionContextValue | null>(null);

/** Khớp lý do server gửi trong sự kiện session.revoked. */
const REVOKE_REASONS: Record<string, string> = {
  logout: 'Bạn đã đăng xuất.',
  forced: 'Quản trị viên đã đăng xuất phiên của bạn.',
  locked: 'Tài khoản của bạn đã bị khóa.',
  deleted: 'Tài khoản của bạn đã bị xóa.',
  password_changed: 'Mật khẩu đã được đổi ở thiết bị khác.',
  expired: 'Phiên đăng nhập đã hết hạn.',
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  /** true cho tới khi /auth/me trả lời lần đầu; trong lúc đó không hiện nội dung trang. */
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [connection, setConnection] = useState<ConnectionStatus>('offline');
  /** Listener realtime của các trang; dùng ref để socket không phải mở lại khi trang đổi. */
  const listeners = useRef(new Map<string, Set<RealtimeHandler>>());

  // Giữ nguyên tham chiếu để trang dùng làm dependency của useEffect mà không đăng ký lại.
  const subscribe = useCallback((type: string, handler: RealtimeHandler) => {
    const set = listeners.current.get(type) ?? new Set<RealtimeHandler>();
    set.add(handler);
    listeners.current.set(type, set);
    return () => {
      set.delete(handler);
    };
  }, []);

  /** Đồng bộ React state và CSRF trong API client mỗi khi server cấp phiên. */
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

  /** Hỏi server phiên hiện tại; true khi còn đăng nhập. */
  const checkSession = useCallback(
    () =>
      apiRequest<Session>('/auth/me')
        .then((value) => {
          acceptSession(value);
          return true;
        })
        .catch((reason) => {
          if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') clearSession();
          else
            setError(reason instanceof Error ? reason.message : 'Không thể tải phiên đăng nhập.');
          return false;
        })
        .finally(() => setChecking(false)),
    [acceptSession, clearSession],
  );

  // Giữ nguyên tham chiếu để trang dùng làm dependency của useEffect mà không tải lại.
  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      return await checkSession();
    } finally {
      setLoading(false);
    }
  }, [checkSession]);

  // Mỗi lần tải trang đều hỏi server phiên hiện tại, giống requirePage() của client cũ.
  // Các lần sau do login/đổi mật khẩu/trang gặp lỗi phiên gọi refresh().
  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  // Bảo vệ route theo phiên, mustChangePassword, role và permission (lib/auth.ts).
  useEffect(() => {
    if (checking || error) return;
    const target = routeRedirect(session, window.location.pathname + window.location.search);
    if (target) router.replace(target);
  }, [checking, error, session, pathname, router]);

  // Một socket cho toàn ứng dụng, được dọn khi logout/unmount hoặc đổi phiên.
  // Chỉ phụ thuộc id người dùng: server cấp lại phiên (đổi CSRF) thì không cần mở socket mới.
  const sessionUserId = session?.user.id;
  useEffect(() => {
    if (!sessionUserId) return;
    let socket: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let attempt = 0;
    function endSession(reason?: string) {
      stopped = true;
      clearTimeout(retry);
      socket?.close();
      clearSession();
      setNotice(REVOKE_REASONS[reason ?? ''] ?? 'Phiên đăng nhập đã kết thúc.');
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
          const message = JSON.parse(event.data);
          if (message?.type === 'session.revoked') endSession(message.data?.reason);
          else
            listeners.current.get(message?.type)?.forEach((handler) => {
              try {
                handler(message.data);
              } catch (reason) {
                console.error('[realtime] listener error', message.type, reason);
              }
            });
        } catch {
          /* Bỏ qua frame không đúng định dạng. */
        }
      };
      socket.onclose = (event) => {
        if (stopped) return;
        // 4001: server đã thu hồi phiên, không tự kết nối lại.
        if (event.code === 4001) {
          endSession('forced');
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
                endSession('expired');
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
  }, [sessionUserId, clearSession]);

  /** Chuyển trang sau login do effect bảo vệ route xử lý (next / đổi mật khẩu / trang chủ). */
  async function login(username: string, password: string) {
    acceptSession(
      await apiRequest<Session>('/auth/login', {
        method: 'POST',
        body: { username, password },
      }),
    );
  }

  async function logout() {
    // Chỉ rời phiên khi server xác nhận hoặc session đã hết; lỗi mạng vẫn giữ phiên để thử lại.
    try {
      if (session) await apiRequest('/auth/logout', { method: 'POST', body: {} });
    } catch (reason) {
      if (!(reason instanceof ApiError && reason.code === 'UNAUTHENTICATED')) throw reason;
    }
    // Effect bảo vệ route sẽ đưa về /login/ (kèm ?next= để đăng nhập lại quay về đúng trang).
    clearSession();
  }

  // Ẩn nội dung trong lúc kiểm tra phiên hoặc chờ chuyển trang (như class app-loading cũ).
  // Kết quả có/không chuyển trang chỉ phụ thuộc pathname nên không cần đọc query ở đây.
  const waiting = checking || routeRedirect(session, pathname) !== null;

  return (
    <SessionContext.Provider
      value={{
        user: session?.user ?? null,
        loading,
        error,
        notice,
        connection,
        login,
        logout,
        refresh,
        subscribe,
      }}
    >
      {error && checking === false && !session ? (
        <main id="main-content" className="page-width main-content">
          <div className="empty-state" role="alert">
            <p>{error}</p>
            <button className="button primary" onClick={() => void refresh()}>
              Thử lại
            </button>
          </div>
        </main>
      ) : waiting ? (
        <main id="main-content" className="page-width main-content">
          <p className="empty-state" role="status">
            Đang kiểm tra phiên đăng nhập…
          </p>
        </main>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
}

/** Hook dùng chung, không để từng trang tự đọc cookie hoặc mở socket riêng. */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
}
