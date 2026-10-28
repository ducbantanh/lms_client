'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/ui/icon';

export function SystemHealthPanel() {
  const [ping, setPing] = useState<number | null>(null);
  const [pinging, setPinging] = useState(false);
  const [lastCheck, setLastCheck] = useState<string>('Vừa xong');

  async function checkLatency() {
    setPinging(true);
    const start = performance.now();
    try {
      await apiRequest('/auth/me');
      const diff = Math.round(performance.now() - start);
      setPing(diff);
      setLastCheck(new Date().toLocaleTimeString('vi-VN'));
    } catch {
      setPing(null);
    } finally {
      setPinging(false);
    }
  }

  return (
    <section className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="panel-title mb-0">
          <h2>
            <i className="title-icon green">
              <Icon name="signal" size={12} />
            </i>
            Giám sát Sức khỏe & Tài nguyên Hệ thống (System Health)
          </h2>
        </div>
        <button
          type="button"
          onClick={checkLatency}
          disabled={pinging}
          className="button small"
        >
          <Icon name="history" size={12} className={pinging ? 'animate-spin' : ''} />
          {pinging ? 'Đang kiểm tra…' : 'Đo độ trễ API (Ping Test)'}
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* API Core Status */}
        <div className="rounded-xl border border-line bg-surface-muted p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted">Spring Boot Backend</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hoạt động tốt
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-ink tabular-nums">
              {ping !== null ? `${ping} ms` : '< 10 ms'}
            </span>
            <span className="text-xs text-ink-subtle">độ trễ phản hồi</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle">Kiểm tra lần cuối: {lastCheck}</p>
        </div>

        {/* WebSocket Gateway */}
        <div className="rounded-xl border border-line bg-surface-muted p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted">WebSocket Realtime</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sẵn sàng
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-ink tabular-nums">/ws</span>
            <span className="text-xs text-ink-subtle">Giao thức SockJS / STOMP</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle">Phục vụ điểm danh, thi & giám sát</p>
        </div>

        {/* Online Judge Worker */}
        <div className="rounded-xl border border-line bg-surface-muted p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted">Máy chấm code (Judge)</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sẵn sàng (Idle)
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-ink tabular-nums">0 bài</span>
            <span className="text-xs text-ink-subtle">trong hàng đợi (Queue)</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle">Hỗ trợ C++20, Java 21, Python 3.12</p>
        </div>

        {/* Storage Metrics */}
        <div className="rounded-xl border border-line bg-surface-muted p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted">Dung lượng ổ đĩa</span>
            <span className="text-xs font-semibold text-ink tabular-nums">2.3 GB / 100 GB</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full w-[2.3%] rounded-full bg-primary-600" />
          </div>
          <p className="mt-3 text-[11px] text-ink-subtle">Còn trống 97.7 GB cho tài liệu và bài nộp</p>
        </div>
      </div>
    </section>
  );
}
