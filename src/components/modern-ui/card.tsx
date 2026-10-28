'use client';

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'glass' | 'gradient' | 'bordered' | 'interactive';

export interface ModernCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
  hoverEffect?: boolean;
  children?: ReactNode;
}

const CARD_VARIANTS: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-200/80 shadow-sm',
  elevated: 'bg-white shadow-lg shadow-slate-200/50 border border-slate-100',
  glass: 'bg-white/80 backdrop-blur-md border border-white/60 shadow-md shadow-slate-200/40',
  gradient: 'bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border border-slate-200/80 shadow-sm',
  bordered: 'bg-transparent border-2 border-slate-200',
  interactive: 'bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 cursor-pointer',
};

const PADDING_STYLES = {
  none: 'p-0',
  sm: 'p-3.5',
  md: 'p-5',
  lg: 'p-6.5',
  xl: 'p-8',
};

const ROUNDED_STYLES = {
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[28px]',
};

export const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      rounded = 'xl',
      hoverEffect = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'relative overflow-hidden transition-all duration-200',
          CARD_VARIANTS[variant],
          PADDING_STYLES[padding],
          ROUNDED_STYLES[rounded],
          hoverEffect && variant !== 'interactive' ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModernCard.displayName = 'ModernCard';

export function ModernCardHeader({
  title,
  subtitle,
  action,
  icon,
  className = '',
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 pb-4 border-b border-slate-100 ${className}`}>
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 tracking-tight truncate">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function ModernCardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
}

export function ModernCardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 ${className}`}>
      {children}
    </div>
  );
}
