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
      className={`modal-panel${wide ? ' wide' : ''}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-button" aria-label="Đóng hộp thoại" onClick={onClose}>
          <Icon name="close" size={16} />
        </button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}
