'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { courseLabel } from '@/lib/course-utils';
import {
  DIFFICULTIES,
  filterQuestions,
  subjectLabel,
  type BankQuestion,
  type Difficulty,
  type DifficultyFilter,
  type QuestionBankDetail,
  type QuestionBankSummary,
} from '@/lib/question-bank';
import {
  EXAM_MODES,
  MAX_QUIZ_QUESTIONS,
  MAX_TIME_LIMIT,
  QUIZ_TYPES,
  REVEAL_MODES,
  examProblem,
  parseTimeLimit,
  pickRandom,
  type ExamMode,
  type RevealMode,
} from '@/lib/quiz';
import {
  ASSESSMENT_TAB_PARAM,
  formatSize,
  localInputToIso,
  moveId,
  SCORE_RELEASES,
  uploadProblem,
  type ScoreRelease,
  type TeacherCourse,
} from '@/lib/teaching';
import {
  codeBody,
  codeDraftProblem,
  codeRequest,
  emptyCode,
  testCount,
  type CodeDraft,
} from '@/lib/code';
import { AdminHeading, FlashMessage, type Flash } from '@/components/admin-ui';
import { CodeFields } from '@/components/code-problem-editor';
import { Icon } from '@/components/ui/icon';

/** Câu đã chọn vào đề (giữ lại khi chuyển sang ngân hàng khác). */
interface Picked {
  id: string;
  body: string;
  difficulty: Difficulty;
  multiple: boolean;
  bankName: string;
}

const LEVELS: Difficulty[] = [0, 1, 2];

/**
 * Trang /teacher/create-exam/?course=...&type=...&mode=...: tạo bài thực hành hoặc bài kiểm tra cho một
 * khóa học mình phụ trách, theo một trong ba hình thức:
 * - trắc nghiệm: chọn câu hỏi (chọn tay hoặc bốc ngẫu nhiên theo mức độ) từ ngân hàng câu hỏi; câu hỏi được
 *   chép sang bài, sửa ngân hàng sau đó không làm đổi bài đã tạo;
 * - tải đề lên: đề PDF (bắt buộc với bài kiểm tra), sinh viên nộp file bài làm, giảng viên chấm tay;
 * - lập trình: đề và bộ test, sinh viên nộp mã nguồn, máy chấm chạy test và cho điểm.
 */
export function ExamBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const initialType: 1 | 2 = params.get('type') === '1' ? 1 : 2;
  const [courses, setCourses] = useState<TeacherCourse[] | null>(null);
  const [banks, setBanks] = useState<QuestionBankSummary[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [mode, setMode] = useState<ExamMode>(() => {
    const value = params.get('mode');
    return value === 'file' || value === 'code' ? value : 'quiz';
  });
  const [code, setCode] = useState<CodeDraft>(emptyCode);
  const [paper, setPaper] = useState<File | null>(null);
  const paperInput = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    courseId: params.get('course') ?? '',
    type: initialType,
    title: '',
    description: '',
    opens: '',
    closes: '',
    timeLimit: '',
    shuffle: true,
    reveal: (initialType === 1 ? 1 : 2) as RevealMode,
    scoreRelease: 0 as ScoreRelease,
  });
  const [bankId, setBankId] = useState('');
  const [details, setDetails] = useState<Record<string, QuestionBankDetail>>({});
  const [bankError, setBankError] = useState('');
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [selected, setSelected] = useState<Picked[]>([]);
  const [random, setRandom] = useState<Record<Difficulty, string>>({ 0: '', 1: '', 2: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const deferredSearch = useDeferredValue(search);
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      apiRequest<TeacherCourse[]>('/teacher/courses', { signal: controller.signal }),
      apiRequest<QuestionBankSummary[]>('/teacher/question-banks', { signal: controller.signal }),
    ])
      .then(([courseList, bankList]) => {
        setCourses(courseList);
        setBanks(bankList);
        // Khóa học trên URL không phải của mình thì bỏ; chỉ dạy một khóa thì chọn sẵn
        setForm((current) => ({
          ...current,
          courseId: courseList.some((course) => course.id === current.courseId)
            ? current.courseId
            : courseList.length === 1
              ? courseList[0].id
              : '',
        }));
      })
      .catch((reason) => {
        if (!controller.signal.aborted)
          setLoadError(reason instanceof Error ? reason.message : 'Không tải được dữ liệu.');
      });
    return () => controller.abort();
  }, []);

  const course = courses?.find((item) => item.id === form.courseId) ?? null;
  // Ngân hàng cùng môn (mã học phần) với khóa học lên trước
  const sameSubject = (bank: QuestionBankSummary) =>
    !!course && bank.subjectCode?.toUpperCase() === course.code.toUpperCase();
  const ownBanks = (banks ?? []).filter(sameSubject);
  const otherBanks = (banks ?? []).filter((bank) => !sameSubject(bank));
  const activeBankId = bankId || ownBanks[0]?.id || otherBanks[0]?.id || '';
  const detail = details[activeBankId];

  useEffect(() => {
    if (!activeBankId || details[activeBankId]) return;
    const controller = new AbortController();
    apiRequest<QuestionBankDetail>(`/teacher/question-banks/${encodeURIComponent(activeBankId)}`, {
      signal: controller.signal,
    })
      .then((next) => {
        setBankError('');
        setDetails((current) => ({ ...current, [activeBankId]: next }));
      })
      .catch((reason) => {
        if (!controller.signal.aborted)
          setBankError(reason instanceof Error ? reason.message : 'Không tải được câu hỏi.');
      });
    return () => controller.abort();
  }, [activeBankId, details]);

  const selectedIds = useMemo(() => new Set(selected.map((item) => item.id)), [selected]);
  const shown = useMemo(
    () => filterQuestions(detail?.questions ?? [], { search: deferredSearch, difficulty }),
    [detail, deferredSearch, difficulty],
  );
  const allShownPicked = shown.length > 0 && shown.every((q) => selectedIds.has(q.id));
  const room = MAX_QUIZ_QUESTIONS - selected.length;

  const toPicked = (question: BankQuestion): Picked => ({
    id: question.id,
    body: question.body,
    difficulty: question.difficulty,
    multiple: question.multiple,
    bankName: detail?.bank.name ?? '',
  });

  function add(questions: BankQuestion[]) {
    const fresh = questions.filter((question) => !selectedIds.has(question.id));
    if (fresh.length > room) {
      setFlash({ type: 'error', text: `Mỗi đề tối đa ${MAX_QUIZ_QUESTIONS} câu.` });
      return;
    }
    setSelected([...selected, ...fresh.map(toPicked)]);
  }

  function remove(ids: Set<string>) {
    setSelected(selected.filter((item) => !ids.has(item.id)));
  }

  function drawRandom() {
    if (!detail) return;
    const counts = {
      0: Number(random[0]) || 0,
      1: Number(random[1]) || 0,
      2: Number(random[2]) || 0,
    };
    const pool = detail.questions.filter((question) => !selectedIds.has(question.id));
    const { picked, missing } = pickRandom(pool, counts);
    if (!picked.length) {
      setFlash({ type: 'error', text: 'Ngân hàng không còn câu chưa chọn ở các mức độ này.' });
      return;
    }
    if (picked.length > room) {
      setFlash({ type: 'error', text: `Mỗi đề tối đa ${MAX_QUIZ_QUESTIONS} câu.` });
      return;
    }
    setSelected([...selected, ...picked.map(toPicked)]);
    const short = LEVELS.filter((level) => missing[level] > 0).map(
      (level) => `thiếu ${missing[level]} câu ${DIFFICULTIES[level].label.toLowerCase()}`,
    );
    setFlash(
      short.length
        ? { type: 'error', text: `Đã thêm ${picked.length} câu; ngân hàng ${short.join(', ')}.` }
        : { type: 'success', text: `Đã thêm ${picked.length} câu ngẫu nhiên.` },
    );
    setRandom({ 0: '', 1: '', 2: '' });
  }

  function move(index: number, delta: -1 | 1) {
    const order = moveId(
      selected.map((item) => item.id),
      index,
      delta,
    );
    const byId = new Map(selected.map((item) => [item.id, item]));
    setSelected(order.map((id) => byId.get(id)!));
  }

  function pickPaper(file: File | null) {
    const problem =
      file &&
      (uploadProblem(file) ??
        (file.name.toLowerCase().endsWith('.pdf') ? null : 'File đề phải là PDF.'));
    setError(problem ?? '');
    setPaper(problem ? null : file);
    if (problem && paperInput.current) paperInput.current.value = '';
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const opensAt = localInputToIso(form.opens);
    const closesAt = localInputToIso(form.closes);
    const problem = examProblem({
      mode,
      type: form.type,
      courseId: form.courseId,
      title: form.title,
      opensAt,
      closesAt,
      timeLimit: form.timeLimit,
      questionCount: selected.length,
      hasPaper: !!paper,
      scoreRelease: form.scoreRelease,
    });
    const invalid = problem ?? (mode === 'code' ? codeDraftProblem(code) : null);
    if (invalid) {
      setError(invalid);
      return;
    }
    setBusy(true);
    setError('');
    const course = encodeURIComponent(form.courseId);
    const common = {
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim(),
      opensAt,
      closesAt,
      scoreRelease: form.scoreRelease,
    };
    try {
      if (mode === 'quiz') {
        await apiRequest(`/teacher/courses/${course}/quizzes`, {
          method: 'POST',
          body: {
            ...common,
            timeLimitMinutes: parseTimeLimit(form.timeLimit),
            shuffle: form.shuffle,
            revealMode: form.reveal,
            questionIds: selected.map((item) => item.id),
          },
        });
      } else if (mode === 'code') {
        // Mỗi câu có file ZIP bộ test thì gửi multipart, mỗi file một part
        const request = codeRequest(code);
        await apiRequest(`/teacher/courses/${course}/code-assessments`, {
          method: 'POST',
          body: codeBody({ ...common, notifyStudents: true, code: request.code }, request.files),
        });
      } else {
        // Như form tạo bài trong khóa học: đề gửi cùng request, chỉ thuộc bài này (không vào tài liệu);
        // bài thực hành, bài kiểm tra luôn được thông báo cho sinh viên
        const data = { ...common, notifyStudents: true };
        let body: unknown = data;
        if (paper) {
          const multipart = new FormData();
          multipart.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
          multipart.append('paper', paper);
          body = multipart;
        }
        await apiRequest(`/teacher/courses/${course}/assessments`, { method: 'POST', body });
      }
      router.push(
        `${TEACHER_PATH}/course/?id=${encodeURIComponent(form.courseId)}&tab=${ASSESSMENT_TAB_PARAM[form.type]}`,
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tạo được bài thi.');
      setBusy(false);
    }
  }

  if (loadError)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state" role="alert">
          <h1>Chưa mở được trang tạo bài thi</h1>
          <p>{loadError}</p>
        </div>
      </main>
    );
  if (!courses || !banks)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải khóa học và ngân hàng câu hỏi…
        </p>
      </main>
    );

  const counts = LEVELS.map((level) => selected.filter((item) => item.difficulty === level).length);

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Tạo bài thi"
        description="Bài thực hành hoặc bài kiểm tra cho khóa học bạn phụ trách: trắc nghiệm lấy câu hỏi từ ngân hàng (server chấm điểm ngay khi nộp), tải đề PDF lên để sinh viên nộp file bài làm, hoặc bài lập trình chấm tự động bằng bộ test."
      />
      {!courses.length && (
        <div className="notice" role="status">
          Bạn chưa được phân công khóa học nào nên chưa tạo được bài thi.
        </div>
      )}
      <form className="columns exam-builder" onSubmit={submit}>
        <div className="stack">
          <section className="panel">
            <div className="panel-title">
              <h2>
                <i className="title-icon blue">
                  <Icon name="exam" size={12} />
                </i>
                Thông tin bài
              </h2>
            </div>
            <div className="form-row">
              <label className="form-field">
                Khóa học
                <select
                  className="select"
                  value={form.courseId}
                  onChange={(event) => set({ courseId: event.target.value })}
                  required
                >
                  <option value="">— Chọn khóa học —</option>
                  {courses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {courseLabel(item.code, item.group)} – {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                Loại bài
                <select
                  className="select"
                  value={form.type}
                  onChange={(event) => {
                    const type = Number(event.target.value) as 1 | 2;
                    // Bài thực hành thường cho xem đáp án ngay; bài kiểm tra đợi hết giờ
                    set({ type, reveal: type === 1 ? 1 : 2 });
                  }}
                >
                  {QUIZ_TYPES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-field">
              Hình thức làm bài
              <div className="segmented" role="group" aria-label="Hình thức làm bài">
                {EXAM_MODES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={mode === item.value ? 'selected' : ''}
                    aria-pressed={mode === item.value}
                    onClick={() => {
                      setMode(item.value);
                      setError('');
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="form-field">
              Tiêu đề
              <input
                className="input"
                value={form.title}
                onChange={(event) => set({ title: event.target.value })}
                maxLength={200}
                placeholder={form.type === 1 ? 'vd. Thực hành tuần 3' : 'vd. Kiểm tra giữa kỳ'}
                required
              />
            </label>
            <label className="form-field">
              <span>
                Mô tả <span className="optional">(không bắt buộc)</span>
              </span>
              <textarea
                className="input"
                rows={2}
                value={form.description}
                onChange={(event) => set({ description: event.target.value })}
                maxLength={2000}
              />
            </label>
            <div className="form-row">
              <label className="form-field">
                Mở lúc
                <input
                  className="input"
                  type="datetime-local"
                  value={form.opens}
                  onChange={(event) => set({ opens: event.target.value })}
                />
              </label>
              <label className="form-field">
                Đóng lúc
                <input
                  className="input"
                  type="datetime-local"
                  value={form.closes}
                  onChange={(event) => set({ closes: event.target.value })}
                />
              </label>
            </div>
            <label className="form-field">
              {mode === 'code' ? 'Sinh viên xem kết quả nộp bài' : 'Sinh viên xem điểm'}
              <select
                className="select"
                value={form.scoreRelease}
                onChange={(event) => {
                  const scoreRelease = Number(event.target.value) as ScoreRelease;
                  // Điểm chưa công bố thì đáp án cũng chưa: không công bố điểm thì không cho xem đáp án
                  set({
                    scoreRelease,
                    reveal:
                      scoreRelease === 2
                        ? 0
                        : scoreRelease === 1 && form.reveal === 1
                          ? 2
                          : form.reveal,
                  });
                }}
              >
                {([0, 1, 2] as ScoreRelease[]).map((value) => (
                  <option key={value} value={value}>
                    {mode === 'code' && value === 0 ? 'Ngay khi chấm xong' : SCORE_RELEASES[value]}
                  </option>
                ))}
              </select>
            </label>
            {form.scoreRelease !== 0 && mode === 'code' && (
              <p className="admin-hint">
                Sinh viên nộp xong chỉ thấy &quot;đã nộp&quot;, chưa biết đúng hay sai;
                {form.scoreRelease === 1
                  ? ' kết quả hiện sau giờ đóng bài'
                  : ' kết quả không bao giờ hiện với sinh viên'}
                . Chạy thử với test mẫu vẫn xem được kết quả. Bạn luôn xem được kết quả.
              </p>
            )}
            {form.scoreRelease !== 0 && mode !== 'code' && (
              <p className="admin-hint">
                Sinh viên nộp xong chỉ thấy &quot;đã nộp&quot;; điểm, nhận xét
                {mode === 'quiz' ? ' và đáp án' : ''}{' '}
                {form.scoreRelease === 1
                  ? 'hiện sau giờ đóng bài'
                  : 'không bao giờ hiện với sinh viên'}
                . Bạn vẫn xem, sửa điểm và xuất bảng điểm bình thường.
              </p>
            )}
            {mode === 'quiz' ? (
              <>
                <div className="form-row">
                  <label className="form-field">
                    <span>
                      Thời gian làm bài <span className="optional">(phút)</span>
                    </span>
                    <input
                      className="input"
                      type="number"
                      min={1}
                      max={MAX_TIME_LIMIT}
                      step={1}
                      value={form.timeLimit}
                      onChange={(event) => set({ timeLimit: event.target.value })}
                      placeholder="Không giới hạn"
                    />
                  </label>
                  <label className="form-field">
                    Sinh viên xem đáp án
                    <select
                      className="select"
                      value={form.reveal}
                      disabled={form.scoreRelease === 2}
                      onChange={(event) =>
                        set({ reveal: Number(event.target.value) as RevealMode })
                      }
                    >
                      {([0, 1, 2] as RevealMode[]).map((value) => (
                        // Điểm chưa công bố thì cũng chưa cho xem đáp án (xem đáp án là tự tính được điểm)
                        <option
                          key={value}
                          value={value}
                          disabled={value === 1 && form.scoreRelease === 1}
                        >
                          {REVEAL_MODES[value]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="admin-hint">
                  Để trống giờ mở là mở ngay; để trống giờ đóng là không giới hạn. Thời gian làm bài
                  tính từ lúc sinh viên bấm &quot;Bắt đầu&quot;, không quá giờ đóng. Hết giờ mà chưa
                  nộp thì các câu đã chọn được tính là bài nộp.
                </p>
                <label className="check-field">
                  <input
                    type="checkbox"
                    checked={form.shuffle}
                    onChange={(event) => set({ shuffle: event.target.checked })}
                  />
                  Xáo trộn thứ tự câu hỏi và đáp án cho từng sinh viên
                </label>
              </>
            ) : mode === 'code' ? (
              <p className="admin-hint">
                Để trống giờ mở là mở ngay; để trống giờ đóng là không giới hạn. Trong giờ làm bài
                sinh viên chạy thử với test mẫu và nộp nhiều lần; máy chấm chạy mọi test và lấy lần
                nộp cao nhất. Sửa bộ test sau khi tạo thì mọi lần nộp được chấm lại.
              </p>
            ) : (
              <>
                <label className="form-field">
                  <span>
                    File đề{' '}
                    <span className="optional">
                      {form.type === 2 ? '(PDF, bắt buộc)' : '(PDF, không bắt buộc)'}
                    </span>
                  </span>
                  <input
                    ref={paperInput}
                    className="input file-input"
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(event) => pickPaper(event.target.files?.[0] ?? null)}
                  />
                </label>
                <p className="admin-hint">
                  Để trống giờ mở là mở ngay; để trống giờ đóng là không giới hạn. Đề chỉ hiện với
                  sinh viên khi bài mở; sinh viên nộp file bài làm (PDF, DOCX, PPTX, ZIP), bạn chấm
                  điểm ở trang Bài nộp của bài.
                </p>
              </>
            )}
          </section>

          {mode === 'code' && (
            <section className="panel">
              <div className="panel-title">
                <h2>
                  <i className="title-icon violet">
                    <Icon name="file" size={12} />
                  </i>
                  Các câu
                </h2>
              </div>
              <CodeFields draft={code} onChange={setCode} courseId={form.courseId} />
            </section>
          )}
          {mode === 'quiz' && (
            <section className="panel">
              <div className="panel-title">
                <h2>
                  <i className="title-icon violet">
                    <Icon name="bank" size={12} />
                  </i>
                  Chọn câu hỏi
                </h2>
                <Link href={`${TEACHER_PATH}/question-banks/`}>Quản lý ngân hàng</Link>
              </div>
              {!banks.length ? (
                <p className="empty-cell">
                  Bạn chưa có ngân hàng câu hỏi nào.{' '}
                  <Link className="table-link" href={`${TEACHER_PATH}/question-banks/`}>
                    Tạo ngân hàng câu hỏi
                  </Link>{' '}
                  trước rồi quay lại.
                </p>
              ) : (
                <>
                  <div className="form-row">
                    <label className="form-field">
                      Ngân hàng câu hỏi
                      <select
                        className="select"
                        value={activeBankId}
                        onChange={(event) => {
                          setBankId(event.target.value);
                          setSearch('');
                        }}
                      >
                        {ownBanks.length > 0 && course && (
                          <optgroup label={`Môn ${subjectLabel(course.code, course.title)}`}>
                            {ownBanks.map((bank) => (
                              <option key={bank.id} value={bank.id}>
                                {bank.name} ({bank.questionCount} câu)
                              </option>
                            ))}
                          </optgroup>
                        )}
                        <optgroup label={ownBanks.length ? 'Ngân hàng khác' : 'Ngân hàng của bạn'}>
                          {otherBanks.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.subjectCode ? `${bank.subjectCode} · ` : ''}
                              {bank.name} ({bank.questionCount} câu)
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </label>
                    <label className="form-field">
                      Mức độ
                      <select
                        className="select"
                        value={difficulty}
                        onChange={(event) =>
                          setDifficulty(
                            event.target.value === 'all'
                              ? 'all'
                              : (Number(event.target.value) as Difficulty),
                          )
                        }
                      >
                        <option value="all">Mọi mức độ</option>
                        {LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {DIFFICULTIES[level].label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="random-picker" role="group" aria-label="Bốc câu ngẫu nhiên">
                    <span>Bốc ngẫu nhiên:</span>
                    {LEVELS.map((level) => (
                      <label key={level}>
                        <input
                          className="input"
                          type="number"
                          min={0}
                          max={MAX_QUIZ_QUESTIONS}
                          value={random[level]}
                          onChange={(event) =>
                            setRandom({ ...random, [level]: event.target.value })
                          }
                          placeholder="0"
                          aria-label={`Số câu ${DIFFICULTIES[level].label.toLowerCase()}`}
                        />
                        {DIFFICULTIES[level].label.toLowerCase()}
                      </label>
                    ))}
                    <button
                      type="button"
                      className="button small"
                      disabled={!detail || LEVELS.every((level) => !Number(random[level]))}
                      onClick={drawRandom}
                    >
                      Bốc
                    </button>
                  </div>
                  <FlashMessage flash={flash} onDone={clearFlash} />
                  <label className="search-field full-width">
                    <Icon name="search" size={14} />
                    <span className="sr-only">Tìm câu hỏi</span>
                    <input
                      className="input"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Tìm trong câu hỏi và đáp án"
                      maxLength={100}
                    />
                  </label>
                  {bankError ? (
                    <p className="form-error" role="alert">
                      {bankError}
                    </p>
                  ) : !detail ? (
                    <p className="empty-cell" role="status">
                      Đang tải câu hỏi…
                    </p>
                  ) : !detail.questions.length ? (
                    <p className="empty-cell">Ngân hàng này chưa có câu hỏi.</p>
                  ) : !shown.length ? (
                    <p className="empty-cell">Không có câu hỏi phù hợp.</p>
                  ) : (
                    <>
                      <div className="selection-bar">
                        <label className="check-field">
                          <input
                            type="checkbox"
                            checked={allShownPicked}
                            onChange={(event) =>
                              event.target.checked
                                ? add(shown)
                                : remove(new Set(shown.map((question) => question.id)))
                            }
                          />
                          Chọn cả {shown.length} câu đang hiện
                        </label>
                      </div>
                      <ul className="bank-questions" aria-label="Câu hỏi trong ngân hàng">
                        {shown.map((question) => {
                          const level = DIFFICULTIES[question.difficulty];
                          const checked = selectedIds.has(question.id);
                          return (
                            <li key={question.id}>
                              <label className={checked ? 'is-picked' : undefined}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(event) =>
                                    event.target.checked
                                      ? add([question])
                                      : remove(new Set([question.id]))
                                  }
                                />
                                <span className="bank-question-text">{question.body}</span>
                                <span className={`badge ${level.tone}`}>{level.label}</span>
                                {question.multiple && (
                                  <span className="badge muted-solid">Chọn nhiều</span>
                                )}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </>
              )}
            </section>
          )}
        </div>

        {mode === 'quiz' ? (
          <aside className="panel exam-summary">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="list" size={12} />
                </i>
                Đề thi · {selected.length} câu
              </h2>
              {selected.length > 0 && (
                <button type="button" className="link-button" onClick={() => setSelected([])}>
                  Bỏ hết
                </button>
              )}
            </div>
            {selected.length > 0 && (
              <p className="exam-counts">
                {LEVELS.map((level) => (
                  <span key={level} className={`badge ${DIFFICULTIES[level].tone}`}>
                    {DIFFICULTIES[level].label}: {counts[level]}
                  </span>
                ))}
              </p>
            )}
            {selected.length ? (
              <ol className="exam-picked" aria-label="Câu hỏi trong đề">
                {selected.map((item, index) => (
                  <li key={item.id}>
                    <span className="exam-picked-number">{index + 1}</span>
                    <span className="exam-picked-text" title={`${item.bankName}: ${item.body}`}>
                      {item.body}
                    </span>
                    <span className="file-actions">
                      <button
                        type="button"
                        className="icon-button row-action"
                        aria-label={`Đưa câu ${index + 1} lên`}
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                      >
                        <Icon name="up" size={11} />
                      </button>
                      <button
                        type="button"
                        className="icon-button row-action"
                        aria-label={`Đưa câu ${index + 1} xuống`}
                        disabled={index === selected.length - 1}
                        onClick={() => move(index, 1)}
                      >
                        <Icon name="down" size={11} />
                      </button>
                      <button
                        type="button"
                        className="icon-button row-action danger"
                        aria-label={`Bỏ câu ${index + 1} khỏi đề`}
                        onClick={() => remove(new Set([item.id]))}
                      >
                        <Icon name="close" size={11} />
                      </button>
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="empty-cell">
                Chưa chọn câu nào. Tick câu hỏi bên trái hoặc bốc ngẫu nhiên.
              </p>
            )}
            <p className="admin-hint">
              Mỗi câu cùng số điểm: điểm = số câu đúng / tổng số câu × 10. Câu chọn nhiều đáp án
              phải chọn đúng hết mới được tính. Mỗi sinh viên làm một lần.
            </p>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="button primary full-width"
              disabled={busy || !courses.length || !selected.length}
            >
              {busy
                ? 'Đang tạo…'
                : `Tạo ${QUIZ_TYPES.find((item) => item.value === form.type)!.label.toLowerCase()}`}
            </button>
          </aside>
        ) : mode === 'code' ? (
          <aside className="panel exam-summary">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="list" size={12} />
                </i>
                Bài lập trình
              </h2>
            </div>
            <ul className="quiz-facts code-facts">
              <li>
                <b>{code.problems.length}</b> câu
              </li>
              <li>
                <b>{code.problems.reduce((sum, problem) => sum + testCount(problem), 0)}</b> test
              </li>
            </ul>
            {code.problems.length > 0 && (
              <ol className="exam-picked" aria-label="Các câu">
                {code.problems.map((problem, index) => (
                  <li key={problem.key}>
                    <span className="exam-picked-number">{index + 1}</span>
                    <span className="exam-picked-text">
                      {problem.title.trim() || '(chưa có tiêu đề)'} · {testCount(problem)} test
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <p className="admin-hint">
              Không có điểm: mỗi câu hiện số test đúng (vd. AC 5/5). Sinh viên làm từng câu, nộp
              nhiều lần; test mẫu hiện cho sinh viên và dùng khi chạy thử. Bài kiểm tra đã kết thúc
              không sửa được bộ test.
            </p>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button primary full-width" disabled={busy || !courses.length}>
              {busy
                ? 'Đang tạo…'
                : `Tạo ${QUIZ_TYPES.find((item) => item.value === form.type)!.label.toLowerCase()}`}
            </button>
          </aside>
        ) : (
          <aside className="panel exam-summary">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="filePdf" size={12} />
                </i>
                Đề bài
              </h2>
            </div>
            {paper ? (
              <p className="exam-paper">
                <Icon name="filePdf" size={16} className="file-icon" />
                <span>
                  <b>{paper.name}</b>
                  <small>{formatSize(paper.size)}</small>
                </span>
              </p>
            ) : (
              <p className="empty-cell">
                {form.type === 2 ? 'Chưa chọn file đề PDF.' : 'Không có file đề (không bắt buộc).'}
              </p>
            )}
            <p className="admin-hint">
              Muốn đổi đề sau khi tạo thì xóa bài và tạo bài mới. Bài kiểm tra đã kết thúc không
              sửa, không xóa được.
            </p>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button primary full-width" disabled={busy || !courses.length}>
              {busy
                ? 'Đang tạo…'
                : `Tạo ${QUIZ_TYPES.find((item) => item.value === form.type)!.label.toLowerCase()}`}
            </button>
          </aside>
        )}
      </form>
    </main>
  );
}
