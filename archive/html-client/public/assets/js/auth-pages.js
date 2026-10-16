// Logic cho login.html và change-password.html (chọn theo <body data-page>).

import { api, loadSession, setSession, homeFor, requirePage, logout } from './api.js';
import { $, withBusy } from './ui.js';
import { notify } from './notifications.js';
import { safeNext } from './routing.js';
import { connectRealtime } from './realtime.js';

function showError(message) {
  const box = $('#form-error');
  box.textContent = message;
  box.classList.toggle('d-none', !message);
}

async function initLogin() {
  const existing = await loadSession().catch(() => null);
  if (existing) {
    window.location.replace(existing.user.mustChangePassword ? '/change-password.html' : homeFor(existing.user));
    return;
  }
  document.body.classList.remove('app-loading');

  const form = $('#login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');
    const username = $('#username').value.trim();
    const password = $('#password').value;
    if (!username || !password) {
      showError('Nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }
    await withBusy($('#btn-login'), async () => {
      try {
        const session = await api.post('/auth/login', { username, password }, { handleAuth: false });
        setSession(session);
        if (session.user.mustChangePassword) {
          window.location.replace('/change-password.html');
        } else {
          window.location.replace(safeNext(new URLSearchParams(window.location.search).get('next')) || homeFor(session.user));
        }
      } catch (err) {
        showError(err.message);
        $('#password').value = '';
        $('#password').focus();
      }
    });
  });
}

async function initChangePassword() {
  const user = await requirePage();
  connectRealtime();
  $('#who').textContent = user.fullName;
  $('#force-note').classList.toggle('d-none', !user.mustChangePassword);
  if (!user.mustChangePassword) {
    const back = $('#link-back');
    back.href = homeFor(user);
    back.classList.remove('d-none');
  }
  $('#link-logout').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
  document.body.classList.remove('app-loading');

  $('#password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');
    const currentPassword = $('#current').value;
    const newPassword = $('#next').value;
    const confirm = $('#confirm').value;

    if (!currentPassword || !newPassword) {
      showError('Nhập đầy đủ các ô.');
      return;
    }
    if (newPassword.length < 8) {
      showError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }
    if (newPassword === currentPassword) {
      showError('Mật khẩu mới phải khác mật khẩu hiện tại.');
      return;
    }
    if (newPassword !== confirm) {
      showError('Mật khẩu nhập lại không khớp.');
      return;
    }

    await withBusy($('#btn-save'), async () => {
      try {
        await api.post('/auth/change-password', { currentPassword, newPassword }, { handleAuth: false });
        notify.success('Đã đổi mật khẩu.');
        const session = await loadSession();
        setTimeout(() => window.location.replace(homeFor(session.user)), 800);
      } catch (err) {
        showError(err.code === 'INVALID_CREDENTIALS' ? 'Mật khẩu hiện tại không đúng.' : err.message);
      }
    });
  });
}

const page = document.body.dataset.page;
if (page === 'login') {
  initLogin();
} else if (page === 'change-password') {
  initChangePassword();
}
