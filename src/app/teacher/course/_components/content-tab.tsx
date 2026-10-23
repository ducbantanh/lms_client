'use client';

import { useRef, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import {
  fileIconByName,
  formatSize,
  groupContent,
  moveId,
  uploadProblem,
  type ContentGroup,
  type CourseFile,
  type Lesson,
  type Section,
} from '@/lib/teaching';
import { FileRow, LessonItem, SectionCard } from '@/components/course-items';
import { ViewToggle } from '@/components/ui/view-toggle';
import { useSession } from '@/providers/session-provider';
import { useViewMode } from '@/hooks/use-view-mode';
import { Modal } from '@/components/ui/modal';
import { Icon } from '@/components/ui/icon';
import { errorFlash, type TabProps } from './course-manager';

/** Bài đang soạn: lesson có giá trị là sửa, không có là tạo mới trong sectionId. */
interface LessonDraft {
  lesson?: Lesson;
  sectionId: string | null;
}

/**
 * Tab Nội dung: mục/tuần, bài học và tài liệu trong từng mục, tải tài liệu lên.
 * Dạng lưới (thẻ mục, bấm để mở một mục) hoặc danh sách, như trang khóa học của sinh viên.
 */
export function ContentTab(props: TabProps) {
  const { content, base, reload, notify, confirm, canTeach } = props;
  const format = content.course.format;
  const unit = format === 1 ? 'tuần' : 'mục';
  const [draft, setDraft] = useState<LessonDraft | null>(null);
  const [renaming, setRenaming] = useState<Section | null>(null);
  /** Đang gửi thứ tự mới: khóa các nút lên/xuống để không bấm chồng. */
  const [moving, setMoving] = useState(false);
  // Lưới (thẻ mục, bấm để mở) hay danh sách, nhớ theo tài khoản — cùng khóa lưu với trang sinh viên
  const { user } = useSession();
  const [view, setView] = useViewMode(`lms.ui.sections.${user?.id ?? 'guest'}`);
  /** Dạng lưới: mục đang mở (id mục, 'loose' = chưa phân mục); null = xem các thẻ. */
  const [openSection, setOpenSection] = useState<string | null>(null);

  /** Gửi toàn bộ thứ tự mới; server từ chối (STALE_ORDER) nếu danh sách đã đổi ở tab khác. */
  async function reorder(path: string, body: unknown) {
    setMoving(true);
    try {
      await apiRequest(`${base}${path}`, { method: 'PUT', body });
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    } finally {
      setMoving(false);
    }
  }

  function moveSection(index: number, delta: -1 | 1) {
    const ids = content.sections.map((section) => section.id);
    void reorder('/sections/order', { ids: moveId(ids, index, delta) });
  }

  function moveLesson(sectionId: string | null, ids: string[], index: number, delta: -1 | 1) {
    void reorder('/lessons/order', { sectionId, ids: moveId(ids, index, delta) });
  }

  async function toggleHidden(file: CourseFile) {
    try {
      await apiRequest(`${base}/files/${encodeURIComponent(file.id)}`, {
        method: 'PATCH',
        body: { hidden: !file.hidden },
      });
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }

  function deleteFile(file: CourseFile) {
    confirm({
      title: 'Xóa tài liệu',
      message: `Xóa "${file.name}"? Sinh viên sẽ không tải được file này nữa.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/files/${encodeURIComponent(file.id)}`, { method: 'DELETE' });
          notify({ type: 'success', text: `Đã xóa ${file.name}.` });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  function deleteSection(section: Section) {
    confirm({
      title: `Xóa ${unit}`,
      message: `Xóa "${section.title}"? Bài học và tài liệu trong ${unit} này được giữ lại ở nhóm "Chưa phân mục".`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/sections/${encodeURIComponent(section.id)}`, {
            method: 'DELETE',
          });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  /** Ẩn/hiện gửi lại toàn bộ bài vì PUT là ghi đè. */
  async function toggleLesson(lesson: Lesson) {
    try {
      await apiRequest(`${base}/lessons/${encodeURIComponent(lesson.id)}`, {
        method: 'PUT',
        body: {
          sectionId: lesson.sectionId,
          title: lesson.title,
          body: lesson.body,
          hidden: !lesson.hidden,
        },
      });
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }

  function deleteLesson(lesson: Lesson) {
    confirm({
      title: 'Xóa bài học',
      message: `Xóa "${lesson.title}"? Tài liệu đính kèm được giữ lại trong ${unit} của bài.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/lessons/${encodeURIComponent(lesson.id)}`, {
            method: 'DELETE',
          });
          notify({ type: 'success', text: `Đã xóa ${lesson.title}.` });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  const fileActions = (file: CourseFile) => (
    <>
      <button
        className="icon-button row-action"
        title={file.hidden ? 'Hiện với sinh viên' : 'Ẩn với sinh viên'}
        aria-label={`${file.hidden ? 'Hiện' : 'Ẩn'} ${file.name}`}
        onClick={() => toggleHidden(file)}
      >
        <Icon name={file.hidden ? 'eye' : 'hidden'} size={14} />
      </button>
      <button
        className="icon-button row-action danger"
        title="Xóa tài liệu"
        aria-label={`Xóa ${file.name}`}
        onClick={() => deleteFile(file)}
      >
        <Icon name="trash" size={13} />
      </button>
    </>
  );

  const groups = groupContent(content);
  const empty =
    format !== 2 && !content.sections.length && !content.lessons.length && !content.files.length;
  const groupKey = (group: ContentGroup) => group.section?.id ?? 'loose';
  const groupTitle = (group: ContentGroup) =>
    group.section ? group.section.title : format === 2 ? 'Tài liệu' : 'Chưa phân mục';
  // Như trang sinh viên: khóa "chỉ danh sách tài liệu" không có mục nên luôn là danh sách
  const grid = view === 'grid' && format !== 2;
  const opened = grid ? groups.find((group) => groupKey(group) === openSection) : undefined;

  /** Một mục/tuần với bài học và tài liệu; nút quản lý chỉ hiện với giảng viên phụ trách. */
  const renderSection = ({ section, lessons, files }: ContentGroup) => {
    const sectionIndex = section
      ? content.sections.findIndex((item) => item.id === section.id)
      : -1;
    const lessonIds = lessons.map((group) => group.lesson.id);
    return (
      <section className="panel flush" key={section?.id ?? 'loose'}>
        <div className="panel-title">
          <h2>{section ? section.title : format === 2 ? 'Tài liệu' : 'Chưa phân mục'}</h2>
          {section && canTeach && (
            <span className="file-actions">
              <MoveButtons
                label={section.title}
                disabled={moving}
                first={sectionIndex === 0}
                last={sectionIndex === content.sections.length - 1}
                onMove={(delta) => moveSection(sectionIndex, delta)}
              />
              <button
                className="icon-button row-action"
                title={`Đổi tên ${unit}`}
                aria-label={`Đổi tên ${section.title}`}
                onClick={() => setRenaming(section)}
              >
                <Icon name="edit" size={13} />
              </button>
              <button
                className="icon-button row-action"
                title="Thêm bài học"
                aria-label={`Thêm bài học vào ${section.title}`}
                onClick={() => setDraft({ sectionId: section.id })}
              >
                <Icon name="plus" size={13} />
              </button>
              <button
                className="icon-button row-action danger"
                title={`Xóa ${unit}`}
                aria-label={`Xóa ${section.title}`}
                onClick={() => deleteSection(section)}
              >
                <Icon name="trash" size={13} />
              </button>
            </span>
          )}
        </div>
        {lessons.length > 0 && (
          <ul className="lesson-list">
            {lessons.map((group, index) => (
              <LessonItem
                key={group.lesson.id}
                group={group}
                fileActions={canTeach ? fileActions : undefined}
                actions={
                  canTeach && (
                    <>
                      {lessons.length > 1 && (
                        <MoveButtons
                          label={group.lesson.title}
                          disabled={moving}
                          first={index === 0}
                          last={index === lessons.length - 1}
                          onMove={(delta) =>
                            moveLesson(section?.id ?? null, lessonIds, index, delta)
                          }
                        />
                      )}
                      <button
                        className="icon-button row-action"
                        title="Sửa bài học"
                        aria-label={`Sửa ${group.lesson.title}`}
                        onClick={() =>
                          setDraft({
                            lesson: group.lesson,
                            sectionId: group.lesson.sectionId,
                          })
                        }
                      >
                        <Icon name="edit" size={13} />
                      </button>
                      <button
                        className="icon-button row-action"
                        title={group.lesson.hidden ? 'Hiện với sinh viên' : 'Ẩn với sinh viên'}
                        aria-label={`${group.lesson.hidden ? 'Hiện' : 'Ẩn'} ${group.lesson.title}`}
                        onClick={() => toggleLesson(group.lesson)}
                      >
                        <Icon name={group.lesson.hidden ? 'eye' : 'hidden'} size={14} />
                      </button>
                      <button
                        className="icon-button row-action danger"
                        title="Xóa bài học"
                        aria-label={`Xóa ${group.lesson.title}`}
                        onClick={() => deleteLesson(group.lesson)}
                      >
                        <Icon name="trash" size={13} />
                      </button>
                    </>
                  )
                }
              />
            ))}
          </ul>
        )}
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file) => (
              <FileRow
                key={file.id}
                file={file}
                actions={canTeach ? fileActions(file) : undefined}
              />
            ))}
          </ul>
        )}
        {!lessons.length && !files.length && (
          <p className="empty-cell">
            {format === 2 ? 'Chưa có tài liệu.' : 'Chưa có bài học hay tài liệu.'}
          </p>
        )}
      </section>
    );
  };

  // Admin chỉ xem (server trả TEACHER_ONLY cho mọi thao tác sửa): ẩn nút sửa và khung tải lên
  return (
    <div className={canTeach ? 'columns' : undefined}>
      <div className="stack">
        {!empty && (
          <div className="content-toolbar">
            {opened ? (
              <button className="link-button" onClick={() => setOpenSection(null)}>
                <Icon name="back" size={11} /> Tất cả {unit}
              </button>
            ) : (
              <span>
                {format !== 2 &&
                  `${content.sections.length} ${unit} · ${content.lessons.length} bài học · `}
                {content.files.length} tài liệu
              </span>
            )}
            {format !== 2 && (
              <ViewToggle
                value={view}
                onChange={(next) => {
                  setView(next);
                  setOpenSection(null);
                }}
              />
            )}
          </div>
        )}
        {empty ? (
          <section className="panel">
            <p className="empty-cell">
              {canTeach
                ? `Chưa có ${unit} nào. Thêm ${unit} đầu tiên rồi tạo bài học hoặc tải tài liệu lên.`
                : `Giảng viên phụ trách chưa thêm ${unit} hay tài liệu nào.`}
            </p>
          </section>
        ) : opened ? (
          renderSection(opened)
        ) : grid ? (
          <div className="section-grid">
            {groups.map((group) => (
              <SectionCard
                key={groupKey(group)}
                title={groupTitle(group)}
                group={group}
                onOpen={() => setOpenSection(groupKey(group))}
              />
            ))}
            {/* Dạng lưới: thêm mục là thẻ cuối lưới, cùng cỡ với thẻ mục */}
            {canTeach && <AddSection {...props} unit={unit} variant="card" />}
          </div>
        ) : (
          groups.map(renderSection)
        )}
        {/* Dạng danh sách (hoặc chưa có mục nào): thanh ngang dưới các mục */}
        {canTeach && format !== 2 && (!grid || empty) && <AddSection {...props} unit={unit} />}
      </div>
      {canTeach && <UploadPanel {...props} />}
      {draft && <LessonDialog {...props} draft={draft} onClose={() => setDraft(null)} />}
      {renaming && (
        <RenameSection
          {...props}
          section={renaming}
          unit={unit}
          onClose={() => setRenaming(null)}
        />
      )}
    </div>
  );
}

/** Nút lên/xuống; ở đầu/cuối danh sách thì nút tương ứng bị khóa. */
function MoveButtons({
  label,
  disabled,
  first,
  last,
  onMove,
}: {
  label: string;
  disabled: boolean;
  first: boolean;
  last: boolean;
  onMove: (delta: -1 | 1) => void;
}) {
  return (
    <>
      <button
        className="icon-button row-action"
        title="Chuyển lên"
        aria-label={`Chuyển ${label} lên`}
        disabled={disabled || first}
        onClick={() => onMove(-1)}
      >
        <Icon name="up" size={12} />
      </button>
      <button
        className="icon-button row-action"
        title="Chuyển xuống"
        aria-label={`Chuyển ${label} xuống`}
        disabled={disabled || last}
        onClick={() => onMove(1)}
      >
        <Icon name="down" size={12} />
      </button>
    </>
  );
}

function RenameSection({
  base,
  reload,
  notify,
  section,
  unit,
  onClose,
}: TabProps & { section: Section; unit: string; onClose: () => void }) {
  const [title, setTitle] = useState(section.title);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/sections/${encodeURIComponent(section.id)}`, {
        method: 'PUT',
        body: { title: title.trim() },
      });
      notify({ type: 'success', text: `Đã đổi tên thành ${title.trim()}.` });
      onClose();
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  return (
    <Modal title={`Đổi tên ${unit}`} onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Tên {unit}
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={200}
            required
            autoFocus
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || !title.trim()}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Thêm mục/tuần; khóa học theo tuần được gợi ý sẵn tên "Tuần N".
 * bar: thanh ngang dưới danh sách mục. card: thẻ cuối lưới mục (viền đứt), bấm vào thì thẻ thành ô nhập tên.
 */
function AddSection({
  content,
  base,
  reload,
  notify,
  unit,
  variant = 'bar',
}: TabProps & { unit: string; variant?: 'bar' | 'card' }) {
  const suggestion = content.course.format === 1 ? `Tuần ${content.sections.length + 1}` : '';
  const [title, setTitle] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const value = title ?? suggestion;

  function cancel() {
    setEditing(false);
    setTitle(null);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    try {
      await apiRequest(`${base}/sections`, { method: 'POST', body: { title: value.trim() } });
      setTitle(null);
      setEditing(false);
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    } finally {
      setBusy(false);
    }
  }

  if (variant === 'card')
    return editing ? (
      <form
        className="section-card section-add editing"
        onSubmit={submit}
        onKeyDown={(event) => event.key === 'Escape' && !busy && cancel()}
      >
        <label className="form-field">
          Tên {unit} mới
          <input
            className="input"
            value={value}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={unit === 'tuần' ? 'Ví dụ: Tuần 1' : 'Ví dụ: Chương 1 – Giới thiệu'}
            maxLength={200}
            autoFocus
          />
        </label>
        <div className="button-row">
          <button type="button" className="button small" disabled={busy} onClick={cancel}>
            Hủy
          </button>
          <button className="button small primary" disabled={busy || !value.trim()}>
            {busy ? 'Đang thêm…' : `Thêm ${unit}`}
          </button>
        </div>
      </form>
    ) : (
      <button type="button" className="section-card section-add" onClick={() => setEditing(true)}>
        <i className="section-add-icon">
          <Icon name="plus" size={14} />
        </i>
        <b>Thêm {unit}</b>
        <small>{suggestion ? `Gợi ý: ${suggestion}` : 'Đặt tên rồi thêm bài học, tài liệu'}</small>
      </button>
    );

  return (
    <form className="inline-form" onSubmit={submit}>
      <input
        className="input"
        value={value}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={`Tên ${unit} mới`}
        aria-label={`Tên ${unit} mới`}
        maxLength={200}
      />
      <button className="button" disabled={busy || !value.trim()}>
        <Icon name="plus" size={12} />
        Thêm {unit}
      </button>
    </form>
  );
}

/** Giống giới hạn @Size của LessonRequest. */
const MAX_LESSON_BODY = 20000;

/** Tạo hoặc sửa bài học; tài liệu đính kèm thêm ở khung "Tải tài liệu lên". */
function LessonDialog({
  content,
  base,
  reload,
  notify,
  draft,
  onClose,
}: TabProps & { draft: LessonDraft; onClose: () => void }) {
  const { lesson } = draft;
  const [title, setTitle] = useState(lesson?.title ?? '');
  const [sectionId, setSectionId] = useState(draft.sectionId ?? '');
  const [body, setBody] = useState(lesson?.body ?? '');
  const [hidden, setHidden] = useState(lesson?.hidden ?? false);
  /** Chỉ khi tạo bài mới; bài đang ẩn thì không gửi (server cũng bỏ qua). */
  const [sendNotice, setSendNotice] = useState(false);
  /** File chọn trong hộp thoại, tải lên sau khi lưu bài (cần id bài để đính kèm). */
  const [attachments, setAttachments] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const textInput = useRef<HTMLInputElement>(null);
  const attachInput = useRef<HTMLInputElement>(null);
  const unit = content.course.format === 1 ? 'Tuần' : 'Mục';
  const existing = lesson ? content.files.filter((file) => file.lessonId === lesson.id) : [];

  /** Đọc file .txt/.md (UTF-8) vào ô nội dung; nội dung đang có được giữ, file nối vào cuối. */
  async function importText(picked: File | undefined) {
    if (textInput.current) textInput.current.value = '';
    if (!picked) return;
    const text = (await picked.text()).replace(/\r\n?/g, '\n').trim();
    if (text.includes('�')) {
      setError('File không phải UTF-8. Hãy lưu lại file với mã hóa UTF-8 rồi thử lại.');
      return;
    }
    const next = body.trim() ? `${body.trimEnd()}\n\n${text}` : text;
    if (next.length > MAX_LESSON_BODY) {
      setError(`Nội dung vượt quá ${MAX_LESSON_BODY.toLocaleString('vi-VN')} ký tự.`);
      return;
    }
    setBody(next);
    setError('');
  }

  function addAttachments(list: FileList | null) {
    const picked = Array.from(list ?? []);
    if (attachInput.current) attachInput.current.value = '';
    const problems = picked.flatMap((file) => {
      const problem = uploadProblem(file);
      return problem ? [`${file.name}: ${problem}`] : [];
    });
    setError(problems.join(' '));
    setAttachments((current) => [
      ...current,
      ...picked.filter(
        (file) =>
          !uploadProblem(file) &&
          !current.some((item) => item.name === file.name && item.size === file.size),
      ),
    ]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError('');
    setProgress('Đang lưu…');
    let saved: Lesson;
    try {
      saved = await apiRequest<Lesson>(
        lesson ? `${base}/lessons/${encodeURIComponent(lesson.id)}` : `${base}/lessons`,
        {
          method: lesson ? 'PUT' : 'POST',
          body: {
            sectionId: sectionId || null,
            title: title.trim(),
            body,
            hidden,
            notifyStudents: !lesson && sendNotice && !hidden,
          },
        },
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được bài học.');
      setBusy(false);
      return;
    }
    // Bài đã lưu; file lỗi không chặn file khác, báo lại tên để giảng viên tải lại
    const failed: string[] = [];
    for (const [index, file] of attachments.entries()) {
      setProgress(`Đang tải lên ${index + 1}/${attachments.length}…`);
      const form = new FormData();
      form.append('file', file);
      form.append('lessonId', saved.id);
      form.append('hidden', 'false');
      try {
        await apiRequest(`${base}/files`, { method: 'POST', body: form });
      } catch (reason) {
        failed.push(`${file.name} (${reason instanceof Error ? reason.message : 'lỗi'})`);
      }
    }
    notify(
      failed.length
        ? { type: 'error', text: `Đã lưu bài nhưng chưa tải lên được: ${failed.join(', ')}` }
        : {
            type: 'success',
            text: lesson ? `Đã lưu ${saved.title}.` : `Đã tạo bài ${saved.title}.`,
          },
    );
    onClose();
    await reload();
  }

  return (
    <Modal title={lesson ? 'Sửa bài học' : 'Thêm bài học'} onClose={() => !busy && onClose()} wide>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-row">
          <label className="form-field">
            Tiêu đề
            <input
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={200}
              required
              autoFocus
            />
          </label>
          <label className="form-field">
            {unit}
            <select
              className="select"
              value={sectionId}
              onChange={(event) => setSectionId(event.target.value)}
            >
              {content.sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
              <option value="">Chưa phân mục</option>
            </select>
          </label>
        </div>
        <div className="form-field">
          <div className="field-head">
            <label htmlFor="lesson-body">
              Nội dung <span className="optional">(văn bản thuần, link http sẽ bấm được)</span>
            </label>
            <button
              type="button"
              className="button small"
              disabled={busy}
              onClick={() => textInput.current?.click()}
            >
              <Icon name="upload" size={11} />
              Lấy từ file .txt
            </button>
            <input
              ref={textInput}
              type="file"
              accept=".txt,.md,text/plain,text/markdown"
              hidden
              onChange={(event) => void importText(event.target.files?.[0])}
            />
          </div>
          <textarea
            id="lesson-body"
            className="input"
            rows={10}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={MAX_LESSON_BODY}
          />
        </div>
        <div className="form-field">
          <div className="field-head">
            <span>
              Tài liệu đính kèm{' '}
              <span className="optional">(PDF, DOCX, PPTX · tối đa 20 MB/file)</span>
            </span>
            <button
              type="button"
              className="button small"
              disabled={busy}
              onClick={() => attachInput.current?.click()}
            >
              <Icon name="plus" size={11} />
              Chọn file
            </button>
            <input
              ref={attachInput}
              type="file"
              accept=".pdf,.docx,.pptx"
              multiple
              hidden
              onChange={(event) => addAttachments(event.target.files)}
            />
          </div>
          {existing.length > 0 || attachments.length > 0 ? (
            <ul className="file-list attach-list">
              {existing.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
              {attachments.map((file, index) => (
                <li className="file-row" key={`${file.name}-${file.size}`}>
                  <Icon name={fileIconByName(file.name)} size={16} className="file-icon" />
                  <span className="file-name">
                    {file.name}
                    <small>{formatSize(file.size)}</small>
                    <span className="badge muted">Chưa tải lên</span>
                  </span>
                  <span className="file-actions">
                    <button
                      type="button"
                      className="icon-button row-action danger"
                      title="Bỏ file"
                      aria-label={`Bỏ ${file.name}`}
                      disabled={busy}
                      onClick={() =>
                        setAttachments(attachments.filter((_, position) => position !== index))
                      }
                    >
                      <Icon name="close" size={13} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-hint">Chưa có file đính kèm.</p>
          )}
        </div>
        <label className="check-field">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(event) => setHidden(event.target.checked)}
          />
          Ẩn với sinh viên (bài và tài liệu đính kèm)
        </label>
        {!lesson && (
          <label className="check-field">
            <input
              type="checkbox"
              checked={sendNotice && !hidden}
              disabled={hidden}
              onChange={(event) => setSendNotice(event.target.checked)}
            />
            Gửi thông báo cho sinh viên
          </label>
        )}
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || !title.trim()}>
            {busy ? progress : lesson ? 'Lưu' : 'Tạo bài'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function UploadPanel({ content, base, reload, notify }: TabProps) {
  const format = content.course.format;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  /** null: chưa chọn, mặc định là mục cuối cùng (thường là tuần đang dạy). */
  const [sectionId, setSectionId] = useState<string | null>(null);
  /** '' = tài liệu của mục, không đính kèm bài nào. */
  const [lessonId, setLessonId] = useState('');
  const [hidden, setHidden] = useState(false);
  const [sendNotice, setSendNotice] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const target = sectionId ?? content.sections.at(-1)?.id ?? '';
  const lessons = content.lessons
    .filter((lesson) => (lesson.sectionId ?? '') === target)
    .sort((a, b) => a.position - b.position);
  const lessonTarget = lessons.some((lesson) => lesson.id === lessonId) ? lessonId : '';

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    const problem = uploadProblem(file);
    if (problem) {
      setError(problem);
      return;
    }
    const form = new FormData();
    form.append('file', file);
    if (format !== 2 && target) form.append('sectionId', target);
    if (format !== 2 && lessonTarget) form.append('lessonId', lessonTarget);
    form.append('hidden', String(hidden));
    form.append('notifyStudents', String(sendNotice && !hidden));
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/files`, { method: 'POST', body: form });
      notify({ type: 'success', text: `Đã tải lên ${file.name}.` });
      setFile(null);
      setHidden(false);
      setSendNotice(false);
      if (inputRef.current) inputRef.current.value = '';
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tải lên được.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="upload" size={12} />
          </i>
          Tải tài liệu lên
        </h2>
      </div>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          File (PDF, DOCX, PPTX · tối đa 20 MB)
          <input
            ref={inputRef}
            className="input file-input"
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setError('');
            }}
          />
        </label>
        {format !== 2 && (
          <label className="form-field">
            {format === 1 ? 'Tuần' : 'Mục'}
            <select
              className="select"
              value={target}
              onChange={(event) => setSectionId(event.target.value)}
            >
              {content.sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
              <option value="">Chưa phân mục</option>
            </select>
          </label>
        )}
        {format !== 2 && lessons.length > 0 && (
          <label className="form-field">
            Đính kèm bài học
            <select
              className="select"
              value={lessonTarget}
              onChange={(event) => setLessonId(event.target.value)}
            >
              <option value="">Không, tài liệu chung của {format === 1 ? 'tuần' : 'mục'}</option>
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="check-field">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(event) => setHidden(event.target.checked)}
          />
          Ẩn với sinh viên (ví dụ đề thi chưa công bố)
        </label>
        <label className="check-field">
          <input
            type="checkbox"
            checked={sendNotice && !hidden}
            disabled={hidden}
            onChange={(event) => setSendNotice(event.target.checked)}
          />
          Gửi thông báo cho sinh viên
        </label>
        <button className="button primary full-width" disabled={busy || !file}>
          {busy ? 'Đang tải lên…' : 'Tải lên'}
        </button>
      </form>
    </aside>
  );
}
