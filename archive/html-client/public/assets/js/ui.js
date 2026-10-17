// Tiện ích giao diện dùng chung (không gọi API).

/** Escape text trước khi chèn vào HTML. BẮT BUỘC dùng cho mọi dữ liệu từ server. */
export function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const DATE_TIME = new Intl.DateTimeFormat('vi-VN', {
  hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
});
const TIME = new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export function fmtDateTime(iso) {
  return iso ? DATE_TIME.format(new Date(iso)) : '—';
}

export function fmtTime(iso) {
  return iso ? TIME.format(new Date(iso)) : '—';
}

export function $(selector, root = document) {
  return root.querySelector(selector);
}

/** Chặn bấm liên tục trong lúc chờ API: nút bị disable và hiện spinner. */
export async function withBusy(button, fn) {
  const html = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span class="spinner-border spinner-border-sm mr-1"></span>' + html;
  try {
    return await fn();
  } finally {
    button.disabled = false;
    button.innerHTML = html;
  }
}

export function debounce(fn, ms = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/** Lỗi khởi tạo: luôn có nội dung và nút thử lại thay vì màn hình trắng. */
export function showPageError(message) {
  document.body.classList.remove('app-loading');
  document.getElementById('page-error')?.remove();
  const panel = document.createElement('main');
  panel.id = 'page-error';
  panel.className = 'page-error';
  panel.setAttribute('role', 'alert');
  const title = document.createElement('h1');
  title.textContent = 'Không thể hoàn tất yêu cầu';
  const text = document.createElement('p');
  text.textContent = message;
  const retry = document.createElement('button');
  retry.className = 'btn btn-primary';
  retry.textContent = 'Thử lại';
  retry.addEventListener('click', () => window.location.reload());
  panel.append(title, text, retry);
  document.body.append(panel);
  retry.focus();
}
