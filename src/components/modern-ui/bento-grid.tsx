'use client';

import React, { type ReactNode } from 'react';

export function ModernBentoGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4.5 ${className}`}>
      {children}
    </div>
  );
}

export function ModernBentoCard({
  colSpan = 1,
  rowSpan = 1,
  title,
  subtitle,
  icon,
  badge,
  action,
  children,
  className = '',
}: {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const colClass = {
    1: 'col-span-1',
    2: 'md:col-span-2',
    3: 'xl:col-span-3',
    4: 'col-span-full',
  }[colSpan];

  const rowClass = {
    1: 'row-span-1',
    2: 'row-span-2',
  }[rowSpan];

  return (
    <div
      className={[
        'flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5 backdrop-blur-xs',
        colClass,
        rowClass,
        className,
      ].join(' ')}
    >
      {(title || icon || badge || action) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-600 shadow-xs">
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {badge}
            {action}
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
