'use client';

import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';

export interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-slate-700 tracking-tight">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              'w-full h-10.5 rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-all duration-200 outline-none',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15'
                : 'border-slate-200/90 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15 hover:border-slate-300',
              'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

ModernInput.displayName = 'ModernInput';

export interface ModernTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const ModernTextarea = forwardRef<HTMLTextAreaElement, ModernTextareaProps>(
  ({ label, helperText, error, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-slate-700 tracking-tight">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={[
            'w-full min-h-[96px] rounded-xl border bg-white p-3 text-sm text-slate-900 transition-all duration-200 outline-none resize-y',
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15'
              : 'border-slate-200/90 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15 hover:border-slate-300',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

ModernTextarea.displayName = 'ModernTextarea';
