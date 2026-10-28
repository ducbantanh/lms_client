'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/providers/session-provider';
import { Icon } from '@/components/ui/icon';

export interface SystemBroadcastMessage {
  id: string;
  title: string;
  message: string;
  level: 'info' | 'warning' | 'urgent';
  createdAt: string;
  expiresAt?: string;
}

export interface MaintenanceNotice {
  active: boolean;
  message?: string;
  estimatedEnd?: string;
}

export const BROADCAST_STORAGE_KEY = 'lms.system.broadcast';
export const MAINTENANCE_STORAGE_KEY = 'lms.system.maintenance';

export function SystemBroadcastBanner() {
  const { subscribe } = useSession();
  const [broadcast, setBroadcast] = useState<SystemBroadcastMessage | null>(null);
  const [maintenance, setMaintenance] = useState<MaintenanceNotice | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Đọc thông báo lưu sẵn từ trước
    try {
      const savedBroadcast = localStorage.getItem(BROADCAST_STORAGE_KEY);
      if (savedBroadcast) {
        const parsed = JSON.parse(savedBroadcast) as SystemBroadcastMessage;
        if (!parsed.expiresAt || new Date(parsed.expiresAt).getTime() > Date.now()) {
          setBroadcast(parsed);
        }
      }
      const savedMaintenance = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      if (savedMaintenance) {
        const parsedM = JSON.parse(savedMaintenance) as MaintenanceNotice;
        if (parsedM.active) setMaintenance(parsedM);
      }
    } catch {
      // Bỏ qua lỗi parse
    }

    // 2. Lắng nghe thông báo khẩn cấp từ WebSocket realtime
    const unsubBroadcast = subscribe('system.broadcast', (data) => {
      const msg = data as SystemBroadcastMessage;
      setBroadcast(msg);
      setDismissedId(null);
    });

    const unsubMaintenance = subscribe('system.maintenance', (data) => {
      const notice = data as MaintenanceNotice;
      setMaintenance(notice.active ? notice : null);
    });

    return () => {
      unsubBroadcast();
      unsubMaintenance();
    };
  }, [subscribe]);

  // Nếu đang trong chế độ bảo trì
  if (maintenance?.active) {
    return (
      <div
        className="relative z-50 flex items-center justify-between gap-3 border-b border-amber-300 bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-md"
        role="alert"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <Icon name="clock" size={14} className="animate-spin" />
          <span>
            <b>THÔNG BÁO BẢO TRÌ:</b>{' '}
            {maintenance.message || 'Hệ thống đang trong quá trình bảo trì định kỳ.'}
            {maintenance.estimatedEnd && ` Dự kiến hoàn tất lúc ${maintenance.estimatedEnd}.`}
          </span>
        </div>
      </div>
    );
  }

  // Nếu có thông báo broadcast và chưa bị tắt
  if (!broadcast || broadcast.id === dismissedId) return null;

  const levelStyles = {
    info: 'bg-primary-600 text-white border-primary-700',
    warning: 'bg-amber-600 text-white border-amber-700',
    urgent: 'bg-rose-600 text-white border-rose-700 animate-pulse',
  };

  const levelIcons = {
    info: 'info' as const,
    warning: 'clock' as const,
    urgent: 'close' as const,
  };

  return (
    <div
      className={`relative z-50 flex items-center justify-between gap-3 border-b px-4 py-2.5 text-xs text-white shadow-md ${levelStyles[broadcast.level]}`}
      role="alert"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2.5">
        <span className="grid size-5 place-items-center rounded-full bg-white/20">
          <Icon name={levelIcons[broadcast.level]} size={11} />
        </span>
        <span>
          <strong className="mr-1 font-bold uppercase tracking-wide">[{broadcast.title}]</strong>
          {broadcast.message}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setDismissedId(broadcast.id)}
        className="icon-button size-6 shrink-0 rounded text-white/80 transition hover:bg-white/20 hover:text-white"
        aria-label="Đóng thông báo"
      >
        <Icon name="close" size={12} />
      </button>
    </div>
  );
}
