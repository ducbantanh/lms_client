'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from '@/components/ui/icon';

/** Native dialog giữ focus trong modal, hỗ trợ Escape và trả focus về nút mở; `wide` cho form soạn nội dung. */
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Modal chỉ truy cập DOM sau mount; cleanup cần thiết khi React StrictMode chạy lại effect.
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className={`m-auto max-h-[calc(100dvh-32px)] overflow-y-auto rounded-lg border border-line-strong bg-white p-0 text-ink shadow-float ${
        wide ? 'w-[min(720px,calc(100%-32px))]' : 'w-[min(460px,calc(100%-32px))]'
      } max-w-none`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-3.5">
        <h2 id="dialog-title" className="text-[17px] font-semibold text-ink">
          {title}
        </h2>
        <button
          className="grid size-8 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-rose-600 hover:text-white"
          aria-label="Đóng hộp thoại"
          onClick={onClose}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
      <div className="p-5 text-sm text-ink-muted">{children}</div>
    </dialog>
  );
}
