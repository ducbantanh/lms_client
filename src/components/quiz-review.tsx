'use client';

import { optionLetter } from '@/lib/question-bank';
import type { QuizQuestionView } from '@/lib/quiz';
import { Icon } from '@/components/ui/icon';

/**
 * Đề kèm đáp án đúng, đáp án đã chọn và giải thích; dùng cho sinh viên xem lại và giảng viên xem bài làm.
 */
export function QuizReviewList({
  questions,
  stats,
}: {
  questions: QuizQuestionView[];
  /** Giảng viên: số người trả lời / đúng theo id câu. */
  stats?: Map<string, { answered: number; correct: number }>;
}) {
  return (
    <ol className="quiz-questions" aria-label="Bài làm">
      {questions.map((question, index) => {
        const stat = stats?.get(question.id);
        return (
          <li key={question.id} className="question-card">
            <div className="question-head">
              <b className="question-number">Câu {index + 1}</b>
              {question.multiple && <span className="badge muted-solid">Chọn nhiều</span>}
              {stat ? (
                <span className="badge muted">
                  {stat.correct}/{stat.answered} người đúng
                </span>
              ) : (
                question.correct !== null && (
                  <span className={`badge ${question.correct ? 'ok' : 'locked'}`}>
                    {question.correct ? 'Đúng' : question.chosen.length ? 'Sai' : 'Bỏ trống'}
                  </span>
                )
              )}
            </div>
            <p className="lesson-text question-body">{question.body}</p>
            <ol className="question-options">
              {question.options.map((option, shown) => {
                const picked = question.chosen.includes(option.position);
                return (
                  <li
                    key={option.position}
                    className={[
                      option.correct ? 'is-correct' : '',
                      picked && !option.correct ? 'is-wrong' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className="option-letter">{optionLetter(shown)}</span>
                    <span className="lesson-text">{option.body}</span>
                    {picked && <span className="badge muted-solid">Đã chọn</span>}
                    {option.correct && (
                      <>
                        <Icon name="check" size={12} className="option-check" />
                        <span className="sr-only">(đáp án đúng)</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
            {question.explanation && (
              <p className="question-explanation lesson-text">
                <b>Giải thích:</b> {question.explanation}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
