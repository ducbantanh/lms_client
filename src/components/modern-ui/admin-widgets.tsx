'use client';

import React from 'react';

export function ServerHealthMonitor({
  cpuUsage = 24,
  memoryUsage = 48,
  activeSockets = 152,
  uptime = '18 ngày 4 giờ',
}: {
  cpuUsage?: number;
  memoryUsage?: number;
  activeSockets?: number;
  uptime?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Trạng thái máy chủ</h3>
        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <span className="size-2 rounded-full bg-emerald-500 animate-ping" /> Hoạt động tốt
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-xs text-slate-500 font-medium">CPU Load</div>
          <div className="text-xl font-black text-slate-900 mt-1">{cpuUsage}%</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-xs text-slate-500 font-medium">RAM Đang dùng</div>
          <div className="text-xl font-black text-slate-900 mt-1">{memoryUsage}%</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-xs text-slate-500 font-medium">Kết nối Realtime</div>
          <div className="text-xl font-black text-slate-900 mt-1">{activeSockets}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-xs text-slate-500 font-medium">Thời gian online</div>
          <div className="text-xl font-black text-slate-900 mt-1 truncate">{uptime}</div>
        </div>
      </div>
    </div>
  );
}
