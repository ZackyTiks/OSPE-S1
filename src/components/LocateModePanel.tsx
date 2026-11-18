import React from 'react';
import { ArrowRight, CheckCircle2, Crosshair, RotateCcw, XCircle } from 'lucide-react';
import { OrganItem, SYSTEM_META } from '../data/anatomyData';

export type LocatePromptType = 'mixed' | 'name' | 'clue';

export interface LocateFeedback {
  isCorrect: boolean;
  clickedOrgan: OrganItem | null;
  targetOrgan: OrganItem;
}

interface LocateModePanelProps {
  targetOrgan: OrganItem | null;
  promptMode: LocatePromptType;
  actualPromptKind: 'name' | 'clue';
  feedback: LocateFeedback | null;
  drillMissedOnly: boolean;
  missedCount: number;
  questionNumber: number;
  onChangePromptMode: (mode: LocatePromptType) => void;
  onToggleDrillMissed: (value: boolean) => void;
  onNextQuestion: () => void;
}

export const LocateModePanel: React.FC<LocateModePanelProps> = ({
  targetOrgan,
  promptMode,
  actualPromptKind,
  feedback,
  drillMissedOnly,
  missedCount,
  questionNumber,
  onChangePromptMode,
  onToggleDrillMissed,
  onNextQuestion,
}) => {
  return (
    <div className="space-y-5">
      {/* Mode Settings Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Format Soal Tebak Lokasi
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'mixed', label: 'Acak' },
                { id: 'name', label: 'Nama Organ' },
                { id: 'clue', label: 'Fungsi/Ciri' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangePromptMode(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  promptMode === item.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drill Missed Organs Switch */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-600">
            Fokus ulang <span className="font-semibold text-slate-900">Organ yang Masih Salah</span>{' '}
            <span className="font-mono-tabular text-slate-500">({missedCount} item)</span>
          </div>
          <button
            type="button"
            disabled={missedCount === 0 && !drillMissedOnly}
            onClick={() => onToggleDrillMissed(!drillMissedOnly)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
              drillMissedOnly
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {drillMissedOnly ? 'Mode Ulang Aktif' : 'Latih Bagian Salah'}
          </button>
        </div>
      </div>

      {/* Active Question Prompt Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        {targetOrgan ? (
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono-tabular font-semibold text-slate-800">
                  Soal #{questionNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span>{SYSTEM_META[targetOrgan.system].label}</span>
                <span aria-hidden="true">·</span>
                <span>{actualPromptKind === 'name' ? 'Identifikasi Nama' : 'Klu Fungsi & Struktur'}</span>
              </div>
              {drillMissedOnly && (
                <span className="text-amber-700 font-medium inline-flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Ulang Salah
                </span>
              )}
            </div>

            {actualPromptKind === 'name' ? (
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">
                  Klik lokasi struktur berikut pada diagram phantom:
                </p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                  {targetOrgan.name}
                </h2>
                <p className="text-xs font-mono-tabular italic text-slate-500">
                  {targetOrgan.latinName}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1.5">
                  Tunjukkan pada phantom organ yang sesuai deskripsi berikut:
                </p>
                <p className="text-base font-semibold text-slate-900 leading-relaxed">
                  &ldquo;{targetOrgan.cluePrompt}&rdquo;
                </p>
              </div>
            )}

            {/* Instruction or Feedback Banner */}
            {!feedback ? (
              <div className="mt-5 flex items-center gap-2.5 text-xs text-sky-800 bg-sky-50 border border-sky-200 rounded-lg px-3.5 py-2.5">
                <Crosshair className="w-4 h-4 shrink-0 text-sky-700" />
                <span>Arahkan kursor dan klik langsung bagian organ pada diagram SVG di sebelah kiri.</span>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div
                  className={`rounded-lg border p-4 ${
                    feedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 text-sm">
                      <div
                        className={`font-bold ${
                          feedback.isCorrect ? 'text-emerald-900' : 'text-rose-900'
                        }`}
                      >
                        {feedback.isCorrect
                          ? 'Benar! Lokasi Phantom Tepat (+10 Poin)'
                          : 'Kurang Tepat — Lokasi Benar Ditandai Hijau'}
                      </div>
                      {!feedback.isCorrect && feedback.clickedOrgan && (
                        <p className="text-xs text-rose-800">
                          Anda mengklik:{' '}
                          <span className="font-semibold">{feedback.clickedOrgan.name}</span>.{' '}
                          Organ ini telah ditambahkan ke daftar{' '}
                          <span className="font-semibold">Organ yang Masih Salah</span>.
                        </p>
                      )}
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">
                        <span className="font-semibold text-slate-900">
                          {feedback.targetOrgan.name} ({feedback.targetOrgan.latinName}):
                        </span>{' '}
                        {feedback.targetOrgan.mainFunction}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onNextQuestion}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-slate-600">
            Semua organ pada daftar ulang sudah berhasil dijawab. Nonaktifkan mode ulang atau
            lanjutkan latihan acak.
          </div>
        )}
      </div>
    </div>
  );
};
