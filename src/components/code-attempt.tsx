'use client';

import { formatDateTime } from '@/lib/admin';
import {
  ATTEMPT_STATUS,
  attemptLabel,
  languageLabel,
  verdictInfo,
  type AttemptView,
} from '@/lib/code';
import { CodeEditor } from '@/components/code-editor';
import { Icon } from '@/components/ui/icon';
import { DiffViewer } from '@/components/ui/diff-viewer';

/** Nhãn kết quả của một lần chạy ("AC 5/5", "Sai kết quả 3/5"...), màu theo kết quả. */
export function AttemptBadge({ attempt }: { attempt: AttemptView }) {
  const tone = attempt.status !== 'done' ? 'warn' : (verdictInfo(attempt.verdict)?.tone ?? 'muted');
  return <span className={`badge ${tone}`}>{attemptLabel(attempt)}</span>;
}

/** Danh sách các lần chạy thử / nộp bài (mới nhất trước); bấm một dòng để xem chi tiết. */
export function AttemptList({
  attempts,
  selected,
  onSelect,
}: {
  attempts: AttemptView[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="code-attempts">
      {attempts.map((attempt) => (
        <li key={attempt.id}>
          <button
            type="button"
            className={attempt.id === selected ? 'selected' : undefined}
            aria-pressed={attempt.id === selected}
            onClick={() => onSelect(attempt.id)}
          >
            <span className="code-attempt-kind">
              {attempt.kind === 'submit' ? 'Nộp bài' : 'Chạy thử'}
            </span>
            <span className="code-attempt-meta">
              {languageLabel(attempt.language)} · {formatDateTime(attempt.createdAt)}
            </span>
            <AttemptBadge attempt={attempt} />
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * Chi tiết một lần chạy: kết quả chung, lỗi biên dịch, kết quả từng test (khi có: lần chạy thử, hoặc giảng viên
 * xem; input/output mong đợi lấy từ `cases` theo thứ tự test), mã nguồn.
 */
export function AttemptDetail({
  attempt,
  cases,
  hiddenNote,
}: {
  attempt: AttemptView;
  /** Input/output mong đợi theo thứ tự kết quả. */
  cases?: ({ input: string; expected: string } | null)[];
  /** Lần nộp chưa công bố kết quả: câu giải thích thay cho kết quả. */
  hiddenNote?: string;
}) {
  const results = attempt.results ?? [];
  return (
    <div className="code-detail">
      <p className="code-detail-head">
        <AttemptBadge attempt={attempt} />
        <span>
          {attempt.kind === 'submit' ? 'Nộp bài' : 'Chạy thử với test mẫu'} ·{' '}
          {languageLabel(attempt.language)} · {formatDateTime(attempt.createdAt)}
        </span>
      </p>
      {attempt.status !== 'done' ? (
        <p className="admin-hint" role="status">
          <Icon name="clock" size={12} /> {ATTEMPT_STATUS[attempt.status]}… kết quả tự hiện khi chấm
          xong.
        </p>
      ) : attempt.verdict === null ? (
        <p className="score-pending">
          <Icon name="clock" size={12} />
          {hiddenNote ?? 'Kết quả chưa được công bố.'}
        </p>
      ) : (
        <>
          {attempt.compileOutput && (
            <details
              className="code-output"
              open={attempt.verdict === 'CE' || attempt.verdict === 'SE'}
            >
              <summary>
                {attempt.verdict === 'SE'
                  ? 'Thông báo của máy chấm'
                  : 'Thông báo của trình biên dịch'}
              </summary>
              <pre>{attempt.compileOutput}</pre>
            </details>
          )}
          {results.length > 0 && (
            <div className="table-responsive">
              <table className="table admin-table code-results">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Kết quả</th>
                    <th className="numeric">Thời gian</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => {
                    const info = verdictInfo(result.verdict);
                    const shown = cases?.[result.index] ?? null;
                    const hasDetail = shown || result.output !== null || result.error !== null;
                    return (
                      <tr key={result.index}>
                        <td>
                          {result.index + 1}
                          {result.sample && <span className="badge muted">mẫu</span>}
                        </td>
                        <td>
                          <span className={`badge ${info?.tone ?? 'muted'}`}>
                            {info?.label ?? result.verdict}
                          </span>
                        </td>
                        <td className="numeric">{result.timeMs} ms</td>
                        <td>
                          {hasDetail ? (
                            <details className="code-case" open={result.verdict === 'WA'}>
                              <summary>Xem chi tiết</summary>
                              {shown && result.output !== null ? (
                                <DiffViewer
                                  expected={shown.expected}
                                  actual={result.output}
                                  input={shown.input}
                                  className="mt-2 min-w-[480px]"
                                />
                              ) : (
                                <>
                                  {shown && (
                                    <>
                                      <small>Input</small>
                                      <pre>{shown.input || '(trống)'}</pre>
                                      <small>Output mong đợi</small>
                                      <pre>{shown.expected}</pre>
                                    </>
                                  )}
                                  {result.output !== null && (
                                    <>
                                      <small>Output của bài</small>
                                      <pre>{result.output}</pre>
                                    </>
                                  )}
                                </>
                              )}
                              {result.error !== null && (
                                <>
                                  <small className="mt-2 block font-semibold text-rose-600">Lỗi thực thi (stderr)</small>
                                  <pre className="rounded bg-rose-50 p-2 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{result.error}</pre>
                                </>
                              )}
                            </details>
                          ) : (
                            <span className="table-sub">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {attempt.source !== null && (
        <details className="code-output">
          <summary>Mã nguồn ({attempt.source.split('\n').length} dòng)</summary>
          <CodeEditor
            value={attempt.source}
            language={attempt.language}
            readOnly
            label="Mã nguồn đã nộp"
            fontSize={13}
            minHeight={80}
          />
        </details>
      )}
    </div>
  );
}
