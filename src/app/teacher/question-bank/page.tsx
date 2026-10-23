import { Suspense } from 'react';
import { QuestionBankView } from '@/app/teacher/question-bank/_components/question-bank-view';
export const metadata = { title: 'Ngân hàng câu hỏi' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function QuestionBankPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở ngân hàng câu hỏi…</p>
        </main>
      }
    >
      <QuestionBankView />
    </Suspense>
  );
}
