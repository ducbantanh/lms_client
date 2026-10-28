'use client';

import React, { type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface ModernTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'segmented' | 'underline' | 'floating';
  className?: string;
}

export function ModernTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className = '',
}: ModernTabsProps) {
  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={[
                'flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/80 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : '',
              ].join(' ')}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto py-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={[
              'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap',
              isActive
                ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white/80 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/70',
              tab.disabled ? 'opacity-40 cursor-not-allowed' : '',
            ].join(' ')}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
