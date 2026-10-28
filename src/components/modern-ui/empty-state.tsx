'use client';

import React, { type ReactNode } from 'react';

export function ModernEmptyState({
  title,
  description,
  icon,
  action,
  className = '',
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-slate-300 bg-white/60 backdrop-blur-xs shadow-xs ${className}`}
    >
      {icon ? (
        <div className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-600 mb-4 shadow-inner ring-4 ring-blue-50/50">
          {icon}
        </div>
      ) : (
        <div className="size-16 rounded-2xl bg-slate-100 text-slate-400 grid place-items-center mb-4 text-2xl font-bold">
          ∅
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
      {description && <p className="mt-1.5 text-xs text-slate-500 max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
