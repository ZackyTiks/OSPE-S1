import React from 'react';
import { getOrganClass, getStrokeOverlay, PhantomDiagramProps } from './phantomTypes';

export type CardioOverlayMode = 'all' | 'conduction' | 'circulation';

interface CardioPhantomProps extends PhantomDiagramProps {
  overlayMode?: CardioOverlayMode;
}

export const CardioPhantom: React.FC<CardioPhantomProps> = (props) => {
  const {
    showLabels,
    onSelectOrgan,
    onHoverOrgan,
    correctId,
    wrongId,
    selectedId,
    overlayMode = 'all',
  } = props;

  const bindOrgan = (id: string, label: string) => ({
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': label,
    className: getOrganClass(id, props),
    onClick: () => onSelectOrgan(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectOrgan(id);
      }
    },
    onMouseEnter: () => onHoverOrgan?.(id),
    onMouseLeave: () => onHoverOrgan?.(null),
  });

  const labelVisible = (id: string) =>
    showLabels || selectedId === id || correctId === id || wrongId === id;

  const dimNonConduction = overlayMode === 'conduction' ? 0.45 : 1;

  return (
    <svg
      viewBox="0 0 560 660"
      className="w-full h-auto max-h-[600px] select-none"
      role="img"
      aria-label="Diagram Phantom Sistem Cardiovaskuler"
    >
      <defs>
        <pattern id="cvGrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.6" />
        </pattern>
        <marker id="arrowBlue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#1D4ED8" />
        </marker>
        <marker id="arrowRed" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#DC2626" />
        </marker>
      </defs>

      <rect x="0" y="0" width="560" height="660" rx="16" fill="#F8FAFC" />
      <rect x="0" y="0" width="560" height="660" rx="16" fill="url(#cvGrid)" opacity="0.65" />

      {/* Orientation Markers */}
      <text x="20" y="26" fontSize="10" fontWeight="600" fill="#64748B" fontFamily="IBM Plex Mono">
        KANAN PASIEN (Dextra)
      </text>
      <text x="540" y="26" fontSize="10" fontWeight="600" fill="#64748B" textAnchor="end" fontFamily="IBM Plex Mono">
        KIRI PASIEN (Sinistra)
      </text>

      {/* 1. PERIKARDIUM (Outer Protective Fibroserous Sac) */}
      <g {...bindOrgan('cv-pericardium', 'Perikardium')} opacity={dimNonConduction}>
        <path
          d="M 148 214
             C 110 264, 96 364, 134 446
             C 172 528, 286 588, 370 578
             C 432 570, 456 490, 452 384
             C 448 280, 412 216, 360 198
             C 300 176, 192 162, 148 214 Z"
          fill="#E2E8F0"
          fillOpacity="0.48"
          strokeDasharray="6 4"
          {...getStrokeOverlay('cv-pericardium', '#64748B', 2.2, props)}
        />
      </g>

      {/* 2. VENA CAVA SUPERIOR & INFERIOR */}
      <g {...bindOrgan('cv-vena-cava', 'Vena Cava Superior & Inferior')} opacity={dimNonConduction}>
        {/* SVC */}
        <path
          d="M 142 66 L 182 66 L 182 222 L 142 222 Z"
          fill="#2563EB"
          {...getStrokeOverlay('cv-vena-cava', '#1E3A8A', 2, props)}
        />
        {/* Brachiocephalic tributaries */}
        <path d="M 122 46 L 154 74 L 170 66 L 138 36 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.6" />
        <path d="M 196 42 L 170 68 L 184 78 L 210 50 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* IVC */}
        <path
          d="M 148 456 L 186 456 L 186 594 L 148 594 Z"
          fill="#2563EB"
          {...getStrokeOverlay('cv-vena-cava', '#1E3A8A', 2, props)}
        />
      </g>

      {/* 3. VENA PULMONALIS (4 oxygenated red veins entering Left Atrium) */}
      <g {...bindOrgan('cv-pulm-vein', 'Vena Pulmonalis')} opacity={dimNonConduction}>
        {/* Left pulmonary veins (viewer's right) */}
        <path d="M 390 218 L 484 198 L 488 220 L 392 238 Z" fill="#EF4444" {...getStrokeOverlay('cv-pulm-vein', '#991B1B', 1.8, props)} />
        <path d="M 394 252 L 488 244 L 490 266 L 394 274 Z" fill="#EF4444" {...getStrokeOverlay('cv-pulm-vein', '#991B1B', 1.8, props)} />
        {/* Right pulmonary veins peek (viewer's left) */}
        <path d="M 88 228 L 146 236 L 144 254 L 84 246 Z" fill="#EF4444" {...getStrokeOverlay('cv-pulm-vein', '#991B1B', 1.8, props)} />
        <path d="M 86 262 L 144 268 L 142 284 L 82 278 Z" fill="#EF4444" {...getStrokeOverlay('cv-pulm-vein', '#991B1B', 1.8, props)} />
      </g>

      {/* 4. AORTA (Ascending, Arch with 3 branches, Descending) */}
      <g {...bindOrgan('cv-aorta', 'Aorta')} opacity={dimNonConduction}>
        {/* Descending thoracic aorta behind heart */}
        <path d="M 276 156 L 316 156 L 316 596 L 276 596 Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.6" />
        {/* Arch & Ascending Aorta */}
        <path
          d="M 250 286
             L 250 184
             C 250 108, 344 106, 356 184
             L 356 206
             L 314 206
             L 314 184
             C 310 150, 290 150, 290 184
             L 290 286 Z"
          fill="#DC2626"
          {...getStrokeOverlay('cv-aorta', '#7F1D1D', 2, props)}
        />
        {/* 3 Arch branches */}
        <path d="M 258 134 L 246 72 L 268 70 L 278 128 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.6" />
        <path d="M 288 122 L 290 62 L 308 62 L 306 122 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.6" />
        <path d="M 318 128 L 336 68 L 354 74 L 334 136 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.6" />
      </g>

      {/* 5. MIOKARDIUM (Thick muscular outer wall + interventricular septum) */}
      <g {...bindOrgan('cv-myocardium', 'Miokardium')} opacity={dimNonConduction}>
        <path
          d="M 156 226
             C 118 274, 114 374, 152 442
             C 192 516, 296 566, 362 558
             C 412 552, 434 476, 428 380
             C 424 304, 404 242, 364 214
             C 322 186, 200 186, 156 226 Z"
          fill="#BE123C"
          {...getStrokeOverlay('cv-myocardium', '#881337', 2.4, props)}
        />
      </g>

      {/* 6. ATRIUM DEXTRA (Right Atrium - Blue venous chamber) */}
      <g {...bindOrgan('cv-ra', 'Atrium Dextra')} opacity={dimNonConduction}>
        <path
          d="M 144 226
             C 128 262, 130 326, 156 346
             L 222 332
             C 226 284, 212 232, 182 214
             Z"
          fill="#3B82F6"
          {...getStrokeOverlay('cv-ra', '#1E3A8A', 2, props)}
        />
      </g>

      {/* 7. VENTRIKEL DEXTRA (Right Ventricle - thinner wall) */}
      <g {...bindOrgan('cv-rv', 'Ventrikel Dextra')} opacity={dimNonConduction}>
        <path
          d="M 160 358
             C 150 404, 174 468, 240 502
             C 262 514, 274 494, 272 454
             L 262 324
             L 224 340
             Z"
          fill="#60A5FA"
          {...getStrokeOverlay('cv-rv', '#1D4ED8', 2, props)}
        />
      </g>

      {/* 8. ATRIUM SINISTRA (Left Atrium - Red oxygenated chamber) */}
      <g {...bindOrgan('cv-la', 'Atrium Sinistra')} opacity={dimNonConduction}>
        <path
          d="M 304 222
             C 348 214, 396 234, 396 286
             C 396 312, 376 326, 356 328
             L 304 316
             Z"
          fill="#EF4444"
          {...getStrokeOverlay('cv-la', '#991B1B', 2, props)}
        />
      </g>

      {/* 9. VENTRIKEL SINISTRA (Left Ventricle - thickest muscular wall around it) */}
      <g {...bindOrgan('cv-lv', 'Ventrikel Sinistra')} opacity={dimNonConduction}>
        <path
          d="M 300 328
             L 358 338
             C 378 394, 376 476, 344 514
             C 320 530, 302 496, 296 444
             Z"
          fill="#DC2626"
          {...getStrokeOverlay('cv-lv', '#7F1D1D', 2, props)}
        />
      </g>

      {/* 10. ENDOKARDIUM (Inner glistening endothelial rim lining chambers) */}
      <g {...bindOrgan('cv-endocardium', 'Endokardium')} opacity={dimNonConduction}>
        <path
          d="M 304 334 L 352 343 C 370 396, 368 470, 341 505 C 322 518, 308 488, 302 440 Z"
          fill="none"
          {...getStrokeOverlay('cv-endocardium', '#FDA4AF', 3.5, props)}
        />
        <path
          d="M 167 363 C 159 404, 181 462, 239 493 C 258 503, 267 486, 265 450 L 256 333"
          fill="none"
          {...getStrokeOverlay('cv-endocardium', '#BFDBFE', 3, props)}
        />
      </g>

      {/* 11. ARTERI PULMONALIS (Pulmonary Trunk bifurcating from RV) */}
      <g {...bindOrgan('cv-pulm-artery', 'Arteri Pulmonalis')} opacity={dimNonConduction}>
        <path
          d="M 226 324
             L 216 218
             C 212 172, 246 154, 290 156
             L 382 152
             L 382 184
             L 286 186
             C 262 186, 254 200, 256 226
             L 264 320 Z"
          fill="#3B82F6"
          {...getStrokeOverlay('cv-pulm-artery', '#1E3A8A', 2, props)}
        />
        {/* Right pulmonary artery branch going left behind SVC */}
        <path
          d="M 222 178 L 106 176 L 106 204 L 222 204 Z"
          fill="#3B82F6"
          {...getStrokeOverlay('cv-pulm-artery', '#1E3A8A', 1.8, props)}
        />
      </g>

      {/* 12. 4 KATUP JANTUNG (Valves) */}
      {/* Katup Trikuspidalis (RA -> RV) */}
      <g {...bindOrgan('cv-valve-tricuspid', 'Katup Trikuspidalis')} opacity={dimNonConduction}>
        <path
          d="M 160 348 L 194 360 L 224 338"
          fill="none"
          {...getStrokeOverlay('cv-valve-tricuspid', '#FEF3C7', 6, props)}
          strokeLinecap="round"
        />
        <path d="M 184 358 L 194 394 M 204 356 L 214 390" stroke="#FDE68A" strokeWidth="1.5" />
        <circle cx="192" cy="352" r="20" fill="transparent" />
      </g>

      {/* Katup Bikuspidalis / Mitral (LA -> LV) */}
      <g {...bindOrgan('cv-valve-mitral', 'Katup Bikuspidalis (Mitral)')} opacity={dimNonConduction}>
        <path
          d="M 304 322 L 332 342 L 358 332"
          fill="none"
          {...getStrokeOverlay('cv-valve-mitral', '#FEF3C7', 6, props)}
          strokeLinecap="round"
        />
        <path d="M 322 336 L 318 380 M 342 338 L 348 380" stroke="#FDE68A" strokeWidth="1.5" />
        <circle cx="332" cy="332" r="20" fill="transparent" />
      </g>

      {/* Katup Semilunaris Pulmonal (RV -> Pulmonary Artery) */}
      <g {...bindOrgan('cv-valve-pulmonary', 'Katup Semilunaris Pulmonal')} opacity={dimNonConduction}>
        <path
          d="M 226 300 Q 244 316 262 300"
          fill="none"
          {...getStrokeOverlay('cv-valve-pulmonary', '#FEF3C7', 6.5, props)}
          strokeLinecap="round"
        />
        <circle cx="244" cy="304" r="19" fill="transparent" />
      </g>

      {/* Katup Semilunaris Aorta (LV -> Aorta) */}
      <g {...bindOrgan('cv-valve-aortic', 'Katup Semilunaris Aorta')} opacity={dimNonConduction}>
        <path
          d="M 272 284 Q 288 298 304 284"
          fill="none"
          {...getStrokeOverlay('cv-valve-aortic', '#FEF3C7', 6.5, props)}
          strokeLinecap="round"
        />
        <circle cx="288" cy="288" r="19" fill="transparent" />
      </g>

      {/* 13. SISTEM KONDUKSI LISTRIK JANTUNG (Always clickable; highlighted strongly in conduction mode) */}
      {/* SA Node */}
      <g {...bindOrgan('cv-sa-node', 'SA Node (Nodus Sinoatrial)')}>
        {/* Internodal tracts */}
        <path
          d="M 164 236 Q 190 250 210 304"
          fill="none"
          stroke="#FACC15"
          strokeWidth={overlayMode === 'conduction' ? 3.5 : 2.2}
          strokeDasharray="4 3"
        />
        <circle
          cx="162"
          cy="236"
          r="9"
          fill="#FACC15"
          {...getStrokeOverlay('cv-sa-node', '#854D0E', 2, props)}
        />
        <circle cx="162" cy="236" r="20" fill="transparent" />
      </g>

      {/* AV Node */}
      <g {...bindOrgan('cv-av-node', 'AV Node (Nodus Atrioventrikular)')}>
        <circle
          cx="216"
          cy="314"
          r="8.5"
          fill="#F59E0B"
          {...getStrokeOverlay('cv-av-node', '#78350F', 2, props)}
        />
        <circle cx="216" cy="314" r="19" fill="transparent" />
      </g>

      {/* Berkas His & Serabut Purkinje */}
      <g {...bindOrgan('cv-his-purkinje', 'Berkas His & Serabut Purkinje')}>
        {/* Bundle of His */}
        <path
          d="M 224 318 L 274 344"
          fill="none"
          stroke="#FACC15"
          strokeWidth={overlayMode === 'conduction' ? 4.2 : 3}
          strokeLinecap="round"
        />
        {/* Right & Left Bundle Branches down septum + Purkinje upward */}
        <path
          d="M 274 344 L 272 478 Q 256 500 220 484 Q 178 460 168 410"
          fill="none"
          {...getStrokeOverlay('cv-his-purkinje', '#FACC15', overlayMode === 'conduction' ? 3.6 : 2.5, props)}
          strokeLinecap="round"
        />
        <path
          d="M 274 344 L 292 486 Q 318 524 352 496 Q 374 446 370 380"
          fill="none"
          {...getStrokeOverlay('cv-his-purkinje', '#FACC15', overlayMode === 'conduction' ? 3.6 : 2.5, props)}
          strokeLinecap="round"
        />
        <rect x="260" y="340" width="44" height="160" fill="transparent" />
      </g>

      {/* 14. WALL LAYER MAGNIFIED INSET (Bottom Left — guarantees easy clicking of 3 wall layers) */}
      <g transform="translate(18, 502)">
        <rect x="0" y="0" width="122" height="140" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="61" y="17" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#0F172A" fontFamily="Plus Jakarta Sans">
          3 Lapisan Dinding
        </text>
        <g {...bindOrgan('cv-pericardium', 'Perikardium (Inset)')}>
          <rect x="12" y="28" width="98" height="28" rx="5" fill="#CBD5E1" {...getStrokeOverlay('cv-pericardium', '#64748B', 1.5, props)} />
          <text x="61" y="46" fontSize="10" fontWeight="600" textAnchor="middle" fill="#0F172A">Perikardium</text>
        </g>
        <g {...bindOrgan('cv-myocardium', 'Miokardium (Inset)')}>
          <rect x="12" y="64" width="98" height="32" rx="5" fill="#BE123C" {...getStrokeOverlay('cv-myocardium', '#881337', 1.5, props)} />
          <text x="61" y="84" fontSize="10" fontWeight="600" textAnchor="middle" fill="#FFFFFF">Miokardium</text>
        </g>
        <g {...bindOrgan('cv-endocardium', 'Endokardium (Inset)')}>
          <rect x="12" y="104" width="98" height="24" rx="5" fill="#FDA4AF" {...getStrokeOverlay('cv-endocardium', '#9F1239', 1.5, props)} />
          <text x="61" y="120" fontSize="10" fontWeight="600" textAnchor="middle" fill="#881337">Endokardium</text>
        </g>
      </g>

      {/* CIRCULATION ARROWS OVERLAY (when overlayMode === 'circulation') */}
      {overlayMode === 'circulation' && (
        <g className="pointer-events-none">
          {/* Venous return SVC -> RA -> RV -> Pulm Artery */}
          <path d="M 162 82 L 162 210" fill="none" stroke="#1E40AF" strokeWidth="3" className="flow-animated" markerEnd="url(#arrowBlue)" />
          <path d="M 166 575 L 166 470" fill="none" stroke="#1E40AF" strokeWidth="3" className="flow-animated" markerEnd="url(#arrowBlue)" />
          <path d="M 178 278 Q 198 338 206 420" fill="none" stroke="#1E40AF" strokeWidth="2.8" className="flow-animated" markerEnd="url(#arrowBlue)" />
          <path d="M 238 424 Q 242 290 238 190 L 364 168" fill="none" stroke="#1E40AF" strokeWidth="2.8" className="flow-animated" markerEnd="url(#arrowBlue)" />
          {/* Oxygenated return Pulm Veins -> LA -> LV -> Aorta */}
          <path d="M 476 212 L 372 246" fill="none" stroke="#DC2626" strokeWidth="2.8" className="flow-animated" markerEnd="url(#arrowRed)" />
          <path d="M 346 276 Q 332 342 332 430" fill="none" stroke="#DC2626" strokeWidth="2.8" className="flow-animated" markerEnd="url(#arrowRed)" />
          <path d="M 318 446 Q 282 350 272 200 C 272 130, 326 130, 336 184" fill="none" stroke="#DC2626" strokeWidth="2.8" className="flow-animated" markerEnd="url(#arrowRed)" />
        </g>
      )}

      {/* CALLOUT LABELS */}
      <g className="pointer-events-none" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="600">
        {labelVisible('cv-vena-cava') && (
          <g>
            <line x1="142" y1="108" x2="96" y2="96" stroke="#475569" strokeWidth="1.1" />
            <rect x="10" y="84" width="88" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="54" y="99" textAnchor="middle" fill="#0F172A">Vena Cava</text>
          </g>
        )}
        {labelVisible('cv-aorta') && (
          <g>
            <line x1="336" y1="118" x2="412" y2="82" stroke="#475569" strokeWidth="1.1" />
            <rect x="412" y="70" width="76" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="450" y="85" textAnchor="middle" fill="#0F172A">Aorta</text>
          </g>
        )}
        {labelVisible('cv-pulm-artery') && (
          <g>
            <line x1="378" y1="168" x2="424" y2="146" stroke="#475569" strokeWidth="1.1" />
            <rect x="424" y="134" width="118" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="483" y="149" textAnchor="middle" fill="#0F172A">Arteri Pulmonalis</text>
          </g>
        )}
        {labelVisible('cv-pulm-vein') && (
          <g>
            <line x1="470" y1="256" x2="462" y2="292" stroke="#475569" strokeWidth="1.1" />
            <rect x="418" y="292" width="124" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="480" y="307" textAnchor="middle" fill="#0F172A">Vena Pulmonalis</text>
          </g>
        )}
        {labelVisible('cv-ra') && (
          <g>
            <line x1="138" y1="282" x2="96" y2="294" stroke="#475569" strokeWidth="1.1" />
            <rect x="8" y="282" width="90" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="53" y="297" textAnchor="middle" fill="#0F172A">Atrium Dextra</text>
          </g>
        )}
        {labelVisible('cv-rv') && (
          <g>
            <line x1="176" y1="440" x2="106" y2="452" stroke="#475569" strokeWidth="1.1" />
            <rect x="8" y="440" width="102" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="59" y="455" textAnchor="middle" fill="#0F172A">Ventrikel Dextra</text>
          </g>
        )}
        {labelVisible('cv-la') && (
          <g>
            <line x1="386" y1="286" x2="432" y2="334" stroke="#475569" strokeWidth="1.1" />
            <rect x="430" y="324" width="110" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="485" y="339" textAnchor="middle" fill="#0F172A">Atrium Sinistra</text>
          </g>
        )}
        {labelVisible('cv-lv') && (
          <g>
            <line x1="362" y1="452" x2="424" y2="460" stroke="#475569" strokeWidth="1.1" />
            <rect x="424" y="448" width="118" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="483" y="463" textAnchor="middle" fill="#0F172A">Ventrikel Sinistra</text>
          </g>
        )}
        {labelVisible('cv-valve-tricuspid') && (
          <g>
            <line x1="176" y1="352" x2="108" y2="352" stroke="#475569" strokeWidth="1.1" />
            <rect x="8" y="340" width="102" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="59" y="355" textAnchor="middle" fill="#0F172A">K. Trikuspidalis</text>
          </g>
        )}
        {labelVisible('cv-valve-mitral') && (
          <g>
            <line x1="346" y1="334" x2="430" y2="372" stroke="#475569" strokeWidth="1.1" />
            <rect x="430" y="362" width="112" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="486" y="377" textAnchor="middle" fill="#0F172A">K. Bikuspid/Mitral</text>
          </g>
        )}
        {labelVisible('cv-valve-pulmonary') && (
          <g>
            <line x1="244" y1="304" x2="108" y2="394" stroke="#475569" strokeWidth="1.1" />
            <rect x="8" y="384" width="104" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="60" y="399" textAnchor="middle" fill="#0F172A">K. Pulmonal</text>
          </g>
        )}
        {labelVisible('cv-valve-aortic') && (
          <g>
            <line x1="288" y1="288" x2="424" y2="404" stroke="#475569" strokeWidth="1.1" />
            <rect x="424" y="396" width="108" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="478" y="411" textAnchor="middle" fill="#0F172A">K. Aorta</text>
          </g>
        )}
        {labelVisible('cv-sa-node') && (
          <g>
            <line x1="162" y1="227" x2="96" y2="144" stroke="#A16207" strokeWidth="1.1" />
            <rect x="12" y="132" width="84" height="22" rx="5" fill="#FEF9C3" stroke="#CA8A04" />
            <text x="54" y="147" textAnchor="middle" fill="#713F12">SA Node</text>
          </g>
        )}
        {labelVisible('cv-av-node') && (
          <g>
            <line x1="216" y1="314" x2="96" y2="244" stroke="#A16207" strokeWidth="1.1" />
            <rect x="12" y="232" width="84" height="22" rx="5" fill="#FEF9C3" stroke="#CA8A04" />
            <text x="54" y="247" textAnchor="middle" fill="#713F12">AV Node</text>
          </g>
        )}
        {labelVisible('cv-his-purkinje') && (
          <g>
            <line x1="284" y1="490" x2="404" y2="560" stroke="#A16207" strokeWidth="1.1" />
            <rect x="374" y="558" width="154" height="22" rx="5" fill="#FEF9C3" stroke="#CA8A04" />
            <text x="451" y="573" textAnchor="middle" fill="#713F12">Berkas His & Purkinje</text>
          </g>
        )}
      </g>
    </svg>
  );
};
