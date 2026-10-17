// Trang /admin/import.html: dán text hoặc nạp file .txt, hiển thị kết quả theo 3 nhóm.
//
// File .txt được đọc ngay trên trình duyệt và đổ vào ô text để admin xem lại trước khi import,
// sau đó gửi qua cùng một API JSON (/admin/users/import).

import { api, requirePage } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';
import { esc, withBusy } from './ui.js';
import { importReason } from './messages-vi.js';
import { notify } from './notifications.js';

const MAX_FILE_BYTES = 256 * 1024;

const user = await requirePage({ permission: 'users.manage' });
const layout = initAdminLayout({ active: 'import', user });
connectRealtime().on('status', (s) => layout.setWsStatus(s));

const $content = document.getElementById('content');
const $file = document.getElementById('file');

function countDataLines(text) {
  return text.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#')).length;
}

function updateCount() {
  document.getElementById('line-count').textContent = `${countDataLines($content.value)} dòng dữ liệu`;
}
$content.addEventListener('input', updateCount);

$file.addEventListener('change', async () => {
  const f = $file.files[0];
  if (!f) return;
  if (!f.name.toLowerCase().endsWith('.txt')) {
    notify.error('Chỉ chấp nhận file .txt');
    $file.value = '';
    return;
  }
  if (f.size > MAX_FILE_BYTES) {
    notify.error('File quá lớn (tối đa 256 KB).');
    $file.value = '';
    return;
  }
  $content.value = await f.text();
  document.querySelector('label[for="file"]').textContent = f.name;
  updateCount();
  $file.value = '';
});

document.getElementById('btn-clear').addEventListener('click', () => {
  $content.value = '';
  document.querySelector('label[for="file"]').textContent = 'Nạp file .txt';
  updateCount();
});

document.getElementById('btn-import').addEventListener('click', (e) => {
  const content = $content.value;
  const n = countDataLines(content);
  if (n === 0) {
    notify.warning('Chưa có dòng dữ liệu nào.');
    return;
  }
  if (!window.confirm(`Import ${n} dòng?`)) return;
  withBusy(e.currentTarget, async () => {
    try {
      const report = await api.post('/admin/users/import', { content });
      renderReport(report);
      notify.success(`Đã tạo ${report.created.length} tài khoản.`);
    } catch (err) {
      notify.error(err.message);
    }
  });
});

function table(headers, rows) {
  if (rows.length === 0) {
    return '<div class="empty-state small">Không có dòng nào</div>';
  }
  return `
    <table class="table table-sm table-striped mb-0">
      <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;
}

function renderReport(report) {
  document.getElementById('result-empty').classList.add('d-none');
  document.getElementById('result-body').classList.remove('d-none');

  document.getElementById('n-created').textContent = report.created.length;
  document.getElementById('n-dup').textContent = report.duplicates.length;
  document.getElementById('n-err').textContent = report.errors.length;

  document.getElementById('tab-created').innerHTML = table(
    ['Dòng', 'Tài khoản', 'Họ tên'],
    report.created.map((r) => `<tr><td>${r.line}</td><td class="text-mono">${esc(r.username)}</td><td>${esc(r.fullName)}</td></tr>`),
  );
  document.getElementById('tab-dup').innerHTML = table(
    ['Dòng', 'Mã SV', 'Lý do'],
    report.duplicates.map((r) => `<tr><td>${r.line}</td><td class="text-mono">${esc(r.studentId)}</td><td>${esc(importReason(r.reason))}</td></tr>`),
  );
  document.getElementById('tab-err').innerHTML = table(
    ['Dòng', 'Mã SV', 'Lỗi'],
    report.errors.map((r) => `<tr><td>${r.line}</td><td class="text-mono">${esc(r.studentId ?? '—')}</td><td>${esc(importReason(r.reason))}</td></tr>`),
  );

  // Mở tab có vấn đề trước nếu có lỗi
  const firstTab = report.errors.length ? '#tab-err' : report.duplicates.length && !report.created.length ? '#tab-dup' : '#tab-created';
  window.jQuery(`a[href="${firstTab}"]`).tab('show');
}

updateCount();
