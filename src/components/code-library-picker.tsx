'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { formatSeconds, type ProblemDraft } from '@/lib/code';
import {
  ALL_SUBJECTS,
  LIBRARY_PATH,
  filterLibrary,
  librarySubjects,
  sourcedDraft,
  type LibraryDetail,
  type LibraryProblem,
} from '@/lib/code-library';
import { subjectLabel } from '@/lib/question-bank';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

/**
 * Chọn câu từ kho bài lập trình để thêm vào bài đang soạn: tìm theo tên, lọc theo môn (mặc định môn của khóa học
 * nếu kho có câu môn đó), chọn nhiều câu. Câu thêm vào giữ nguồn (ProblemDraft.source): bộ test chép từ kho khi
 * tạo bài.
 */
export function LibraryPicker({
  subjectCode,
  room,
  onClose,
  onPick,
}: {
  subjectCode?: string;
  /** Số câu còn thêm được vào bài (tối đa 20 câu mỗi bài). */
  room: number;
  onClose: () => void;
  onPick: (problems: ProblemDraft[]) => void;
}) {
  const [list, setList] = useState<LibraryProblem[] | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<LibraryProblem[]>(LIBRARY_PATH, { signal: controller.signal })
      .then(setList)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được kho bài lập trình.');
      });
    return () => controller.abort();
  }, []);

  const subjects = useMemo(() => librarySubjects(list ?? []), [list]);
  // Mặc định lọc theo môn của khóa học nếu kho có câu môn đó
  const shownSubject =
    subject ??
    (subjectCode && subjects.some((item) => item.code.toUpperCase() === subjectCode.toUpperCase())
      ? subjectCode
      : ALL_SUBJECTS);
  const shown = useMemo(
    () => filterLibrary(list ?? [], search, shownSubject),
    [list, search, shownSubject],
  );
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  async function add() {
    setBusy(true);
    setError('');
    try {
      const details = await Promise.all(
        selected.map((id) =>
          apiRequest<LibraryDetail>(`${LIBRARY_PATH}/${encodeURIComponent(id)}`),
        ),
      );
      onPick(details.map(sourcedDraft));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tải được câu đã chọn.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Chọn câu từ kho bài lập trình" wide onClose={() => !busy && onClose()}>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {!list ? (
        !error && (
          <p className="empty-state" role="status">
            Đang tải kho bài lập trình…
          </p>
        )
      ) : !list.length ? (
        <div className="empty-state">
          <h3>Kho bài lập trình chưa có câu nào</h3>
          <p>Thêm câu (hoặc nhập nhanh cả thư mục) ở trang Kho bài lập trình rồi quay lại chọn.</p>
          <Link href={`${LIBRARY_PATH}/`} className="button">
            Mở Kho bài lập trình
          </Link>
        </div>
      ) : (
        <>
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
                autoFocus
              />
            </label>
            <select
              className="select"
              aria-label="Lọc theo môn học"
              value={shownSubject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value={ALL_SUBJECTS}>Mọi môn học ({list.length})</option>
              {subjects.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code ? subjectLabel(item.code, item.name) : 'Chưa gắn môn học'} (
                  {item.count})
                </option>
              ))}
            </select>
          </div>
          <ul className="library-pick-list">
            {shown.map((problem) => (
              <li key={problem.id}>
                <label className={selected.includes(problem.id) ? 'selected' : ''}>
                  <input
                    type="checkbox"
                    checked={selected.includes(problem.id)}
                    onChange={() => toggle(problem.id)}
                  />
                  <span className="library-pick-text">
                    <b>{problem.title}</b>
                    <small>
                      {problem.subjectCode ?? 'Chưa gắn môn'} · {problem.testCount} test ·{' '}
                      {formatSeconds(problem.timeLimitMs)} · {problem.memoryLimitMb} MB
                    </small>
                  </span>
                </label>
              </li>
            ))}
            {!shown.length && <li className="empty-cell">Không có câu phù hợp.</li>}
          </ul>
          {selected.length > room && (
            <p className="form-error" role="alert">
              Bài chỉ còn thêm được {room} câu (tối đa 20 câu mỗi bài).
            </p>
          )}
          <div className="dialog-actions">
            <span className="dialog-note">Đã chọn {selected.length} câu</span>
            <button type="button" className="button" disabled={busy} onClick={onClose}>
              Hủy
            </button>
            <button
              type="button"
              className="button primary"
              disabled={busy || !selected.length || selected.length > room}
              onClick={() => void add()}
            >
              {busy ? 'Đang thêm…' : `Thêm ${selected.length || ''} câu`}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
