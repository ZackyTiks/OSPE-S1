import React from 'react';
import { getOrganClass, getStrokeOverlay, PhantomDiagramProps } from './phantomTypes';

export const EndocrinePhantom: React.FC<PhantomDiagramProps> = (props) => {
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
      aria-label="Diagram Phantom Sistem Endokrin"
    >
      <defs>
        <pattern id="endGrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="560" height="660" rx="16" fill="#F8FAFC" />
      <rect x="0" y="0" width="560" height="660" rx="16" fill="url(#endGrid)" opacity="0.65" />

      {/* Full-body Anterior Silhouette */}
      <path
        d="M 280 28
           C 242 28, 224 58, 226 94
           C 228 122, 244 146, 254 156
           L 254 184
           C 198 196, 152 222, 146 274
           L 132 412
           L 164 416
           L 176 306
           L 182 474
           C 182 518, 200 546, 220 564
           L 216 634
           L 264 634
           L 272 560
           L 288 560
           L 296 634
           L 344 634
           L 340 564
           C 360 546, 378 518, 378 474
           L 384 306
           L 396 416
           L 428 412
           L 414 274
           C 408 222, 362 196, 306 184
           L 306 156
           C 316 146, 332 122, 334 94
           C 336 58, 318 28, 280 28 Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="2"
      />

      {/* Contextual Brain & Trachea & Kidneys (non-clickable background landmarks) */}
      <path
        d="M 244 82 C 244 50, 316 50, 316 82 C 316 102, 296 108, 280 106 C 264 108, 244 102, 244 82 Z"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />
      {/* Trachea rings */}
      <rect x="272" y="162" width="16" height="62" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
      <path d="M 272 174 h16 M 272 184 h16 M 272 194 h16 M 272 204 h16 M 272 214 h16" stroke="#CBD5E1" strokeWidth="1" />
      {/* Kidneys */}
      <ellipse cx="236" cy="364" rx="18" ry="28" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.3" />
      <ellipse cx="324" cy="364" rx="18" ry="28" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.3" />
      {/* Uterus landmark for ovary context */}
      <path d="M 264 476 L 296 476 L 288 508 L 272 508 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />

      {/* ================= MAIN BODY GLANDS ================= */}
      {/* 1. HIPOTALAMUS (small main dot + magnified inset on top right) */}
      <g {...bindOrgan('end-hypothalamus', 'Hipotalamus')}>
        <circle
          cx="280"
          cy="94"
          r="7.5"
          fill="#8B5CF6"
          {...getStrokeOverlay('end-hypothalamus', '#5B21B6', 1.6, props)}
        />
      </g>

      {/* 2. TIROID (Butterfly shaped on anterior neck) */}
      <g {...bindOrgan('end-thyroid', 'Kelenjar Tiroid')}>
        <path
          d="M 262 176
             C 254 178, 252 206, 266 208
             C 272 208, 274 198, 276 194
             L 284 194
             C 286 198, 288 208, 294 208
             C 308 206, 306 178, 298 176
             C 290 174, 286 184, 284 186
             L 276 186
             C 274 184, 270 174, 262 176 Z"
          fill="#F97316"
          {...getStrokeOverlay('end-thyroid', '#9A3412', 1.8, props)}
        />
        <circle cx="280" cy="192" r="26" fill="transparent" />
      </g>

      {/* 3. ADRENAL / SUPRARENAL (Triangular caps on top of kidneys) */}
      <g {...bindOrgan('end-adrenal', 'Kelenjar Adrenal')}>
        <path
          d="M 220 344 L 236 322 L 252 344 Z"
          fill="#D97706"
          {...getStrokeOverlay('end-adrenal', '#78350F', 1.8, props)}
        />
        <path
          d="M 308 344 L 324 322 L 340 344 Z"
          fill="#D97706"
          {...getStrokeOverlay('end-adrenal', '#78350F', 1.8, props)}
        />
        <circle cx="236" cy="336" r="22" fill="transparent" />
        <circle cx="324" cy="336" r="22" fill="transparent" />
      </g>

      {/* 4. PANKREAS ENDOKRIN (Abdominal main view) */}
      <g {...bindOrgan('end-pancreas-islets', 'Pankreas Endokrin (Pulau Langerhans)')}>
        <path
          d="M 252 384 C 244 388, 246 404, 260 404 L 322 390 C 334 386, 336 374, 324 372 Z"
          fill="#FBBF24"
          {...getStrokeOverlay('end-pancreas-islets', '#B45309', 1.8, props)}
        />
      </g>

      {/* 5. GONAD: OVARIUM (Pelvic left & right) */}
      <g {...bindOrgan('end-ovary', 'Ovarium')}>
        <ellipse cx="242" cy="482" rx="11" ry="7.5" fill="#EC4899" {...getStrokeOverlay('end-ovary', '#831843', 1.8, props)} />
        <ellipse cx="318" cy="482" rx="11" ry="7.5" fill="#EC4899" {...getStrokeOverlay('end-ovary', '#831843', 1.8, props)} />
        <circle cx="242" cy="482" r="20" fill="transparent" />
        <circle cx="318" cy="482" r="20" fill="transparent" />
      </g>

      {/* 6. GONAD: TESTIS (Scrotal inferior region) */}
      <g {...bindOrgan('end-testis', 'Testis')}>
        <ellipse cx="268" cy="542" rx="9" ry="12" fill="#0284C7" {...getStrokeOverlay('end-testis', '#075985', 1.8, props)} />
        <ellipse cx="292" cy="542" rx="9" ry="12" fill="#0284C7" {...getStrokeOverlay('end-testis', '#075985', 1.8, props)} />
        <circle cx="280" cy="542" r="24" fill="transparent" />
      </g>

      {/* ================= MAGNIFIED ANATOMICAL INSETS ================= */}
      {/* INSET A: HIPOTALAMUS & HIPOFISIS (Top Right) */}
      <g transform="translate(384, 24)">
        <line x1="-96" y1="70" x2="0" y2="70" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
        <rect x="0" y="0" width="160" height="148" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="80" y="18" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#0F172A" fontFamily="Plus Jakarta Sans">
          Aksis Otak (Diperbesar)
        </text>
        {/* Hypothalamus funnel */}
        <g {...bindOrgan('end-hypothalamus', 'Hipotalamus (Inset)')}>
          <path
            d="M 40 34 C 66 24, 94 24, 120 34 L 92 66 L 68 66 Z"
            fill="#8B5CF6"
            {...getStrokeOverlay('end-hypothalamus', '#5B21B6', 1.8, props)}
          />
          <text x="80" y="48" fontSize="9" fontWeight="600" textAnchor="middle" fill="#FFFFFF">Hipotalamus</text>
        </g>
        {/* Infundibulum stalk */}
        <path d="M 74 66 L 74 82 M 86 66 L 86 82" stroke="#64748B" strokeWidth="2" />
        {/* Pituitary Anterior (left lobe in inset) */}
        <g {...bindOrgan('end-pituitary-ant', 'Hipofisis Anterior')}>
          <path
            d="M 44 106 C 44 82, 78 78, 80 94 L 80 124 C 64 132, 44 124, 44 106 Z"
            fill="#E11D48"
            {...getStrokeOverlay('end-pituitary-ant', '#881337', 1.8, props)}
          />
          <text x="61" y="108" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#FFFFFF">Ant.</text>
        </g>
        {/* Pituitary Posterior (right lobe in inset) */}
        <g {...bindOrgan('end-pituitary-post', 'Hipofisis Posterior')}>
          <path
            d="M 80 94 C 82 78, 116 82, 116 106 C 116 124, 96 132, 80 124 Z"
            fill="#4F46E5"
            {...getStrokeOverlay('end-pituitary-post', '#312E81', 1.8, props)}
          />
          <text x="99" y="108" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#FFFFFF">Post.</text>
        </g>
        <text x="80" y="140" fontSize="8.5" textAnchor="middle" fill="#64748B" fontFamily="IBM Plex Mono">
          Hipofisis (Pituitari)
        </text>
      </g>

      {/* INSET B: PARATIROID — POSTERIOR TIROID (Top Left) */}
      <g transform="translate(16, 112)">
        <line x1="154" y1="78" x2="242" y2="78" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
        <rect x="0" y="0" width="154" height="132" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="77" y="18" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#0F172A" fontFamily="Plus Jakarta Sans">
          Posterior Tiroid
        </text>
        {/* Faded butterfly thyroid silhouette */}
        <path
          d="M 42 42 C 26 46, 24 102, 48 106 C 62 108, 66 86, 70 80 L 84 80 C 88 86, 92 108, 106 106 C 130 102, 128 46, 112 42 C 98 38, 90 58, 84 62 L 70 62 C 64 58, 56 38, 42 42 Z"
          fill="#FED7AA"
          stroke="#FB923C"
          strokeWidth="1.4"
        />
        {/* 4 Parathyroid glands */}
        <g {...bindOrgan('end-parathyroid', 'Kelenjar Paratiroid (4 buah)')}>
          <circle cx="48" cy="58" r="8" fill="#EAB308" {...getStrokeOverlay('end-parathyroid', '#854D0E', 1.8, props)} />
          <circle cx="48" cy="90" r="8" fill="#EAB308" {...getStrokeOverlay('end-parathyroid', '#854D0E', 1.8, props)} />
          <circle cx="106" cy="58" r="8" fill="#EAB308" {...getStrokeOverlay('end-parathyroid', '#854D0E', 1.8, props)} />
          <circle cx="106" cy="90" r="8" fill="#EAB308" {...getStrokeOverlay('end-parathyroid', '#854D0E', 1.8, props)} />
          <rect x="30" y="42" width="94" height="64" fill="transparent" />
        </g>
        <text x="77" y="122" fontSize="8.5" textAnchor="middle" fill="#64748B" fontFamily="IBM Plex Mono">
          4 Kelenjar Paratiroid
        </text>
      </g>

      {/* INSET C: PULAU LANGERHANS PANKREAS (Middle Right) */}
      <g transform="translate(388, 342)">
        <line x1="-64" y1="42" x2="0" y2="54" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
        <rect x="0" y="0" width="156" height="128" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="78" y="18" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#0F172A" fontFamily="Plus Jakarta Sans">
          Pulau Langerhans
        </text>
        <g {...bindOrgan('end-pancreas-islets', 'Pulau Langerhans (Sel Alfa & Beta)')}>
          <circle
            cx="78"
            cy="64"
            r="36"
            fill="#FEF3C7"
            {...getStrokeOverlay('end-pancreas-islets', '#D97706', 2, props)}
          />
          {/* Beta cells (Insulin) */}
          <circle cx="68" cy="58" r="7" fill="#0284C7" />
          <circle cx="84" cy="68" r="7" fill="#0284C7" />
          <circle cx="72" cy="76" r="6.5" fill="#0284C7" />
          {/* Alpha cells (Glukagon) */}
          <circle cx="92" cy="52" r="6" fill="#DC2626" />
          <circle cx="58" cy="74" r="6" fill="#DC2626" />
          <circle cx="86" cy="84" r="5.5" fill="#DC2626" />
        </g>
        <text x="78" y="114" fontSize="8.5" textAnchor="middle" fill="#0369A1" fontFamily="IBM Plex Mono">
          Sel β (Insulin) · Sel α (Glukagon)
        </text>
      </g>

      {/* CALLOUT LABELS */}
      <g className="pointer-events-none" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="600">
        {labelVisible('end-hypothalamus') && (
          <g>
            <rect x="192" y="4" width="94" height="20" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="239" y="18" textAnchor="middle" fill="#0F172A">Hipotalamus</text>
          </g>
        )}
        {labelVisible('end-pituitary-ant') && (
          <g>
            <rect x="384" y="176" width="106" height="20" rx="5" fill="#FFE4E6" stroke="#E11D48" />
            <text x="437" y="190" textAnchor="middle" fill="#881337">Hipofisis Anterior</text>
          </g>
        )}
        {labelVisible('end-pituitary-post') && (
          <g>
            <rect x="384" y="200" width="106" height="20" rx="5" fill="#E0E7FF" stroke="#4F46E5" />
            <text x="437" y="214" textAnchor="middle" fill="#312E81">Hipofisis Posterior</text>
          </g>
        )}
        {labelVisible('end-thyroid') && (
          <g>
            <line x1="304" y1="192" x2="360" y2="236" stroke="#475569" strokeWidth="1.1" />
            <rect x="360" y="226" width="96" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="408" y="241" textAnchor="middle" fill="#0F172A">Kelenjar Tiroid</text>
          </g>
        )}
        {labelVisible('end-parathyroid') && (
          <g>
            <rect x="16" y="250" width="120" height="22" rx="5" fill="#FEF9C3" stroke="#CA8A04" />
            <text x="76" y="265" textAnchor="middle" fill="#713F12">Paratiroid (4 kelenjar)</text>
          </g>
        )}
        {labelVisible('end-adrenal') && (
          <g>
            <line x1="220" y1="336" x2="128" y2="336" stroke="#475569" strokeWidth="1.1" />
            <rect x="14" y="324" width="114" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="71" y="339" textAnchor="middle" fill="#0F172A">Kelenjar Adrenal</text>
          </g>
        )}
        {labelVisible('end-pancreas-islets') && (
          <g>
            <rect x="388" y="476" width="156" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="466" y="491" textAnchor="middle" fill="#0F172A">Pankreas (P. Langerhans)</text>
          </g>
        )}
        {labelVisible('end-ovary') && (
          <g>
            <line x1="232" y1="482" x2="128" y2="482" stroke="#475569" strokeWidth="1.1" />
            <rect x="18" y="470" width="110" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="73" y="485" textAnchor="middle" fill="#0F172A">Gonad: Ovarium</text>
          </g>
        )}
        {labelVisible('end-testis') && (
          <g>
            <line x1="300" y1="546" x2="404" y2="546" stroke="#475569" strokeWidth="1.1" />
            <rect x="404" y="534" width="106" height="22" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
            <text x="457" y="549" textAnchor="middle" fill="#0F172A">Gonad: Testis</text>
          </g>
        )}
      </g>
    </svg>
  );
};
