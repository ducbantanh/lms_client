'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import {
  JUDGE_FALLBACK_POLL_MS,
  PROBLEM_STATUS,
  codeBody,
  codeResultsCsvUrl,
  codeDraftProblem,
  codeRequest,
  draftFromTeacher,
  formatSeconds,
  languageLabel,
  problemLabel,
  type AttemptView,
  type CodeDraft,
  type CodeResults,
  type ResultCell,
  type ResultRow,
  type StudentCode,
  type TeacherCode,
  type TestView,
} from '@/lib/code';
import { formatSize } from '@/lib/teaching';
import { useCodeJudged } from '@/hooks/use-code-judged';
import { ConfirmDialog, type ConfirmRequest, type Flash } from '@/components/admin-ui';
import { AttemptDetail, AttemptList } from '@/components/code-attempt';
import { CodeFields } from '@/components/code-problem-editor';
import { StatCard } from '@/components/ui/stat-card';
import { Icon } from '@/components/ui/icon';

/** /teacher/courses/{id}/assessments/{aid}. */
function assessmentBase(courseId: string, assessmentId: string) {
  return `/teacher/courses/${encodeURIComponent(courseId)}/assessments/${encodeURIComponent(assessmentId)}`;
}

/** Test lớn chỉ có phần đầu: đánh dấu là đã cắt. */
function preview(text: string, truncated: boolean) {
  if (truncated) return `${text}\n… (đã cắt; tải bộ test để xem đủ)`;
  return text || '(trống)';
}

/** "5/5" trong ô bảng (đủ chữ ở tooltip). */
function cellText(cell: ResultCell) {
  if (cell.best && cell.status !== 'pending') {
    if (cell.best.verdict === 'CE') return 'CE';
    return `${cell.best.passed}/${cell.best.total}`;
  }
  return cell.status === 'pending' ? '…' : '';
}

/**
 * Trang Bài nộp của bài lập trình (không có điểm): bảng sinh viên × câu, mỗi ô tô màu như phía sinh viên (xanh đúng,
 * đỏ chưa đúng, vàng đang chấm) và hiện số test đúng của lần nộp tốt nhất. Bấm một ô để xem các lần nộp của sinh viên
 * ở câu đó (mã nguồn, kết quả từng test). Dưới bảng là các câu và bộ test: sửa, chấm lại, tải bộ test.
 */
export function CodeResultsPage({
  courseId,
  assessmentId,
  canEdit,
  notify,
}: {
  courseId: string;
  assessmentId: string;
  canEdit: boolean;
  notify: (flash: Flash) => void;
}) {
  const base = assessmentBase(courseId, assessmentId);
  const [data, setData] = useState<CodeResults | null>(null);
  const [error, setError] = useState('');
  /** Ô đang xem: sinh viên và câu. */
  const [selected, setSelected] = useState<{ studentId: string; problemId: string } | null>(null);

  const load = useCallback(
    () =>
      apiRequest<CodeResults>(`${base}/code/results`)
        .then((next) => {
          setData(next);
          setError('');
        })
        .catch((reason) =>
          setError(reason instanceof Error ? reason.message : 'Không tải được kết quả.'),
        ),
    [base],
  );

  useEffect(() => {
    void load();
  }, [load]);

  // Sinh viên nộp bài và chấm xong: server báo qua WebSocket, bảng cập nhật ngay
  useCodeJudged(assessmentId, (event) => {
    if (event.kind === 'submit') void load();
  });
  // Dự phòng khi mất kết nối WebSocket: còn lần nộp đang chấm thì thỉnh thoảng hỏi lại
  const pending = !!data?.rows.some((row) => row.cells.some((cell) => cell.status === 'pending'));
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => void load(), JUDGE_FALLBACK_POLL_MS);
    return () => clearTimeout(timer);
  }, [pending, data, load]);

  if (error)
    return (
      <p className="form-error" role="alert">
        {error}
      </p>
    );
  if (!data)
    return (
      <p className="empty-cell" role="status">
        Đang tải kết quả…
      </p>
    );

  const row = selected ? data.rows.find((item) => item.studentId === selected.studentId) : null;
  const problemIndex = selected
    ? data.problems.findIndex((problem) => problem.id === selected.problemId)
    : -1;
  if (row && problemIndex >= 0)
    return (
      <StudentAttempts
        key={`${row.studentId}-${selected!.problemId}`}
        base={base}
        row={row}
        problem={{ ...data.problems[problemIndex], number: problemIndex + 1 }}
        onBack={() => setSelected(null)}
      />
    );

  const submitted = data.rows.filter((item) => item.cells.some((cell) => cell.attempts > 0)).length;
  const allAccepted = data.rows.filter(
    (item) => item.cells.length > 0 && item.cells.every((cell) => cell.status === 'accepted'),
  ).length;
  return (
    <>
      <div className="stats cols-4">
        <StatCard label="Sinh viên" value={data.rows.length} icon="users" tone="blue" />
        <StatCard label="Đã nộp" value={submitted} icon="upload" tone="green" />
        <StatCard label="Số câu" value={data.problems.length} icon="list" tone="violet" />
        <StatCard label="Đúng hết các câu" value={allAccepted} icon="check" tone="red" />
      </div>
      <section className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon blue">
              <Icon name="list" size={12} />
            </i>
            Kết quả theo câu
          </h2>
          <span className="code-legend">
            <i className="accepted" /> Đúng hết <i className="rejected" /> Chưa đúng{' '}
            <i className="pending" /> Đang chấm
          </span>
          {data.rows.length > 0 && (
            // Server trả file CSV (Content-Disposition: attachment) nên link thường là đủ
            <a className="button small" href={codeResultsCsvUrl(courseId, assessmentId)} download>
              <Icon name="download" size={12} />
              Xuất CSV
            </a>
          )}
        </div>
        {data.rows.length ? (
          <div className="table-responsive">
            <table className="table admin-table code-matrix">
              <thead>
                <tr>
                  <th>MSSV</th>
                  <th>Họ tên</th>
                  {data.problems.map((problem, index) => (
                    <th key={problem.id} className="code-matrix-col" title={problem.title}>
                      Câu {index + 1}
                    </th>
                  ))}
                  <th className="numeric">Số câu đúng</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((item) => (
                  <ResultLine
                    key={item.studentId}
                    row={item}
                    problems={data.problems}
                    onOpen={(problemId) => setSelected({ studentId: item.studentId, problemId })}
                  />
                ))}
                <tr className="code-matrix-total">
                  <td colSpan={2}>Số sinh viên đúng</td>
                  {data.problems.map((problem, index) => (
                    <td key={problem.id} className="code-matrix-col">
                      {data.rows.filter((item) => item.cells[index]?.status === 'accepted').length}/
                      {data.rows.length}
                    </td>
                  ))}
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-cell">Khóa học chưa có sinh viên.</p>
        )}
        <p className="admin-hint">
          Mỗi ô là lần nộp tốt nhất của sinh viên ở câu đó (số test đúng / tổng số test). Bấm vào ô
          để xem các lần nộp, mã nguồn và kết quả từng test.
        </p>
      </section>
      <ProblemsPanel
        courseId={courseId}
        assessmentId={assessmentId}
        base={base}
        canEdit={canEdit}
        notify={notify}
        onRegraded={load}
      />
    </>
  );
}

function ResultLine({
  row,
  problems,
  onOpen,
}: {
  row: ResultRow;
  problems: { id: string; title: string }[];
  onOpen: (problemId: string) => void;
}) {
  const accepted = row.cells.filter((cell) => cell.status === 'accepted').length;
  return (
    <tr>
      <td className="mono">{row.username}</td>
      <td>{row.fullName}</td>
      {row.cells.map((cell, index) => {
        const status = PROBLEM_STATUS[cell.status];
        const label = `Câu ${index + 1} – ${problems[index]?.title ?? ''}: ${problemLabel(cell)}${
          cell.attempts ? ` · ${cell.attempts} lần nộp` : ''
        }`;
        return (
          <td key={cell.problemId} className="code-matrix-col">
            <button
              type="button"
              className={`code-cell-button ${status.tone}`}
              title={label}
              aria-label={`${row.fullName}, ${label}`}
              onClick={() => onOpen(cell.problemId)}
            >
              {cellText(cell) || '—'}
            </button>
          </td>
        );
      })}
      <td className="numeric">
        {accepted}/{row.cells.length}
      </td>
    </tr>
  );
}

/** Các lần nộp của một sinh viên ở một câu: danh sách bên trái, chi tiết (mã nguồn, từng test) bên phải. */
function StudentAttempts({
  base,
  row,
  problem,
  onBack,
}: {
  base: string;
  row: ResultRow;
  problem: { id: string; title: string; number: number };
  onBack: () => void;
}) {
  const [attempts, setAttempts] = useState<AttemptView[] | null>(null);
  const [tests, setTests] = useState<TestView[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<AttemptView | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      apiRequest<StudentCode>(`${base}/submissions/${encodeURIComponent(row.studentId)}/code`, {
        signal: controller.signal,
      }),
      apiRequest<TeacherCode>(`${base}/code`, { signal: controller.signal }),
    ])
      .then(([code, teacher]) => {
        const mine = code.attempts.filter((attempt) => attempt.problemId === problem.id);
        setAttempts(mine);
        setTests(teacher.problems.find((item) => item.id === problem.id)?.tests ?? []);
        // Mặc định xem lần nộp mới nhất
        setSelected((mine.find((attempt) => attempt.kind === 'submit') ?? mine[0])?.id ?? null);
      })
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được bài làm.');
      });
    return () => controller.abort();
  }, [base, row.studentId, problem.id]);

  useEffect(() => {
    if (!selected) return;
    const controller = new AbortController();
    apiRequest<AttemptView>(`${base}/code/attempts/${encodeURIComponent(selected)}`, {
      signal: controller.signal,
    })
      .then(setDetail)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được lần nộp.');
      });
    return () => controller.abort();
  }, [base, selected]);

  const cell = row.cells.find((item) => item.problemId === problem.id);
  const shown = detail?.id === selected ? detail : null;
  const cases = (shown?.kind === 'run' ? tests.filter((test) => test.sample) : tests).map(
    (test) => ({
      input: preview(test.input, test.inputTruncated),
      expected: preview(test.expected, test.expectedTruncated),
    }),
  );
  return (
    <section className="panel">
      <div className="grader-nav">
        <button className="button small" onClick={onBack}>
          <Icon name="list" size={11} />
          Bảng kết quả
        </button>
        {cell && (
          <span className={`code-status-chip ${PROBLEM_STATUS[cell.status].tone}`}>
            {problemLabel(cell)}
          </span>
        )}
      </div>
      <h2 className="grader-student">{row.fullName}</h2>
      <p className="grader-meta">
        <span className="mono">{row.username}</span>
        <span>
          Câu {problem.number} – {problem.title}
        </span>
      </p>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : !attempts ? (
        <p className="empty-cell" role="status">
          Đang tải bài làm…
        </p>
      ) : !attempts.length ? (
        <p className="empty-cell">Sinh viên chưa chạy thử hay nộp câu này.</p>
      ) : (
        <div className="columns code-review-columns">
          <div>
            <p className="admin-hint">
              {attempts.filter((attempt) => attempt.kind === 'submit').length} lần nộp,{' '}
              {attempts.filter((attempt) => attempt.kind === 'run').length} lần chạy thử gần nhất.
            </p>
            <AttemptList attempts={attempts} selected={selected} onSelect={setSelected} />
          </div>
          <div>
            {shown ? (
              <AttemptDetail attempt={shown} cases={cases} />
            ) : (
              selected && (
                <p className="empty-cell" role="status">
                  Đang tải lần nộp…
                </p>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Các câu và bộ test của bài; giảng viên phụ trách sửa (câu có bộ test hoặc giới hạn đổi thì mọi lần nộp của câu
 * được chấm lại) hoặc bấm chấm lại. Đang chấm lại thì hỏi lại tiến độ định kỳ và tải lại bảng kết quả khi xong.
 */
function ProblemsPanel({
  courseId,
  assessmentId,
  base,
  canEdit,
  notify,
  onRegraded,
}: {
  courseId: string;
  assessmentId: string;
  base: string;
  canEdit: boolean;
  notify: (flash: Flash) => void;
  onRegraded: () => void;
}) {
  const [code, setCode] = useState<TeacherCode | null>(null);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<CodeDraft | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);

  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<TeacherCode>(`${base}/code`, { signal })
        .then(setCode)
        .catch((reason) => {
          if (!signal?.aborted)
            setError(reason instanceof Error ? reason.message : 'Không tải được đề.');
        }),
    [base],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Đang chấm lại: mỗi lần nộp chấm xong (code.judged) thì cập nhật tiến độ; xong hết thì tải lại bảng kết quả
  const pending = code?.pending ?? 0;
  useCodeJudged(assessmentId, () => {
    if (pending > 0) void load();
  });
  const wasPending = useRef(false);
  useEffect(() => {
    if (pending > 0) {
      wasPending.current = true;
      const timer = setTimeout(() => void load(), JUDGE_FALLBACK_POLL_MS);
      return () => clearTimeout(timer);
    }
    if (wasPending.current) {
      wasPending.current = false;
      onRegraded();
    }
  }, [pending, code, load, onRegraded]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const problemText = codeDraftProblem(draft);
    if (problemText) {
      setFormError(problemText);
      return;
    }
    setBusy(true);
    setFormError('');
    const request = codeRequest(draft);
    try {
      setCode(
        await apiRequest<TeacherCode>(`${base}/code`, {
          method: 'PUT',
          body: codeBody(request.code, request.files),
        }),
      );
      setDraft(null);
      onRegraded();
      notify({
        type: 'success',
        text: 'Đã lưu các câu; câu có bộ test thay đổi đang được chấm lại.',
      });
    } catch (reason) {
      setFormError(reason instanceof Error ? reason.message : 'Không lưu được.');
    } finally {
      setBusy(false);
    }
  }

  function rejudge() {
    setConfirm({
      title: 'Chấm lại',
      message: 'Chấm lại mọi lần nộp của bài này với bộ test hiện tại?',
      confirmLabel: 'Chấm lại',
      run: async () => {
        try {
          setCode(await apiRequest<TeacherCode>(`${base}/code/rejudge`, { method: 'POST' }));
        } catch (reason) {
          notify({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không chấm lại được.',
          });
        }
      },
    });
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon violet">
            <Icon name="file" size={12} />
          </i>
          Các câu và bộ test
        </h2>
        {pending > 0 && <span className="badge warn">Đang chấm {pending} lần</span>}
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : !code ? (
        <p className="empty-cell" role="status">
          Đang tải đề…
        </p>
      ) : draft ? (
        <form onSubmit={save}>
          <CodeFields draft={draft} onChange={setDraft} courseId={courseId} disabled={busy} />
          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}
          <p className="admin-hint">
            Xóa một câu thì các lần nộp của sinh viên ở câu đó cũng bị xóa. Câu có bộ test hoặc giới
            hạn thay đổi được chấm lại.
          </p>
          <div className="grader-actions">
            <button className="button primary" disabled={busy}>
              {busy ? 'Đang lưu…' : 'Lưu'}
            </button>
            <button type="button" className="button" disabled={busy} onClick={() => setDraft(null)}>
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="admin-hint">Ngôn ngữ: {code.languages.map(languageLabel).join(', ')}.</p>
          {code.problems.map((problem, index) => (
            <details key={problem.id} className="code-problem-view">
              <summary>
                <Icon name="chevron" size={10} />
                <b>
                  Câu {index + 1} – {problem.title}
                </b>
                <small>
                  {formatSeconds(problem.timeLimitMs)} · {problem.memoryLimitMb} MB ·{' '}
                  {problem.tests.length} test ({problem.tests.filter((test) => test.sample).length}{' '}
                  mẫu)
                  {problem.maxAttempts !== null && ` · tối đa ${problem.maxAttempts} lần nộp`}
                </small>
              </summary>
              <p className="lesson-text">{problem.statement}</p>
              <p className="code-tests-summary">
                <span>
                  {formatSize(
                    problem.tests.reduce(
                      (sum, test) => sum + test.inputSize + test.expectedSize,
                      0,
                    ),
                  )}
                </span>
                <a
                  className="file-link"
                  href={`/api/v1${base}/code/problems/${encodeURIComponent(problem.id)}/tests.zip`}
                  download
                >
                  <Icon name="download" size={12} /> Tải bộ test (ZIP)
                </a>
              </p>
              <div className="table-responsive code-tests-table">
                <table className="table admin-table code-results">
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Input</th>
                      <th>Output mong đợi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problem.tests.map((test, i) => (
                      <tr key={test.id}>
                        <td>
                          {i + 1}
                          {test.sample && <span className="badge ok">mẫu</span>}
                          {test.name && <span className="table-sub mono">{test.name}</span>}
                        </td>
                        <td>
                          <pre className="code-cell">
                            {preview(test.input, test.inputTruncated)}
                          </pre>
                          <span className="table-sub">{formatSize(test.inputSize)}</span>
                        </td>
                        <td>
                          <pre className="code-cell">
                            {preview(test.expected, test.expectedTruncated)}
                          </pre>
                          <span className="table-sub">{formatSize(test.expectedSize)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
          {canEdit && (
            <div className="grader-actions">
              {code.editable && (
                <button className="button" onClick={() => setDraft(draftFromTeacher(code))}>
                  <Icon name="edit" size={11} />
                  Sửa các câu và bộ test
                </button>
              )}
              <button className="button" disabled={pending > 0} onClick={rejudge}>
                <Icon name="history" size={11} />
                Chấm lại tất cả
              </button>
              {!code.editable && (
                <span className="admin-hint">
                  Bài kiểm tra đã kết thúc nên không sửa được bộ test.
                </span>
              )}
            </div>
          )}
        </>
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </section>
  );
}
