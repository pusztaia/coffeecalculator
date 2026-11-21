import React from 'react';
import { MOKA_POT_SIZES } from '../data/brewers';
import type { MokaPotSize, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { Flame, Droplet, Coffee } from 'lucide-react';

interface MokaPotCupSelectorProps {
  selectedCups: number;
  onSelectSize: (size: MokaPotSize) => void;
  themeColor: ThemeColor;
  lang: 'hu' | 'en';
}

export const MokaPotCupSelector: React.FC<MokaPotCupSelectorProps> = ({
  selectedCups,
  onSelectSize,
  themeColor,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const currentSize = MOKA_POT_SIZES.find((s) => s.cups === selectedCups) || MOKA_POT_SIZES[2];

  const getActiveTabClass = () => {
    switch (themeColor) {
      case 'amber':
        return 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20';
      case 'cyan':
        return 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20';
      case 'emerald':
        return 'bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20';
      case 'white':
      default:
        return 'bg-zinc-100 text-zinc-950 font-bold shadow-lg shadow-white/10';
    }
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-3.5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-300">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>{t.cupSize} (Bialetti / Kotyogós)</span>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">
          {currentSize.cups} {t.cups} (~1:{Math.round(currentSize.waterMl / currentSize.coffeeGrams)})
        </span>
      </div>

      {/* Quick Cup size selector chips */}
      <div className="grid grid-cols-6 gap-1.5">
        {MOKA_POT_SIZES.map((size) => {
          const isSelected = size.cups === selectedCups;
          return (
            <button
              key={size.cups}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`py-2 rounded-xl text-center font-mono text-xs transition-all active:scale-95 cursor-pointer border ${
                isSelected
                  ? `${getActiveTabClass()} border-transparent`
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span className="block text-sm font-bold">{size.cups}</span>
              <span className="text-[9px] opacity-75">{t.cups}</span>
            </button>
          );
        })}
      </div>

      {/* Physical Capacity specs box */}
      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-center font-mono">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Coffee className="w-3 h-3 text-amber-400" />
            {t.coffee}
          </span>
          <span className="text-sm font-bold text-zinc-200 mt-0.5">
            {currentSize.coffeeGrams}g
          </span>
          <span className="text-[9px] text-zinc-400">{t.basketCapacity}</span>
        </div>

        <div className="flex flex-col items-center border-x border-zinc-800/80">
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Droplet className="w-3 h-3 text-cyan-400" />
            {t.boilerWater}
          </span>
          <span className="text-sm font-bold text-zinc-200 mt-0.5">
            {currentSize.waterMl}ml
          </span>
          <span className="text-[9px] text-zinc-400">szelep alá</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Flame className="w-3 h-3 text-emerald-400" />
            {t.expectedYield}
          </span>
          <span className="text-sm font-bold text-zinc-200 mt-0.5">
            ~{currentSize.yieldMl}ml
          </span>
          <span className="text-[9px] text-zinc-400">kész ital</span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 leading-relaxed italic bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/40">
        💡 {t.tipMoka}
      </p>
    </div>
  );
};
