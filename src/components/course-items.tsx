'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { formatDateTime } from '@/lib/admin';
import {
  ASSESSMENT_STATUS,
  ASSESSMENT_TYPES,
  PDF,
  SCORE_RELEASE_NOTES,
  fileIcon,
  fileUrl,
  formatSize,
  quizSummary,
  splitLinks,
  type Assessment,
  type CourseFile,
  type ContentGroup,
  type LessonGroup,
} from '@/lib/teaching';
import { Icon, type IconName } from '@/components/ui/icon';

/** Danh sách bài học (LessonItem), bài kiểm tra (AssessmentItem). */
export const LESSON_LIST = 'm-0 list-none p-0 last:[&>li:last-child]:border-b-0';
export const ASSESSMENT_LIST = 'm-0 list-none p-0';
/** Lưới các mục/tuần (SectionCard), thu còn 2 cột trên điện thoại. */
export const SECTION_GRID =
  'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 max-md:grid-cols-2 max-md:gap-2.5';
/** Khung thẻ mục/tuần; thẻ "Thêm mục" của giảng viên dùng cùng kích thước. */
export const SECTION_CARD_FRAME =
  'flex min-h-42 min-w-0 flex-col gap-2 rounded-2xl p-5 text-left max-md:min-h-0 max-md:p-4';
/** Dòng trên lưới mục: số mục/bài/tài liệu hoặc nút quay lại, nút đổi dạng xem. */
export const CONTENT_TOOLBAR =
  '-mb-2 flex min-h-9.5 items-center justify-between gap-3 text-sm text-ink-muted';

/** PDF mở ở tab mới (server trả inline), DOCX/PPTX tải về. */
export function FileLink({
  id,
  name,
  contentType,
}: {
  id: string;
  name: string;
  contentType: string;
}) {
  const isPdf = contentType === PDF;
  return (
    <a
      className="file-link"
      href={fileUrl(id)}
      {...(isPdf ? { target: '_blank', rel: 'noopener' } : { download: name })}
    >
      {name}
    </a>
  );
}

/** Một dòng tài liệu; `actions` là các nút quản lý của giảng viên. */
export function FileRow({ file, actions }: { file: CourseFile; actions?: ReactNode }) {
  return (
    <li className="file-row">
      <Icon name={fileIcon(file.contentType)} size={16} className="file-icon" />
      <span className="file-name">
        <FileLink id={file.id} name={file.name} contentType={file.contentType} />
        <small>{formatSize(file.size)}</small>
        {file.hidden && <span className="badge warn">Đang ẩn</span>}
      </span>
      {actions && <span className="file-actions">{actions}</span>}
    </li>
  );
}

/** Nội dung bài học là văn bản thuần: giữ xuống dòng, link http(s) bấm được, không render HTML. */
export function LessonText({ text }: { text: string }) {
  return (
    <p className="lesson-text">
      {splitLinks(text).map((part, index) =>
        part.href ? (
          <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        ) : (
          part.text
        ),
      )}
    </p>
  );
}

/** Nút "đã học" của sinh viên; không truyền thì bài học không có nút (trang giảng viên). */
export interface LessonCompletion {
  done: boolean;
  busy: boolean;
  onToggle: () => void;
}

/**
 * Một bài học, bấm tiêu đề để mở nội dung và tài liệu đính kèm.
 * `actions` là nút quản lý bài, `fileActions` là nút quản lý từng tài liệu (trang giảng viên).
 * `initiallyOpen`: mở sẵn và cuộn tới bài (link "Bài tiếp theo").
 */
export function LessonItem({
  group,
  actions,
  fileActions,
  completion,
  initiallyOpen = false,
}: {
  group: LessonGroup;
  actions?: ReactNode;
  fileActions?: (file: CourseFile) => ReactNode;
  completion?: LessonCompletion;
  initiallyOpen?: boolean;
}) {
  const { lesson, files } = group;
  const [open, setOpen] = useState(initiallyOpen);
  const itemRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (initiallyOpen) itemRef.current?.scrollIntoView({ block: 'center' });
  }, [initiallyOpen]);
  const done = completion?.done ?? false;
  return (
    <li ref={itemRef} className="border-b border-line">
      <div className="flex items-center gap-3 pr-5 max-md:pr-4">
        <button
          className="group/toggle flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1 py-3 pl-5 text-left text-sm max-md:pl-4"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon
            name="chevron"
            size={10}
            className={`text-ink-subtle transition-transform ${open ? 'rotate-90' : ''}`}
          />
          <Icon
            name={done ? 'check' : 'book'}
            size={14}
            className={done ? 'text-emerald-700' : 'text-ink-subtle'}
          />
          <span className="font-semibold wrap-anywhere group-hover/toggle:text-primary-600">
            {lesson.title}
          </span>
          {files.length > 0 && (
            <small className="text-xs text-ink-subtle">{files.length} tài liệu</small>
          )}
          {lesson.hidden && <span className="badge warn m-0">Đang ẩn</span>}
        </button>
        {completion && (
          <button
            className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-60 ${
              done
                ? 'border-transparent bg-emerald-50 text-emerald-700'
                : 'border-line-strong text-ink-muted hover:enabled:border-emerald-700 hover:enabled:text-emerald-700'
            }`}
            aria-pressed={done}
            disabled={completion.busy}
            onClick={completion.onToggle}
            title={done ? 'Bấm để bỏ đánh dấu' : undefined}
          >
            <Icon name="check" size={11} />
            {done ? 'Đã học' : 'Đánh dấu đã học'}
          </button>
        )}
        {actions && <span className="file-actions">{actions}</span>}
      </div>
      {open && (
        <div className="pr-5 pb-3.5 pl-14 max-md:px-4">
          {lesson.body ? (
            <LessonText text={lesson.body} />
          ) : (
            !files.length && (
              <p className="text-[13px] text-ink-subtle">Bài học chưa có nội dung.</p>
            )
          )}
          {files.length > 0 && (
            <ul className="file-list attach-list mt-2.5">
              {files.map((file) => (
                <FileRow key={file.id} file={file} actions={fileActions?.(file)} />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}

/**
 * Một mục/tuần ở dạng lưới: số bài học/tài liệu và tên vài mục đầu; bấm để mở nội dung của mục.
 * `completed`: id bài học sinh viên đã học, để hiện "x/y đã học".
 */
export function SectionCard({
  title,
  group,
  onOpen,
  completed,
}: {
  title: string;
  group: ContentGroup;
  onOpen: () => void;
  completed?: Set<string>;
}) {
  const items = [
    ...group.lessons.map(({ lesson }) => ({
      id: lesson.id,
      icon: 'book' as IconName,
      name: lesson.title,
    })),
    ...group.files.map((file) => ({
      id: file.id,
      icon: fileIcon(file.contentType),
      name: file.name,
    })),
  ];
  const lessonFiles = group.lessons.reduce((sum, item) => sum + item.files.length, 0);
  const learned = completed
    ? group.lessons.filter(({ lesson }) => completed.has(lesson.id)).length
    : 0;
  const counts = [
    group.lessons.length > 0 && `${group.lessons.length} bài học`,
    group.files.length + lessonFiles > 0 && `${group.files.length + lessonFiles} tài liệu`,
    completed && group.lessons.length > 0 && `${learned}/${group.lessons.length} đã học`,
  ].filter(Boolean);
  return (
    <button
      className={`group/card ${SECTION_CARD_FRAME} border border-line/80 bg-white/95 rounded-2xl shadow-card backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift hover:border-primary-400`}
      onClick={onOpen}
    >
      <span className="flex items-center gap-2.5">
        <i className="title-icon blue">
          <Icon name="layers" size={12} />
        </i>
        <b className="min-w-0 text-base font-bold wrap-anywhere group-hover/card:text-primary-600">
          {title}
        </b>
      </span>
      <small className="text-[13px] text-ink-muted">
        {counts.length ? counts.join(' · ') : 'Chưa có nội dung'}
      </small>
      {items.length > 0 && (
        <ul className="mt-1 flex list-none flex-col gap-1.5 border-t border-line p-0 pt-2.5">
          {items.slice(0, 3).map((item) => (
            <li key={item.id} className="flex min-w-0 items-center gap-2 text-[13px] text-ink">
              <Icon name={item.icon} size={12} className="file-icon" />
              <span className="truncate">{item.name}</span>
            </li>
          ))}
          {items.length > 3 && (
            <li className="text-[13px] text-ink-subtle">+ {items.length - 3} mục khác</li>
          )}
        </ul>
      )}
    </button>
  );
}

/** Thẻ bài kiểm tra dùng chung cho trang giảng viên và sinh viên. */
export function AssessmentItem({
  assessment,
  actions,
  href,
}: {
  assessment: Assessment;
  actions?: ReactNode;
  /** Có giá trị thì tiêu đề là link sang trang làm bài, kèm nút "Vào làm bài". */
  href?: string;
}) {
  const status = ASSESSMENT_STATUS[assessment.status];
  return (
    <li className="border-t border-line py-3.5 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
          <span className={`badge ${status.tone}`}>{status.label}</span>
          {assessment.proctored && <span className="badge warn">Có giám sát</span>}
          <h3 className="mt-1.5 text-[15px] font-semibold text-ink">
            {href ? (
              <Link href={href} className="transition-colors hover:text-primary-600 hover:underline">
                {assessment.title}
              </Link>
            ) : (
              assessment.title
            )}
          </h3>
        </div>
        {actions}
        {href && (
          <Link href={href} className="button small shrink-0 gap-1.5">
            {assessment.status === 'open' ? 'Vào làm bài' : 'Xem'}
            <Icon name="chevron" size={10} />
          </Link>
        )}
      </div>
      {assessment.description && (
        <p className="mt-1 text-sm text-ink-muted">{assessment.description}</p>
      )}
      <p className="assessment-meta">
        <Icon name="calendar" size={12} />
        Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
        {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
      </p>
      {quizSummary(assessment) && (
        <p className="assessment-meta">
          <Icon name="check" size={12} />
          {quizSummary(assessment)}
        </p>
      )}
      {SCORE_RELEASE_NOTES[assessment.scoreRelease] && (
        <p className="assessment-meta">
          <Icon name="clock" size={12} />
          {SCORE_RELEASE_NOTES[assessment.scoreRelease]}
        </p>
      )}
      {assessment.paperFileId && assessment.paperFileName && (
        <p className="assessment-meta">
          <Icon name="filePdf" size={12} />
          Đề:{' '}
          <FileLink id={assessment.paperFileId} name={assessment.paperFileName} contentType={PDF} />
        </p>
      )}
    </li>
  );
}
