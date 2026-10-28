import type { ViewMode } from '@/lib/types';
import { Icon } from '@/components/ui/icon';

/** Nút chuyển dạng lưới / danh sách, dùng chung cho danh sách khóa học và nội dung khóa học. */
export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (view: ViewMode) => void;
}) {
  return (
    <div className="view-toggle" aria-label="Kiểu hiển thị">
      <button
        className={value === 'grid' ? 'selected' : ''}
        aria-label="Hiển thị dạng lưới"
        aria-pressed={value === 'grid'}
        onClick={() => onChange('grid')}
      >
        <Icon name="grid" size={14} />
      </button>
      <button
        className={value === 'list' ? 'selected' : ''}
        aria-label="Hiển thị dạng danh sách"
        aria-pressed={value === 'list'}
        onClick={() => onChange('list')}
      >
        <Icon name="list" size={14} />
      </button>
    </div>
  );
}
