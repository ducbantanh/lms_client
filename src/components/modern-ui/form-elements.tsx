'use client';

import React, { type ReactNode } from 'react';

export function ModernSwitch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={`inline-flex items-start gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner" />
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-bold text-slate-800">{label}</span>}
          {description && <span className="text-xs text-slate-500">{description}</span>}
        </div>
      )}
    </label>
  );
}

export function ModernCheckboxCard({
  checked,
  onChange,
  title,
  subtitle,
  icon,
}: {
  checked: boolean;
  onChange: (c: boolean) => void;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
        checked
          ? 'border-blue-500 bg-blue-50/40 shadow-xs ring-2 ring-blue-500/10'
          : 'border-slate-200 bg-white hover:bg-slate-50/70 hover:border-slate-300'
      }`}
    >
      <div className={`size-5 rounded-lg border grid place-items-center transition-colors shrink-0 ${
        checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
      }`}>
        {checked && <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      {icon && <div className="text-slate-500 shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-slate-900 truncate">{title}</div>
        {subtitle && <div className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}
