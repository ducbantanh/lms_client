'use client';

import { useState, type FormEvent } from 'react';
import { useSession } from '@/providers/session-provider';
import { hasPermission } from '@/lib/auth';
import { Icon } from '@/components/ui/icon';

const CONFIG_KEY = 'lms.system.config';

interface SystemConfig {
  semesterCode: string;
  semesterLabel: string;
  maxPdfMb: number;
  maxDocxMb: number;
  maxZipMb: number;
  maxProofMb: number;
}

const DEFAULT_CONFIG: SystemConfig = {
  semesterCode: '2026-1',
  semesterLabel: 'Học kỳ 1 năm học 2026 - 2027',
  maxPdfMb: 20,
  maxDocxMb: 15,
  maxZipMb: 80,
  maxProofMb: 10,
};

export function SystemConfigPanel() {
  const { user } = useSession();
  const allowed = hasPermission(user, 'settings.manage') || user?.role === 0;

  const [config, setConfig] = useState<SystemConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      return saved ? (JSON.parse(saved) as SystemConfig) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!allowed) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Safe fallback
    }
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon violet">
            <Icon name="calendar" size={12} />
          </i>
          Cấu hình Học kỳ & Giới hạn Tải lên (System Configurations)
        </h2>
      </div>
      <p className="admin-hint mb-4">
        Các cấu hình này quyết định học kỳ mặc định hiển thị trên trang chủ và dung lượng tối đa cho phép tải lên hệ thống.
      </p>

      {savedSuccess && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          Đã lưu cấu hình hệ thống thành công.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-field">
            <span className="text-xs font-medium text-ink">Mã học kỳ hiện hành</span>
            <input
              className="input mt-1"
              value={config.semesterCode}
              onChange={(e) => setConfig({ ...config, semesterCode: e.target.value })}
              required
              placeholder="VD: 2026-1"
            />
          </label>

          <label className="form-field">
            <span className="text-xs font-medium text-ink">Tên hiển thị học kỳ</span>
            <input
              className="input mt-1"
              value={config.semesterLabel}
              onChange={(e) => setConfig({ ...config, semesterLabel: e.target.value })}
              required
              placeholder="VD: Học kỳ 1 năm học 2026 - 2027"
            />
          </label>
        </div>

        <div className="border-t border-line pt-3">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Giới hạn dung lượng tải tệp (Upload Size Limits)
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="form-field">
              <span className="text-xs font-medium text-ink">Đề thi PDF (MB)</span>
              <input
                className="input mt-1"
                type="number"
                min={1}
                max={200}
                value={config.maxPdfMb}
                onChange={(e) => setConfig({ ...config, maxPdfMb: Number(e.target.value) })}
                required
              />
            </label>

            <label className="form-field">
              <span className="text-xs font-medium text-ink">Đề Word DOCX (MB)</span>
              <input
                className="input mt-1"
                type="number"
                min={1}
                max={100}
                value={config.maxDocxMb}
                onChange={(e) => setConfig({ ...config, maxDocxMb: Number(e.target.value) })}
                required
              />
            </label>

            <label className="form-field">
              <span className="text-xs font-medium text-ink">Bộ testcode ZIP (MB)</span>
              <input
                className="input mt-1"
                type="number"
                min={1}
                max={500}
                value={config.maxZipMb}
                onChange={(e) => setConfig({ ...config, maxZipMb: Number(e.target.value) })}
                required
              />
            </label>

            <label className="form-field">
              <span className="text-xs font-medium text-ink">Minh chứng nghỉ học (MB)</span>
              <input
                className="input mt-1"
                type="number"
                min={1}
                max={50}
                value={config.maxProofMb}
                onChange={(e) => setConfig({ ...config, maxProofMb: Number(e.target.value) })}
                required
              />
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button className="button primary" type="submit">
            Lưu cấu hình hệ thống
          </button>
        </div>
      </form>
    </section>
  );
}
