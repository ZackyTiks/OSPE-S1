import React from 'react';
import { ArrowRight, CheckCircle2, Eye, HelpCircle, XCircle } from 'lucide-react';
import { QuizQuestion, SYSTEM_META } from '../data/anatomyData';

interface QuizModePanelProps {
  question: QuizQuestion | null;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
  onInspectRelatedOrgan: (organId: string) => void;
}

export const QuizModePanel: React.FC<QuizModePanelProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNextQuestion,
  onInspectRelatedOrgan,
}) => {
  if (!question) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-sm text-slate-600">
        Tidak ada soal tersedia untuk filter sistem ini.
      </div>
    );
  }

  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
      {/* Header Metadata (Unboxed) */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-mono-tabular font-semibold text-slate-800">
            Soal {questionIndex + 1} / {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span>{SYSTEM_META[question.system].label}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-slate-500">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Fisiologi &amp; Alur Kerja</span>
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {question.question}
      </h2>

      {/* Multiple Choice Options */}
      <div className="space-y-2.5">
        {question.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctIndex;

          let btnStyle =
            'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
          if (hasAnswered) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
            } else if (isThisSelected && !isThisCorrect) {
              btnStyle = 'bg-rose-50 border-rose-500 text-rose-950';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-500 opacity-75';
            }
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-start gap-3 min-h-[44px] ${btnStyle}`}
            >
              <span className="font-mono-tabular text-xs font-bold mt-0.5 shrink-0 w-5">
                {letter}.
              </span>
              <span className="text-sm leading-relaxed flex-1">{opt}</span>
              {hasAnswered && isThisCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              )}
              {hasAnswered && isThisSelected && !isThisCorrect && (
                <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next Action */}
      {hasAnswered && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div
            className={`rounded-lg border p-4 ${
              isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold mb-1.5">
              {isCorrect ? (
                <span className="text-emerald-800">Jawaban Benar (+10 Poin)</span>
              ) : (
                <span className="text-rose-800">
                  Kurang Tepat — Jawaban Benar: {String.fromCharCode(65 + question.correctIndex)}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onInspectRelatedOrgan(question.relatedOrganId)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              Lihat Organ Terkait
            </button>

            <button
              type="button"
              onClick={onNextQuestion}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Pertanyaan Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
