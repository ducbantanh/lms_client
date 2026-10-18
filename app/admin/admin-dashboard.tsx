'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/icon';
import { Modal } from '@/components/modal';
import { useSession } from '@/lib/session-provider';
import { useAdminDashboard } from '@/lib/use-admin-dashboard';
import {
  auditLabel,
  auditTone,
  formatDateTime,
  formatRelativeTime,
  roleName,
} from '@/lib/admin-utils';
import type { OnlineUser } from '@/lib/types';

export function AdminDashboard() {
  const { user, isDemo, connection } = useSession();
  const {
    totals,
    onlineUsers,
    auditEntries,
    auditError,
    liveActivities,
    loading,
    error,
    canManageSessions,
    forceLogout,
    reload,
  } = useAdminDashboard();
  const [search, setSearch] = useState('');
  const [confirmTarget, setConfirmTarget] = useState<OnlineUser | null>(null);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase('vi');
    if (!keyword) return onlineUsers;
    return onlineUsers.filter((item) =>
      `${item.username} ${item.fullName} ${roleName(item.role)}`
        .toLocaleLowerCase('vi')
        .includes(keyword),
    );
  }, [onlineUsers, search]);

  const totalConnections = onlineUsers.reduce((sum, item) => sum + item.connections, 0);

  async function confirmForceLogout() {
    if (!confirmTarget || busyUserId) return;
    setBusyUserId(confirmTarget.id);
    setActionError('');
    try {
      await forceLogout(confirmTarget);
      setActionMessage(`Đã gửi yêu cầu đăng xuất tài khoản ${confirmTarget.username}.`);
      setConfirmTarget(null);
    } catch (reason) {
      setActionError(reason instanceof Error ? reason.message : 'Không thể ép đăng xuất.');
    } finally {
      setBusyUserId(null);
    }
  }

  return (
    <main id="main-content" className="page-width main-content admin-dashboard">
      <div className="breadcrumb">
        <Icon name="home" size={14} />
        <span>Quản trị</span>
        <Icon name="chevron" size={12} />
        <span className="current">Tổng quan hệ thống</span>
      </div>

      <div className="page-heading admin-heading">
        <div>
          <p className="eyebrow">TRUNG TÂM ĐIỀU HÀNH</p>
          <h1>
            Tổng quan hệ thống<span className="heading-dot">.</span>
          </h1>
          <p>Theo dõi người dùng, kết nối realtime và hoạt động quản trị trong phòng máy.</p>
        </div>
        <button className="btn btn-outline-secondary button" onClick={reload} disabled={loading}>
          <Icon name="sync" size={15} className={loading ? 'is-spinning' : ''} />
          Làm mới dữ liệu
        </button>
      </div>

      <section className="admin-system-bar" aria-label="Trạng thái hệ thống">
        <span className={`system-indicator ${isDemo ? 'demo' : connection}`}>
          <i />
          {isDemo
            ? 'Dữ liệu minh họa'
            : connection === 'online'
              ? 'Realtime đang hoạt động'
              : connection === 'connecting'
                ? 'Đang kết nối realtime'
                : 'Realtime đang gián đoạn'}
        </span>
        <span>
          <Icon name="shield" size={14} />
          Quyền hiện tại: {user.permissions.length} permission
        </span>
        <span>
          <Icon name="server" size={14} />
          {isDemo ? 'Chưa ghi dữ liệu vào Spring Boot' : 'Đang dùng dữ liệu Spring Boot'}
        </span>
      </section>

      {error && (
        <div className="admin-error" role="alert">
          <Icon name="help" size={20} />
          <div>
            <b>Không tải được dashboard</b>
            <span>{error}</span>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={reload}>
            Thử lại
          </button>
        </div>
      )}
      {actionMessage && (
        <div className="admin-success" role="status">
          <Icon name="check" size={16} />
          {actionMessage}
          <button aria-label="Đóng thông báo" onClick={() => setActionMessage('')}>
            <Icon name="close" size={13} />
          </button>
        </div>
      )}

      <section className="admin-stat-grid" aria-label="Số liệu hệ thống">
        <article className="small-box admin-stat-card tone-blue">
          <div className="inner">
            <span>Tổng tài khoản</span>
            <h2>{loading ? '—' : totals.users}</h2>
            <small>Đã tạo trên hệ thống</small>
          </div>
          <span className="admin-stat-icon">
            <Icon name="users" size={31} />
          </span>
        </article>
        <article className="small-box admin-stat-card tone-orange">
          <div className="inner">
            <span>Sinh viên</span>
            <h2>{loading ? '—' : totals.students}</h2>
            <small>{totals.locked} tài khoản đang bị khóa</small>
          </div>
          <span className="admin-stat-icon">
            <Icon name="cap" size={31} />
          </span>
        </article>
        <article className="small-box admin-stat-card tone-green">
          <div className="inner">
            <span>Đang online</span>
            <h2>{loading ? '—' : onlineUsers.length}</h2>
            <small>Có ít nhất một socket mở</small>
          </div>
          <span className="admin-stat-icon">
            <Icon name="activity" size={31} />
          </span>
        </article>
        <article className="small-box admin-stat-card tone-purple">
          <div className="inner">
            <span>Kết nối realtime</span>
            <h2>{loading ? '—' : totalConnections}</h2>
            <small>Tổng WebSocket đang mở</small>
          </div>
          <span className="admin-stat-icon">
            <Icon name="server" size={31} />
          </span>
        </article>
      </section>

      <div className="admin-dashboard-grid">
        <section id="online-users" className="card admin-panel online-panel">
          <div className="card-header admin-panel-header">
            <div>
              <p className="eyebrow">PRESENCE REALTIME</p>
              <h2>
                Người dùng đang online <span>{onlineUsers.length}</span>
              </h2>
            </div>
            <label className="admin-search">
              <Icon name="search" size={15} />
              <span className="sr-only">Tìm người dùng online</span>
              <input
                id="admin-search"
                className="form-control form-control-sm"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm tài khoản hoặc họ tên"
              />
            </label>
          </div>
          <div className="table-responsive">
            <table className="table table-hover admin-table">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Vai trò</th>
                  <th>Kết nối</th>
                  <th>Online từ</th>
                  <th>
                    <span className="sr-only">Thao tác</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }, (_, index) => (
                    <tr key={index} className="admin-loading-row">
                      <td colSpan={5}>
                        <span />
                      </td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="admin-empty">
                        <Icon name="users" size={27} />
                        <span>
                          {search ? 'Không có người dùng phù hợp.' : 'Chưa có người dùng online.'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((onlineUser) => (
                    <tr key={onlineUser.id}>
                      <td>
                        <div className="admin-user-cell">
                          <span className="presence-avatar">
                            {onlineUser.fullName
                              .split(/\s+/)
                              .slice(-2)
                              .map((part) => part[0])
                              .join('')
                              .toUpperCase()}
                            <i />
                          </span>
                          <span>
                            <b>{onlineUser.fullName}</b>
                            <small>{onlineUser.username}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge role-${onlineUser.role}`}>
                          {roleName(onlineUser.role)}
                        </span>
                      </td>
                      <td>
                        <span className="connection-count">{onlineUser.connections}</span>
                      </td>
                      <td>
                        <span className="time-cell">
                          {formatRelativeTime(onlineUser.since)}
                          <small>{formatDateTime(onlineUser.since)}</small>
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          className="btn btn-sm btn-outline-danger admin-kick-button"
                          disabled={
                            !canManageSessions ||
                            onlineUser.id === user.id ||
                            busyUserId === onlineUser.id
                          }
                          onClick={() => setConfirmTarget(onlineUser)}
                          title={
                            onlineUser.id === user.id
                              ? 'Không thể tự ép đăng xuất'
                              : 'Ép đăng xuất mọi thiết bị'
                          }
                        >
                          <Icon name="ban" size={14} />
                          <span>Đăng xuất</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="card admin-panel activity-panel">
          <div className="card-header admin-panel-header">
            <div>
              <p className="eyebrow">HOẠT ĐỘNG TRỰC TIẾP</p>
              <h2>Luồng kết nối</h2>
            </div>
            <span className="live-chip">
              <i />
              LIVE
            </span>
          </div>
          <div className="activity-list">
            {liveActivities.length === 0 ? (
              <div className="admin-empty">
                <Icon name="activity" size={26} />
                <span>Sự kiện online/offline mới sẽ xuất hiện tại đây.</span>
              </div>
            ) : (
              liveActivities.map((item) => (
                <div className="activity-item" key={item.id}>
                  <span className={`activity-dot ${item.online ? 'online' : 'offline'}`}>
                    <Icon name={item.online ? 'user' : 'logout'} size={13} />
                  </span>
                  <div>
                    <p>
                      <b>{item.fullName}</b> {item.online ? 'vừa online' : 'đã offline'}
                    </p>
                    <small>
                      {item.username} · {formatRelativeTime(item.occurredAt)}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <section id="audit-log" className="card admin-panel audit-panel">
        <div className="card-header admin-panel-header">
          <div>
            <p className="eyebrow">AUDIT LOG</p>
            <h2>Hoạt động quản trị gần đây</h2>
          </div>
          <span className="audit-note">
            <Icon name="shield" size={13} />
            Dữ liệu chỉ đọc
          </span>
        </div>
        <div className="audit-list">
          {auditError ? (
            <div className="admin-empty">
              <Icon name="help" size={27} />
              <span>{auditError}</span>
            </div>
          ) : auditEntries.length === 0 ? (
            <div className="admin-empty">
              <Icon name="audit" size={27} />
              <span>Chưa có bản ghi audit.</span>
            </div>
          ) : (
            auditEntries.map((entry) => (
              <article className="audit-item" key={entry.id}>
                <span className={`audit-icon ${auditTone(entry)}`}>
                  <Icon
                    name={
                      auditTone(entry) === 'danger'
                        ? 'ban'
                        : auditTone(entry) === 'success'
                          ? 'check'
                          : 'audit'
                    }
                    size={14}
                  />
                </span>
                <div className="audit-copy">
                  <b>{auditLabel(entry.action)}</b>
                  <span>
                    {entry.target || 'Hệ thống'}
                    {entry.ip ? ` · IP ${entry.ip}` : ''}
                  </span>
                </div>
                <time dateTime={entry.createdAt}>{formatDateTime(entry.createdAt)}</time>
              </article>
            ))
          )}
        </div>
      </section>

      {confirmTarget && (
        <Modal title="Xác nhận ép đăng xuất" onClose={() => !busyUserId && setConfirmTarget(null)}>
          <p>Bạn sắp thu hồi toàn bộ phiên đăng nhập của:</p>
          <div className="confirm-user">
            <span className="presence-avatar">
              {confirmTarget.fullName
                .split(/\s+/)
                .slice(-2)
                .map((part) => part[0])
                .join('')
                .toUpperCase()}
            </span>
            <span>
              <b>{confirmTarget.fullName}</b>
              <small>
                {confirmTarget.username} · {confirmTarget.connections} kết nối
              </small>
            </span>
          </div>
          <p className="notice">
            Người dùng sẽ nhận sự kiện thu hồi phiên và được đưa về trang đăng nhập.
          </p>
          {actionError && (
            <p className="form-error" role="alert">
              {actionError}
            </p>
          )}
          <div className="modal-actions">
            <button
              className="btn btn-outline-secondary button"
              disabled={Boolean(busyUserId)}
              onClick={() => setConfirmTarget(null)}
            >
              Hủy
            </button>
            <button
              className="btn btn-danger button"
              disabled={Boolean(busyUserId)}
              onClick={() => void confirmForceLogout()}
            >
              {busyUserId ? 'Đang xử lý…' : 'Ép đăng xuất'}
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
