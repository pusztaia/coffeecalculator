import React, { useState } from 'react';
import type { RoastLevel, GrindSize, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { TIMEMORE_C2_CLICKS } from '../data/brewers';
import { Thermometer, Gauge, Disc3, Minus, Plus } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RoastGrindGuideProps {
  roastLevel: RoastLevel;
  onSelectRoast: (roast: RoastLevel) => void;
  grindSize: GrindSize;
  onSelectGrind: (grind: GrindSize) => void;
  themeColor: ThemeColor;
  darkMode: boolean;
  isColdBrew?: boolean;
  lang: 'hu' | 'en';
}

export const RoastGrindGuide: React.FC<RoastGrindGuideProps> = ({
  roastLevel,
  onSelectRoast,
  grindSize,
  onSelectGrind,
  themeColor,
  darkMode,
  isColdBrew = false,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const c2Data = TIMEMORE_C2_CLICKS[grindSize];

  // User's custom click offset if they fine-tune their Timemore C2
  const [customClicks, setCustomClicks] = useState<number>(c2Data.recommended);

  // When grind size changes, reset to recommended
  React.useEffect(() => {
    setCustomClicks(c2Data.recommended);
  }, [grindSize, c2Data.recommended]);

  // Temperatures based on roast or cold brew
  const getTempDisplay = (roast: RoastLevel) => {
    if (isColdBrew) {
      return lang === 'hu' ? '4–20°C (Hideg / Hűtő)' : '4–20°C (Cold / Fridge)';
    }
    let c = '92°C';
    if (roast === 'light') {
      c = '94-96°C';
    } else if (roast === 'medium') {
      c = '90-93°C';
    } else if (roast === 'dark') {
      c = '84-88°C';
    }
    return c;
  };

  const grindSizes: { id: GrindSize; label: string; dots: number }[] = [
    { id: 'fine', label: t.fine, dots: 2 },
    { id: 'medium-fine', label: t.mediumFine, dots: 3 },
    { id: 'medium', label: t.medium, dots: 4 },
    { id: 'medium-coarse', label: t.mediumCoarse, dots: 5 },
    { id: 'coarse', label: t.coarse, dots: 6 },
  ];

  const getAccentClass = () => {
    switch (themeColor) {
      case 'amber':
        return darkMode
          ? 'text-amber-400 border-amber-500/50 bg-amber-500/10'
          : 'text-amber-800 border-amber-500 bg-amber-50';
      case 'cyan':
        return darkMode
          ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10'
          : 'text-cyan-800 border-cyan-500 bg-cyan-50';
      case 'emerald':
        return darkMode
          ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
          : 'text-emerald-800 border-emerald-500 bg-emerald-50';
      case 'white':
      default:
        return darkMode
          ? 'text-zinc-100 border-zinc-400 bg-zinc-700/30'
          : 'text-zinc-900 border-zinc-600 bg-zinc-100';
    }
  };

  const cardBg = darkMode ? 'bg-zinc-950/70 border-zinc-800/80 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900 shadow-sm';
  const subCardBg = darkMode ? 'bg-zinc-900/60 border-zinc-800/70' : 'bg-zinc-50 border-zinc-200';
  const inactiveBtn = darkMode ? 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800' : 'bg-white text-zinc-600 hover:text-zinc-900 border-zinc-200';

  const handleAdjustClick = (delta: number) => {
    sounds.playKeyClick();
    setCustomClicks((prev) => Math.max(8, Math.min(32, prev + delta)));
  };

  return (
    <div className={`w-full rounded-2xl border p-3.5 flex flex-col gap-3.5 font-mono text-xs transition-colors duration-200 ${cardBg}`}>
      {/* 1. Roast Level selection & recommended water temperature */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`flex items-center gap-1.5 font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <Thermometer className="w-4 h-4 text-rose-500" />
            {t.roastLevel} & {t.waterTemp}
          </span>
          <span className={`font-bold px-2 py-0.5 rounded border ${darkMode ? 'bg-zinc-900 text-zinc-200 border-zinc-800' : 'bg-zinc-100 text-zinc-800 border-zinc-200'}`}>
            {getTempDisplay(roastLevel)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {(['light', 'medium', 'dark'] as RoastLevel[]).map((level) => {
            const isSelected = roastLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  onSelectRoast(level);
                }}
                className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                  isSelected ? getAccentClass() : inactiveBtn
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      level === 'light'
                        ? 'bg-amber-600'
                        : level === 'medium'
                        ? 'bg-amber-800'
                        : 'bg-zinc-900 border border-amber-900'
                    }`}
                  />
                  <span className="capitalize font-semibold text-[11px]">
                    {level === 'light'
                      ? t.lightRoast
                      : level === 'medium'
                      ? t.mediumRoast
                      : t.darkRoast}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Grind Size visual scale */}
      <div className={`pt-2 border-t ${darkMode ? 'border-zinc-900' : 'border-zinc-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`flex items-center gap-1.5 font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <Gauge className="w-4 h-4 text-cyan-500" />
            {t.grindSize}
          </span>
          <span className={`font-semibold text-[11px] capitalize ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
            {grindSizes.find((g) => g.id === grindSize)?.label}
          </span>
        </div>

        {/* Visual particle size indicator */}
        <div className="grid grid-cols-5 gap-1.5">
          {grindSizes.map((item) => {
            const isSelected = grindSize === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  onSelectGrind(item.id);
                }}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isSelected ? getAccentClass() : inactiveBtn
                }`}
                title={item.label}
              >
                {/* Visual particle size dots */}
                <div className="h-4 flex items-center justify-center">
                  <div
                    className="rounded-full bg-current transition-all"
                    style={{
                      width: `${item.dots * 2.2 + 2}px`,
                      height: `${item.dots * 2.2 + 2}px`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono leading-none truncate max-w-full text-center">
                  {item.id === 'medium-fine' ? 'M-Fine' : item.id === 'medium-coarse' ? 'M-Coarse' : item.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TIMEMORE CHESTNUT C2 MAX DEDICATED DIAL & CLICK CARD */}
      <div className={`p-3 rounded-xl border flex flex-col gap-2 ${subCardBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
            <Disc3 className="w-4 h-4 animate-[spin_6s_linear_infinite]" />
            <span>{t.grinderC2Max}</span>
          </div>
          <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {lang === 'hu' ? c2Data.descHu : c2Data.descEn}
          </span>
        </div>

        <div className="flex items-center justify-between bg-zinc-950/20 p-2 rounded-lg border border-zinc-800/40">
          <div>
            <span className={`text-[11px] block ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.grinderClicks}:
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-mono text-amber-500">
                {customClicks}
              </span>
              <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.clicks} (ajánlott: {c2Data.min}–{c2Data.max})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleAdjustClick(-1)}
              className={`p-1.5 rounded-lg border transition-all active:scale-95 ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300'}`}
              title="1 klikkel finomabb (-1)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleAdjustClick(1)}
              className={`p-1.5 rounded-lg border transition-all active:scale-95 ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300'}`}
              title="1 klikkel durvább (+1)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <span className={`text-[11px] italic ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          ⚠️ {t.zeroPointNote}
        </span>
      </div>
    </div>
  );
};
