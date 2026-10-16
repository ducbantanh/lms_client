// Trang gốc "/": chuyển tới đúng nơi theo trạng thái đăng nhập.
import { loadSession, homeFor } from './api.js';

const session = await loadSession().catch(() => null);
if (!session) {
  window.location.replace('/login.html');
} else if (session.user.mustChangePassword) {
  window.location.replace('/change-password.html');
} else {
  window.location.replace(homeFor(session.user));
}
