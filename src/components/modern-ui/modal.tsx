'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { IconX } from './icons';

export interface ModernModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const SIZE_MAP = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)]',
};

export function ModernModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
}: ModernModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={[
        'fixed inset-0 z-50 m-auto w-full p-0 overflow-hidden bg-transparent backdrop:bg-slate-900/40 backdrop:backdrop-blur-xs',
        SIZE_MAP[size],
      ].join(' ')}
    >
      <div className="flex flex-col max-h-[calc(100dvh-48px)] rounded-3xl border border-white/60 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-300">
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4.5 shrink-0">
            <div>
              {title && <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>}
              {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="grid size-8 place-items-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Đóng"
              >
                <IconX size={16} />
              </button>
            )}
          </div>
        )}

        <div className="overflow-y-auto px-6 py-5 text-sm text-slate-600 space-y-4">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 rounded-b-3xl shrink-0">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
