import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import type { DisplayField, ThemeColor, VolumeUnit } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';

interface DigitalDisplayProps {
  coffeeValue: string;
  waterValue: string;
  ratio: number;
  activeField: DisplayField;
  onSelectField: (field: DisplayField) => void;
  onSwap: () => void;
  themeColor: ThemeColor;
  volumeUnit: VolumeUnit;
  darkMode: boolean;
  lang: 'hu' | 'en';
}

export const DigitalDisplay: React.FC<DigitalDisplayProps> = ({
  coffeeValue,
  waterValue,
  ratio,
  activeField,
  onSelectField,
  onSwap,
  themeColor,
  volumeUnit,
  darkMode,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  // Glow colors and text classes based on themeColor
  const getGlowStyles = () => {
    switch (themeColor) {
      case 'amber':
        return {
          glow: 'text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.55)]',
          dim: 'text-amber-950/40 dark:text-amber-500/20',
          borderActive: 'border-amber-500/60 ring-2 ring-amber-500/30 bg-amber-500/5',
          borderInactive: 'border-zinc-800/60 hover:border-zinc-700 bg-zinc-950/40',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          accent: 'text-amber-400',
        };
      case 'cyan':
        return {
          glow: 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.55)]',
          dim: 'text-cyan-950/40 dark:text-cyan-500/20',
          borderActive: 'border-cyan-500/60 ring-2 ring-cyan-500/30 bg-cyan-500/5',
          borderInactive: 'border-zinc-800/60 hover:border-zinc-700 bg-zinc-950/40',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          accent: 'text-cyan-400',
        };
      case 'emerald':
        return {
          glow: 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.55)]',
          dim: 'text-emerald-950/40 dark:text-emerald-500/20',
          borderActive: 'border-emerald-500/60 ring-2 ring-emerald-500/30 bg-emerald-500/5',
          borderInactive: 'border-zinc-800/60 hover:border-zinc-700 bg-zinc-950/40',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          accent: 'text-emerald-400',
        };
      case 'white':
      default:
        return {
          glow: 'text-zinc-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]',
          dim: 'text-zinc-800/40 dark:text-zinc-600/20',
          borderActive: 'border-zinc-300/60 ring-2 ring-zinc-400/30 bg-zinc-500/5',
          borderInactive: 'border-zinc-800/60 hover:border-zinc-700 bg-zinc-950/40',
          badge: 'bg-zinc-700/40 text-zinc-200 border-zinc-600/40',
          accent: 'text-zinc-200',
        };
    }
  };

  const styles = getGlowStyles();

  // Format number display to ensure clean presentation
  const formatDisplay = (val: string) => {
    if (!val || val === '0') return '0';
    return val;
  };

  const containerClass = darkMode
    ? 'bg-zinc-950 border-zinc-800/80 shadow-2xl'
    : 'bg-zinc-950 border-zinc-700/80 shadow-xl ring-2 ring-zinc-300';

  return (
    <div className={`w-full relative rounded-2xl p-3 sm:p-4 backdrop-blur-md border ${containerClass}`}>
      {/* Scale header bar: TARE / LED dots / Status */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 text-xs tracking-widest text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-zinc-400">SCALE ON</span>
          <span className="text-[11px] text-zinc-500">| NET</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-wider text-zinc-400">
            RATIO 1:{ratio.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={onSwap}
            title={t.swap}
            aria-label={t.swap}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700/60 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors active:scale-95 text-[11px]"
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span className="font-medium">{t.swap}</span>
          </button>
        </div>
      </div>

      {/* Main dual-readout display grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* COFFEE FIELD */}
        <button
          type="button"
          onClick={() => onSelectField('coffee')}
          className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
            activeField === 'coffee' ? styles.borderActive : styles.borderInactive
          }`}
        >
          {/* Active indicator dot */}
          {activeField === 'coffee' && (
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <span className={`text-[11px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold ${styles.badge}`}>
                INPUT
              </span>
            </div>
          )}

          <div className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-zinc-400 mb-1 flex items-center justify-between">
            <span>{t.coffee}</span>
            <span className="text-zinc-500 font-normal">g</span>
          </div>

          <div className="mt-1 flex items-baseline justify-end overflow-hidden font-mono">
            <span
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-150 tabular-nums ${
                activeField === 'coffee' ? styles.glow : 'text-zinc-300 group-hover:text-zinc-100'
              }`}
            >
              {formatDisplay(coffeeValue)}
            </span>
            <span className="ml-1 text-sm sm:text-base font-normal text-zinc-500">
              g
            </span>
          </div>
        </button>

        {/* WATER FIELD */}
        <button
          type="button"
          onClick={() => onSelectField('water')}
          className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
            activeField === 'water' ? styles.borderActive : styles.borderInactive
          }`}
        >
          {/* Active indicator dot */}
          {activeField === 'water' && (
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <span className={`text-[11px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold ${styles.badge}`}>
                INPUT
              </span>
            </div>
          )}

          <div className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-zinc-400 mb-1 flex items-center justify-between">
            <span>{t.water}</span>
            <span className="text-zinc-500 font-normal">{volumeUnit}</span>
          </div>

          <div className="mt-1 flex items-baseline justify-end overflow-hidden font-mono">
            <span
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-150 tabular-nums ${
                activeField === 'water' ? styles.glow : 'text-zinc-300 group-hover:text-zinc-100'
              }`}
            >
              {formatDisplay(waterValue)}
            </span>
            <span className="ml-1 text-sm sm:text-base font-normal text-zinc-500">
              {volumeUnit}
            </span>
          </div>
        </button>
      </div>

      {/* Subtle indicator bar for currently active field */}
      <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span className="truncate">
          {activeField === 'coffee'
            ? `${t.activeField}: ${t.coffee} → ${t.water}`
            : `${t.activeField}: ${t.water} → ${t.coffee}`}
        </span>
        <span className="text-zinc-500 text-[11px]">TAP FIELD TO SWITCH</span>
      </div>
    </div>
  );
};
