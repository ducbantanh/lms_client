import type { ReactNode } from 'react';
import { formatDateTime } from '@/lib/admin';
import {
  ASSESSMENT_STATUS,
  ASSESSMENT_TYPES,
  PDF,
  fileIcon,
  fileUrl,
  formatSize,
  type Assessment,
  type CourseFile,
} from '@/lib/teaching';
import { Icon } from './icon';

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

/** Thẻ bài kiểm tra dùng chung cho trang giảng viên và sinh viên. */
export function AssessmentItem({
  assessment,
  actions,
}: {
  assessment: Assessment;
  actions?: ReactNode;
}) {
  const status = ASSESSMENT_STATUS[assessment.status];
  return (
    <li className="assessment-item">
      <div className="assessment-head">
        <div>
          <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
          <span className={`badge ${status.tone}`}>{status.label}</span>
          <h3>{assessment.title}</h3>
        </div>
        {actions}
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
