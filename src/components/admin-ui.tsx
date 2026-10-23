'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Modal } from '@/components/ui/modal';

/** Tiêu đề dùng chung cho các trang quản trị. */
export function AdminHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export interface ConfirmRequest {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  run: () => Promise<void>;
}

/** Hộp xác nhận thay window.confirm; khóa nút trong lúc chờ API để tránh bấm trùng. */
export function ConfirmDialog({
  request,
  onClose,
}: {
  request: ConfirmRequest;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <Modal title={request.title} onClose={() => !busy && onClose()}>
      <p>{request.message}</p>
      <div className="dialog-actions">
        <button className="button" disabled={busy} onClick={onClose}>
          Hủy
        </button>
        <button
          className={`button ${request.danger ? 'danger' : 'primary'}`}
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await request.run();
            } finally {
              setBusy(false);
              onClose();
            }
          }}
        >
          {busy ? 'Đang xử lý…' : request.confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export interface Flash {
  type: 'success' | 'error';
  text: string;
}

/** Thông báo kết quả thao tác, tự ẩn sau vài giây (lỗi hiện lâu hơn). */
export function FlashMessage({ flash, onDone }: { flash: Flash | null; onDone: () => void }) {
  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(onDone, flash.type === 'error' ? 6000 : 3500);
    return () => clearTimeout(timer);
  }, [flash, onDone]);
  if (!flash) return null;
  return (
    <div className={`flash ${flash.type}`} role={flash.type === 'error' ? 'alert' : 'status'}>
      {flash.text}
    </div>
  );
}
