import React from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Compass, Lightbulb, Play } from 'lucide-react';
import { OrganItem, PhysiologyFlow, SYSTEM_META } from '../data/anatomyData';

interface ExplorePanelProps {
  selectedOrgan: OrganItem | null;
  availableOrgans: OrganItem[];
  flows: PhysiologyFlow[];
  activeFlowId: string | null;
  activeStepIndex: number;
  onSelectOrgan: (organId: string) => void;
  onSelectFlow: (flowId: string | null, stepIndex?: number) => void;
}

export const ExplorePanel: React.FC<ExplorePanelProps> = ({
  selectedOrgan,
  availableOrgans,
  flows,
  activeFlowId,
  activeStepIndex,
  onSelectOrgan,
  onSelectFlow,
}) => {
  const activeFlow = flows.find((f) => f.id === activeFlowId) ?? null;
  const activeStep = activeFlow ? activeFlow.steps[activeStepIndex] : null;

  return (
    <div className="space-y-6">
      {/* Organ Info Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        {selectedOrgan ? (
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-medium text-slate-700">
                {SYSTEM_META[selectedOrgan.system].label}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedOrgan.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular italic text-sky-700">
                {selectedOrgan.latinName}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
              {selectedOrgan.name}
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Letak &amp; Struktur
                </h3>
                <p>{selectedOrgan.locationAndStructure}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Fungsi Utama
                </h3>
                <p>{selectedOrgan.mainFunction}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Peran Fisiologis
                </h3>
                <p>{selectedOrgan.physiologicalRole}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="bg-sky-50/70 border border-sky-200/80 rounded-lg p-3.5">
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">Catatan OSPE: </span>
                      {selectedOrgan.ospeTip}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono-tabular">
                {selectedOrgan.keyFacts.map((fact, idx) => (
                  <React.Fragment key={fact}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{fact}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2.5" />
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              Klik Organ pada Diagram Phantom
            </h2>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Pilih struktur anatomi langsung pada diagram di sebelah kiri untuk membaca nama Latin,
              letak, struktur, dan peran fisiologisnya.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Physiology Flow Stepper */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-700" />
              <span>Alur Fisiologi &amp; Mekanisme</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulasi langkah demi langkah dengan sorotan otomatis pada phantom.
            </p>
          </div>
          {activeFlow && (
            <button
              type="button"
              onClick={() => onSelectFlow(null)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2 whitespace-nowrap shrink-0"
            >
              Tutup Simulasi
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {flows.map((flow) => {
            const isActive = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                type="button"
                onClick={() => onSelectFlow(isActive ? null : flow.id, 0)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {flow.title}
              </button>
            );
          })}
        </div>

        {activeFlow && activeStep ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono-tabular font-semibold text-sky-700">
                Langkah {activeStepIndex + 1} / {activeFlow.steps.length}
              </span>
              <span className="text-xs text-slate-500 truncate">{activeFlow.summary}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1.5">{activeStep.title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{activeStep.detail}</p>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => onSelectFlow(activeFlow.id, activeStepIndex - 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Sebelumnya
              </button>

              <div className="flex items-center gap-1.5">
                {activeFlow.steps.map((step, i) => (
                  <button
                    key={step.title}
                    type="button"
                    aria-label={`Langkah ${i + 1}`}
                    onClick={() => onSelectFlow(activeFlow.id, i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeStepIndex ? 'w-6 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={activeStepIndex === activeFlow.steps.length - 1}
                onClick={() => onSelectFlow(activeFlow.id, activeStepIndex + 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                Lanjut
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
            <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Pilih salah satu alur di atas untuk menelusuri mekanisme fisiologis pada diagram.</span>
          </div>
        )}
      </div>

      {/* Quick Organ Directory */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Daftar Struktur ({availableOrgans.length} Item)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
          {availableOrgans.map((organ) => {
            const isSelected = selectedOrgan?.id === organ.id;
            return (
              <button
                key={organ.id}
                type="button"
                onClick={() => onSelectOrgan(organ.id)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-sky-50 text-sky-900 border border-sky-300'
                    : 'bg-slate-50 text-slate-700 border border-transparent hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{organ.name}</span>
                <span className="text-[11px] font-mono-tabular text-slate-400 shrink-0">
                  {SYSTEM_META[organ.system].shortLabel.slice(0, 4)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
