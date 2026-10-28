'use client';

import React, { type ReactNode } from 'react';

export interface ModernStatCardProps {
  label: string;
  value: string | number;
  change?: { value: string | number; positive?: boolean };
  icon?: ReactNode;
  trendText?: string;
  gradientTone?: 'blue' | 'purple' | 'green' | 'amber' | 'rose';
  className?: string;
}

const TONE_GRADIENTS = {
  blue: 'from-blue-500/10 via-indigo-500/5 to-transparent text-blue-600',
  purple: 'from-purple-500/10 via-violet-500/5 to-transparent text-purple-600',
  green: 'from-emerald-500/10 via-teal-500/5 to-transparent text-emerald-600',
  amber: 'from-amber-500/10 via-yellow-500/5 to-transparent text-amber-600',
  rose: 'from-rose-500/10 via-red-500/5 to-transparent text-rose-600',
};

export function ModernStatCard({
  label,
  value,
  change,
  icon,
  trendText,
  gradientTone = 'blue',
  className = '',
}: ModernStatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 bg-gradient-to-br ${TONE_GRADIENTS[gradientTone]} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        {icon && (
          <div className="grid size-10 place-items-center rounded-xl bg-white shadow-xs border border-slate-100 shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-full ${
              change.positive
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
            }`}
          >
            {change.positive ? '↑' : '↓'} {change.value}
          </span>
        )}
      </div>
      {trendText && <p className="mt-2 text-xs text-slate-500 font-medium">{trendText}</p>}
    </div>
  );
}
