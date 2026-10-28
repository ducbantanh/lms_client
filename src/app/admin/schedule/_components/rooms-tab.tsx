'use client';

import { useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import type { Room } from '@/lib/schedule';
import { errorFlash } from '@/app/teacher/course/_components/course-manager';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { FormError, type ScheduleAdminContext } from './schedule-forms';
import { RoomImportDialog } from './room-import';

/** Danh mục phòng học: chỉ phòng đang dùng mới chọn được khi xếp lịch. */
export function RoomsTab({ context }: { context: ScheduleAdminContext }) {
  const { rooms, reloadRooms, notify, confirm } = context;
  const [editing, setEditing] = useState<Room | 'new' | null>(null);
  const [importing, setImporting] = useState(false);

  function remove(room: Room) {
    confirm({
      title: 'Xóa phòng học',
      message: `Xóa phòng ${room.name} khỏi danh mục? Phòng đã từng được xếp lịch thì không xóa được, hãy chuyển sang "Ngừng dùng".`,
      confirmLabel: 'Xóa phòng',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`/admin/rooms/${encodeURIComponent(room.id)}`, { method: 'DELETE' });
          notify({ type: 'success', text: `Đã xóa phòng ${room.name}.` });
          reloadRooms();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  return (
    <section className="panel rounded-2xl shadow-card border border-line/80 bg-white/95 backdrop-blur-xs">
      <div className="toolbar">
        <p className="table-summary">
          {rooms.length} phòng · {rooms.filter((room) => room.active).length} đang dùng
        </p>
        <div className="toolbar-right">
          <button className="button" onClick={() => setImporting(true)}>
            <Icon name="upload" size={12} />
            Nhập danh sách
          </button>
          <button className="button primary" onClick={() => setEditing('new')}>
            <Icon name="plus" size={12} />
            Thêm phòng
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table admin-table">
          <thead>
            <tr>
              <th>Phòng</th>
              <th className="hide-sm">Tòa nhà</th>
              <th className="numeric">Sức chứa</th>
              <th>Trạng thái</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-cell">
                  Chưa có phòng học nào. Thêm phòng trước khi xếp lịch.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <b>{room.name}</b>
                    {room.note && <small className="cell-sub">{room.note}</small>}
                  </td>
                  <td className="hide-sm">{room.building ?? '—'}</td>
                  <td className="numeric">{room.capacity ?? '—'}</td>
                  <td>
                    <span className={`badge ${room.active ? 'ok' : 'muted'}`}>
                      {room.active ? 'Đang dùng' : 'Ngừng dùng'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="icon-button row-action"
                      title="Sửa phòng"
                      aria-label={`Sửa phòng ${room.name}`}
                      onClick={() => setEditing(room)}
                    >
                      <Icon name="edit" size={12} />
                    </button>
                    <button
                      className="icon-button row-action danger"
                      title="Xóa phòng"
                      aria-label={`Xóa phòng ${room.name}`}
                      onClick={() => remove(room)}
                    >
                      <Icon name="trash" size={12} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {importing && (
        <RoomImportDialog
          onClose={() => setImporting(false)}
          onImported={(report) => {
            notify({ type: 'success', text: `Đã thêm ${report.created.length} phòng học.` });
            reloadRooms();
          }}
        />
      )}
      {editing && (
        <RoomDialog
          room={editing === 'new' ? undefined : editing}
          onClose={() => setEditing(null)}
          onSaved={(room) => {
            setEditing(null);
            notify({ type: 'success', text: `Đã lưu phòng ${room.name}.` });
            reloadRooms();
          }}
        />
      )}
    </section>
  );
}

function RoomDialog({
  room,
  onClose,
  onSaved,
}: {
  room?: Room;
  onClose: () => void;
  onSaved: (room: Room) => void;
}) {
  const [name, setName] = useState(room?.name ?? '');
  const [building, setBuilding] = useState(room?.building ?? '');
  const [capacity, setCapacity] = useState(room?.capacity ? String(room.capacity) : '');
  const [note, setNote] = useState(room?.note ?? '');
  const [active, setActive] = useState(room?.active ?? true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body = {
        name: name.trim(),
        building: building.trim(),
        capacity: capacity ? Number(capacity) : null,
        note: note.trim(),
        active,
      };
      const saved = await apiRequest<Room>(
        room ? `/admin/rooms/${encodeURIComponent(room.id)}` : '/admin/rooms',
        { method: room ? 'PUT' : 'POST', body },
      );
      onSaved(saved);
    } catch (reason) {
      setError(reason);
      setBusy(false);
    }
  }

  return (
    <Modal
      title={room ? `Sửa phòng ${room.name}` : 'Thêm phòng học'}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        <FormError error={error} />
        <div className="form-row">
          <label className="form-field">
            <span>Tên phòng</span>
            <input
              className="input"
              value={name}
              maxLength={32}
              required
              autoFocus
              onChange={(event) => setName(event.target.value)}
              placeholder="Vd. 402-A2"
            />
          </label>
          <label className="form-field">
            <span>
              Sức chứa <span className="optional">(chỗ ngồi)</span>
            </span>
            <input
              className="input"
              type="number"
              min={1}
              max={2000}
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
            />
          </label>
        </div>
        <label className="form-field">
          <span>
            Tòa nhà <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={building}
            maxLength={64}
            onChange={(event) => setBuilding(event.target.value)}
            placeholder="Vd. Nhà A2"
          />
        </label>
        <label className="form-field">
          <span>
            Ghi chú <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={note}
            maxLength={200}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Vd. Phòng máy 40 máy, có máy chiếu"
          />
        </label>
        <label className="check-field">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          Đang dùng (bỏ chọn để không xếp lịch mới vào phòng này; lịch đã xếp giữ nguyên)
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
