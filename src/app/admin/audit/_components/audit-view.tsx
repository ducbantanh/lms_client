'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import {
  AUDIT_CATEGORIES,
  auditActionLabel,
  formatDateTime,
  type AuditEntry,
  type PageResult,
} from '@/lib/admin';
import { Icon } from '@/components/ui/icon';
import { AdminHeading } from '@/components/admin-ui';

const PAGE_SIZE = 50;

interface Filters {
  q: string;
  category: string;
  page: number;
}

/** Đọc bộ lọc từ query string để có thể F5 hoặc chia sẻ link mà không mất trạng thái. */
function readFilters(params: { get(name: string): string | null }): Filters {
  return {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    page: Math.max(0, Number(params.get('page')) || 0),
  };
}

function toQuery(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set('q', filters.q.trim());
  if (filters.category) params.set('category', filters.category);
  if (filters.page) params.set('page', String(filters.page));
  return params;
}

/** Trang /admin/audit/: nhật ký mọi thao tác thay đổi dữ liệu, mới nhất trước; chỉ đọc. */
export function AuditView() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() => readFilters(searchParams));
  const [search, setSearch] = useState(filters.q);
  const [data, setData] = useState<PageResult<AuditEntry> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /** Ghi bộ lọc lên URL rồi tải trang tương ứng; trạng thái "đang tải" do nơi gọi bật. */
  const fetchPage = useCallback((current: Filters) => {
    const params = toQuery(current);
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
    params.set('page', String(current.page));
    params.set('size', String(PAGE_SIZE));
    return apiRequest<PageResult<AuditEntry>>(`/admin/audit?${params}`)
      .then(setData)
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : 'Không tải được nhật ký.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Đổi bộ lọc: bật "đang tải" ngay trong lần render này, effect bên dưới gửi request.
  const [shownFilters, setShownFilters] = useState<Filters | null>(null);
  if (shownFilters !== filters) {
    setShownFilters(filters);
    setLoading(true);
    setError('');
  }

  useEffect(() => {
    void fetchPage(filters);
  }, [filters, fetchPage]);

  function reload() {
    setLoading(true);
    setError('');
    return fetchPage(filters);
  }

  // Gõ tìm kiếm: chờ 300 ms rồi mới gọi API, và luôn quay về trang đầu.
  useEffect(() => {
    if (search === filters.q) return;
    const timer = setTimeout(() => setFilters({ ...filters, q: search, page: 0 }), 300);
    return () => clearTimeout(timer);
  }, [search, filters]);

  const page = data?.page ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const from = data && data.total ? page * PAGE_SIZE + 1 : 0;
  const to = data ? page * PAGE_SIZE + data.items.length : 0;

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Nhật ký hoạt động"
        description="Ai đã làm gì, lúc nào: đăng nhập, quản lý tài khoản, khóa học, bài nộp và chấm điểm."
      >
        <button className="button" disabled={loading} onClick={() => void reload()}>
          <Icon name="history" size={13} />
          Tải lại
        </button>
      </AdminHeading>
      <section className="panel rounded-2xl shadow-card border border-line/80 bg-white/95 backdrop-blur-xs">
        <div className="toolbar rounded-2xl bg-white/70 p-2.5 border border-line/80 shadow-xs backdrop-blur-xs">
          <label className="search-field">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm theo người thực hiện, đối tượng hoặc nội dung</span>
            <input
              className="input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tài khoản, mã khóa học, nội dung…"
              maxLength={64}
            />
          </label>
          <div className="toolbar-right">
            <select
              className="select"
              aria-label="Lọc theo loại thao tác"
              value={filters.category}
              onChange={(event) =>
                setFilters({ ...filters, category: event.target.value, page: 0 })
              }
            >
              <option value="">Mọi thao tác</option>
              {AUDIT_CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <div className="notice" role="alert">
            {error}
          </div>
        )}
        <div className="table-responsive">
          <table className={`table admin-table ${loading ? 'is-loading' : ''}`}>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Người thực hiện</th>
                <th>Thao tác</th>
                <th>Đối tượng</th>
                <th className="hide-sm">Chi tiết</th>
                <th className="hide-sm">IP</th>
              </tr>
            </thead>
            <tbody>
              {!data ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Đang tải…
                  </td>
                </tr>
              ) : data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Không có hoạt động phù hợp.
                  </td>
                </tr>
              ) : (
                data.items.map((item, index) => (
                  <tr key={`${item.createdAt}-${index}`}>
                    <td className="whitespace-nowrap">{formatDateTime(item.createdAt)}</td>
                    <td>
                      {item.actorUsername ? (
                        <span title={item.actorName ?? undefined} className="mono">
                          {item.actorUsername}
                        </span>
                      ) : (
                        <span className="badge muted">Hệ thống</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${item.action === 'auth.login_failed' ? 'locked' : 'muted'}`}
                        title={item.action}
                      >
                        {auditActionLabel(item.action)}
                      </span>
                    </td>
                    <td className="mono">{item.target ?? '—'}</td>
                    <td className="hide-sm max-w-90 text-[13px] wrap-anywhere text-ink-muted">
                      {item.detail ?? ''}
                    </td>
                    <td className="hide-sm mono">{item.ip ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <span>{data ? `${from}–${to} / ${data.total} hoạt động` : ''}</span>
          <div>
            <button
              className="button small"
              disabled={page === 0 || loading}
              onClick={() => setFilters({ ...filters, page: page - 1 })}
            >
              Trước
            </button>
            <span>
              Trang {totalPages ? page + 1 : 0} / {totalPages}
            </span>
            <button
              className="button small"
              disabled={page + 1 >= totalPages || loading}
              onClick={() => setFilters({ ...filters, page: page + 1 })}
            >
              Sau
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
