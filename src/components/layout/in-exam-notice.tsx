'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PROCTOR_ERROR_EVENT, type ApiError } from '@/lib/api';
import type { InExam } from '@/lib/proctor';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

function examHref(exam: InExam) {
  return `/course/assessment/?id=${encodeURIComponent(exam.assessmentId)}`;
}

/** Đang ở chính trang làm bài của bài đang thi (lỗi đến từ request nền như thông báo): không cần nhắc. */
function onExamPage(exam: InExam) {
  const path = window.location.pathname.replace(/\/$/, '');
  return (
    path.endsWith('/course/assessment') &&
    new URLSearchParams(window.location.search).get('id') === exam.assessmentId
  );
}

/**
 * Sinh viên đang trong giờ thi có giám sát mà mở trang khác (tab khác, gõ địa chỉ): server trả PROCTOR_IN_EXAM cho
 * mọi API ngoài trang làm bài; hộp này báo lý do và đưa về trang làm bài.
 */
export function InExamNotice() {
  const [exam, setExam] = useState<InExam | null>(null);
  useEffect(() => {
    const onError = (event: Event) => {
      const error = (event as CustomEvent<ApiError>).detail;
      if (error.code !== 'PROCTOR_IN_EXAM') return;
      const info = error.details as InExam | undefined;
      if (info?.assessmentId && !onExamPage(info)) setExam(info);
    };
    window.addEventListener(PROCTOR_ERROR_EVENT, onError);
    return () => window.removeEventListener(PROCTOR_ERROR_EVENT, onError);
  }, []);
  if (!exam) return null;
  return (
    <Modal title="Bạn đang trong giờ thi" onClose={() => window.location.assign(examHref(exam))}>
      <p>
        Bài <b>{exam.title}</b> có giám sát và đang trong giờ thi. Trong giờ thi chỉ mở được trang
        làm bài; các trang khác tạm khóa tới khi bạn nộp bài hoặc hết giờ.
      </p>
      <div className="dialog-actions">
        <Link href={examHref(exam)} className="button primary shadow-sm hover:shadow-md transition-all active:scale-[0.98]" onClick={() => setExam(null)}>
          <Icon name="exam" size={13} />
          Về trang làm bài
        </Link>
      </div>
    </Modal>
  );
}
