'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import {
  LEAVE_FILE_ACCEPT,
  LEAVE_MAX_FILES,
  LEAVE_REASON_MAX,
  LEAVE_REASON_MIN,
  evidenceProblem,
  leaveRequestPath,
  type LeaveRequest,
} from '@/lib/leave';
import { dayLabel, periodLabel, type Meeting } from '@/lib/schedule';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

/** Sinh viên viết lý do xin nghỉ một buổi học, đính kèm tối đa 3 minh chứng (ảnh, PDF) và gửi giảng viên. */
export function LeaveDialog({
  meeting,
  onClose,
  onSent,
}: {
  meeting: Meeting;
  onClose: () => void;
  onSent: (request: LeaveRequest) => void;
}) {
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const text = reason.trim();

  function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const picked = [...(input.files ?? [])];
    input.value = '';
    const problem = picked.map(evidenceProblem).find(Boolean);
    if (problem) {
      setError(problem);
      return;
    }
    const next = [...files, ...picked];
    if (next.length > LEAVE_MAX_FILES) {
      setError(`Tối đa ${LEAVE_MAX_FILES} file minh chứng.`);
      return;
    }
    setError('');
    setFiles(next);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (text.length < LEAVE_REASON_MIN) {
      setError(`Lý do cần ít nhất ${LEAVE_REASON_MIN} ký tự.`);
      return;
    }
    setBusy(true);
    setError('');
    const form = new FormData();
    form.append('reason', text);
    files.forEach((file) => form.append('files', file));
    try {
      onSent(
        await apiRequest<LeaveRequest>(leaveRequestPath(meeting.id), {
          method: 'POST',
          body: form,
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof ApiError && reason.code === 'UNSUPPORTED_FILE_TYPE'
          ? 'Minh chứng chỉ nhận ảnh JPG, PNG hoặc file PDF (nội dung file phải đúng loại).'
          : reason instanceof Error
            ? reason.message
            : 'Không gửi được đơn.',
      );
      setBusy(false);
    }
  }

  return (
    <Modal title="Xin nghỉ buổi học" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p className="leave-meeting">
          <b>
            {meeting.course.code} · {meeting.course.title}
          </b>
          <br />
          {dayLabel(meeting.date)}, {periodLabel(meeting.startPeriod, meeting.periods)}, phòng{' '}
          {meeting.room.name}
        </p>
        <label className="form-field">
          <span>Lý do xin nghỉ</span>
          <textarea
            className="input"
            rows={4}
            value={reason}
            maxLength={LEAVE_REASON_MAX}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Vd. Em bị sốt, có giấy khám bệnh của trạm y tế."
            required
            autoFocus
          />
          <small className="field-hint">
            {text.length}/{LEAVE_REASON_MAX} ký tự
          </small>
        </label>
        <div className="form-field">
          <span>
            Minh chứng{' '}
            <span className="optional">
              (không bắt buộc, tối đa {LEAVE_MAX_FILES} file ảnh hoặc PDF)
            </span>
          </span>
          {files.length > 0 && (
            <ul className="leave-files">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <Icon name="file" size={12} />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Bỏ ${file.name}`}
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  >
                    <Icon name="close" size={10} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {files.length < LEAVE_MAX_FILES && (
            <label className="button leave-pick">
              <Icon name="upload" size={12} />
              Thêm file
              <input type="file" accept={LEAVE_FILE_ACCEPT} multiple hidden onChange={addFiles} />
            </label>
          )}
        </div>
        <p className="admin-hint">
          Hạn gửi đơn: <b>{formatDateTime(meeting.leaveDeadline)}</b>. Đơn chờ giảng viên duyệt thì
          vẫn rút lại được; duyệt xong bạn nhận thông báo và được ghi &quot;có phép&quot; ở buổi
          này.
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang gửi…' : 'Gửi đơn'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
