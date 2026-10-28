import { SettingsView } from '@/components/settings-view';
import { IdleTimeoutPanel } from '@/app/admin/settings/_components/idle-timeout-panel';
import { BroadcastPanel } from '@/app/admin/settings/_components/broadcast-panel';
import { SystemHealthPanel } from '@/app/admin/settings/_components/system-health-panel';
import { SystemConfigPanel } from '@/app/admin/settings/_components/system-config-panel';

export const metadata = { title: 'Cài đặt hệ thống' };

export default function AdminSettingsPage() {
  return (
    <SettingsView description="Quản lý tài khoản, cấu hình học kỳ, giám sát sức khỏe máy chủ và phát thông báo khẩn cấp.">
      <div className="space-y-6">
        <BroadcastPanel />
        <SystemHealthPanel />
        <SystemConfigPanel />
        <IdleTimeoutPanel />
      </div>
    </SettingsView>
  );
}
