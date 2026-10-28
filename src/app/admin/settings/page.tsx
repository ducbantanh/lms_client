import { SettingsView } from '@/components/settings-view';
import { IdleTimeoutPanel } from '@/app/admin/settings/_components/idle-timeout-panel';
export const metadata = { title: 'Cài đặt' };
export default function AdminSettingsPage() {
  return (
    <SettingsView description="Thông tin tài khoản, mật khẩu và thời gian tự đăng xuất của người dùng.">
      <IdleTimeoutPanel />
    </SettingsView>
  );
}
