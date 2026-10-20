'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { normalizeSearch } from '@/lib/course-utils';
import { CATEGORY_INFO, timeAgo, type SentNotification } from '@/lib/notifications';
import type { EnrolledStudent } from '@/lib/teaching';
import { Icon } from '@/components/icon';
import { errorFlash, type TabProps } from './course-manager';

/** Tab Thông báo: soạn thông báo gửi cả lớp hoặc một số sinh viên, xem thông báo đã gửi và số người đã đọc. */
export function NotificationsTab(props: TabProps) {
  const { base, notify, canTeach } = props;
  const [history, setHistory] = useState<SentNotification[] | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setHistory(await apiRequest<SentNotification[]>(`${base}/notifications`));
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }, [base, notify]);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  return (
    <div className={canTeach ? 'columns' : undefined}>
      <section className="panel flush">
        <div className="panel-title">
          <h2>Đã gửi</h2>
        </div>
        {history === null ? (
          <p className="empty-cell">Đang tải…</p>
        ) : history.length ? (
          <ul className="notif-list">
            {history.map((item) => {
              const info = CATEGORY_INFO[item.category];
              return (
                <li key={item.id}>
                  <div className="notif-row">
                    <i className={`title-icon ${info.tone}`}>
                      <Icon name={info.icon} size={13} />
                    </i>
                    <span className="notif-text">
                      <b>{item.title}</b>
                      {item.body && <span className="notif-body">{item.body}</span>}
                      <small>
                        <span className={`badge ${info.tone}-badge`}>{info.label}</span>
                        {item.senderName && `${item.senderName} · `}
                        <time dateTime={item.createdAt} title={formatDateTime(item.createdAt)}>
                          {timeAgo(item.createdAt)}
                        </time>
                      </small>
                    </span>
                    <span className="notif-read" title="Số sinh viên đã đọc / đã nhận">
                      <Icon name="eye" size={12} />
                      {item.read}/{item.recipients}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="empty-cell">Chưa có thông báo nào trong khóa học này.</p>
        )}
      </section>
      {canTeach && <Compose {...props} onSent={loadHistory} />}
    </div>
  );
}

function Compose({ content, base, notify, onSent }: TabProps & { onSent: () => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mode, setMode] = useState<'all' | 'pick'>('all');
  const [students, setStudents] = useState<EnrolledStudent[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const total = content.course.studentCount;

  // Danh sách lớp chỉ tải khi chọn gửi cho sinh viên cụ thể
  useEffect(() => {
    if (mode !== 'pick' || students) return;
    apiRequest<EnrolledStudent[]>(`${base}/students`)
      .then(setStudents)
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Không tải được lớp.'),
      );
  }, [mode, students, base]);

  const needle = normalizeSearch(query);
  const visible = (students ?? []).filter(
    (student) =>
      !needle ||
      normalizeSearch(student.username).includes(needle) ||
      normalizeSearch(student.fullName).includes(needle),
  );

  function toggle(id: string) {
    const next = new Set(picked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicked(next);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    if (mode === 'pick' && !picked.size) {
      setError('Chọn ít nhất một sinh viên.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const sent = await apiRequest<SentNotification>(`${base}/notifications`, {
        method: 'POST',
        body: {
          title: title.trim(),
          body: body.trim(),
          studentIds: mode === 'pick' ? [...picked] : null,
        },
      });
      notify({ type: 'success', text: `Đã gửi thông báo tới ${sent.recipients} sinh viên.` });
      setTitle('');
      setBody('');
      setPicked(new Set());
      await onSent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không gửi được thông báo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="send" size={12} />
          </i>
          Gửi thông báo
        </h2>
      </div>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Tiêu đề
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={200}
            required
          />
        </label>
        <label className="form-field">
          <span>
            Nội dung <span className="optional">(không bắt buộc)</span>
          </span>
          <textarea
            className="input"
            rows={5}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={2000}
          />
        </label>
        <div className="form-field">
          Người nhận
          <div className="segmented" role="tablist" aria-label="Người nhận">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'all'}
              className={mode === 'all' ? 'selected' : ''}
              onClick={() => setMode('all')}
            >
              Cả lớp ({total})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'pick'}
              className={mode === 'pick' ? 'selected' : ''}
              onClick={() => setMode('pick')}
            >
              Chọn sinh viên{picked.size ? ` (${picked.size})` : ''}
            </button>
          </div>
          {mode === 'pick' && (
            <>
              <input
                className="input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm theo MSSV hoặc họ tên"
                aria-label="Tìm sinh viên"
              />
              <ul className="pick-list">
                {students === null ? (
                  <li className="empty-cell">Đang tải lớp…</li>
                ) : visible.length === 0 ? (
                  <li className="empty-cell">Không có sinh viên phù hợp.</li>
                ) : (
                  visible.map((student) => (
                    <li key={student.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={picked.has(student.id)}
                          onChange={() => toggle(student.id)}
                        />
                        <span className="mono">{student.username}</span>
                        <span className="pick-name">{student.fullName}</span>
                      </label>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </div>
        <button
          className="button primary full-width"
          disabled={busy || !title.trim() || !total || (mode === 'pick' && !picked.size)}
        >
          <Icon name="send" size={12} />
          {busy ? 'Đang gửi…' : 'Gửi thông báo'}
        </button>
      </form>
    </aside>
  );
}
