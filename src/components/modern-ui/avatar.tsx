'use client';

import React, { type ImgHTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ModernAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  shape?: 'circle' | 'squircle' | 'rounded';
  gradientBg?: boolean;
}

const SIZE_MAP: Record<AvatarSize, { box: string; font: string; badge: string }> = {
  xs: { box: 'size-6', font: 'text-[9px]', badge: 'size-1.5' },
  sm: { box: 'size-8', font: 'text-xs', badge: 'size-2' },
  md: { box: 'size-10', font: 'text-sm', badge: 'size-2.5' },
  lg: { box: 'size-12', font: 'text-base', badge: 'size-3' },
  xl: { box: 'size-16', font: 'text-xl', badge: 'size-3.5' },
  '2xl': { box: 'size-20', font: 'text-2xl', badge: 'size-4' },
};

const SHAPE_MAP = {
  circle: 'rounded-full',
  squircle: 'rounded-2xl',
  rounded: 'rounded-xl',
};

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ModernAvatar({
  name = '',
  src,
  size = 'md',
  isOnline,
  shape = 'circle',
  gradientBg = true,
  className = '',
  alt,
  ...props
}: ModernAvatarProps) {
  const sizeCfg = SIZE_MAP[size];
  const initials = getInitials(name);

  return (
    <div className={`relative inline-block select-none shrink-0 ${sizeCfg.box} ${className}`}>
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={`w-full h-full object-cover ${SHAPE_MAP[shape]} ring-2 ring-white shadow-xs`}
          {...props}
        />
      ) : (
        <div
          className={[
            'w-full h-full grid place-items-center font-bold tracking-tight text-white shadow-xs ring-2 ring-white',
            SHAPE_MAP[shape],
            sizeCfg.font,
            gradientBg
              ? 'bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600'
              : 'bg-slate-700',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {initials}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={[
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
            sizeCfg.badge,
            isOnline ? 'bg-emerald-500' : 'bg-slate-400',
          ].join(' ')}
          title={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </div>
  );
}

export function ModernAvatarGroup({
  children,
  limit = 4,
  className = '',
}: {
  children: React.ReactNode[];
  limit?: number;
  className?: string;
}) {
  const shown = children.slice(0, limit);
  const remaining = children.length - limit;

  return (
    <div className={`flex items-center -space-x-2.5 overflow-hidden ${className}`}>
      {shown}
      {remaining > 0 && (
        <div className="size-10 rounded-full bg-slate-200 border-2 border-white grid place-items-center text-xs font-bold text-slate-700 shadow-xs">
          +{remaining}
        </div>
      )}
    </div>
  );
}
