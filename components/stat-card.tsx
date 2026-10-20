import Link from 'next/link';
import { Icon, type IconName } from './icon';

/** Thẻ số liệu: nhãn, giá trị, icon màu ở góc; `href` thêm chân thẻ "Xem tất cả". */
export function StatCard({
  label,
  value,
  icon,
  tone,
  href,
}: {
  label: string;
  value: number | undefined;
  icon: IconName;
  tone: 'blue' | 'green' | 'violet' | 'red';
  href?: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-main">
        <span>{label}</span>
        <b>{value ?? '…'}</b>
        <i className={`stat-icon ${tone}`}>
          <Icon name={icon} size={15} />
        </i>
      </div>
      {href && (
        <Link href={href} className="stat-link">
          Xem tất cả
          <Icon name="chevron" size={9} />
        </Link>
      )}
    </div>
  );
}
