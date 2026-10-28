'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { roleName } from '@/lib/auth';
import { initials } from '@/lib/course-utils';
import {
  PROFILE_LIMITS,
  formatBirthDate,
  formatDate,
  usernameLabel,
  type Profile,
} from '@/lib/profile';
import { AdminHeading, FlashMessage, type Flash } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';

/**
 * Trang Hồ sơ (/profile/, /teacher/profile/), dùng chung cho sinh viên và giảng viên: chỉ thông tin cá nhân,
 * liên hệ và lời giới thiệu.
 * Họ tên, mã, ngày sinh do quản trị viên quản lý; người dùng chỉ tự sửa email, điện thoại, giới thiệu.
 */
export function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<Profile>('/profile', { signal: controller.signal })
      .then(setProfile)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được hồ sơ.');
      });
    return () => controller.abort();
  }, []);

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading title="Hồ sơ cá nhân" description="Thông tin cá nhân và liên hệ của bạn." />
      <FlashMessage flash={flash} onDone={clearFlash} />
      {error ? (
        <div className="notice" role="alert">
          {error}
        </div>
      ) : !profile ? (
        <p className="empty-state" role="status">
          Đang tải hồ sơ…
        </p>
      ) : (
        <>
          <section className="panel mb-6 flex items-center gap-5 max-md:gap-3.5">
            <span
              className="grid size-18 shrink-0 place-items-center rounded-full bg-primary-50 text-[26px] font-bold text-primary-600 max-md:size-14 max-md:text-xl"
              aria-hidden="true"
            >
              {initials(profile.fullName)}
            </span>
            <div className="min-w-0">
              <h2 className="text-[22px] font-semibold wrap-anywhere">{profile.fullName}</h2>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-sm text-ink-muted">
                <span className="badge muted-solid mr-0">{roleName(profile.role)}</span>
                <span className="font-mono">{profile.username}</span>
                <span>Tham gia từ {formatDate(profile.createdAt)}</span>
              </p>
            </div>
          </section>
          <div className="columns even">
            <section className="panel">
              <div className="panel-title">
                <h2>
                  <i className="title-icon blue">
                    <Icon name="profile" size={11} />
                  </i>
                  Thông tin cá nhân
                </h2>
              </div>
              <dl className="info-list">
                <div>
                  <dt>Họ tên</dt>
                  <dd>{profile.fullName}</dd>
                </div>
                <div>
                  <dt>{usernameLabel(profile.role)}</dt>
                  <dd className="mono">{profile.username}</dd>
                </div>
                <div>
                  <dt>Vai trò</dt>
                  <dd>{roleName(profile.role)}</dd>
                </div>
                <div>
                  <dt>Ngày sinh</dt>
                  <dd>{formatBirthDate(profile.birthDate)}</dd>
                </div>
                <div>
                  <dt>Đăng nhập gần nhất</dt>
                  <dd>{formatDateTime(profile.lastLoginAt)}</dd>
                </div>
              </dl>
              <p className="admin-hint">
                Cần sửa họ tên, mã hoặc ngày sinh, liên hệ quản trị viên.
              </p>
            </section>
            <section className="panel">
              <div className="panel-title">
                <h2>
                  <i className="title-icon violet">
                    <Icon name="mail" size={11} />
                  </i>
                  Liên hệ và giới thiệu
                </h2>
                {!editing && (
                  <button className="button small" onClick={() => setEditing(true)}>
                    <Icon name="edit" size={12} />
                    Sửa
                  </button>
                )}
              </div>
              {editing ? (
                <ContactForm
                  profile={profile}
                  onCancel={() => setEditing(false)}
                  onSaved={(saved) => {
                    setProfile(saved);
                    setEditing(false);
                    setFlash({ type: 'success', text: 'Đã lưu hồ sơ.' });
                  }}
                />
              ) : (
                <>
                  <dl className="info-list">
                    <div>
                      <dt>Email</dt>
                      <dd>
                        {profile.email ? (
                          <a
                            className="text-primary-600 hover:text-primary-700 hover:underline"
                            href={`mailto:${profile.email}`}
                          >
                            {profile.email}
                          </a>
                        ) : (
                          <span className="optional">Chưa có</span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Số điện thoại</dt>
                      <dd>{profile.phone ?? <span className="optional">Chưa có</span>}</dd>
                    </div>
                  </dl>
                  <div className="border-t border-line pt-2.5 text-sm">
                    <b className="mb-1 block font-normal text-ink-muted">Giới thiệu</b>
                    {profile.bio ? (
                      <p className="whitespace-pre-line wrap-anywhere">{profile.bio}</p>
                    ) : (
                      <p className="optional">
                        Chưa có lời giới thiệu. Nhấn “Sửa” để viết vài dòng về bản thân.
                      </p>
                    )}
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </main>
  );
}

function ContactForm({
  profile,
  onCancel,
  onSaved,
}: {
  profile: Profile;
  onCancel: () => void;
  onSaved: (profile: Profile) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [bio, setBio] = useState(profile.bio ?? '');

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      onSaved(
        await apiRequest<Profile>('/profile', {
          method: 'PUT',
          body: {
            email: String(form.get('email') ?? '').trim(),
            phone: String(form.get('phone') ?? '').trim(),
            bio: bio.trim(),
          },
        }),
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được hồ sơ.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save}>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <label className="form-field">
        Email
        <input
          className="input"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={PROFILE_LIMITS.email}
          defaultValue={profile.email ?? ''}
          placeholder="ten@example.com"
        />
      </label>
      <label className="form-field">
        Số điện thoại
        <input
          className="input"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={PROFILE_LIMITS.phone}
          // Giống @Pattern của server: chữ số, có thể bắt đầu bằng +, cho phép dấu cách . -
          pattern="\+?[0-9][0-9 .\-]{6,18}"
          title="Chữ số, có thể bắt đầu bằng + (ví dụ 0912 345 678)"
          defaultValue={profile.phone ?? ''}
          placeholder="0912 345 678"
        />
      </label>
      <label className="form-field">
        <span className="field-head">
          Giới thiệu
          <span className="optional">
            {bio.length}/{PROFILE_LIMITS.bio}
          </span>
        </span>
        <textarea
          className="input"
          name="bio"
          rows={4}
          maxLength={PROFILE_LIMITS.bio}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Lĩnh vực quan tâm, giờ tiếp sinh viên, kỹ năng…"
        />
      </label>
      <div className="button-row">
        <button className="button primary" disabled={busy}>
          {busy ? 'Đang lưu…' : 'Lưu'}
        </button>
        <button type="button" className="button" disabled={busy} onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}
