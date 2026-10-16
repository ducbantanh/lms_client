// Tiện ích dùng chung cho trang course của giảng viên và sinh viên.

import { esc, fmtDateTime } from './ui.js';
import { ASSESSMENT_STATUS, ASSESSMENT_TYPES } from './messages-vi.js';

const ICONS = {
  'application/pdf': 'fas fa-file-pdf text-danger',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fas fa-file-word text-primary',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'fas fa-file-powerpoint text-warning',
};

export const ALLOWED_EXT = ['pdf', 'docx', 'pptx'];
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export function fileIcon(contentType) {
  return ICONS[contentType] || 'fas fa-file text-secondary';
}

export function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Link tải file qua API (server kiểm tra quyền). PDF mở trong tab mới, file khác tải về. */
export function fileLink(fileId, name, contentType) {
  const isPdf = contentType === 'application/pdf';
  return `<a href="/api/v1/files/${encodeURIComponent(fileId)}" ${isPdf ? 'target="_blank" rel="noopener"' : 'download'}>${esc(name)}</a>`;
}

/**
 * Gom file theo mục. Trả về [{ section, files }], mục null = "Chưa phân mục".
 * Course dạng "chỉ danh sách file" (format 2) trả về một nhóm duy nhất.
 */
export function groupFiles(detail) {
  if (detail.course.format === 2) {
    return [{ section: null, files: detail.files }];
  }
  const groups = detail.sections.map((s) => ({ section: s, files: detail.files.filter((f) => f.sectionId === s.id) }));
  const loose = detail.files.filter((f) => !f.sectionId || !detail.sections.some((s) => s.id === f.sectionId));
  if (loose.length) groups.push({ section: null, files: loose });
  return groups;
}

export function typeBadge(type) {
  const cls = { 0: 'badge-info', 1: 'badge-primary', 2: 'badge-danger' }[type] || 'badge-secondary';
  return `<span class="badge ${cls}">${esc(ASSESSMENT_TYPES[type] || '')}</span>`;
}

export function statusBadge(status) {
  const cls = { upcoming: 'badge-secondary', open: 'badge-success', closed: 'badge-dark' }[status] || 'badge-light';
  return `<span class="badge ${cls}">${esc(ASSESSMENT_STATUS[status] || status)}</span>`;
}

export function timeRange(a) {
  const open = a.opensAt ? fmtDateTime(a.opensAt) : 'ngay';
  const close = a.closesAt ? fmtDateTime(a.closesAt) : 'không hạn';
  return `Mở: ${esc(open)} · Đóng: ${esc(close)}`;
}

/** Giá trị ô datetime-local (giờ máy người dùng) -> ISO UTC cho server. Trống -> null. */
export function localInputToIso(value) {
  return value ? new Date(value).toISOString() : null;
}

export function courseIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}
