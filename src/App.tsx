import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  BookOpen,
  Crosshair,
  Download,
  Eye,
  EyeOff,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import {
  ORGANS,
  OrganItem,
  PHYSIOLOGY_FLOWS,
  QUIZ_QUESTIONS,
  QuizQuestion,
  SYSTEM_META,
  SystemId,
  TabId,
} from './data/anatomyData';
import { DigestivePhantom } from './components/phantoms/DigestivePhantom';
import { CardioOverlayMode, CardioPhantom } from './components/phantoms/CardioPhantom';
import { EndocrinePhantom } from './components/phantoms/EndocrinePhantom';
import { ExplorePanel } from './components/ExplorePanel';
import { LocateFeedback, LocateModePanel, LocatePromptType } from './components/LocateModePanel';
import { QuizModePanel } from './components/QuizModePanel';
import { MissedOrgansDrawer } from './components/MissedOrgansDrawer';

type StudyMode = 'explore' | 'locate' | 'quiz';

const STORAGE_KEY = 'ospe_phantom_trainer_state_v1';

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  // Navigation & Mode State
  const [activeTab, setActiveTab] = useState<TabId>('digestive');
  const [mixedPhantomView, setMixedPhantomView] = useState<SystemId>('digestive');
  const [mode, setMode] = useState<StudyMode>('explore');

  // Visual Phantom Controls
  const [showLabelsExplore, setShowLabelsExplore] = useState<boolean>(true);
  const [cardioOverlay, setCardioOverlay] = useState<CardioOverlayMode>('all');
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);

  // Mode 1: Explore State
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>('dig-stomach');
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Exam Telemetry State (Persisted)
  const [score, setScore] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Number(JSON.parse(raw).score) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [streak, setStreak] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Number(JSON.parse(raw).streak) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [attempts, setAttempts] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Number(JSON.parse(raw).attempts) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [correctTotal, setCorrectTotal] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Number(JSON.parse(raw).correctTotal) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [missedOrganIds, setMissedOrganIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw).missedOrganIds : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ score, streak, attempts, correctTotal, missedOrganIds })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [score, streak, attempts, correctTotal, missedOrganIds]);

  // Mode 2: Locate State
  const [locatePromptMode, setLocatePromptMode] = useState<LocatePromptType>('mixed');
  const [drillMissedOnly, setDrillMissedOnly] = useState<boolean>(false);
  const [locateTarget, setLocateTarget] = useState<OrganItem | null>(null);
  const [actualPromptKind, setActualPromptKind] = useState<'name' | 'clue'>('name');
  const [locateFeedback, setLocateFeedback] = useState<LocateFeedback | null>(null);
  const [locateQuestionNum, setLocateQuestionNum] = useState<number>(1);

  // Mode 3: Quiz State
  const [quizDeck, setQuizDeck] = useState<QuizQuestion[]>([]);
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  // Missed Organs Modal
  const [isMissedDrawerOpen, setIsMissedDrawerOpen] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Derived Organ & Flow Collections
  const availableOrgans = useMemo(() => {
    if (activeTab === 'mixed') return ORGANS;
    return ORGANS.filter((o) => o.system === activeTab);
  }, [activeTab]);

  const activeFlows = useMemo(() => {
    if (activeTab === 'mixed') return PHYSIOLOGY_FLOWS;
    return PHYSIOLOGY_FLOWS.filter((f) => f.system === activeTab);
  }, [activeTab]);

  const missedOrgansList = useMemo(
    () => ORGANS.filter((o) => missedOrganIds.includes(o.id)),
    [missedOrganIds]
  );

  // Determine which SVG Phantom is displayed
  const displayedPhantomSystem: SystemId = useMemo(() => {
    if (mode === 'locate' && locateTarget) {
      return locateTarget.system;
    }
    if (activeTab !== 'mixed') {
      return activeTab;
    }
    return mixedPhantomView;
  }, [activeTab, mixedPhantomView, mode, locateTarget]);

  const currentFlowHighlightIds = useMemo(() => {
    if (!activeFlowId) return [];
    const flow = PHYSIOLOGY_FLOWS.find((f) => f.id === activeFlowId);
    if (!flow) return [];
    return flow.steps[activeStepIndex]?.highlightOrganIds ?? [];
  }, [activeFlowId, activeStepIndex]);

  // Helper to pick next Mode 2 question
  const pickNextLocateQuestion = useCallback(
    (
      tab: TabId,
      promptPref: LocatePromptType,
      onlyMissed: boolean,
      currentMissedIds: string[],
      previousId?: string
    ) => {
      let pool = tab === 'mixed' ? ORGANS : ORGANS.filter((o) => o.system === tab);
      if (onlyMissed) {
        const missedPool = ORGANS.filter((o) => currentMissedIds.includes(o.id));
        if (missedPool.length > 0) {
          pool = missedPool;
        }
      }
      if (pool.length === 0) {
        setLocateTarget(null);
        setLocateFeedback(null);
        return;
      }
      const candidates = pool.length > 1 ? pool.filter((o) => o.id !== previousId) : pool;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      const kind: 'name' | 'clue' =
        promptPref === 'mixed' ? (Math.random() < 0.5 ? 'name' : 'clue') : promptPref;

      setLocateTarget(chosen);
      setActualPromptKind(kind);
      setLocateFeedback(null);
      if (tab === 'mixed') {
        setMixedPhantomView(chosen.system);
      }
    },
    []
  );

  // Rebuild Mode 3 quiz deck when tab changes
  useEffect(() => {
    const filtered =
      activeTab === 'mixed'
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter((q) => q.system === activeTab);
    setQuizDeck(shuffleArray(filtered));
    setQuizIdx(0);
    setSelectedQuizOption(null);
  }, [activeTab]);

  // Handle System Tab Switch
  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    setActiveFlowId(null);
    setActiveStepIndex(0);
    setHoveredOrganId(null);

    if (tab !== 'mixed') {
      const firstOrgan = ORGANS.find((o) => o.system === tab);
      if (firstOrgan) setSelectedOrganId(firstOrgan.id);
    }

    if (mode === 'locate') {
      setLocateQuestionNum(1);
      pickNextLocateQuestion(tab, locatePromptMode, drillMissedOnly, missedOrganIds);
    }
  };

  // Handle Study Mode Switch
  const handleSelectMode = (nextMode: StudyMode) => {
    setMode(nextMode);
    setHoveredOrganId(null);
    if (nextMode === 'locate') {
      setLocateQuestionNum(1);
      pickNextLocateQuestion(activeTab, locatePromptMode, drillMissedOnly, missedOrganIds);
    }
  };

  // Handle Organ Click on SVG
  const handlePhantomOrganClick = (organId: string) => {
    if (mode === 'explore') {
      setSelectedOrganId(organId);
      const organ = ORGANS.find((o) => o.id === organId);
      if (organ && activeTab === 'mixed') {
        setMixedPhantomView(organ.system);
      }
      return;
    }

    if (mode === 'locate' && locateTarget && !locateFeedback) {
      const clickedOrgan = ORGANS.find((o) => o.id === organId) ?? null;
      const isCorrect = organId === locateTarget.id;

      setAttempts((prev) => prev + 1);
      if (isCorrect) {
        setScore((prev) => prev + 10);
        setStreak((prev) => prev + 1);
        setCorrectTotal((prev) => prev + 1);
      } else {
        setStreak(0);
        setMissedOrganIds((prev) =>
          prev.includes(locateTarget.id) ? prev : [...prev, locateTarget.id]
        );
      }

      setLocateFeedback({
        isCorrect,
        clickedOrgan,
        targetOrgan: locateTarget,
      });
    }
  };

  // Handle Physiology Flow selection
  const handleSelectFlow = (flowId: string | null, stepIdx = 0) => {
    setActiveFlowId(flowId);
    setActiveStepIndex(stepIdx);
    if (flowId) {
      const flow = PHYSIOLOGY_FLOWS.find((f) => f.id === flowId);
      if (flow) {
        if (activeTab === 'mixed') {
          setMixedPhantomView(flow.system);
        }
        const firstHighlight = flow.steps[stepIdx]?.highlightOrganIds[0];
        if (firstHighlight) {
          setSelectedOrganId(firstHighlight);
        }
      }
    }
  };

  // Handle Mode 3 Option Selection
  const handleSelectQuizOption = (optIdx: number) => {
    const currentQuestion = quizDeck[quizIdx];
    if (!currentQuestion || selectedQuizOption !== null) return;

    setSelectedQuizOption(optIdx);
    setAttempts((prev) => prev + 1);

    if (optIdx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setCorrectTotal((prev) => prev + 1);
    } else {
      setStreak(0);
      setMissedOrganIds((prev) =>
        prev.includes(currentQuestion.relatedOrganId)
          ? prev
          : [...prev, currentQuestion.relatedOrganId]
      );
    }

    if (activeTab === 'mixed') {
      setMixedPhantomView(currentQuestion.system);
    }
    setSelectedOrganId(currentQuestion.relatedOrganId);
  };

  const handleNextQuizQuestion = () => {
    if (quizIdx + 1 < quizDeck.length) {
      setQuizIdx((prev) => prev + 1);
    } else {
      setQuizDeck(shuffleArray(quizDeck));
      setQuizIdx(0);
    }
    setSelectedQuizOption(null);
  };

  const handleResetStats = () => {
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setCorrectTotal(0);
  };

  const handleDownloadStandaloneHtml = async () => {
    try {
      const res = await fetch('/ospe-phantom-trainer.html');
      if (!res.ok) throw new Error('File tidak ditemukan');
      const htmlText = await res.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ospe-phantom-trainer.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadNotice('File ospe-phantom-trainer.html berhasil diunduh.');
      setTimeout(() => setDownloadNotice(null), 4000);
    } catch {
      setDownloadNotice('Gagal mengunduh file HTML tunggal.');
      setTimeout(() => setDownloadNotice(null), 4000);
    }
  };

  const selectedOrgan = useMemo(
    () => ORGANS.find((o) => o.id === selectedOrganId) ?? null,
    [selectedOrganId]
  );
  const hoveredOrgan = useMemo(
    () => ORGANS.find((o) => o.id === hoveredOrganId) ?? null,
    [hoveredOrganId]
  );
  const accuracy = attempts > 0 ? Math.round((correctTotal / attempts) * 100) : 0;

  // Determine visual highlight props for SVG Phantom
  const phantomCorrectId =
    mode === 'locate' && locateFeedback ? locateFeedback.targetOrgan.id : null;
  const phantomWrongId =
    mode === 'locate' && locateFeedback && !locateFeedback.isCorrect && locateFeedback.clickedOrgan
      ? locateFeedback.clickedOrgan.id
      : null;
  const phantomSelectedId =
    mode === 'explore'
      ? selectedOrganId
      : mode === 'quiz' && selectedQuizOption !== null
        ? quizDeck[quizIdx]?.relatedOrganId ?? null
        : null;
  const phantomShowLabels =
    mode === 'explore' ? showLabelsExplore : mode === 'locate' ? Boolean(locateFeedback) : true;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* TOP BAR CONTRACT: 3 Zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('digestive');
              handleSelectMode('explore');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            OSPE Phantom Trainer
          </a>

          {/* Zone 2: System Navigation Links */}
          <nav
            aria-label="Pilihan Sistem Organ"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {(
              [
                { id: 'digestive', label: 'Pencernaan' },
                { id: 'cardiovascular', label: 'Cardiovaskuler' },
                { id: 'endocrine', label: 'Endokrin' },
                { id: 'mixed', label: 'Mode Campuran' },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-sky-600 text-slate-900 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh HTML Tunggal</span>
            </button>
          </div>
        </div>

        {/* Mobile System Selector Row */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {(
            [
              { id: 'digestive', label: 'Pencernaan' },
              { id: 'cardiovascular', label: 'Cardiovaskuler' },
              { id: 'endocrine', label: 'Endokrin' },
              { id: 'mixed', label: 'Campuran' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Download toast notice */}
      {downloadNotice && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3">
          <div className="bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium px-4 py-2.5 rounded-lg">
            {downloadNotice}
          </div>
        </div>
      )}

      {/* WORKSPACE TOOLBAR: Mode Switcher + Exam Telemetry */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Mode Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => handleSelectMode('explore')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'explore'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. Eksplorasi Phantom</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectMode('locate')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'locate'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>2. Tebak Lokasi</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectMode('quiz')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                mode === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>3. Kuis Fisiologi</span>
            </button>
          </div>

          {/* Score, Streak, Missed Organs Actions */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-3 text-slate-600 font-mono-tabular">
              <span>
                Skor: <strong className="text-slate-900 font-semibold">{score}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Streak: <strong className="text-emerald-700 font-semibold">{streak}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Akurasi: <strong className="text-slate-900 font-semibold">{accuracy}%</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMissedDrawerOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  missedOrganIds.length > 0
                    ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Organ Salah</span>
                <span className="font-mono-tabular">({missedOrganIds.length})</span>
              </button>

              <button
                type="button"
                onClick={handleResetStats}
                title="Reset Skor & Streak"
                aria-label="Reset Skor dan Streak"
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-ZONE SANDBOX WORKSPACE */}
      <main id="top" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT STAGE (60% -> 7 cols): Interactive Anatomical SVG Phantom */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
            {/* Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{SYSTEM_META[displayedPhantomSystem].label}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {ORGANS.filter((o) => o.system === displayedPhantomSystem).length} Struktur
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {activeTab === 'mixed'
                    ? `Mode Campuran — ${SYSTEM_META[displayedPhantomSystem].label}`
                    : SYSTEM_META[displayedPhantomSystem].label}
                </h1>
              </div>

              {/* Stage Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Mixed Mode manual phantom switcher in Explore/Quiz */}
                {activeTab === 'mixed' && mode !== 'locate' && (
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                    {(['digestive', 'cardiovascular', 'endocrine'] as const).map((sys) => (
                      <button
                        key={sys}
                        type="button"
                        onClick={() => setMixedPhantomView(sys)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          mixedPhantomView === sys
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {SYSTEM_META[sys].shortLabel}
                      </button>
                    ))}
                  </div>
                )}

                {/* Label Toggle in Explore Mode */}
                {mode === 'explore' && (
                  <button
                    type="button"
                    onClick={() => setShowLabelsExplore((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    {showLabelsExplore ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Sembunyikan Label</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Tampilkan Label</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Cardiovascular Layer Overlay Controls */}
            {displayedPhantomSystem === 'cardiovascular' && (
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-600" />
                  <span>Lapisan Phantom Jantung:</span>
                </span>
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  {(
                    [
                      { id: 'all', label: 'Anatomi Lengkap' },
                      { id: 'conduction', label: 'Konduksi Listrik' },
                      { id: 'circulation', label: 'Aliran Darah' },
                    ] as const
                  ).map((layer) => (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setCardioOverlay(layer.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        cardioOverlay === layer.id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {layer.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SVG Phantom Container */}
            <div className="flex justify-center">
              {displayedPhantomSystem === 'digestive' && (
                <DigestivePhantom
                  selectedId={phantomSelectedId}
                  correctId={phantomCorrectId}
                  wrongId={phantomWrongId}
                  flowHighlightIds={mode === 'explore' ? currentFlowHighlightIds : []}
                  showLabels={phantomShowLabels}
                  onSelectOrgan={handlePhantomOrganClick}
                  onHoverOrgan={setHoveredOrganId}
                />
              )}
              {displayedPhantomSystem === 'cardiovascular' && (
                <CardioPhantom
                  selectedId={phantomSelectedId}
                  correctId={phantomCorrectId}
                  wrongId={phantomWrongId}
                  flowHighlightIds={mode === 'explore' ? currentFlowHighlightIds : []}
                  showLabels={phantomShowLabels}
                  overlayMode={cardioOverlay}
                  onSelectOrgan={handlePhantomOrganClick}
                  onHoverOrgan={setHoveredOrganId}
                />
              )}
              {displayedPhantomSystem === 'endocrine' && (
                <EndocrinePhantom
                  selectedId={phantomSelectedId}
                  correctId={phantomCorrectId}
                  wrongId={phantomWrongId}
                  flowHighlightIds={mode === 'explore' ? currentFlowHighlightIds : []}
                  showLabels={phantomShowLabels}
                  onSelectOrgan={handlePhantomOrganClick}
                  onHoverOrgan={setHoveredOrganId}
                />
              )}
            </div>

            {/* Interactive Hover Status Caption (Only shows organ name in Explore Mode so Mode 2 isn't spoiled) */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>
                {mode === 'locate' && !locateFeedback
                  ? 'Mode Ujian Aktif: Label disembunyikan. Klik bagian organ yang diminta.'
                  : hoveredOrgan
                    ? `Sorotan: ${hoveredOrgan.name} (${hoveredOrgan.latinName})`
                    : 'Arahkan kursor atau klik langsung organ pada diagram phantom.'}
              </span>
              <span className="font-mono-tabular">
                {SYSTEM_META[displayedPhantomSystem].shortLabel}
              </span>
            </div>
          </div>

          {/* RIGHT DECK (40% -> 5 cols): Active Learning / Quiz Panel */}
          <div className="lg:col-span-5">
            {mode === 'explore' && (
              <ExplorePanel
                selectedOrgan={selectedOrgan}
                availableOrgans={availableOrgans}
                flows={activeFlows}
                activeFlowId={activeFlowId}
                activeStepIndex={activeStepIndex}
                onSelectOrgan={(id) => {
                  setSelectedOrganId(id);
                  const organ = ORGANS.find((o) => o.id === id);
                  if (organ && activeTab === 'mixed') {
                    setMixedPhantomView(organ.system);
                  }
                }}
                onSelectFlow={handleSelectFlow}
              />
            )}

            {mode === 'locate' && (
              <LocateModePanel
                targetOrgan={locateTarget}
                promptMode={locatePromptMode}
                actualPromptKind={actualPromptKind}
                feedback={locateFeedback}
                drillMissedOnly={drillMissedOnly}
                missedCount={missedOrganIds.length}
                questionNumber={locateQuestionNum}
                onChangePromptMode={(nextPromptMode) => {
                  setLocatePromptMode(nextPromptMode);
                  pickNextLocateQuestion(
                    activeTab,
                    nextPromptMode,
                    drillMissedOnly,
                    missedOrganIds,
                    locateTarget?.id
                  );
                }}
                onToggleDrillMissed={(val) => {
                  setDrillMissedOnly(val);
                  setLocateQuestionNum(1);
                  pickNextLocateQuestion(activeTab, locatePromptMode, val, missedOrganIds);
                }}
                onNextQuestion={() => {
                  setLocateQuestionNum((n) => n + 1);
                  pickNextLocateQuestion(
                    activeTab,
                    locatePromptMode,
                    drillMissedOnly,
                    missedOrganIds,
                    locateTarget?.id
                  );
                }}
              />
            )}

            {mode === 'quiz' && (
              <QuizModePanel
                question={quizDeck[quizIdx] ?? null}
                questionIndex={quizIdx}
                totalQuestions={quizDeck.length}
                selectedOption={selectedQuizOption}
                onSelectOption={handleSelectQuizOption}
                onNextQuestion={handleNextQuizQuestion}
                onInspectRelatedOrgan={(organId) => {
                  const organ = ORGANS.find((o) => o.id === organId);
                  if (organ) {
                    setActiveTab(organ.system);
                    setSelectedOrganId(organ.id);
                    setMode('explore');
                  }
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>OSPE Phantom Trainer — Simulasi Praktik Anatomi Fisiologi Keperawatan</span>
          <span>Sistem Pencernaan · Cardiovaskuler · Endokrin</span>
        </div>
      </footer>

      {/* Missed Organs Modal */}
      <MissedOrgansDrawer
        isOpen={isMissedDrawerOpen}
        missedOrgans={missedOrgansList}
        onClose={() => setIsMissedDrawerOpen(false)}
        onExploreOrgan={(organ) => {
          setActiveTab(organ.system);
          setSelectedOrganId(organ.id);
          setMode('explore');
        }}
        onStartDrillMissed={() => {
          setActiveTab('mixed');
          setMode('locate');
          setDrillMissedOnly(true);
          setLocateQuestionNum(1);
          pickNextLocateQuestion('mixed', locatePromptMode, true, missedOrganIds);
        }}
        onRemoveMissed={(organId) =>
          setMissedOrganIds((prev) => prev.filter((id) => id !== organId))
        }
        onClearAll={() => {
          setMissedOrganIds([]);
          setDrillMissedOnly(false);
        }}
      />
    </div>
  );
}
