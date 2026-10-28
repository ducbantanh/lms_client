'use client';

import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { countImportLines, importReason, readImportFile, type ImportReport } from '@/lib/admin';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { DropZone } from '@/components/ui/drop-zone';
import { Icon, type IconName } from '@/components/ui/icon';

/** Khớp giới hạn app.student-import.max-bytes của server (256 KB). */
const MAX_FILE_BYTES = 256 * 1024;

/** Vai trò tạo được bằng import (AccountImportService.importableRole): 5 sinh viên, 1 giảng viên. */
type ImportRole = 5 | 1;
const ROLES: Record<
  ImportRole,
  { label: string; code: string; icon: IconName; description: string; sample: string[] }
> = {
  5: {
    label: 'Sinh viên',
    code: 'MSSV',
    icon: 'cap',
    description: 'Đăng nhập bằng MSSV, học và nộp bài trong các khóa được ghi danh',
    sample: ['B21DCCN001,01012003,Nguyễn Văn A', 'B21DCCN002,15/02/2003,Trần Thị B'],
  },
  1: {
    label: 'Giảng viên',
    code: 'Mã giảng viên',
    icon: 'teach',
    description: 'Đăng nhập bằng mã giảng viên, phụ trách các khóa được admin phân công',
    sample: ['GV001,20051980,Lê Văn Cường', 'GV002,03/09/1985,Phạm Thị Dung'],
  },
};

type Tab = 'created' | 'duplicates' | 'errors';

/** File CSV mẫu (UTF-8 có BOM để Excel mở đúng tiếng Việt) tải về ngay trên trình duyệt. */
function downloadSample(role: ImportRole) {
  const { code, sample } = ROLES[role];
  const csv = `﻿${[`${code},Ngày sinh,Họ tên`, ...sample].join('\r\n')}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = role === 1 ? 'mau-giang-vien.csv' : 'mau-sinh-vien.csv';
  link.click();
  URL.revokeObjectURL(url);
}

/** yyyy-mm-dd (ô date) → ddmmyyyy như dòng import. */
function toDdmmyyyy(value: string) {
  const [year, month, day] = value.split('-');
  return `${day}${month}${year}`;
}

/**
 * Trang /admin/import/: tạo tài khoản sinh viên hoặc giảng viên. Nhiều tài khoản: dán danh sách hoặc nạp
 * file .txt/.csv (đọc ngay trên trình duyệt và đổ vào ô text để xem lại trước khi gửi); một tài khoản: form.
 */
export function ImportView() {
  const [role, setRole] = useState<ImportRole>(5);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [report, setReport] = useState<ImportReport | null>(null);
  const [tab, setTab] = useState<Tab>('created');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const lines = countImportLines(content);
  const { label } = ROLES[role];

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!/\.(txt|csv)$/i.test(file.name)) {
      setFlash({ type: 'error', text: 'Chỉ chấp nhận file .txt hoặc .csv' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFlash({ type: 'error', text: 'File quá lớn (tối đa 256 KB).' });
      return;
    }
    setContent(await readImportFile(file));
    setFileName(file.name);
  }

  /** Gửi nội dung (nhiều dòng hoặc một dòng từ form); trả về kết quả để form biết đã tạo được chưa. */
  async function send(text: string) {
    try {
      const result = await apiRequest<ImportReport>('/admin/users/import', {
        method: 'POST',
        body: { content: text, role },
      });
      setReport(result);
      // Mở nhóm có vấn đề trước nếu có lỗi.
      setTab(
        result.errors.length
          ? 'errors'
          : result.duplicates.length && !result.created.length
            ? 'duplicates'
            : 'created',
      );
      setFlash(
        result.created.length
          ? {
              type: 'success',
              text: `Đã tạo ${result.created.length} tài khoản ${label.toLowerCase()}.`,
            }
          : { type: 'error', text: 'Không tạo được tài khoản nào. Xem phần Kết quả.' },
      );
      return result;
    } catch (reason) {
      setFlash({ type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi.' });
      return null;
    }
  }

  function askImport() {
    if (lines === 0) {
      setFlash({ type: 'error', text: 'Chưa có dòng dữ liệu nào.' });
      return;
    }
    setConfirm({
      title: `Tạo tài khoản ${label.toLowerCase()}`,
      message: `Tạo tài khoản ${label.toLowerCase()} cho ${lines} dòng dữ liệu? Tài khoản đã có sẽ không bị ghi đè.`,
      confirmLabel: 'Tạo tài khoản',
      run: async () => {
        await send(content);
      },
    });
  }

  const tabs: { key: Tab; label: string; count: number }[] = report
    ? [
        { key: 'created', label: 'Đã tạo', count: report.created.length },
        { key: 'duplicates', label: 'Trùng', count: report.duplicates.length },
        { key: 'errors', label: 'Lỗi', count: report.errors.length },
      ]
    : [];

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Tạo tài khoản"
        description="Tạo tài khoản sinh viên hoặc giảng viên. Mật khẩu ban đầu là ngày sinh (ddmmyyyy), người dùng phải đổi ở lần đăng nhập đầu."
      >
        {/* Nút chuyển loại tài khoản; rê chuột để xem mô tả */}
        <div
          className="inline-flex shrink-0 gap-1 rounded-sm border border-line bg-surface-muted p-1"
          role="radiogroup"
          aria-label="Loại tài khoản"
        >
          {([5, 1] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={role === value}
              className={`inline-flex h-8.5 items-center gap-2 rounded-[3px] px-4 text-[13px] font-semibold transition focus-visible:outline-primary-600/20 ${
                role === value
                  ? 'bg-white text-primary-600 shadow-[0_1px_2px_rgb(16_24_40/0.08),0_0_0_1px_var(--color-line)]'
                  : 'text-ink-muted hover:text-ink'
              }`}
              title={ROLES[value].description}
              onClick={() => setRole(value)}
            >
              <Icon
                name={ROLES[value].icon}
                size={14}
                className={role === value ? 'text-primary-600' : 'text-ink-subtle'}
              />
              {ROLES[value].label}
            </button>
          ))}
        </div>
      </AdminHeading>
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="columns even">
        <div className="stack">
          <DropZone className="panel" label="Thả file .txt / .csv để mở">
            <div className="panel-title">
              <h2>Danh sách {label.toLowerCase()}</h2>
              <span>{lines} dòng</span>
            </div>
            <p className="admin-hint">
              Mỗi dòng 3 cột: <code>{ROLES[role].code}</code>, <code>ngày sinh</code>,{' '}
              <code>họ tên</code>. File <b>.txt</b> ngăn bằng <code>|</code>; file <b>.csv</b> ngăn
              bằng <code>,</code> hoặc <code>;</code> (dòng tiêu đề tự bỏ qua); dán từ Excel cũng
              được. Ngày sinh dạng <code>ddmmyyyy</code>, <code>dd/mm/yyyy</code> hoặc{' '}
              <code>yyyy-mm-dd</code>. Có thể kéo thả file vào khung này.
            </p>
            <textarea
              className="input admin-textarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={`${ROLES[role].sample[0].replaceAll(',', '|')}\n${ROLES[role].sample[1]}`}
              spellCheck={false}
              rows={12}
              aria-label={`Danh sách ${label.toLowerCase()}`}
            />
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
              <button className="button" onClick={() => downloadSample(role)}>
                <Icon name="download" size={13} />
                File mẫu
              </button>
              <button
                className="button"
                onClick={() => {
                  setContent('');
                  setFileName('');
                }}
              >
                Xóa
              </button>
              <button className="button primary" onClick={askImport}>
                Tạo tài khoản
              </button>
            </div>
          </DropZone>
          <SingleAccount key={role} role={role} onSubmit={send} />
        </div>
        <section className="panel">
          <div className="panel-title">
            <h2>Kết quả</h2>
            {report && <span>{report.totalLines} dòng đã đọc</span>}
          </div>
          {!report ? (
            <p className="empty-cell">Kết quả tạo tài khoản sẽ hiện ở đây.</p>
          ) : (
            <>
              <div className="tabs" role="tablist">
                {tabs.map((item) => (
                  <button
                    key={item.key}
                    role="tab"
                    aria-selected={tab === item.key}
                    className={tab === item.key ? 'selected' : ''}
                    onClick={() => setTab(item.key)}
                  >
                    {item.label}
                    <span className="count">{item.count}</span>
                  </button>
                ))}
              </div>
              <ReportTable report={report} tab={tab} />
            </>
          )}
        </section>
      </div>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

/** Tạo nhanh một tài khoản (ví dụ một giảng viên mới) mà không cần soạn file; dùng chung API import. */
function SingleAccount({
  role,
  onSubmit,
}: {
  role: ImportRole;
  onSubmit: (text: string) => Promise<ImportReport | null>;
}) {
  const [form, setForm] = useState({ username: '', fullName: '', birthDate: '' });
  const [busy, setBusy] = useState(false);
  const { label, code } = ROLES[role];
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    const result = await onSubmit(
      `${form.username.trim()}|${toDdmmyyyy(form.birthDate)}|${form.fullName.trim()}`,
    );
    setBusy(false);
    if (result?.created.length) setForm({ username: '', fullName: '', birthDate: '' });
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon green">
            <Icon name="userPlus" size={12} />
          </i>
          Tạo một tài khoản {label.toLowerCase()}
        </h2>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label className="form-field">
            {code}
            <input
              className="input mono"
              value={form.username}
              onChange={(event) => set({ username: event.target.value })}
              maxLength={32}
              pattern="[A-Za-z0-9][A-Za-z0-9_.\-]{2,31}"
              title="3–32 ký tự: chữ, số, _ . -"
              required
            />
          </label>
          <label className="form-field">
            Ngày sinh
            <input
              className="input"
              type="date"
              value={form.birthDate}
              onChange={(event) => set({ birthDate: event.target.value })}
              required
            />
          </label>
        </div>
        <label className="form-field">
          Họ tên
          <input
            className="input"
            value={form.fullName}
            onChange={(event) => set({ fullName: event.target.value })}
            maxLength={100}
            required
          />
        </label>
        <button className="button primary" disabled={busy}>
          {busy ? 'Đang tạo…' : `Tạo tài khoản ${label.toLowerCase()}`}
        </button>
      </form>
    </section>
  );
}

function ReportTable({ report, tab }: { report: ImportReport; tab: Tab }) {
  const rows =
    tab === 'created'
      ? report.created.map((row) => ({ line: row.line, id: row.username, text: row.fullName }))
      : report[tab].map((row) => ({
          line: row.line,
          id: row.username ?? '—',
          text: importReason(row.reason),
        }));
  if (rows.length === 0) return <p className="empty-cell">Không có dòng nào.</p>;
  return (
    <div className="table-responsive max-h-105 overflow-y-auto">
      <table className="table admin-table">
        <thead>
          <tr>
            <th>Dòng</th>
            <th>Mã đăng nhập</th>
            <th>{tab === 'created' ? 'Họ tên' : 'Lý do'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.line}-${row.id}`}>
              <td className="numeric">{row.line}</td>
              <td className="mono">{row.id}</td>
              <td>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
