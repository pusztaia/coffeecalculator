import React from 'react';
import type { BrewerId, ThemeColor } from '../types/coffee';

interface BrewerArtworkProps {
  brewerId: BrewerId;
  themeColor: ThemeColor;
  className?: string;
  size?: number;
}

export const BrewerArtwork: React.FC<BrewerArtworkProps> = ({
  brewerId,
  themeColor,
  className = '',
  size = 140,
}) => {
  const getAccentColor = () => {
    switch (themeColor) {
      case 'amber': return '#f59e0b';
      case 'cyan': return '#06b6d4';
      case 'emerald': return '#10b981';
      case 'white': return '#e2e8f0';
      default: return '#f59e0b';
    }
  };

  const accent = getAccentColor();

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {brewerId === 'aeropress' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AeroPress Outer Cylinder */}
          <rect x="36" y="44" width="48" height="72" rx="4" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600 dark:text-zinc-300" />
          
          {/* Chamber volume markings (1, 2, 3, 4) */}
          <circle cx="60" cy="58" r="3.5" fill={accent} opacity="0.9" />
          <circle cx="60" cy="72" r="3.5" fill={accent} opacity="0.9" />
          <circle cx="60" cy="86" r="3.5" fill={accent} opacity="0.9" />
          <circle cx="60" cy="100" r="3.5" fill={accent} opacity="0.9" />
          
          {/* Flange / Collar */}
          <rect x="28" y="114" width="64" height="6" rx="2" fill="currentColor" className="text-zinc-700 dark:text-zinc-400" />

          {/* Filter Cap */}
          <path d="M34 120H86V126C86 128 84 130 82 130H38C36 130 34 128 34 126V120Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-zinc-800 dark:text-zinc-200" />

          {/* Plunger Top Handle */}
          <path d="M26 12C26 9.8 27.8 8 30 8H90C92.2 8 94 9.8 94 12V18C94 20.2 92.2 22 90 22H30C27.8 22 26 20.2 26 18V12Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-zinc-800 dark:text-zinc-300" />
          
          {/* Plunger Shaft */}
          <rect x="42" y="20" width="36" height="38" stroke="currentColor" strokeWidth="2" className="text-zinc-500 dark:text-zinc-400" />
          
          {/* Rubber Seal */}
          <rect x="38" y="54" width="44" height="8" rx="2" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />

          {/* Coffee extraction drip */}
          <path d="M60 132V137" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {brewerId === 'aeropress-inverted' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base Stand (Plunger Top on counter) */}
          <rect x="26" y="118" width="68" height="12" rx="3" fill="currentColor" stroke="currentColor" strokeWidth="2" className="text-zinc-800 dark:text-zinc-200" />
          
          {/* Plunger Shaft rising up */}
          <rect x="42" y="80" width="36" height="40" stroke="currentColor" strokeWidth="2" className="text-zinc-500 dark:text-zinc-400" />

          {/* Rubber Seal at top of plunger */}
          <rect x="38" y="74" width="44" height="8" rx="2" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />

          {/* Main inverted chamber */}
          <rect x="36" y="22" width="48" height="58" rx="4" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600 dark:text-zinc-300" />

          {/* Markings */}
          <circle cx="60" cy="38" r="3" fill={accent} opacity="0.9" />
          <circle cx="60" cy="50" r="3" fill={accent} opacity="0.9" />
          <circle cx="60" cy="62" r="3" fill={accent} opacity="0.9" />

          {/* Top Flange with filter cap ready */}
          <rect x="28" y="16" width="64" height="6" rx="2" fill="currentColor" className="text-zinc-700 dark:text-zinc-400" />
          <path d="M34 10H86V16H34V10Z" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 2" />

          {/* Inverted indicator arrow */}
          <path d="M14 60L14 44M14 44L10 48M14 44L18 48" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M106 44L106 60M106 60L102 56M106 60L110 56" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {brewerId === 'moka-pot' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Octagonal Base Chamber (Water Boiler) */}
          <path
            d="M26 128L34 86H86L94 128H26Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-zinc-700 dark:text-zinc-200"
          />
          {/* Facets on base */}
          <path d="M46 86L42 128M60 86V128M74 86L78 128" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

          {/* Brass Safety Valve */}
          <circle cx="34" cy="106" r="3.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />

          {/* Waist Band / Screw Collar */}
          <rect x="32" y="82" width="56" height="5" rx="1.5" fill="currentColor" className="text-zinc-800 dark:text-zinc-300" />

          {/* Upper Pot Chamber (Coffee Collector) */}
          <path
            d="M34 82L24 40H96L86 82H34Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-zinc-700 dark:text-zinc-200"
          />
          {/* Facets on upper pot */}
          <path d="M42 82L46 40M60 82V40M78 82L74 40" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

          {/* Spout on left */}
          <path d="M24 40L16 48L25 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 dark:text-zinc-200" />

          {/* Lid & Top Knob / Finial */}
          <path d="M22 40L60 28L98 40H22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" className="text-zinc-800 dark:text-zinc-300" />
          <path d="M60 28V20M56 20H64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-zinc-800 dark:text-zinc-300" />

          {/* Handle (Heat resistant bakelite) */}
          <path
            d="M86 52C98 52 108 60 108 76C108 88 100 100 86 102"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            className="text-zinc-900 dark:text-zinc-100"
          />

          {/* Little steam puffs */}
          <path d="M56 14C56 10 60 8 60 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M64 16C64 12 68 10 68 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      )}

      {brewerId === 'v60' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Conical Dripper Top */}
          <path d="M22 28L48 76H72L98 28H22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-zinc-700 dark:text-zinc-200" />
          {/* V60 Spirals */}
          <path d="M38 34C48 50 56 64 60 74" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M82 34C72 50 64 64 60 74" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M60 30V74" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          {/* Dripper Base plate */}
          <ellipse cx="60" cy="76" rx="28" ry="4" fill="currentColor" className="text-zinc-800 dark:text-zinc-400" />
          
          {/* Glass Decanter */}
          <path d="M42 80H78L88 126C88 129 85 132 82 132H38C35 132 32 129 32 126L42 80Z" stroke="currentColor" strokeWidth="2" className="text-zinc-500 dark:text-zinc-300" />
          {/* Coffee liquid in carafe */}
          <path d="M36 112H84L87 126H33L36 112Z" fill={accent} fillOpacity="0.4" />
        </svg>
      )}

      {brewerId === 'french-press' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Beaker Cylinder */}
          <rect x="34" y="32" width="52" height="96" rx="4" stroke="currentColor" strokeWidth="2.5" className="text-zinc-700 dark:text-zinc-300" />
          {/* Metal frame feet */}
          <path d="M30 40H90M30 124H90M34 130V134M86 130V134" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-800 dark:text-zinc-400" />
          {/* Spout */}
          <path d="M34 34L26 38L34 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-700 dark:text-zinc-300" />
          {/* Plunger knob & shaft */}
          <circle cx="60" cy="14" r="6" fill="currentColor" className="text-zinc-800 dark:text-zinc-300" />
          <line x1="60" y1="20" x2="60" y2="76" stroke="currentColor" strokeWidth="2.5" className="text-zinc-700 dark:text-zinc-400" />
          {/* Plunger mesh filter screen */}
          <rect x="36" y="74" width="48" height="6" rx="1.5" fill={accent} stroke="currentColor" strokeWidth="1.5" />
          {/* Handle */}
          <path d="M88 48C98 48 102 54 102 68C102 82 98 88 88 88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-zinc-800 dark:text-zinc-300" />
          {/* Liquid */}
          <rect x="36" y="78" width="48" height="48" fill={accent} fillOpacity="0.25" />
        </svg>
      )}

      {brewerId === 'espresso' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Portafilter Body */}
          <path d="M36 40H84L80 70C80 74 76 78 70 78H50C44 78 40 74 40 70L36 40Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" className="text-zinc-700 dark:text-zinc-300" />
          {/* Ears / Wings */}
          <path d="M30 44H36M84 44H90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-zinc-800 dark:text-zinc-200" />
          {/* Spout */}
          <path d="M54 78V90M66 78V90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-zinc-800 dark:text-zinc-300" />
          {/* Espresso stream */}
          <line x1="54" y1="92" x2="54" y2="108" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="66" y1="92" x2="66" y2="108" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          {/* Espresso cup with crema */}
          <path d="M42 110H78V126C78 130 74 134 70 134H50C46 134 42 130 42 126V110Z" stroke="currentColor" strokeWidth="2" className="text-zinc-600 dark:text-zinc-400" />
          <ellipse cx="60" cy="112" rx="14" ry="3" fill={accent} opacity="0.8" />
        </svg>
      )}

      {brewerId !== 'aeropress' && brewerId !== 'aeropress-inverted' && brewerId !== 'moka-pot' && brewerId !== 'v60' && brewerId !== 'french-press' && brewerId !== 'espresso' && (
        <svg viewBox="0 0 120 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Generic coffee beaker */}
          <rect x="36" y="32" width="48" height="88" rx="6" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600 dark:text-zinc-400" />
          <ellipse cx="60" cy="80" rx="18" ry="8" fill={accent} opacity="0.6" />
        </svg>
      )}
    </div>
  );
};
