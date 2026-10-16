import { requirePage, logout, homeFor } from './api.js';
import { connectRealtime } from './realtime.js';
import { roleName } from './messages-vi.js';

const user = await requirePage();
const home = homeFor(user);
if (home !== '/account.html') {
  window.location.replace(home);
} else {
  document.getElementById('account-name').textContent = user.fullName;
  document.getElementById('account-role').textContent = roleName(user.role);
  document.getElementById('btn-logout').addEventListener('click', logout);
  document.body.classList.remove('app-loading');
  connectRealtime();
}
