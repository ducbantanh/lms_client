'use client';

import { useState, type ChangeEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { readImportFile } from '@/lib/admin';
import {
  ROOM_IMPORT_SAMPLE,
  countRoomLines,
  roomImportReason,
  type RoomImportReport,
} from '@/lib/schedule';
import { DropZone } from '@/components/ui/drop-zone';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { FormError } from './schedule-forms';

/** Khớp giới hạn của POST /admin/rooms/import (256 KB, 1000 dòng). */
const MAX_FILE_BYTES = 256 * 1024;
const WARN_REASONS = ['ALREADY_EXISTS', 'DUPLICATE_IN_INPUT'];

/** File CSV mẫu (UTF-8 có BOM để Excel mở đúng tiếng Việt) tải về ngay trên trình duyệt. */
function downloadSample() {
  const csv = `﻿${ROOM_IMPORT_SAMPLE.join('\r\n')}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mau-phong-hoc.csv';
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Nhập nhiều phòng một lần: dán danh sách hoặc nạp file .txt/.csv (đọc trên trình duyệt, đổ vào ô text để xem lại).
 * Dòng hợp lệ được tạo ngay; phòng đã có không bị ghi đè; dòng lỗi/trùng hiện kèm số dòng để sửa rồi nhập lại.
 */
export function RoomImportDialog({
  onClose,
  onImported,
}: {
  onClose: () => void;
  onImported: (report: RoomImportReport) => void;
}) {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [report, setReport] = useState<RoomImportReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const lines = countRoomLines(content);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!/\.(txt|csv)$/i.test(file.name)) {
      setError(new Error('Chỉ chấp nhận file .txt hoặc .csv'));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError(new Error('File quá lớn (tối đa 256 KB).'));
      return;
    }
    setError(null);
    setContent(await readImportFile(file));
    setFileName(file.name);
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const result = await apiRequest<RoomImportReport>('/admin/rooms/import', {
        method: 'POST',
        body: { content },
      });
      setReport(result);
      if (result.created.length) onImported(result);
    } catch (reason) {
      setError(reason);
    } finally {
      setBusy(false);
    }
  }

  const issues = report
    ? [...report.errors, ...report.duplicates].sort((a, b) => a.line - b.line)
    : [];

  return (
    <Modal title="Nhập danh sách phòng học" wide onClose={() => !busy && onClose()}>
      <FormError error={error} />
      {report ? (
        <>
          <p className="room-import-summary">
            Đã đọc {report.totalLines} dòng: <b>{report.created.length}</b> phòng được thêm
            {report.duplicates.length > 0 && `, ${report.duplicates.length} trùng`}
            {report.errors.length > 0 && `, ${report.errors.length} lỗi`}.
          </p>
          {issues.length > 0 && (
            <div className="table-responsive room-import-issues">
              <table className="table admin-table">
                <thead>
                  <tr>
                    <th className="numeric">Dòng</th>
                    <th>Phòng</th>
                    <th>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={`${issue.line}-${issue.reason}`}>
                      <td className="numeric">{issue.line}</td>
                      <td>{issue.name ?? '—'}</td>
                      <td>
                        <span
                          className={`badge ${WARN_REASONS.includes(issue.reason) ? 'warn' : 'locked'}`}
                        >
                          {roomImportReason(issue.reason)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="dialog-actions">
            <button className="button" onClick={() => setReport(null)}>
              Nhập tiếp
            </button>
            <button className="button primary" onClick={onClose}>
              Xong
            </button>
          </div>
        </>
      ) : (
        <DropZone label="Thả file .txt / .csv để mở">
          <p className="admin-hint">
            Mỗi dòng một phòng: <code>tên phòng</code>, <code>tòa nhà</code>, <code>sức chứa</code>,{' '}
            <code>ghi chú</code>; chỉ tên phòng bắt buộc. Ngăn cột bằng <code>|</code>,{' '}
            <code>,</code>, <code>;</code> hoặc dán thẳng từ Excel; dòng tiêu đề tự bỏ qua. Phòng
            trùng tên với phòng đã có không bị ghi đè. Có thể kéo thả file vào khung này.
          </p>
          <textarea
            className="input admin-textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={'402-A2|Nhà A2|60|Có máy chiếu\nLab 1,Nhà A3,40\n105-A1'}
            spellCheck={false}
            rows={10}
            aria-label="Danh sách phòng học"
            autoFocus
          />
          <div className="admin-import-actions">
            <label className="button">
              <Icon name="upload" size={13} />
              {fileName || 'Chọn file .txt / .csv'}
              <input
                type="file"
                accept=".txt,.csv,text/plain,text/csv"
                hidden
                onChange={handleFile}
              />
            </label>
            <button type="button" className="button" onClick={downloadSample}>
              <Icon name="download" size={13} />
              File mẫu
            </button>
            <span className="table-summary">{lines} dòng</span>
            <button
              className="button primary"
              disabled={busy || lines === 0}
              onClick={() => void submit()}
            >
              {busy ? 'Đang nhập…' : `Thêm ${lines} phòng`}
            </button>
          </div>
        </DropZone>
      )}
    </Modal>
  );
}
