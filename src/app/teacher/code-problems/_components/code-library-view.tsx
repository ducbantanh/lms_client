'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import {
  MAX_PROBLEMS,
  emptyProblem,
  formatSeconds,
  problemDraftProblem,
  testCount,
  type ProblemDraft,
} from '@/lib/code';
import {
  ALL_SUBJECTS,
  LIBRARY_PATH,
  filterLibrary,
  libraryBatches,
  libraryCreateBody,
  libraryDraft,
  librarySubjects,
  libraryUpdateBody,
  type LibraryDetail,
  type LibraryProblem,
} from '@/lib/code-library';
import type { ImportResult } from '@/lib/code-import';
import { subjectLabel, type Subject } from '@/lib/question-bank';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { CodeImportBox } from '@/components/code-import';
import { ProblemFields, TestsEditor } from '@/components/code-problem-editor';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

const ARCHIVE_URL = `${LIBRARY_PATH}/test-archive`;

/** Câu đang soạn trong hộp thoại: câu mới, câu trong kho (id), hoặc câu chờ lưu (staged). */
type Editing =
  | { kind: 'new'; draft: ProblemDraft }
  | { kind: 'saved'; id: string; draft: ProblemDraft; subject: Subject | null }
  | { kind: 'staged'; draft: ProblemDraft };

/**
 * Trang /teacher/code-problems/: kho bài lập trình của giảng viên, danh sách câu kiểu OJ. Thêm từng câu hoặc nhập
 * nhanh cả thư mục / ZIP (mọi câu trải phẳng, không chia theo bài); chọn câu rồi "Tạo bài" để sang trang Tạo bài
 * thi với các câu đó, hoặc chọn từ kho khi đang soạn bài lập trình.
 */
export function CodeLibraryView() {
  const router = useRouter();
  const [list, setList] = useState<LibraryProblem[] | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(ALL_SUBJECTS);
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  /** Câu vừa nhập nhanh, chờ bấm lưu vào kho. */
  const [staged, setStaged] = useState<ProblemDraft[] | null>(null);
  const [stagedSubject, setStagedSubject] = useState('');
  const [saving, setSaving] = useState('');
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const deferredSearch = useDeferredValue(search);

  const load = useCallback(
    () =>
      apiRequest<LibraryProblem[]>(LIBRARY_PATH)
        .then(setList)
        .catch((reason) =>
          setError(reason instanceof Error ? reason.message : 'Không tải được kho bài lập trình.'),
        ),
    [],
  );

  useEffect(() => {
    void load();
    apiRequest<Subject[]>('/teacher/question-banks/subjects')
      .then(setSubjects)
      .catch(() => setSubjects([]));
  }, [load]);

  const groups = useMemo(() => librarySubjects(list ?? []), [list]);
  const shown = useMemo(
    () => filterLibrary(list ?? [], deferredSearch, subject),
    [list, deferredSearch, subject],
  );
  const allShownSelected = shown.length > 0 && shown.every((item) => selected.includes(item.id));

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function openSaved(problem: LibraryProblem) {
    try {
      const detail = await apiRequest<LibraryDetail>(
        `${LIBRARY_PATH}/${encodeURIComponent(problem.id)}`,
      );
      setEditing({
        kind: 'saved',
        id: problem.id,
        draft: libraryDraft(detail),
        subject: detail.summary.subjectCode
          ? { code: detail.summary.subjectCode, name: detail.summary.subjectName ?? '' }
          : null,
      });
    } catch (reason) {
      setFlash({
        type: 'error',
        text: reason instanceof Error ? reason.message : 'Không mở được câu.',
      });
    }
  }

  function remove(ids: string[]) {
    const titles = (list ?? []).filter((item) => ids.includes(item.id)).map((item) => item.title);
    setConfirm({
      title: 'Xóa câu khỏi kho',
      message:
        ids.length === 1
          ? `Xóa "${titles[0]}" cùng bộ test khỏi kho? Bài đã tạo từ câu này không bị ảnh hưởng.`
          : `Xóa ${ids.length} câu cùng bộ test khỏi kho? Bài đã tạo từ các câu này không bị ảnh hưởng.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${LIBRARY_PATH}/delete`, { method: 'POST', body: { ids } });
          setSelected((current) => current.filter((id) => !ids.includes(id)));
          setFlash({ type: 'success', text: `Đã xóa ${ids.length} câu.` });
          await load();
        } catch (reason) {
          setFlash({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không xóa được.',
          });
        }
      },
    });
  }

  function onImport(result: ImportResult) {
    // Kho không chia theo bài: mọi câu của mọi thư mục bài được trải phẳng
    const problems = result.assessments.flatMap((item) => item.problems);
    setStaged((current) => [...(current ?? []), ...problems]);
  }

  /** Lưu các câu chờ vào kho theo từng đợt; lỗi giữa chừng thì giữ lại các câu chưa lưu. */
  async function saveStaged() {
    if (!staged) return;
    const invalid = staged.findIndex((problem) => problemDraftProblem(problem));
    if (invalid >= 0) {
      setFlash({
        type: 'error',
        text: `Câu ${invalid + 1} (${staged[invalid].title || 'chưa có tên'}): ${problemDraftProblem(staged[invalid])} Bấm vào câu để sửa.`,
      });
      return;
    }
    const batches = libraryBatches(staged);
    let done = 0;
    for (const batch of batches) {
      setSaving(`Đang lưu ${done}/${staged.length} câu…`);
      try {
        await apiRequest(LIBRARY_PATH, {
          method: 'POST',
          body: libraryCreateBody(stagedSubject, batch),
        });
        done += batch.length;
      } catch (reason) {
        setStaged(staged.slice(done));
        setSaving('');
        setFlash({
          type: 'error',
          text: `Đã lưu ${done}/${staged.length} câu. ${reason instanceof Error ? reason.message : ''} Sửa rồi lưu tiếp các câu còn lại.`,
        });
        await load();
        return;
      }
    }
    setSaving('');
    setStaged(null);
    setFlash({ type: 'success', text: `Đã thêm ${done} câu vào kho.` });
    await load();
  }

  function createAssessment() {
    router.push(
      `${TEACHER_PATH}/create-exam/?type=0&mode=code&library=${selected.map(encodeURIComponent).join(',')}`,
    );
  }

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Kho bài lập trình"
        description="Các câu lập trình của bạn (đề, giới hạn, bộ test), không gắn với bài nào. Chọn câu để tạo bài tập, bài thực hành, bài kiểm tra; bài đã tạo giữ bản chép riêng."
      >
        <button
          className="button primary"
          onClick={() => setEditing({ kind: 'new', draft: emptyProblem() })}
        >
          <Icon name="plus" size={13} />
          Thêm câu
        </button>
      </AdminHeading>
      <FlashMessage flash={flash} onDone={clearFlash} />

      <section className="panel library-import">
        <CodeImportBox
          onImport={onImport}
          disabled={!!saving}
          next="Xem lại các câu bên dưới, chọn môn học rồi bấm lưu vào kho."
        />
        {staged && staged.length > 0 && (
          <div className="library-staged">
            <div className="panel-title">
              <h2>Câu sẽ thêm vào kho ({staged.length})</h2>
              <button className="link-button" disabled={!!saving} onClick={() => setStaged(null)}>
                Bỏ tất cả
              </button>
            </div>
            <ul className="library-staged-list">
              {staged.map((problem, index) => {
                const invalid = problemDraftProblem(problem);
                return (
                  <li key={problem.key}>
                    <button
                      type="button"
                      className="library-staged-item"
                      disabled={!!saving}
                      onClick={() => setEditing({ kind: 'staged', draft: problem })}
                    >
                      <span className="exam-picked-number">{index + 1}</span>
                      <b>{problem.title.trim() || '(chưa có tên)'}</b>
                      <small>{testCount(problem)} test</small>
                      {invalid && <span className="badge warn">Chưa xong</span>}
                    </button>
                    <button
                      type="button"
                      className="icon-button row-action danger"
                      aria-label={`Bỏ ${problem.title || `câu ${index + 1}`}`}
                      disabled={!!saving}
                      onClick={() => setStaged(staged.filter((item) => item.key !== problem.key))}
                    >
                      <Icon name="close" size={12} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="library-staged-actions">
              <label className="form-field">
                Môn học cho các câu này
                <SubjectSelect
                  subjects={subjects}
                  value={stagedSubject}
                  onChange={setStagedSubject}
                />
              </label>
              <button
                className="button primary"
                disabled={!!saving}
                onClick={() => void saveStaged()}
              >
                {saving || `Lưu ${staged.length} câu vào kho`}
              </button>
            </div>
          </div>
        )}
      </section>

      {error ? (
        <div className="empty-state" role="alert">
          <h3>Chưa tải được kho bài lập trình</h3>
          <p>{error}</p>
        </div>
      ) : !list ? (
        <p className="empty-state" role="status">
          Đang tải kho bài lập trình…
        </p>
      ) : !list.length ? (
        <div className="empty-state">
          <h3>Kho chưa có câu nào</h3>
          <p>
            Bấm &quot;Thêm câu&quot; để soạn từng câu, hoặc kéo thả cả thư mục bài tập vào khung
            Nhập nhanh ở trên.
          </p>
        </div>
      ) : (
        <section className="panel">
          <div className="toolbar">
            <label className="search-field">
              <Icon name="search" size={14} />
              <span className="sr-only">Tìm câu</span>
              <input
                className="input"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm theo tên câu"
                maxLength={64}
              />
            </label>
            <select
              className="select"
              aria-label="Lọc theo môn học"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value={ALL_SUBJECTS}>Mọi môn học ({list.length})</option>
              {groups.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code ? subjectLabel(item.code, item.name) : 'Chưa gắn môn học'} (
                  {item.count})
                </option>
              ))}
            </select>
          </div>
          <div className="selection-bar">
            <label className="check-field">
              <input
                type="checkbox"
                checked={allShownSelected}
                onChange={(event) =>
                  setSelected((current) =>
                    event.target.checked
                      ? [...new Set([...current, ...shown.map((item) => item.id)])]
                      : current.filter((id) => !shown.some((item) => item.id === id)),
                  )
                }
              />
              Chọn {shown.length} câu đang hiện
            </label>
            {selected.length > 0 && (
              <>
                <span>Đã chọn {selected.length} câu</span>
                <button className="link-button" onClick={() => setSelected([])}>
                  Bỏ chọn
                </button>
                <button
                  className="button small primary"
                  disabled={selected.length > MAX_PROBLEMS}
                  title={
                    selected.length > MAX_PROBLEMS
                      ? `Mỗi bài tối đa ${MAX_PROBLEMS} câu`
                      : 'Tạo bài lập trình gồm các câu đã chọn'
                  }
                  onClick={createAssessment}
                >
                  <Icon name="exam" size={11} />
                  Tạo bài từ {selected.length} câu
                </button>
                <button className="button small danger" onClick={() => remove(selected)}>
                  <Icon name="trash" size={11} />
                  Xóa {selected.length} câu
                </button>
              </>
            )}
          </div>
          <div className="table-responsive">
            <table className="table admin-table library-table">
              <thead>
                <tr>
                  <th aria-label="Chọn" />
                  <th>#</th>
                  <th>Tên câu</th>
                  <th className="hide-sm">Môn</th>
                  <th>Test</th>
                  <th className="hide-sm">Giới hạn</th>
                  <th className="hide-sm">Cập nhật</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shown.map((problem, index) => (
                  <tr key={problem.id} className={selected.includes(problem.id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Chọn ${problem.title}`}
                        checked={selected.includes(problem.id)}
                        onChange={() => toggle(problem.id)}
                      />
                    </td>
                    <td className="mono">{index + 1}</td>
                    <td>
                      <button
                        type="button"
                        className="table-link"
                        onClick={() => void openSaved(problem)}
                      >
                        {problem.title}
                      </button>
                    </td>
                    <td className="hide-sm">{problem.subjectCode ?? '—'}</td>
                    <td>
                      {problem.testCount}
                      <span className="table-sub">{problem.sampleCount} mẫu</span>
                    </td>
                    <td className="hide-sm">
                      {formatSeconds(problem.timeLimitMs)}
                      <span className="table-sub">{problem.memoryLimitMb} MB</span>
                    </td>
                    <td className="hide-sm">{formatDateTime(problem.updatedAt)}</td>
                    <td className="actions">
                      <button
                        className="icon-button row-action"
                        title="Sửa câu"
                        aria-label={`Sửa ${problem.title}`}
                        onClick={() => void openSaved(problem)}
                      >
                        <Icon name="edit" size={13} />
                      </button>
                      <button
                        className="icon-button row-action danger"
                        title="Xóa khỏi kho"
                        aria-label={`Xóa ${problem.title}`}
                        onClick={() => remove([problem.id])}
                      >
                        <Icon name="trash" size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!shown.length && <p className="empty-cell">Không có câu phù hợp.</p>}
          <p className="admin-hint">
            Đang soạn bài lập trình ở trang{' '}
            <Link href={`${TEACHER_PATH}/create-exam/`}>Tạo bài thi</Link> cũng chọn được câu bằng
            nút &quot;Chọn từ kho bài lập trình&quot;.
          </p>
        </section>
      )}

      {editing && (
        <ProblemDialog
          editing={editing}
          subjects={subjects}
          stagedSubject={stagedSubject}
          onClose={() => setEditing(null)}
          onStaged={(draft) => {
            setStaged((current) =>
              (current ?? []).map((item) => (item.key === draft.key ? draft : item)),
            );
            setEditing(null);
          }}
          onSaved={async (text) => {
            setEditing(null);
            setFlash({ type: 'success', text });
            await load();
          }}
        />
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

function SubjectSelect({
  subjects,
  value,
  onChange,
  current,
}: {
  subjects: Subject[];
  value: string;
  onChange: (value: string) => void;
  /** Môn đang gắn của câu (giữ được khi đã thôi dạy môn đó). */
  current?: Subject | null;
}) {
  const options = [...subjects];
  if (current && !options.some((item) => item.code.toUpperCase() === current.code.toUpperCase()))
    options.push(current);
  return (
    <select className="select" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Không gắn môn học</option>
      {options.map((item) => (
        <option key={item.code} value={item.code}>
          {subjectLabel(item.code, item.name)}
        </option>
      ))}
    </select>
  );
}

/** Soạn một câu: thêm mới vào kho, sửa câu trong kho, hoặc sửa câu chờ lưu (chưa gửi gì). */
function ProblemDialog({
  editing,
  subjects,
  stagedSubject,
  onClose,
  onStaged,
  onSaved,
}: {
  editing: Editing;
  subjects: Subject[];
  stagedSubject: string;
  onClose: () => void;
  onStaged: (draft: ProblemDraft) => void;
  onSaved: (text: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState(editing.draft);
  const [subject, setSubject] = useState(
    editing.kind === 'saved'
      ? (editing.subject?.code ?? '')
      : editing.kind === 'new'
        ? ''
        : stagedSubject,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const invalid = problemDraftProblem(draft);

  async function save() {
    if (invalid) {
      setError(`Câu chưa xong: ${invalid}`);
      return;
    }
    if (editing.kind === 'staged') {
      onStaged(draft);
      return;
    }
    setBusy(true);
    setError('');
    try {
      if (editing.kind === 'saved') {
        await apiRequest(`${LIBRARY_PATH}/${encodeURIComponent(editing.id)}`, {
          method: 'PUT',
          body: libraryUpdateBody(subject, draft),
        });
        await onSaved(`Đã lưu ${draft.title.trim()}.`);
      } else {
        await apiRequest(LIBRARY_PATH, {
          method: 'POST',
          body: libraryCreateBody(subject, [draft]),
        });
        await onSaved(`Đã thêm ${draft.title.trim()} vào kho.`);
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được câu.');
      setBusy(false);
    }
  }

  return (
    <Modal
      title={
        editing.kind === 'saved'
          ? 'Sửa câu trong kho'
          : editing.kind === 'new'
            ? 'Thêm câu vào kho'
            : 'Xem lại câu sẽ thêm'
      }
      wide
      onClose={() => !busy && onClose()}
    >
      <div className="code-fields">
        {editing.kind !== 'staged' && (
          <label className="form-field">
            Môn học
            <SubjectSelect
              subjects={subjects}
              value={subject}
              onChange={setSubject}
              current={editing.kind === 'saved' ? editing.subject : null}
            />
          </label>
        )}
        <ProblemFields problem={draft} onChange={setDraft} disabled={busy} />
        <TestsEditor
          problem={draft}
          update={(change) => setDraft((current) => change(current))}
          archiveUrl={ARCHIVE_URL}
          disabled={busy}
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button
            type="button"
            className="button primary"
            disabled={busy}
            onClick={() => void save()}
          >
            {busy ? 'Đang lưu…' : editing.kind === 'staged' ? 'Xong' : 'Lưu'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
