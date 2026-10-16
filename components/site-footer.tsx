'use client';

import { useSession } from '@/lib/session-provider';
import { Icon } from './icon';

export function SiteFooter() {
  const { isDemo } = useSession();
  return (
    <footer className="main-footer site-footer page-width">
      <div>
        <b>
          FIT <span>LMS</span>
        </b>
        <span>Không gian học tập, kết nối tri thức.</span>
      </div>
      <p>
        {isDemo ? 'Dữ liệu minh họa · Giao diện giai đoạn 1' : 'Hệ thống học tập nội bộ'}
        <span className="footer-dot">·</span>
        <Icon name="cap" size={16} />
        Học tập mỗi ngày
      </p>
    </footer>
  );
}
