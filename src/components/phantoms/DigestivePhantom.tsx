import React from 'react';
import { getOrganClass, getStrokeOverlay, PhantomDiagramProps } from './phantomTypes';

export const DigestivePhantom: React.FC<PhantomDiagramProps> = (props) => {
  const { showLabels, onSelectOrgan, onHoverOrgan, correctId, wrongId, selectedId } = props;

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

  return (
    <svg
      viewBox="0 0 560 660"
      className="w-full h-auto max-h-[600px] select-none"
      role="img"
      aria-label="Diagram Phantom Sistem Pencernaan"
    >
      <defs>
        <pattern id="digGrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.6" />
        </pattern>
        <linearGradient id="liverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
        <linearGradient id="stomachGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="colonGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
      </defs>

      {/* Lab tray backdrop */}
      <rect x="0" y="0" width="560" height="660" rx="16" fill="#F8FAFC" />
      <rect x="0" y="0" width="560" height="660" rx="16" fill="url(#digGrid)" opacity="0.65" />

      {/* Torso & Head Sagittal Silhouette */}
      <path
        d="M 215 24
           C 175 24, 152 54, 154 90
           C 155 110, 146 118, 142 128
           C 138 135, 146 140, 152 142
           C 150 152, 146 158, 154 164
           C 152 172, 160 184, 178 188
           L 198 192
           L 198 228
           C 140 242, 96 266, 92 314
           L 86 520
           C 86 560, 128 592, 185 605
           L 220 638
           L 340 638
           L 375 605
           C 432 592, 474 560, 474 520
           L 468 314
           C 464 266, 420 242, 362 228
           L 362 192
           C 388 180, 398 148, 396 112
           C 394 56, 330 24, 215 24 Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="2"
      />

      {/* Diaphragm landmark */}
      <path
        d="M 118 308 Q 280 268 442 308"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="415" y="294" fontSize="9.5" fill="#64748B" textAnchor="end" fontFamily="IBM Plex Mono">
        Diafragma
      </text>

      {/* 1. KAVUM ORIS (Oral Cavity: palatum durum, palatum molle, uvula, tongue, teeth) */}
      <g {...bindOrgan('dig-cavum-oris', 'Kavum Oris (Rongga Mulut)')}>
        {/* Oral cavity chamber */}
        <path
          d="M 164 128 C 185 114, 232 114, 254 124 L 258 146 C 236 156, 185 156, 164 146 Z"
          fill="#FDA4AF"
          {...getStrokeOverlay('dig-cavum-oris', '#BE123C', 1.8, props)}
        />
        {/* Palatum durum + molle + uvula */}
        <path
          d="M 168 126 Q 204 116 238 123 Q 250 126 254 137"
          fill="none"
          stroke="#9F1239"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Teeth hint */}
        <rect x="167" y="127" width="8" height="6" rx="1.5" fill="#FFFBEB" stroke="#9F1239" strokeWidth="0.8" />
        <rect x="167" y="140" width="8" height="6" rx="1.5" fill="#FFFBEB" stroke="#9F1239" strokeWidth="0.8" />
        {/* Tongue */}
        <path
          d="M 176 146 C 194 134, 224 134, 240 146 Z"
          fill="#E11D48"
        />
        {/* Hitbox */}
        <rect x="158" y="110" width="104" height="50" fill="transparent" />
      </g>

      {/* 2. FARING (Nasofaring, Orofaring, Laringofaring + Epiglotis) */}
      <g {...bindOrgan('dig-pharynx', 'Faring')}>
        <path
          d="M 252 94
             C 278 94, 290 112, 290 135
             L 290 206
             L 262 206
             L 262 152
             C 262 138, 252 130, 252 118 Z"
          fill="#FDBA74"
          {...getStrokeOverlay('dig-pharynx', '#C2410C', 1.8, props)}
        />
        {/* Epiglottis flap */}
        <path
          d="M 262 174 Q 274 166 277 180"
          fill="none"
          stroke="#9A3412"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect x="248" y="92" width="48" height="116" fill="transparent" />
      </g>

      {/* 3. KELENJAR SALIVA (Parotis, Submandibularis, Sublingualis) */}
      <g {...bindOrgan('dig-saliva', 'Kelenjar Saliva')}>
        {/* Parotid */}
        <path
          d="M 294 114 C 316 110, 326 128, 316 146 C 306 156, 292 146, 294 114 Z"
          fill="#FDE047"
          {...getStrokeOverlay('dig-saliva', '#A16207', 1.8, props)}
        />
        {/* Submandibular */}
        <ellipse
          cx="236"
          cy="168"
          rx="14"
          ry="8"
          fill="#FDE047"
          {...getStrokeOverlay('dig-saliva', '#A16207', 1.6, props)}
        />
        {/* Sublingual */}
        <ellipse
          cx="202"
          cy="158"
          rx="10"
          ry="5.5"
          fill="#FEF08A"
          {...getStrokeOverlay('dig-saliva', '#A16207', 1.5, props)}
        />
        <circle cx="305" cy="132" r="22" fill="transparent" />
        <rect x="190" y="150" width="64" height="28" fill="transparent" />
      </g>

      {/* 4. ESOFAGUS (±25 cm) */}
      <g {...bindOrgan('dig-esophagus', 'Esofagus')}>
        <path
          d="M 266 206 L 288 206 L 292 318 C 292 325, 270 326, 268 318 Z"
          fill="#FB923C"
          {...getStrokeOverlay('dig-esophagus', '#9A3412', 1.8, props)}
        />
        <rect x="258" y="204" width="42" height="122" fill="transparent" />
      </g>

      {/* 5. PANKREAS (Behind stomach, head in duodenal C-loop, body, tail) */}
      <g {...bindOrgan('dig-pancreas', 'Pankreas')}>
        <path
          d="M 244 374
             C 228 374, 224 396, 240 402
             L 338 386
             C 356 382, 366 368, 356 358
             C 344 352, 304 366, 244 374 Z"
          fill="#FBBF24"
          {...getStrokeOverlay('dig-pancreas', '#B45309', 1.8, props)}
        />
        {/* Pancreatic duct */}
        <path d="M 242 388 Q 295 378 346 368" fill="none" stroke="#92400E" strokeWidth="1.4" strokeDasharray="3 2" />
      </g>

      {/* 6. LAMBUNG / GASTER (Fundus, Korpus, Pilorus) */}
      <g {...bindOrgan('dig-stomach', 'Lambung (Gaster)')}>
        <path
          d="M 274 314
             C 295 294, 344 294, 358 326
             C 374 360, 348 408, 298 408
             C 272 408, 256 392, 248 382
             L 256 362
             C 268 372, 286 376, 302 366
             C 314 356, 306 334, 274 314 Z"
          fill="url(#stomachGrad)"
          fillOpacity="0.92"
          {...getStrokeOverlay('dig-stomach', '#9F1239', 2, props)}
        />
        {/* Subtle rugae lines */}
        <path d="M 318 322 Q 332 346 314 376" fill="none" stroke="#FFE4E6" strokeWidth="1.4" opacity="0.7" />
        <path d="M 334 328 Q 344 352 326 382" fill="none" stroke="#FFE4E6" strokeWidth="1.4" opacity="0.7" />
      </g>

      {/* 7. HATI / HEPAR (Right/Left lobes in patient's right = viewer's left) */}
      <g {...bindOrgan('dig-liver', 'Hati (Hepar)')}>
        <path
          d="M 142 320
             C 150 284, 232 280, 276 302
             C 292 310, 286 324, 260 328
             C 226 334, 198 362, 162 372
             C 142 378, 134 350, 142 320 Z"
          fill="url(#liverGrad)"
          {...getStrokeOverlay('dig-liver', '#431407', 2, props)}
        />
        {/* Falciform ligament */}
        <path d="M 224 291 L 218 334" stroke="#FDBA74" strokeWidth="1.6" opacity="0.75" />
      </g>

      {/* 8. KANTUNG EMPEDU (Vesica Biliaris) */}
      <g {...bindOrgan('dig-gallbladder', 'Kantung Empedu')}>
        <path
          d="M 192 356
             C 182 364, 178 380, 188 386
             C 198 392, 210 380, 206 364
             L 216 346"
          fill="#16A34A"
          {...getStrokeOverlay('dig-gallbladder', '#14532D', 1.8, props)}
        />
        <circle cx="196" cy="372" r="20" fill="transparent" />
      </g>

      {/* 9. USUS HALUS (Duodenum, Jejunum, Ileum) */}
      <g {...bindOrgan('dig-small-intestine', 'Usus Halus')}>
        {/* Duodenum C-loop */}
        <path
          d="M 248 370 C 216 366, 212 406, 238 416"
          fill="none"
          stroke="#EA580C"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Coiled Jejunum & Ileum */}
        <path
          d="M 234 416
             C 276 410, 326 420, 318 438
             C 310 456, 214 438, 212 460
             C 210 482, 342 460, 344 484
             C 346 508, 206 492, 210 516
             C 214 540, 336 520, 332 542
             C 328 562, 232 556, 202 536"
          fill="none"
          stroke="#FB923C"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 234 416
             C 276 410, 326 420, 318 438
             C 310 456, 214 438, 212 460
             C 210 482, 342 460, 344 484
             C 346 508, 206 492, 210 516
             C 214 540, 336 520, 332 542
             C 328 562, 232 556, 202 536"
          fill="none"
          {...getStrokeOverlay('dig-small-intestine', '#C2410C', 2.2, props)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="200" y="410" width="152" height="152" fill="transparent" />
      </g>

      {/* 10. USUS BESAR (Sekum, Apendiks, Kolon Asendens-Transversum-Desendens-Sigmoid) */}
      <g {...bindOrgan('dig-large-intestine', 'Usus Besar')}>
        {/* Outer thick colon frame */}
        <path
          d="M 164 546
             L 160 426
             C 160 402, 184 396, 208 402
             Q 280 416 352 400
             C 378 394, 394 408, 392 432
             L 386 540
             C 384 568, 340 572, 312 566
             C 288 560, 276 572, 278 584"
          fill="none"
          stroke="url(#colonGrad)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 164 546
             L 160 426
             C 160 402, 184 396, 208 402
             Q 280 416 352 400
             C 378 394, 394 408, 392 432
             L 386 540
             C 384 568, 340 572, 312 566
             C 288 560, 276 572, 278 584"
          fill="none"
          {...getStrokeOverlay('dig-large-intestine', '#115E59', 2, props)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Haustra crease accents */}
        <path
          d="M 150 510 h20 M 150 475 h20 M 150 440 h20 M 225 394 v20 M 275 398 v20 M 325 394 v20 M 378 440 h20 M 376 480 h20 M 374 520 h20"
          stroke="#99F6E4"
          strokeWidth="1.6"
          opacity="0.7"
        />
        {/* Appendix */}
        <path
          d="M 164 558 Q 146 576 158 588"
          fill="none"
          stroke="#0D9488"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>

      {/* 11. REKTUM & ANUS */}
      <g {...bindOrgan('dig-rectum-anus', 'Rektum & Anus')}>
        <path
          d="M 264 580 L 294 580 L 290 622 L 268 622 Z"
          fill="#0F766E"
          {...getStrokeOverlay('dig-rectum-anus', '#134E4A', 2, props)}
        />
        {/* Internal & external anal sphincter rings */}
        <ellipse cx="279" cy="622" rx="15" ry="5" fill="#F43F5E" stroke="#881337" strokeWidth="1.5" />
        <rect x="252" y="574" width="54" height="58" fill="transparent" />
      </g>

      {/* CALLOUT LABELS (Controlled by showLabels or selection/feedback state) */}
      <g className="pointer-events-none" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5" fontWeight="600">
        {labelVisible('dig-cavum-oris') && (
          <g>
            <line x1="164" y1="134" x2="108" y2="112" stroke="#475569" strokeWidth="1.1" />
            <rect x="16" y="98" width="94" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="63" y="113" textAnchor="middle" fill="#0F172A">Kavum Oris</text>
          </g>
        )}
        {labelVisible('dig-saliva') && (
          <g>
            <line x1="320" y1="130" x2="404" y2="104" stroke="#475569" strokeWidth="1.1" />
            <rect x="404" y="91" width="118" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="463" y="106" textAnchor="middle" fill="#0F172A">Kelenjar Saliva</text>
          </g>
        )}
        {labelVisible('dig-pharynx') && (
          <g>
            <line x1="290" y1="168" x2="404" y2="156" stroke="#475569" strokeWidth="1.1" />
            <rect x="404" y="143" width="84" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="446" y="158" textAnchor="middle" fill="#0F172A">Faring</text>
          </g>
        )}
        {labelVisible('dig-esophagus') && (
          <g>
            <line x1="290" y1="248" x2="404" y2="238" stroke="#475569" strokeWidth="1.1" />
            <rect x="404" y="225" width="116" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="462" y="240" textAnchor="middle" fill="#0F172A">Esofagus (±25 cm)</text>
          </g>
        )}
        {labelVisible('dig-liver') && (
          <g>
            <line x1="145" y1="318" x2="96" y2="286" stroke="#475569" strokeWidth="1.1" />
            <rect x="14" y="274" width="86" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="57" y="289" textAnchor="middle" fill="#0F172A">Hati (±1,5 kg)</text>
          </g>
        )}
        {labelVisible('dig-gallbladder') && (
          <g>
            <line x1="184" y1="376" x2="104" y2="376" stroke="#475569" strokeWidth="1.1" />
            <rect x="12" y="364" width="96" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="60" y="379" textAnchor="middle" fill="#0F172A">K. Empedu</text>
          </g>
        )}
        {labelVisible('dig-stomach') && (
          <g>
            <line x1="358" y1="336" x2="420" y2="332" stroke="#475569" strokeWidth="1.1" />
            <rect x="420" y="320" width="118" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="479" y="335" textAnchor="middle" fill="#0F172A">Lambung (Gaster)</text>
          </g>
        )}
        {labelVisible('dig-pancreas') && (
          <g>
            <line x1="356" y1="374" x2="420" y2="378" stroke="#475569" strokeWidth="1.1" />
            <rect x="420" y="366" width="94" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="467" y="381" textAnchor="middle" fill="#0F172A">Pankreas</text>
          </g>
        )}
        {labelVisible('dig-small-intestine') && (
          <g>
            <line x1="276" y1="486" x2="424" y2="486" stroke="#475569" strokeWidth="1.1" />
            <rect x="424" y="474" width="100" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="474" y="489" textAnchor="middle" fill="#0F172A">Usus Halus</text>
          </g>
        )}
        {labelVisible('dig-large-intestine') && (
          <g>
            <line x1="150" y1="484" x2="96" y2="484" stroke="#475569" strokeWidth="1.1" />
            <rect x="14" y="472" width="84" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="56" y="487" textAnchor="middle" fill="#0F172A">Usus Besar</text>
          </g>
        )}
        {labelVisible('dig-rectum-anus') && (
          <g>
            <line x1="292" y1="612" x2="396" y2="612" stroke="#475569" strokeWidth="1.1" />
            <rect x="396" y="600" width="114" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="453" y="615" textAnchor="middle" fill="#0F172A">Rektum & Anus</text>
          </g>
        )}
      </g>
    </svg>
  );
};
