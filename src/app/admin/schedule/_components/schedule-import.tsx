'use client';

import { useState, type ChangeEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { readImportFile } from '@/lib/admin';
import {
  MEETING_KINDS,
  SCHEDULE_IMPORT_SAMPLE,
  WEEKDAYS,
  conflictLabel,
  countScheduleLines,
  periodLabel,
  scheduleImportReason,
  shortDate,
  type ScheduleImportReport,
} from '@/lib/schedule';
import { DropZone } from '@/components/ui/drop-zone';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { FormError } from './schedule-forms';

/** Khớp giới hạn của POST /admin/schedules/import (256 KB, 1000 dòng). */
const MAX_FILE_BYTES = 256 * 1024;

/** File CSV mẫu (UTF-8 có BOM để Excel mở đúng tiếng Việt) tải về ngay trên trình duyệt. */
function downloadSample() {
  const csv = `﻿${SCHEDULE_IMPORT_SAMPLE.join('\r\n')}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mau-thoi-khoa-bieu.csv';
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Nhập thời khóa biểu hàng loạt: "Kiểm tra" gửi dryRun để xem trước các lịch, số buổi và lỗi (kể cả trùng lịch);
 * chỉ khi không còn dòng lỗi mới bấm "Nhập" được. Server lưu tất cả hoặc không dòng nào.
 */
export function ScheduleImportDialog({
  onClose,
  onImported,
}: {
  onClose: () => void;
  onImported: (report: ScheduleImportReport) => void;
}) {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [notify, setNotify] = useState(false);
  // Kết quả kiểm tra gắn với đúng nội dung đã gửi; sửa nội dung thì phải kiểm tra lại
  const [checked, setChecked] = useState<{ content: string; report: ScheduleImportReport } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const lines = countScheduleLines(content);
  const report = checked?.content === content ? checked.report : null;

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

  async function send(dryRun: boolean) {
    setBusy(true);
    setError(null);
    try {
      const result = await apiRequest<ScheduleImportReport>('/admin/schedules/import', {
        method: 'POST',
        body: { content, dryRun, notifyStudents: notify },
      });
      setChecked({ content, report: result });
      if (result.imported) onImported(result);
    } catch (reason) {
      setError(reason);
    } finally {
      setBusy(false);
    }
  }

  const ready = report && !report.imported && report.errors.length === 0 && report.rules.length > 0;

  return (
    <Modal title="Nhập thời khóa biểu" wide onClose={() => !busy && onClose()}>
      <FormError error={error} />
      <DropZone label="Thả file .txt / .csv để mở">
        <p className="admin-hint">
          Mỗi dòng một lịch lặp hằng tuần: <code>mã học phần</code>, <code>nhóm</code>,{' '}
          <code>thứ</code> (2–7, CN), <code>tiết bắt đầu</code>, <code>số tiết</code>,{' '}
          <code>phòng</code>, <code>từ ngày</code>, <code>đến ngày</code>, <code>hình thức</code>{' '}
          (LT / TH, bỏ trống = LT). Ngăn cột bằng <code>,</code> <code>;</code> <code>|</code> hoặc
          dán từ Excel; ngày dạng <code>dd/mm/yyyy</code>. Phòng phải có sẵn trong danh mục. Có dòng
          lỗi hoặc trùng lịch thì <b>không dòng nào được nhập</b>: sửa file rồi kiểm tra lại.
        </p>
        <textarea
          className="input admin-textarea"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={SCHEDULE_IMPORT_SAMPLE.slice(1).join('\n')}
          spellCheck={false}
          rows={8}
          aria-label="Thời khóa biểu"
          autoFocus
          disabled={report?.imported}
        />
        <label className="check-field schedule-import-notify">
          <input
            type="checkbox"
            checked={notify}
            onChange={(event) => setNotify(event.target.checked)}
          />
          Gửi thông báo lịch học cho sinh viên và giảng viên của mỗi khóa học
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="button mr-auto max-w-full cursor-pointer truncate">
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
          {report?.imported ? (
            <button className="button primary" onClick={onClose}>
              Xong
            </button>
          ) : (
            <>
              <button
                className="button"
                disabled={busy || lines === 0}
                onClick={() => void send(true)}
              >
                {busy && !ready ? 'Đang kiểm tra…' : 'Kiểm tra'}
              </button>
              <button
                className="button primary"
                disabled={busy || !ready}
                title={ready ? undefined : 'Bấm "Kiểm tra" và sửa hết lỗi trước'}
                onClick={() => void send(false)}
              >
                {ready
                  ? `Nhập ${report.rules.length} lịch (${report.meetings} buổi)`
                  : 'Nhập thời khóa biểu'}
              </button>
            </>
          )}
        </div>
      </DropZone>

      {report && (
        <div className="schedule-import-result">
          <p
            className={`room-import-summary ${report.errors.length ? 'text-danger' : ''}`}
            role="status"
          >
            {report.imported
              ? `Đã nhập ${report.rules.length} lịch, ${report.meetings} buổi học.`
              : report.errors.length
                ? `Đọc ${report.totalLines} dòng: ${report.errors.length} dòng lỗi. Chưa nhập gì; sửa các dòng dưới đây rồi kiểm tra lại.`
                : `Đọc ${report.totalLines} dòng: hợp lệ, sẽ tạo ${report.rules.length} lịch với ${report.meetings} buổi học.`}
          </p>
          {report.errors.length > 0 && (
            <div className="table-responsive room-import-issues">
              <table className="table admin-table">
                <thead>
                  <tr>
                    <th className="numeric">Dòng</th>
                    <th>Khóa học</th>
                    <th>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                  {report.errors.map((issue) => (
                    <tr key={`${issue.line}-${issue.reason}`}>
                      <td className="numeric">{issue.line}</td>
                      <td>{issue.label ?? '—'}</td>
                      <td>
                        <span className="badge locked">{scheduleImportReason(issue)}</span>
                        {issue.conflicts && issue.conflicts.length > 0 && (
                          <ul className="conflict-list">
                            {issue.conflicts.slice(0, 3).map((conflict, index) => (
                              <li key={index}>{conflictLabel(conflict)}</li>
                            ))}
                            {issue.conflicts.length > 3 && (
                              <li>… và {issue.conflicts.length - 3} buổi khác</li>
                            )}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {report.errors.length === 0 && report.rules.length > 0 && (
            <div className="table-responsive room-import-issues">
              <table className="table admin-table">
                <thead>
                  <tr>
                    <th className="numeric">Dòng</th>
                    <th>Khóa học</th>
                    <th>Lịch</th>
                    <th className="hide-sm">Thời gian áp dụng</th>
                    <th className="numeric">Số buổi</th>
                  </tr>
                </thead>
                <tbody>
                  {report.rules.map((rule) => (
                    <tr key={rule.line}>
                      <td className="numeric">{rule.line}</td>
                      <td>
                        <b>{rule.course.code}</b>
                        <small className="cell-sub">{rule.course.title}</small>
                      </td>
                      <td>
                        {WEEKDAYS[rule.weekday - 1]}, {periodLabel(rule.startPeriod, rule.periods)}
                        <small className="cell-sub">
                          Phòng {rule.room.name} · {MEETING_KINDS[rule.kind]}
                        </small>
                      </td>
                      <td className="hide-sm">
                        {shortDate(rule.startsOn)} – {shortDate(rule.endsOn)}
                      </td>
                      <td className="numeric">{rule.meetings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
