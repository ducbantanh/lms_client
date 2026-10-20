'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission } from '@/lib/auth';
import { useSession } from '@/lib/session-provider';
import { formatDateTime, type PresenceChanged, type PresenceSnapshot } from '@/lib/admin';
import {
  ENROLL_METHODS,
  type CourseProgressReport,
  type EnrolledStudent,
  type StudentProgress,
  type EnrollReport,
  type StudentPick,
} from '@/lib/teaching';
import { Icon } from '@/components/icon';
import { errorFlash, type TabProps } from './course-manager';

/**
 * Id những người đang online (có WebSocket mở): ảnh chụp từ /admin/presence rồi cập nhật realtime
 * qua presence.changed. null khi tài khoản không có quyền presence.view (ẩn cột trạng thái).
 */
function useOnlineIds() {
  const { user, subscribe } = useSession();
  const allowed = hasPermission(user, 'presence.view');
  const [online, setOnline] = useState<Set<string> | null>(null);
  useEffect(() => {
    if (!allowed) return;
    const controller = new AbortController();
    apiRequest<PresenceSnapshot>('/admin/presence', { signal: controller.signal })
      .then((snapshot) => setOnline(new Set(snapshot.users.map((item) => item.id))))
      .catch(() => undefined);
    const unsubscribe = subscribe('presence.changed', (data) => {
      const event = data as PresenceChanged;
      setOnline((current) => {
        const next = new Set(current ?? []);
        if (event.online) next.add(event.userId);
        else next.delete(event.userId);
        return next;
      });
    });
    return () => {
      controller.abort();
      unsubscribe();
    };
  }, [allowed, subscribe]);
  return online;
}

/**
 * Tab Sinh viên: danh sách ghi danh kèm trạng thái online và tiến độ, cùng 3 cách thêm
 * (dán MSSV, chọn từ danh sách, mã tham gia).
 */
export function StudentsTab(props: TabProps) {
  const { base, reload, notify, confirm } = props;
  const [students, setStudents] = useState<EnrolledStudent[] | null>(null);
  const [progress, setProgress] = useState<CourseProgressReport | null>(null);
  const online = useOnlineIds();

  const loadStudents = useCallback(async () => {
    try {
      const [list, report] = await Promise.all([
        apiRequest<EnrolledStudent[]>(`${base}/students`),
        apiRequest<CourseProgressReport>(`${base}/progress`),
      ]);
      setStudents(list);
      setProgress(report);
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }, [base, notify]);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  /** Sau khi thêm/xóa: tải lại danh sách và số đếm trên tab. */
  const refresh = useCallback(async () => {
    await Promise.all([loadStudents(), reload()]);
  }, [loadStudents, reload]);

  function unenroll(student: EnrolledStudent) {
    confirm({
      title: 'Xóa khỏi khóa học',
      message: `Xóa ${student.username} – ${student.fullName} khỏi khóa học?`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/students/${encodeURIComponent(student.id)}`, {
            method: 'DELETE',
          });
          await refresh();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  const enrolled = new Set(students?.map((student) => student.id));
  const progressOf = new Map(progress?.students.map((row) => [row.studentId, row]));
  /** "3/5 bài học · 1/2 bài kiểm tra" cho tooltip của cột Tiến độ. */
  const progressDetail = (row: StudentProgress) =>
    [
      progress?.lessonsTotal && `${row.lessonsDone}/${progress.lessonsTotal} bài học`,
      progress?.assessmentsTotal &&
        `${row.assessmentsDone}/${progress.assessmentsTotal} bài kiểm tra`,
    ]
      .filter(Boolean)
      .join(' · ');

  const onlineCount = students && online ? students.filter((s) => online.has(s.id)).length : 0;

  return (
    <div className="columns">
      <section className="panel">
        {students && students.length > 0 && (
          <p className="table-summary">
            {students.length} sinh viên
            {online && (
              <>
                {' · '}
                <span className={`status-dot${onlineCount ? ' online' : ''}`} />
                {onlineCount} đang online
              </>
            )}
          </p>
        )}
        <div className="table-responsive">
          <table className="table admin-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Tiến độ</th>
                <th className="hide-sm">Cách thêm</th>
                <th className="hide-sm">Thời gian</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!students ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Đang tải…
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Chưa có sinh viên. Thêm bằng một trong các cách bên cạnh.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const row = progressOf.get(student.id);
                  return (
                    <tr key={student.id}>
                      <td className="mono">{student.username}</td>
                      <td>
                        <span className="name-with-status">
                          {online && (
                            <span
                              className={`status-dot${online.has(student.id) ? ' online' : ''}`}
                              title={online.has(student.id) ? 'Đang online' : 'Offline'}
                              aria-label={online.has(student.id) ? 'Đang online' : 'Offline'}
                              role="img"
                            />
                          )}
                          {student.fullName}
                        </span>
                      </td>
                      <td className="progress-cell">
                        {row && row.percent !== null ? (
                          <span title={progressDetail(row)}>
                            <b>{row.percent}%</b>
                            <span
                              className="progress-track"
                              role="progressbar"
                              aria-label={`Tiến độ ${student.username}`}
                              aria-valuenow={row.percent}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <span style={{ width: `${row.percent}%` }} />
                            </span>
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="hide-sm">{ENROLL_METHODS[student.method]}</td>
                      <td className="hide-sm">{formatDateTime(student.enrolledAt)}</td>
                      <td className="actions">
                        <button
                          className="icon-button row-action danger"
                          title="Xóa khỏi khóa học"
                          aria-label={`Xóa ${student.username} khỏi khóa học`}
                          onClick={() => unenroll(student)}
                        >
                          <Icon name="userMinus" size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="stack">
        <AddStudents {...props} enrolled={enrolled} onAdded={refresh} />
        <EnrollKeyPanel {...props} />
      </div>
    </div>
  );
}

function AddStudents({
  base,
  notify,
  enrolled,
  onAdded,
}: TabProps & { enrolled: Set<string>; onAdded: () => Promise<void> }) {
  const [mode, setMode] = useState<'paste' | 'pick'>('paste');
  const [text, setText] = useState('');
  const [report, setReport] = useState<EnrollReport | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StudentPick[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  // Tìm sinh viên: chờ 300 ms sau lần gõ cuối rồi mới gọi API.
  useEffect(() => {
    if (mode !== 'pick') return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      apiRequest<StudentPick[]>(`/teacher/students?q=${encodeURIComponent(query.trim())}`, {
        signal: controller.signal,
      })
        .then(setResults)
        .catch((reason) => !controller.signal.aborted && notify(errorFlash(reason)));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [mode, query, notify]);

  async function send(path: string, body: unknown) {
    setBusy(true);
    try {
      const result = await apiRequest<EnrollReport>(path, { method: 'POST', body });
      setReport(result);
      return result;
    } catch (reason) {
      notify(errorFlash(reason));
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function submitPaste() {
    const result = await send(`${base}/students/paste`, { content: text });
    if (!result) return;
    if (result.added.length) setText('');
    await onAdded();
  }

  async function submitPick() {
    const result = await send(`${base}/students`, { userIds: [...picked] });
    if (!result) return;
    setPicked(new Set());
    await onAdded();
  }

  function toggle(id: string) {
    const next = new Set(picked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicked(next);
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon green">
            <Icon name="userPlus" size={12} />
          </i>
          Thêm sinh viên
        </h2>
      </div>
      <div className="segmented" role="tablist">
        {(
          [
            ['paste', 'Dán MSSV'],
            ['pick', 'Chọn từ danh sách'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            aria-selected={mode === value}
            className={mode === value ? 'selected' : ''}
            onClick={() => {
              setMode(value);
              setReport(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === 'paste' ? (
        <>
          <textarea
            className="input admin-textarea short"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={'B21DCCN001\nB21DCCN002, B21DCCN003'}
            aria-label="Danh sách MSSV"
            maxLength={20000}
          />
          <p className="admin-hint">
            Mỗi dòng một MSSV, hoặc ngăn cách bằng dấu phẩy/khoảng trắng.
          </p>
          <button
            className="button primary full-width"
            disabled={busy || !text.trim()}
            onClick={submitPaste}
          >
            {busy ? 'Đang thêm…' : 'Thêm vào khóa học'}
          </button>
        </>
      ) : (
        <>
          <label className="search-field full-width">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm sinh viên</span>
            <input
              className="input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo MSSV hoặc họ tên…"
              maxLength={64}
            />
          </label>
          <ul className="pick-list">
            {results.length === 0 ? (
              <li className="empty-cell">Không có sinh viên phù hợp.</li>
            ) : (
              results.map((student) => {
                const already = enrolled.has(student.id);
                return (
                  <li key={student.id}>
                    <label className={already ? 'is-disabled' : ''}>
                      <input
                        type="checkbox"
                        disabled={already}
                        checked={already || picked.has(student.id)}
                        onChange={() => toggle(student.id)}
                      />
                      <span className="mono">{student.username}</span>
                      <span className="pick-name">{student.fullName}</span>
                      {already && <span className="badge muted">Đã có</span>}
                    </label>
                  </li>
                );
              })
            )}
          </ul>
          <button
            className="button primary full-width"
            disabled={busy || picked.size === 0}
            onClick={submitPick}
          >
            {busy
              ? 'Đang thêm…'
              : picked.size
                ? `Thêm ${picked.size} sinh viên đã chọn`
                : 'Chọn sinh viên để thêm'}
          </button>
        </>
      )}
      {report && <EnrollSummary report={report} />}
    </section>
  );
}

function EnrollSummary({ report }: { report: EnrollReport }) {
  const lines: [string, string[], string][] = [
    ['Đã có trong khóa', report.alreadyEnrolled, 'muted'],
    ['Không tìm thấy tài khoản', report.notFound, 'locked'],
    ['Không phải tài khoản sinh viên', report.notStudent, 'warn'],
  ];
  return (
    <div className="enroll-report" role="status">
      <p>
        <span className="badge ok">{report.added.length}</span>
        sinh viên được thêm.
      </p>
      {lines
        .filter(([, items]) => items.length)
        .map(([label, items, tone]) => (
          <p key={label}>
            <span className={`badge ${tone}`}>{items.length}</span>
            {label}: <span className="mono">{items.join(', ')}</span>
          </p>
        ))}
    </div>
  );
}

/** Mã tham gia: sinh viên tự nhập để vào khóa học; tạo mã mới thì mã cũ hết hiệu lực. */
function EnrollKeyPanel({ content, base, reload, notify, confirm }: TabProps) {
  const key = content.course.enrollKey;
  const [busy, setBusy] = useState(false);

  async function run(method: 'POST' | 'DELETE') {
    setBusy(true);
    try {
      await apiRequest(`${base}/enroll-key`, { method, body: method === 'POST' ? {} : undefined });
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    } finally {
      setBusy(false);
    }
  }

  function renew() {
    if (!key) {
      void run('POST');
      return;
    }
    confirm({
      title: 'Tạo mã mới',
      message: 'Mã hiện tại sẽ không dùng được nữa. Sinh viên đã tham gia vẫn ở lại khóa học.',
      confirmLabel: 'Tạo mã mới',
      run: () => run('POST'),
    });
  }

  async function copy() {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      notify({ type: 'success', text: 'Đã sao chép mã tham gia.' });
    } catch {
      notify({ type: 'error', text: 'Trình duyệt không cho sao chép; hãy chép mã thủ công.' });
    }
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon violet">
            <Icon name="key" size={12} />
          </i>
          Mã tham gia
        </h2>
      </div>
      <div className="enroll-key">
        {key ? (
          <>
            <code>{key}</code>
            <button
              className="icon-button"
              title="Sao chép"
              aria-label="Sao chép mã"
              onClick={copy}
            >
              <Icon name="copy" size={14} />
            </button>
          </>
        ) : (
          <span>Đang tắt</span>
        )}
      </div>
      <p className="admin-hint">Sinh viên nhập mã ở trang Khóa học để tự tham gia.</p>
      <div className="button-row">
        <button className="button" disabled={busy} onClick={renew}>
          {key ? 'Tạo mã mới' : 'Bật mã tham gia'}
        </button>
        {key && (
          <button className="button" disabled={busy} onClick={() => run('DELETE')}>
            Tắt
          </button>
        )}
      </div>
    </section>
  );
}
