'use client';

import { useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import type { TeacherCourse } from '@/lib/teaching';
import { Modal } from './modal';

/** Sinh viên nhập mã tham gia do giảng viên cung cấp để tự ghi danh vào khóa học. */
export function JoinCourseDialog({
  onClose,
  onJoined,
}: {
  onClose: () => void;
  onJoined: (title: string) => void;
}) {
  const [key, setKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const course = await apiRequest<TeacherCourse>('/student/courses/join', {
        method: 'POST',
        body: { key: key.trim() },
      });
      onJoined(course.title);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tham gia được khóa học.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Tham gia khóa học" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Mã tham gia
          <input
            className="input mono"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder="Mã do giảng viên cung cấp"
            maxLength={32}
            autoComplete="off"
            required
            autoFocus
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="button primary" disabled={busy || !key.trim()}>
            {busy ? 'Đang tham gia…' : 'Tham gia'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
