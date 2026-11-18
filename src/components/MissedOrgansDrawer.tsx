import React from 'react';
import { BookOpen, Crosshair, Trash2, X } from 'lucide-react';
import { OrganItem, SYSTEM_META } from '../data/anatomyData';

interface MissedOrgansDrawerProps {
  isOpen: boolean;
  missedOrgans: OrganItem[];
  onClose: () => void;
  onExploreOrgan: (organ: OrganItem) => void;
  onStartDrillMissed: () => void;
  onRemoveMissed: (organId: string) => void;
  onClearAll: () => void;
}

export const MissedOrgansDrawer: React.FC<MissedOrgansDrawerProps> = ({
  isOpen,
  missedOrgans,
  onClose,
  onExploreOrgan,
  onStartDrillMissed,
  onRemoveMissed,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="missed-organs-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200">
          <div>
            <h2 id="missed-organs-title" className="text-base font-bold text-slate-900">
              Daftar Organ yang Masih Salah
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {missedOrgans.length} struktur perlu pengulangan sebelum ujian OSPE
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {missedOrgans.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-slate-900 mb-1">
                Belum ada organ yang salah
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Jika Anda salah menebak organ pada Mode Tebak Lokasi atau Kuis Fisiologi, organ
                tersebut akan otomatis tercatat di sini untuk diulang.
              </p>
            </div>
          ) : (
            missedOrgans.map((organ) => (
              <div
                key={organ.id}
                className="border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-3 bg-slate-50/50"
              >
                <div className="min-w-0">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-0.5">
                    <span>{SYSTEM_META[organ.system].shortLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular italic truncate">{organ.latinName}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{organ.name}</div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onExploreOrgan(organ);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Pelajari
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus ${organ.name} dari daftar`}
                    onClick={() => onRemoveMissed(organ.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {missedOrgans.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-b-xl">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-medium text-slate-600 hover:text-rose-700 underline underline-offset-2"
            >
              Kosongkan Daftar
            </button>
            <button
              type="button"
              onClick={() => {
                onStartDrillMissed();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 whitespace-nowrap"
            >
              <Crosshair className="w-3.5 h-3.5" />
              Latih Ulang Semua ({missedOrgans.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
