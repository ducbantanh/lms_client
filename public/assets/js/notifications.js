// Thông báo dạng toast (góc trên phải), dùng chung cho admin và sinh viên.
// Dùng plugin Toasts có sẵn của AdminLTE nên trang phải nạp jQuery + adminlte.min.js trước.

const STYLE = {
  success: { cls: 'bg-success', icon: 'fas fa-check-circle', title: 'Thành công' },
  error: { cls: 'bg-danger', icon: 'fas fa-exclamation-circle', title: 'Lỗi' },
  warning: { cls: 'bg-warning', icon: 'fas fa-exclamation-triangle', title: 'Chú ý' },
  info: { cls: 'bg-info', icon: 'fas fa-bell', title: 'Thông báo' },
};

/** message là TEXT thuần (không phải HTML), sẽ được escape. */
export function toast(message, type = 'info', title) {
  const s = STYLE[type] || STYLE.info;
  const text = document.createElement('div');
  text.textContent = message;

  if (window.jQuery && window.jQuery(document).Toasts) {
    window.jQuery(document).Toasts('create', {
      class: s.cls,
      title: title || s.title,
      icon: s.icon,
      body: text.innerHTML,
      autohide: true,
      delay: type === 'error' ? 6000 : 3500,
    });
  } else {
    // dự phòng khi trang không nạp AdminLTE
    window.alert(message);
  }
}

export const notify = {
  success: (m, t) => toast(m, 'success', t),
  error: (m, t) => toast(m, 'error', t),
  warning: (m, t) => toast(m, 'warning', t),
  info: (m, t) => toast(m, 'info', t),
};
