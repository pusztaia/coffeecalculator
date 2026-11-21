import React from 'react';
import { MOKA_POT_SIZES } from '../data/brewers';
import type { MokaPotSize, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { Flame, Droplet, Coffee, Lightbulb } from 'lucide-react';

interface MokaPotCupSelectorProps {
  selectedCups: number;
  onSelectSize: (size: MokaPotSize) => void;
  themeColor: ThemeColor;
  darkMode: boolean;
  lang: 'hu' | 'en';
}

export const MokaPotCupSelector: React.FC<MokaPotCupSelectorProps> = ({
  selectedCups,
  onSelectSize,
  themeColor,
  darkMode,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const currentSize = MOKA_POT_SIZES.find((s) => s.cups === selectedCups) || MOKA_POT_SIZES[2];

  const getActiveTabClass = () => {
    switch (themeColor) {
      case 'amber':
        return 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20';
      case 'emerald':
        return 'bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20';
      case 'white':
      default:
        return darkMode ? 'bg-zinc-100 text-zinc-950 font-bold shadow-lg shadow-white/10' : 'bg-zinc-900 text-white font-bold shadow-md';
    }
  };

  const cardBg = darkMode ? 'bg-zinc-950/70 border-zinc-800/80 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm';
  const inactiveBtn = darkMode ? 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700' : 'bg-white text-zinc-600 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300';
  const specsBoxBg = darkMode ? 'bg-zinc-900/60 border-zinc-800/60' : 'bg-zinc-50 border-zinc-200';
  const tipBoxBg = darkMode ? 'bg-zinc-900/40 border-zinc-800/40 text-zinc-400' : 'bg-amber-50/60 border-amber-200 text-amber-900';

  return (
    <div className={`w-full rounded-2xl border p-3.5 flex flex-col gap-3 transition-colors duration-200 ${cardBg}`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1.5 text-xs font-mono font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          <Flame className="w-4 h-4 text-amber-500" />
          <span>{t.cupSize} (Bialetti / Kotyogós)</span>
        </div>
        <span className={`text-[11px] font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
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
                isSelected ? `${getActiveTabClass()} border-transparent` : inactiveBtn
              }`}
            >
              <span className="block text-sm font-bold">{size.cups}</span>
              <span className="text-[11px] opacity-75">{t.cups}</span>
            </button>
          );
        })}
      </div>

      {/* Physical Capacity specs box */}
      <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-xl border text-center font-mono ${specsBoxBg}`}>
        <div className="flex flex-col items-center">
          <span className={`text-[11px] flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <Coffee className="w-3 h-3 text-amber-500" />
            {t.coffee}
          </span>
          <span className={`text-sm font-bold mt-0.5 ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
            {currentSize.coffeeGrams}g
          </span>
          <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.basketCapacity}</span>
        </div>

        <div className={`flex flex-col items-center border-x ${darkMode ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
          <span className={`text-[11px] flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <Droplet className="w-3 h-3 text-blue-500" />
            {t.boilerWater}
          </span>
          <span className={`text-sm font-bold mt-0.5 ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
            {currentSize.waterMl}ml
          </span>
          <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>szelep alá</span>
        </div>

        <div className="flex flex-col items-center">
          <span className={`text-[11px] flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <Flame className="w-3 h-3 text-emerald-500" />
            {t.expectedYield}
          </span>
          <span className={`text-sm font-bold mt-0.5 ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
            ~{currentSize.yieldMl}ml
          </span>
          <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>kész ital</span>
        </div>
      </div>

      <div className={`flex items-start gap-1.5 text-[11px] leading-relaxed italic p-2.5 rounded-lg border ${tipBoxBg}`}>
        <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
        <span>{t.tipMoka}</span>
      </div>
    </div>
  );
};
