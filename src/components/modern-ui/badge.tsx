'use client';

import React, { type ReactNode } from 'react';

export type BadgeTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral';
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot' | 'pill';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface ModernBadgeProps {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  dotPulse?: boolean;
  children: ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<BadgeTone, { solid: string; soft: string; outline: string; dot: string }> = {
  primary: {
    solid: 'bg-blue-600 text-white',
    soft: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/20',
    outline: 'border border-blue-400 text-blue-600 bg-transparent',
    dot: 'bg-blue-600',
  },
  secondary: {
    solid: 'bg-indigo-600 text-white',
    soft: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/20',
    outline: 'border border-indigo-400 text-indigo-600 bg-transparent',
    dot: 'bg-indigo-600',
  },
  success: {
    solid: 'bg-emerald-600 text-white',
    soft: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-700/20',
    outline: 'border border-emerald-400 text-emerald-600 bg-transparent',
    dot: 'bg-emerald-600',
  },
  warning: {
    solid: 'bg-amber-500 text-white',
    soft: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-700/20',
    outline: 'border border-amber-400 text-amber-600 bg-transparent',
    dot: 'bg-amber-500',
  },
  danger: {
    solid: 'bg-rose-600 text-white',
    soft: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/20',
    outline: 'border border-rose-400 text-rose-600 bg-transparent',
    dot: 'bg-rose-600',
  },
  info: {
    solid: 'bg-sky-600 text-white',
    soft: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-700/20',
    outline: 'border border-sky-400 text-sky-600 bg-transparent',
    dot: 'bg-sky-600',
  },
  purple: {
    solid: 'bg-purple-600 text-white',
    soft: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/20',
    outline: 'border border-purple-400 text-purple-600 bg-transparent',
    dot: 'bg-purple-600',
  },
  neutral: {
    solid: 'bg-slate-600 text-white',
    soft: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-600/10',
    outline: 'border border-slate-300 text-slate-600 bg-transparent',
    dot: 'bg-slate-500',
  },
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[10px] gap-1 font-semibold',
  sm: 'px-2.5 py-0.5 text-xs gap-1.5 font-medium',
  md: 'px-3 py-1 text-xs gap-1.5 font-semibold',
};

export function ModernBadge({
  tone = 'primary',
  variant = 'soft',
  size = 'sm',
  icon,
  dotPulse = false,
  children,
  className = '',
}: ModernBadgeProps) {
  const toneCfg = TONE_CLASSES[tone];
  const styleCls = variant === 'solid' ? toneCfg.solid : variant === 'outline' ? toneCfg.outline : toneCfg.soft;

  return (
    <span
      className={[
        'inline-flex items-center select-none tracking-wide whitespace-nowrap',
        variant === 'pill' ? 'rounded-full' : 'rounded-lg',
        SIZE_CLASSES[size],
        styleCls,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {variant === 'dot' && (
        <span className="relative flex h-2 w-2 mr-1">
          {dotPulse && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${toneCfg.dot}`} />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${toneCfg.dot}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
