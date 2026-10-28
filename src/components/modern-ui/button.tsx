'use client';

import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'glass'
  | 'danger'
  | 'success'
  | 'gradient'
  | 'soft';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  children?: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.98]',
  secondary:
    'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 active:scale-[0.98]',
  outline:
    'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:scale-[0.98]',
  glass:
    'bg-white/70 backdrop-blur-md border border-white/60 text-slate-800 shadow-sm hover:bg-white/90 hover:shadow active:scale-[0.98]',
  danger:
    'bg-linear-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/20 hover:brightness-105 active:scale-[0.98]',
  success:
    'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 hover:brightness-105 active:scale-[0.98]',
  gradient:
    'bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 active:scale-[0.98]',
  soft:
    'bg-blue-50 text-blue-700 border border-blue-200/60 hover:bg-blue-100/70 active:scale-[0.98]',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-8.5 px-3 text-xs font-medium gap-1.5',
  md: 'h-10 px-4 text-sm font-semibold gap-2',
  lg: 'h-11.5 px-5 text-base font-semibold gap-2.5',
  xl: 'h-13 px-6 text-lg font-bold gap-3',
};

const ROUNDED_STYLES = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = 'xl',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          'relative inline-flex items-center justify-center font-sans tracking-tight transition-all duration-200 select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/30',
          'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none',
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          ROUNDED_STYLES[rounded],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

ModernButton.displayName = 'ModernButton';

export interface ModernButtonGroupProps {
  children: ReactNode;
  className?: string;
  isAttached?: boolean;
}

export function ModernButtonGroup({ children, className = '', isAttached = false }: ModernButtonGroupProps) {
  return (
    <div
      className={[
        'inline-flex flex-wrap items-center',
        isAttached ? '[&>button]:rounded-none [&>button:first-child]:rounded-l-xl [&>button:last-child]:rounded-r-xl [&>button:not(:last-child)]:border-r-0' : 'gap-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
