'use client';

import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/api';
import {
  CODE_LANGUAGES,
  INLINE_LIMIT,
  MAX_ARCHIVE_BYTES,
  MAX_ATTEMPTS,
  MAX_MEMORY_MB,
  MAX_PROBLEMS,
  MAX_STATEMENT,
  MAX_TESTS,
  MIN_MEMORY_MB,
  archiveProblemText,
  emptyProblem,
  emptyTest,
  problemDraftProblem,
  testCount,
  testSizes,
  type ArchiveCheck,
  type ArchiveTest,
  type CodeDraft,
  type ProblemDraft,
  type TestDraft,
} from '@/lib/code';
import { isBlankProblem, type ImportResult } from '@/lib/code-import';
import { formatSize, moveId } from '@/lib/teaching';
import { CodeImportBox } from '@/components/code-import';
import { LibraryPicker } from '@/components/code-library-picker';
import { DropZone } from '@/components/ui/drop-zone';
import { Icon } from '@/components/ui/icon';

/**
 * Soạn bài lập trình: ngôn ngữ cho phép (chung cả bài) và các câu theo thứ tự; mỗi câu có tiêu đề, đề, giới hạn,
 * số lần nộp và bộ test (soạn tay và/hoặc file ZIP). Dùng ở trang Tạo bài thi và khi sửa bài ở trang Kết quả;
 * kiểm tra bằng codeDraftProblem.
 */
export function CodeFields({
  draft,
  onChange,
  courseId,
  disabled,
  onImportMany,
  onImportTitle,
  subjectCode,
}: {
  draft: CodeDraft;
  onChange: (draft: CodeDraft) => void;
  /** Khóa học để gọi API đọc thử ZIP; trống = chưa chọn khóa học. */
  courseId: string;
  disabled?: boolean;
  /** Mã học phần của khóa học: hộp chọn câu từ kho lọc sẵn theo môn này. */
  subjectCode?: string;
  /** Nhập nhanh ra nhiều bài (trang Tạo bài thi tạo cùng lúc); không truyền thì gộp mọi câu vào bài này. */
  onImportMany?: (result: ImportResult) => void;
  /** Nhập nhanh đúng một bài có thư mục bọc ngoài: tên thư mục gợi ý làm tiêu đề bài. */
  onImportTitle?: (title: string) => void;
}) {
  /** Câu đang mở; câu mới mở sẵn, sửa bài có sẵn thì mở câu đầu. */
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(draft.problems.slice(0, 1).map((problem) => problem.key)),
  );
  const [picking, setPicking] = useState(false);
  const archiveUrl = courseId
    ? `/teacher/courses/${encodeURIComponent(courseId)}/code-test-archive`
    : null;
  // Đọc thử ZIP xong mới gộp vào draft mới nhất (người dùng có thể vẫn đang sửa trong lúc chờ)
  const latest = useRef(draft);
  useEffect(() => {
    latest.current = draft;
  });
  const { problems } = draft;

  const setProblems = (next: ProblemDraft[]) => onChange({ ...draft, problems: next });
  const updateProblem = (key: string, change: (problem: ProblemDraft) => ProblemDraft) => {
    const current = latest.current;
    onChange({
      ...current,
      problems: current.problems.map((problem) =>
        problem.key === key ? change(problem) : problem,
      ),
    });
  };
  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  function move(index: number, delta: -1 | 1) {
    const order = moveId(
      problems.map((problem) => problem.key),
      index,
      delta,
    );
    const byKey = new Map(problems.map((problem) => [problem.key, problem]));
    setProblems(order.map((key) => byKey.get(key)!));
  }

  function add() {
    const problem = emptyProblem();
    setProblems([...problems, problem]);
    setOpen((current) => new Set(current).add(problem.key));
  }

  /** Câu nhập được thêm sau các câu đang có (câu trống của form mới thì bị thay); mở câu đầu để xem lại. */
  function applyImport(result: ImportResult) {
    if (result.assessments.length > 1 && onImportMany) {
      onImportMany(result);
      return;
    }
    const imported = result.assessments.flatMap((item) => item.problems);
    const current = latest.current;
    onChange({
      ...current,
      problems: [...current.problems.filter((problem) => !isBlankProblem(problem)), ...imported],
    });
    setOpen(new Set(imported.slice(0, 1).map((problem) => problem.key)));
    const title = result.assessments.length === 1 ? result.assessments[0].title : null;
    if (title) onImportTitle?.(title);
  }

  return (
    <div className="code-fields">
      <div className="form-field">
        Ngôn ngữ cho phép
        <div className="code-language-picks">
          {CODE_LANGUAGES.map((item) => (
            <label key={item.code} className="check-field">
              <input
                type="checkbox"
                checked={draft.languages.includes(item.code)}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...draft,
                    languages: event.target.checked
                      ? CODE_LANGUAGES.map((lang) => lang.code).filter(
                          (code) => code === item.code || draft.languages.includes(code),
                        )
                      : draft.languages.filter((code) => code !== item.code),
                  })
                }
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
      <p className="admin-hint">
        Java được gấp đôi, Python gấp ba thời gian mỗi test; bài Java phải có{' '}
        <code>public class Main</code>. Bài lập trình không có điểm: mỗi câu hiện số test đúng (vd.
        AC 5/5); sinh viên chỉ thấy kết quả chung, không thấy từng test.
      </p>
      <CodeImportBox onImport={applyImport} many={!!onImportMany} disabled={disabled} />

      <ol className="code-problem-list">
        {problems.map((problem, index) => {
          const expanded = open.has(problem.key);
          const invalid = problemDraftProblem(problem);
          return (
            <li key={problem.key} className={`code-problem-card${expanded ? ' open' : ''}`}>
              <div className="code-problem-head">
                <button
                  type="button"
                  className="code-test-toggle"
                  aria-expanded={expanded}
                  onClick={() => toggle(problem.key)}
                >
                  <Icon name={expanded ? 'down' : 'chevron'} size={10} />
                  <b>
                    Câu {index + 1}
                    {problem.title.trim() ? ` – ${problem.title.trim()}` : ''}
                  </b>
                  <small>{testCount(problem)} test</small>
                  {invalid && !expanded && <span className="badge warn">Chưa xong</span>}
                </button>
                <span className="file-actions">
                  <button
                    type="button"
                    className="icon-button row-action"
                    aria-label={`Đưa câu ${index + 1} lên`}
                    disabled={disabled || index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <Icon name="up" size={11} />
                  </button>
                  <button
                    type="button"
                    className="icon-button row-action"
                    aria-label={`Đưa câu ${index + 1} xuống`}
                    disabled={disabled || index === problems.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <Icon name="down" size={11} />
                  </button>
                  <button
                    type="button"
                    className="icon-button row-action danger"
                    aria-label={`Xóa câu ${index + 1}`}
                    title={
                      problem.id ? 'Xóa câu cùng mọi lần nộp của sinh viên ở câu này' : 'Xóa câu'
                    }
                    disabled={disabled || problems.length === 1}
                    onClick={() => setProblems(problems.filter((item) => item.key !== problem.key))}
                  >
                    <Icon name="trash" size={12} />
                  </button>
                </span>
              </div>
              {expanded && (
                <div className="code-problem-body">
                  <ProblemFields
                    problem={problem}
                    onChange={(next) => updateProblem(problem.key, () => next)}
                    disabled={disabled}
                  />
                  <TestsEditor
                    problem={problem}
                    update={(change) => updateProblem(problem.key, change)}
                    archiveUrl={archiveUrl}
                    disabled={disabled}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="button-row code-fields-actions">
        <button
          type="button"
          className="button small"
          disabled={disabled || problems.length >= MAX_PROBLEMS}
          onClick={add}
        >
          <Icon name="plus" size={11} />
          Thêm câu
        </button>
        <button
          type="button"
          className="button small"
          disabled={disabled || problems.length >= MAX_PROBLEMS}
          onClick={() => setPicking(true)}
        >
          <Icon name="layers" size={11} />
          Chọn từ kho bài lập trình
        </button>
      </div>
      {picking && (
        <LibraryPicker
          subjectCode={subjectCode}
          room={MAX_PROBLEMS - problems.filter((problem) => !isBlankProblem(problem)).length}
          onClose={() => setPicking(false)}
          onPick={(picked) => {
            setPicking(false);
            const current = latest.current;
            onChange({
              ...current,
              problems: [
                ...current.problems.filter((problem) => !isBlankProblem(problem)),
                ...picked,
              ],
            });
            setOpen(new Set());
          }}
        />
      )}
    </div>
  );
}

/** Tiêu đề, đề, giới hạn mỗi test và số lần nộp của một câu. */
export function ProblemFields({
  problem,
  onChange,
  disabled,
}: {
  problem: ProblemDraft;
  onChange: (problem: ProblemDraft) => void;
  disabled?: boolean;
}) {
  const set = (patch: Partial<ProblemDraft>) => onChange({ ...problem, ...patch });
  return (
    <>
      <label className="form-field">
        Tiêu đề câu
        <input
          className="input"
          value={problem.title}
          onChange={(event) => set({ title: event.target.value })}
          maxLength={200}
          placeholder="vd. Tổng dãy số"
          disabled={disabled}
        />
      </label>
      <label className="form-field">
        Đề bài
        <textarea
          className="input"
          rows={7}
          value={problem.statement}
          onChange={(event) => set({ statement: event.target.value })}
          maxLength={MAX_STATEMENT}
          placeholder={
            'Mô tả bài toán, định dạng input và output, ràng buộc.\nvd. Dòng đầu là số nguyên n (1 ≤ n ≤ 10^5)...'
          }
          disabled={disabled}
        />
      </label>
      <div className="form-row">
        <label className="form-field">
          <span>
            Thời gian mỗi test <span className="optional">(giây)</span>
          </span>
          <input
            className="input"
            inputMode="decimal"
            value={problem.timeLimit}
            onChange={(event) => set({ timeLimit: event.target.value })}
            disabled={disabled}
          />
        </label>
        <label className="form-field">
          <span>
            Bộ nhớ <span className="optional">(MB)</span>
          </span>
          <input
            className="input"
            type="number"
            min={MIN_MEMORY_MB}
            max={MAX_MEMORY_MB}
            value={problem.memoryLimit}
            onChange={(event) => set({ memoryLimit: event.target.value })}
            disabled={disabled}
          />
        </label>
        <label className="form-field">
          Số lần nộp tối đa
          <input
            className="input"
            type="number"
            min={1}
            max={MAX_ATTEMPTS}
            value={problem.maxAttempts}
            onChange={(event) => set({ maxAttempts: event.target.value })}
            placeholder="Không giới hạn"
            disabled={disabled}
          />
        </label>
      </div>
    </>
  );
}

/**
 * Bộ test của một câu: mỗi test một dòng gọn (tên, kích thước, test mẫu), mở ra để sửa input/output. Test lớn
 * (tải từ ZIP) chỉ có bản xem trước, không sửa tại chỗ. Thêm nhiều test một lần bằng file ZIP: server đọc thử ngay
 * khi chọn file để báo số test và lỗi; test trong ZIP được lưu khi bấm tạo/lưu, là test ẩn.
 */
export function TestsEditor({
  problem,
  update,
  archiveUrl,
  disabled,
}: {
  problem: ProblemDraft;
  /** Sửa câu từ bản mới nhất (đọc thử ZIP xong có thể sau khi người dùng đã sửa chỗ khác). */
  update: (change: (problem: ProblemDraft) => ProblemDraft) => void;
  /** API đọc thử file ZIP bộ test; null = chưa chọn khóa học. */
  archiveUrl: string | null;
  disabled?: boolean;
}) {
  const { tests } = problem;
  /** Test đang mở để sửa; test mới thêm mở sẵn. */
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(tests.filter((test) => !test.id).map((test) => test.key)),
  );
  const [archiveError, setArchiveError] = useState('');
  const [checking, setChecking] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const samples = tests.filter((test) => test.sample).length;
  const hidden = tests.length - samples;
  const archiveCount = problem.archive ? (problem.archiveCheck?.tests.length ?? 0) : 0;
  const setTests = (next: TestDraft[]) => update((current) => ({ ...current, tests: next }));
  const updateTest = (index: number, patch: Partial<TestDraft>) =>
    setTests(tests.map((test, i) => (i === index ? { ...test, ...patch } : test)));
  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  function move(index: number, delta: -1 | 1) {
    const order = moveId(
      tests.map((test) => test.key),
      index,
      delta,
    );
    const byKey = new Map(tests.map((test) => [test.key, test]));
    setTests(order.map((key) => byKey.get(key)!));
  }

  function add() {
    const test = emptyTest();
    setTests([...tests, test]);
    setOpen((current) => new Set(current).add(test.key));
  }

  async function pickArchive(file: File | null) {
    if (fileInput.current) fileInput.current.value = '';
    setArchiveError('');
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setArchiveError('Chọn file .zip.');
      return;
    }
    if (file.size > MAX_ARCHIVE_BYTES) {
      setArchiveError('File ZIP quá lớn (tối đa 20 MB).');
      return;
    }
    if (!archiveUrl) {
      setArchiveError('Chọn khóa học trước khi tải bộ test.');
      return;
    }
    update((current) => ({ ...current, archive: file, archiveCheck: null }));
    setChecking(true);
    const form = new FormData();
    form.append('tests', file);
    try {
      const check = await apiRequest<ArchiveCheck>(archiveUrl, { method: 'POST', body: form });
      // Test ẩn thêm sẵn mà chưa nhập gì thì bỏ: bộ test lấy từ ZIP
      update((current) => ({
        ...current,
        tests: current.tests.filter(
          (test) => test.id || test.sample || test.input.trim() || test.expected.trim(),
        ),
        archive: file,
        archiveCheck: check,
      }));
    } catch (reason) {
      update((current) => ({ ...current, archive: null, archiveCheck: null }));
      setArchiveError(reason instanceof Error ? reason.message : 'Không đọc được file ZIP.');
    } finally {
      setChecking(false);
    }
  }

  // Câu chọn từ kho: bộ test chép từ kho khi tạo bài, không sửa ở đây
  if (problem.source)
    return (
      <div className="code-tests">
        <h4 className="code-tests-title">Bộ test</h4>
        <p className="code-source-note">
          <Icon name="layers" size={12} />
          Lấy từ kho bài lập trình: {problem.source.tests} test ({problem.source.samples} test mẫu),
          được chép sang bài khi tạo. Muốn sửa bộ test, sửa câu trong kho rồi chọn lại.
        </p>
      </div>
    );

  return (
    <div className="code-tests">
      <h4 className="code-tests-title">Bộ test</h4>
      {tests.length > 0 && (
        <ol className="code-test-list">
          {tests.map((test, index) => {
            const size = testSizes(test);
            const expanded = open.has(test.key);
            const tooBigForSample = size.input > INLINE_LIMIT || size.expected > INLINE_LIMIT;
            return (
              <li key={test.key} className={`code-test${expanded ? ' open' : ''}`}>
                <div className="code-test-bar">
                  <button
                    type="button"
                    className="code-test-toggle"
                    aria-expanded={expanded}
                    onClick={() => toggle(test.key)}
                  >
                    <Icon name={expanded ? 'down' : 'chevron'} size={10} />
                    <b>Test {index + 1}</b>
                    {test.name && <span className="mono">{test.name}</span>}
                    <small>
                      {formatSize(size.input)} → {formatSize(size.expected)}
                    </small>
                  </button>
                  <label
                    className="check-field"
                    title={
                      tooBigForSample && !test.sample
                        ? 'Test mẫu tối đa 8 KB mỗi ô (sinh viên xem nguyên văn)'
                        : undefined
                    }
                  >
                    <input
                      type="checkbox"
                      checked={test.sample}
                      disabled={disabled || (tooBigForSample && !test.sample)}
                      onChange={(event) => updateTest(index, { sample: event.target.checked })}
                    />
                    Mẫu
                  </label>
                  <span className="file-actions">
                    <button
                      type="button"
                      className="icon-button row-action"
                      aria-label={`Đưa test ${index + 1} lên`}
                      disabled={disabled || index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <Icon name="up" size={11} />
                    </button>
                    <button
                      type="button"
                      className="icon-button row-action"
                      aria-label={`Đưa test ${index + 1} xuống`}
                      disabled={disabled || index === tests.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <Icon name="down" size={11} />
                    </button>
                    <button
                      type="button"
                      className="icon-button row-action danger"
                      aria-label={`Xóa test ${index + 1}`}
                      disabled={disabled}
                      onClick={() => setTests(tests.filter((_, i) => i !== index))}
                    >
                      <Icon name="trash" size={12} />
                    </button>
                  </span>
                </div>
                {expanded &&
                  (test.truncated ? (
                    <div className="code-test-io">
                      <div>
                        <small>Input ({formatSize(test.inputSize)})</small>
                        <pre className="code-cell">
                          {test.input}
                          {test.inputSize > INLINE_LIMIT && '\n…'}
                        </pre>
                      </div>
                      <div>
                        <small>Output mong đợi ({formatSize(test.expectedSize)})</small>
                        <pre className="code-cell">
                          {test.expected}
                          {test.expectedSize > INLINE_LIMIT && '\n…'}
                        </pre>
                      </div>
                      <p className="admin-hint">
                        Test lớn chỉ xem trước được phần đầu; muốn đổi nội dung thì xóa test và tải
                        lại bằng file ZIP.
                      </p>
                    </div>
                  ) : (
                    <div className="code-test-io">
                      <label className="form-field">
                        Input
                        <textarea
                          className="input code-text"
                          rows={3}
                          value={test.input}
                          disabled={disabled}
                          onChange={(event) =>
                            updateTest(index, { input: event.target.value, dirty: true })
                          }
                          spellCheck={false}
                        />
                      </label>
                      <label className="form-field">
                        Output mong đợi
                        <textarea
                          className="input code-text"
                          rows={3}
                          value={test.expected}
                          disabled={disabled}
                          onChange={(event) =>
                            updateTest(index, { expected: event.target.value, dirty: true })
                          }
                          spellCheck={false}
                        />
                      </label>
                    </div>
                  ))}
              </li>
            );
          })}
        </ol>
      )}
      <div className="code-tests-footer">
        <button
          type="button"
          className="button small"
          disabled={disabled || tests.length + archiveCount >= MAX_TESTS}
          onClick={add}
        >
          <Icon name="plus" size={11} />
          Thêm test
        </button>
        {hidden > 0 && (
          <button
            type="button"
            className="button small"
            disabled={disabled}
            onClick={() => setTests(tests.filter((test) => test.sample))}
          >
            <Icon name="trash" size={11} />
            Xóa {hidden} test ẩn
          </button>
        )}
        <span className="admin-hint">
          {tests.length + archiveCount} test ({samples} test mẫu). So output bỏ qua khoảng trắng
          cuối dòng và dòng trống cuối.
        </span>
      </div>

      <div className="code-archive">
        <div className="code-archive-head">
          <Icon name="fileZip" size={16} className="file-icon" />
          <b>Thêm nhiều test bằng file ZIP</b>
        </div>
        <p className="admin-hint">
          Mỗi test là một cặp file input/output cùng tên: <code>1.in</code> + <code>1.out</code>{' '}
          (hoặc <code>.inp</code>, <code>.ans</code>), <code>input01.txt</code> +{' '}
          <code>output01.txt</code>, hoặc kiểu Themis mỗi test một thư mục (
          <code>Test01/BAI.INP</code> + <code>BAI.OUT</code>). Test xếp theo tên, thêm vào sau các
          test trên và là test ẩn. ZIP tối đa 20 MB, mỗi file 8 MB, cả bộ test 64 MB, {MAX_TESTS}{' '}
          test.
        </p>
        {problem.archive ? (
          <div className="code-archive-file">
            <p className="exam-paper">
              <Icon name="fileZip" size={16} className="file-icon" />
              <span>
                <b>{problem.archive.name}</b>
                <small>
                  {formatSize(problem.archive.size)}
                  {checking
                    ? ' · đang đọc…'
                    : problem.archiveCheck
                      ? ` · ${problem.archiveCheck.tests.length} test${
                          problem.archiveCheck.ignored
                            ? `, bỏ qua ${problem.archiveCheck.ignored} file khác`
                            : ''
                        }`
                      : ''}
                </small>
              </span>
              <button
                type="button"
                className="icon-button row-action danger"
                aria-label="Bỏ file ZIP"
                disabled={disabled}
                onClick={() =>
                  update((current) => ({ ...current, archive: null, archiveCheck: null }))
                }
              >
                <Icon name="close" size={12} />
              </button>
            </p>
            {problem.archiveCheck && problem.archiveCheck.problems.length > 0 && (
              <ul className="form-error code-archive-problems" role="alert">
                {problem.archiveCheck.problems.slice(0, 10).map((item, index) => (
                  <li key={index}>{archiveProblemText(item)}</li>
                ))}
                {problem.archiveCheck.problems.length > 10 && (
                  <li>… và {problem.archiveCheck.problems.length - 10} lỗi khác</li>
                )}
              </ul>
            )}
            {problem.archiveCheck &&
              !problem.archiveCheck.problems.length &&
              problem.archiveCheck.tests.length > 0 && (
                <p className="admin-hint">
                  {archiveRange(problem.archiveCheck.tests)} ·{' '}
                  {formatSize(
                    problem.archiveCheck.tests.reduce(
                      (sum, test) => sum + test.inputSize + test.expectedSize,
                      0,
                    ),
                  )}
                </p>
              )}
          </div>
        ) : (
          <DropZone className="drop-box" hint="Hoặc kéo thả file ZIP vào đây">
            <input
              ref={fileInput}
              className="input file-input"
              type="file"
              accept=".zip,application/zip"
              disabled={disabled}
              aria-label="Chọn file ZIP bộ test"
              onChange={(event) => void pickArchive(event.target.files?.[0] ?? null)}
            />
          </DropZone>
        )}
        {archiveError && (
          <p className="form-error" role="alert">
            {archiveError}
          </p>
        )}
      </div>
    </div>
  );
}

/** "test01 … test48" */
function archiveRange(tests: ArchiveTest[]) {
  if (tests.length === 1) return tests[0].name;
  return `${tests[0].name} … ${tests[tests.length - 1].name}`;
}
