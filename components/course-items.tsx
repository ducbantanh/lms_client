'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { formatDateTime } from '@/lib/admin';
import {
  ASSESSMENT_STATUS,
  ASSESSMENT_TYPES,
  PDF,
  fileIcon,
  fileUrl,
  formatSize,
  splitLinks,
  type Assessment,
  type CourseFile,
  type ContentGroup,
  type LessonGroup,
} from '@/lib/teaching';
import { Icon, type IconName } from './icon';

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
    <li ref={itemRef} className={`lesson-item${open ? ' open' : ''}${done ? ' done' : ''}`}>
      <div className="lesson-head">
        <button className="lesson-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name="chevron" size={10} className="lesson-chevron" />
          <Icon name={done ? 'check' : 'book'} size={14} className="file-icon" />
          <span className="lesson-title">{lesson.title}</span>
          {files.length > 0 && <small>{files.length} tài liệu</small>}
          {lesson.hidden && <span className="badge warn">Đang ẩn</span>}
        </button>
        {completion && (
          <button
            className={`lesson-check${done ? ' done' : ''}`}
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
        <div className="lesson-body">
          {lesson.body ? (
            <LessonText text={lesson.body} />
          ) : (
            !files.length && <p className="lesson-empty">Bài học chưa có nội dung.</p>
          )}
          {files.length > 0 && (
            <ul className="file-list">
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
    <button className="section-card" onClick={onOpen}>
      <span className="section-card-head">
        <i className="title-icon blue">
          <Icon name="layers" size={12} />
        </i>
        <b>{title}</b>
      </span>
      <small>{counts.length ? counts.join(' · ') : 'Chưa có nội dung'}</small>
      {items.length > 0 && (
        <ul>
          {items.slice(0, 3).map((item) => (
            <li key={item.id}>
              <Icon name={item.icon} size={12} className="file-icon" />
              <span>{item.name}</span>
            </li>
          ))}
          {items.length > 3 && <li className="more">+ {items.length - 3} mục khác</li>}
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
    <li className="assessment-item">
      <div className="assessment-head">
        <div>
          <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
          <span className={`badge ${status.tone}`}>{status.label}</span>
          <h3>{href ? <Link href={href}>{assessment.title}</Link> : assessment.title}</h3>
        </div>
        {actions}
        {href && (
          <Link href={href} className="button small">
            {assessment.status === 'open' ? 'Vào làm bài' : 'Xem'}
            <Icon name="chevron" size={10} />
          </Link>
        )}
      </div>
      {assessment.description && <p className="assessment-desc">{assessment.description}</p>}
      <p className="assessment-meta">
        <Icon name="calendar" size={12} />
        Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
        {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
      </p>
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
