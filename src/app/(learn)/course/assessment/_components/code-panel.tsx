'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useRemaining } from '@/hooks/use-remaining';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import {
  MAX_SOURCE,
  PROBLEM_STATUS,
  STARTER_CODE,
  formatSeconds,
  hasPending,
  problemLabel,
  type AttemptView,
  type CodeLanguage,
  type CodeState,
  type ProblemDetail,
  type ProblemSummary,
} from '@/lib/code';
import { ASSESSMENT_GROUPS, formatDuration, scorePending, type Assessment } from '@/lib/teaching';
import { ConfirmDialog, type ConfirmRequest } from '@/components/admin-ui';
import { AttemptDetail, AttemptList } from '@/components/code-attempt';
import { CodeEditor } from '@/components/code-editor';
import { Icon } from '@/components/ui/icon';

/** Còn lần chạy chờ chấm thì hỏi lại server sau chừng này. */
const POLL_MS = 1500;
const FONT_SIZES = [12, 13, 14, 16, 18, 20];

/**
 * Bài lập trình của sinh viên (assessment.answerMode = 2). Không có ?p: danh sách câu, mỗi câu tô màu theo tình
 * trạng (xanh đúng, đỏ chưa đúng, vàng đang chấm, mặc định chưa làm). Có ?p=<id câu>: đề, test mẫu, ô soạn code,
 * chạy thử / nộp bài và các lần nộp của câu đó. Không có điểm: mỗi câu chỉ hiện số test đúng.
 */
export function CodePanel({
  assessment,
  back,
  onSubmitted,
}: {
  assessment: Assessment;
  back: string;
  /** Lần nộp đầu: trang cha tải lại để nhãn trạng thái bài làm khớp. */
  onSubmitted: () => void;
}) {
  const problemId = useSearchParams().get('p');
  const base = `/student/assessments/${encodeURIComponent(assessment.id)}/code`;
  const [state, setState] = useState<CodeState | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');

  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<CodeState>(base, { signal })
        .then((next) => {
          setOffset(Date.parse(next.serverTime) - Date.now());
          setState(next);
          setError('');
        })
        .catch((reason) => {
          if (!signal?.aborted)
            setError(reason instanceof Error ? reason.message : 'Không tải được bài.');
        }),
    [base],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Còn câu đang chấm thì hỏi lại định kỳ (màu của câu đổi khi chấm xong)
  const pending = !!state?.problems.some((problem) => problem.status === 'pending');
  useEffect(() => {
    if (!pending || problemId) return;
    const timer = setTimeout(() => void load(), POLL_MS);
    return () => clearTimeout(timer);
  }, [pending, problemId, state, load]);

  // Hết giờ thì tải lại: server không nhận chạy/nộp nữa
  const left = useRemaining(state?.open ? assessment.closesAt : null, offset, () => void load());

  if (error)
    return (
      <section className="panel">
        <p className="form-error" role="alert">
          {error}
        </p>
      </section>
    );
  if (!state)
    return (
      <section className="panel">
        <p className="empty-cell" role="status">
          Đang tải bài…
        </p>
      </section>
    );

  const listHref = `/course/assessment/?id=${encodeURIComponent(assessment.id)}`;
  const timer = state.open && left !== null && (
    <p className={`time-left${left < 5 * 60_000 ? ' urgent' : ''}`} role="timer">
      <Icon name="clock" size={13} />
      Còn lại <b>{formatDuration(left)}</b>
    </p>
  );
  const current = problemId ? state.problems.find((problem) => problem.id === problemId) : null;

  if (current)
    return (
      <ProblemView
        key={current.id}
        assessment={assessment}
        base={base}
        state={state}
        summary={current}
        listHref={listHref}
        timer={timer}
        onChanged={() => {
          if (!state.problems.some((problem) => problem.attemptsUsed > 0)) onSubmitted();
          void load();
        }}
      />
    );

  const pendingScore = scorePending(assessment, Date.parse(state.serverTime));
  const done = state.problems.filter((problem) => problem.status === 'accepted').length;
  return (
    <section className="panel code-problems">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="list" size={12} />
          </i>
          Danh sách câu
        </h2>
        {!state.resultsHidden && (
          <span>
            Đúng {done}/{state.problems.length} câu
          </span>
        )}
      </div>
      {timer}
      {state.resultsHidden && pendingScore && (
        <p className="score-pending">
          <Icon name="clock" size={12} />
          {pendingScore.at
            ? `Kết quả các lần nộp được công bố sau giờ đóng bài (${formatDateTime(pendingScore.at)}). Chạy thử với test mẫu vẫn xem được kết quả.`
            : 'Giảng viên không công bố kết quả các lần nộp. Chạy thử với test mẫu vẫn xem được kết quả.'}
        </p>
      )}
      <ol className="code-problem-rows">
        {state.problems.map((problem) => {
          const status = PROBLEM_STATUS[problem.status];
          return (
            <li key={problem.id}>
              <Link
                href={`${listHref}&p=${encodeURIComponent(problem.id)}`}
                className={`code-problem-row ${status.tone}`}
              >
                <span className="code-problem-number">Câu {problem.number}</span>
                <span className="code-problem-title">
                  <b>{problem.title}</b>
                  <small>
                    {formatSeconds(problem.timeLimitMs)} · {problem.memoryLimitMb} MB ·{' '}
                    {problem.testCount} test
                    {problem.attemptsUsed > 0 &&
                      ` · đã nộp ${problem.attemptsUsed}${problem.maxAttempts ? `/${problem.maxAttempts}` : ''} lần`}
                  </small>
                </span>
                <span className="code-problem-result">
                  {problem.status === 'accepted' && <Icon name="check" size={12} />}
                  {problemLabel(problem)}
                </span>
                <Icon name="chevron" size={11} />
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="admin-hint">
        Câu xanh: đã có lần nộp đúng hết các test. Câu đỏ: đã nộp nhưng chưa đúng hết. Câu vàng:
        đang chấm. Bấm vào một câu để xem đề và làm bài.
      </p>
      {!state.open && (
        <Link href={back} className="button">
          Về danh sách {ASSESSMENT_GROUPS[assessment.type].noun}
        </Link>
      )}
    </section>
  );
}

/** Một câu: đề, test mẫu, ô soạn code (giữ trong trình duyệt theo câu và ngôn ngữ), các lần chạy/nộp. */
function ProblemView({
  assessment,
  base,
  state,
  summary,
  listHref,
  timer,
  onChanged,
}: {
  assessment: Assessment;
  base: string;
  state: CodeState;
  summary: ProblemSummary;
  listHref: string;
  timer: React.ReactNode;
  /** Vừa nộp / chấm xong: trang cha tải lại danh sách câu. */
  onChanged: () => void;
}) {
  const problemBase = `${base}/problems/${encodeURIComponent(summary.id)}`;
  const [data, setData] = useState<ProblemDetail | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<AttemptView | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [savedLanguage, setLanguage] = useLocalStorage(`lms.code.${assessment.id}.language`);
  const [savedFont, setFont] = useLocalStorage('lms.code.fontSize');
  const fontSize = FONT_SIZES.includes(Number(savedFont)) ? Number(savedFont) : 14;
  const allowed = state.languages;
  const language: CodeLanguage =
    allowed.find((item) => item.code === savedLanguage)?.code ?? allowed[0]?.code ?? 'cpp';
  const [savedSource, setSource] = useLocalStorage(
    `lms.code.${assessment.id}.${summary.id}.${language}`,
  );
  const source = savedSource ?? STARTER_CODE[language];

  // onChanged là hàm mới mỗi lần trang cha vẽ lại (đồng hồ đếm ngược vẽ lại mỗi giây): giữ trong ref để load
  // không đổi, nếu không hẹn giờ hỏi lại server bị hủy và đặt lại liên tục, không bao giờ chạy
  const changed = useRef(onChanged);
  useEffect(() => {
    changed.current = onChanged;
  });
  const wasPending = useRef(false);
  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<ProblemDetail>(problemBase, { signal })
        .then((next) => {
          // Có lần nộp vừa chấm xong: danh sách câu ở trang cha cần tải lại (đổi màu)
          const nowPending = hasPending(next.attempts);
          if (wasPending.current && !nowPending) changed.current();
          wasPending.current = nowPending;
          setData(next);
          setError('');
        })
        .catch((reason) => {
          if (!signal?.aborted)
            setError(reason instanceof Error ? reason.message : 'Không tải được câu.');
        }),
    [problemBase],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const pending = !!data && hasPending(data.attempts);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => void load(), POLL_MS);
    return () => clearTimeout(timer);
  }, [pending, data, load]);

  // Lần đang xem chấm xong (hoặc mới chọn) thì tải chi tiết
  const chosen = data?.attempts.find((attempt) => attempt.id === selected) ?? null;
  const chosenStatus = chosen?.status;
  useEffect(() => {
    if (!selected || chosenStatus !== 'done') return;
    const controller = new AbortController();
    apiRequest<AttemptView>(`${base}/attempts/${encodeURIComponent(selected)}`, {
      signal: controller.signal,
    })
      .then(setDetail)
      .catch(() => undefined);
    return () => controller.abort();
  }, [base, selected, chosenStatus]);

  const index = state.problems.findIndex((problem) => problem.id === summary.id);
  const prev = state.problems[index - 1];
  const next = state.problems[index + 1];
  const nav = (
    <div className="code-problem-nav">
      <Link href={listHref} className="button small">
        <Icon name="list" size={11} />
        Danh sách câu
      </Link>
      <span>
        {prev ? (
          <Link
            href={`${listHref}&p=${encodeURIComponent(prev.id)}`}
            className="icon-button"
            aria-label={`Câu ${prev.number}`}
            title={`Câu ${prev.number} – ${prev.title}`}
          >
            <Icon name="back" size={12} />
          </Link>
        ) : (
          <span className="icon-button" aria-hidden="true" />
        )}
        <small>
          Câu {summary.number} / {state.problems.length}
        </small>
        {next ? (
          <Link
            href={`${listHref}&p=${encodeURIComponent(next.id)}`}
            className="icon-button"
            aria-label={`Câu ${next.number}`}
            title={`Câu ${next.number} – ${next.title}`}
          >
            <Icon name="chevron" size={12} />
          </Link>
        ) : (
          <span className="icon-button" aria-hidden="true" />
        )}
      </span>
    </div>
  );

  if (error)
    return (
      <section className="panel">
        {nav}
        <p className="form-error" role="alert">
          {error}
        </p>
      </section>
    );
  if (!data)
    return (
      <section className="panel">
        {nav}
        <p className="empty-cell" role="status">
          Đang tải câu…
        </p>
      </section>
    );

  const problem = data.problem;
  const attemptsLeft =
    problem.maxAttempts === null ? null : Math.max(0, problem.maxAttempts - problem.attemptsUsed);
  const lang = allowed.find((item) => item.code === language);
  const tooLong = source.length > MAX_SOURCE;
  const canRun = data.open && !busy && !pending && !tooLong && !!source.trim();
  const status = PROBLEM_STATUS[problem.status];

  async function send(kind: 'run' | 'submit') {
    setBusy(true);
    setActionError('');
    try {
      const attempt = await apiRequest<AttemptView>(`${problemBase}/${kind}`, {
        method: 'POST',
        body: { language, source },
      });
      setSelected(attempt.id);
      setDetail(null);
      await load();
      if (kind === 'submit') onChanged();
    } catch (reason) {
      setActionError(reason instanceof Error ? reason.message : 'Không gửi được bài.');
      if (reason instanceof ApiError && reason.code === 'SUBMISSION_LOCKED') void load();
    } finally {
      setBusy(false);
    }
  }

  function submit() {
    setConfirm({
      title: `Nộp câu ${problem.number}`,
      message: `Nộp bài bằng ${lang?.label ?? language}? Máy chấm chạy mọi test và báo số test đúng.${
        attemptsLeft !== null ? ` Bạn còn ${attemptsLeft} lần nộp câu này.` : ''
      }`,
      confirmLabel: 'Nộp bài',
      run: () => send('submit'),
    });
  }

  const shown = detail && detail.id === selected ? detail : chosen;
  return (
    <>
      {nav}
      <div className="columns even code-columns">
        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon red">
                <Icon name="file" size={12} />
              </i>
              Câu {problem.number} – {problem.title}
            </h2>
            <span className={`code-status-chip ${status.tone}`}>{problemLabel(problem)}</span>
          </div>
          <p className="lesson-text">{data.statement}</p>
          <ul className="quiz-facts code-facts">
            <li>
              <b>{formatSeconds(problem.timeLimitMs)}</b> mỗi test
              {lang && lang.timeFactor > 1 && ` (${lang.label}: ×${lang.timeFactor})`}
            </li>
            <li>
              <b>{problem.memoryLimitMb} MB</b> bộ nhớ
            </li>
            <li>
              <b>{problem.testCount}</b> test
            </li>
          </ul>
          {data.samples.map((sample, i) => (
            <div className="code-sample" key={i}>
              <div>
                <small>Input mẫu {data.samples.length > 1 ? i + 1 : ''}</small>
                <pre>{sample.input || '(trống)'}</pre>
              </div>
              <div>
                <small>Output mẫu {data.samples.length > 1 ? i + 1 : ''}</small>
                <pre>{sample.expected}</pre>
              </div>
            </div>
          ))}
          <p className="admin-hint">
            Đọc dữ liệu từ bàn phím (stdin), in kết quả ra màn hình (stdout); không in thêm lời
            nhắc. Khoảng trắng cuối dòng và dòng trống cuối được bỏ qua khi so kết quả.
            {language === 'java' && ' Bài Java phải đặt trong public class Main.'}
          </p>
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon blue">
                <Icon name="edit" size={12} />
              </i>
              Bài làm
            </h2>
            <span className="code-toolbar">
              <span className="code-font" role="group" aria-label="Cỡ chữ">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Chữ nhỏ hơn"
                  disabled={fontSize <= FONT_SIZES[0]}
                  onClick={() =>
                    setFont(String(FONT_SIZES[Math.max(0, FONT_SIZES.indexOf(fontSize) - 1)]))
                  }
                >
                  A−
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Chữ lớn hơn"
                  disabled={fontSize >= FONT_SIZES[FONT_SIZES.length - 1]}
                  onClick={() =>
                    setFont(
                      String(
                        FONT_SIZES[
                          Math.min(FONT_SIZES.length - 1, FONT_SIZES.indexOf(fontSize) + 1)
                        ],
                      ),
                    )
                  }
                >
                  A+
                </button>
              </span>
              <select
                className="select code-language"
                value={language}
                aria-label="Ngôn ngữ"
                onChange={(event) => setLanguage(event.target.value)}
              >
                {allowed.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </span>
          </div>
          {timer}
          <CodeEditor
            value={source}
            onChange={setSource}
            language={language}
            readOnly={!data.open}
            onRun={() => {
              if (canRun && data.samples.length) void send('run');
            }}
            label={`Mã nguồn ${lang?.label ?? language}, câu ${problem.number}`}
            fontSize={fontSize}
          />
          {tooLong && (
            <p className="form-error" role="alert">
              Mã nguồn quá dài (tối đa {MAX_SOURCE.toLocaleString('vi-VN')} ký tự).
            </p>
          )}
          {actionError && (
            <p className="form-error" role="alert">
              {actionError}
            </p>
          )}
          {data.open ? (
            <div className="code-actions">
              <button
                className="button"
                disabled={!canRun || !data.samples.length}
                title={data.samples.length ? 'Ctrl+Enter' : 'Câu này không có test mẫu để chạy thử'}
                onClick={() => void send('run')}
              >
                <Icon name="chevron" size={11} />
                Chạy thử
              </button>
              <button
                className="button primary"
                disabled={!canRun || attemptsLeft === 0}
                onClick={submit}
              >
                <Icon name="upload" size={12} />
                Nộp bài
              </button>
              <span className="admin-hint">
                {pending
                  ? 'Đang chấm lần trước…'
                  : attemptsLeft === null
                    ? `Đã nộp ${problem.attemptsUsed} lần`
                    : `Còn ${attemptsLeft}/${problem.maxAttempts} lần nộp`}
              </span>
            </div>
          ) : (
            <p className="submission-note locked">
              {assessment.status === 'closed'
                ? 'Bài đã đóng, không chạy thử hay nộp thêm được.'
                : 'Bài chưa mở.'}
            </p>
          )}

          {data.attempts.length > 0 && (
            <>
              <h3 className="code-subtitle">Các lần chạy và nộp</h3>
              <AttemptList
                attempts={data.attempts}
                selected={selected}
                onSelect={(id) => {
                  setSelected(id);
                  setDetail(null);
                }}
              />
            </>
          )}
          {shown && (
            <AttemptDetail
              attempt={shown}
              cases={shown.kind === 'run' ? data.samples : undefined}
              hiddenNote="Kết quả lần nộp này chưa được công bố."
            />
          )}
        </section>
        {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
      </div>
    </>
  );
}
