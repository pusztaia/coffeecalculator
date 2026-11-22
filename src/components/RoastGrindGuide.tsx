import React, { useState } from 'react';
import type { RoastLevel, GrindSize, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { getC2Clicks } from '../data/brewers';
import { Thermometer, Gauge, Disc3, Minus, Plus, AlertTriangle } from 'lucide-react';
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
  const c2Data = getC2Clicks(grindSize, roastLevel);
  const currentKey = `${grindSize}-${roastLevel}`;

  // User's custom click offset if they fine-tune their Timemore C2
  const [userClicks, setUserClicks] = useState<{ key: string; clicks: number } | null>(null);
  const customClicks = userClicks?.key === currentKey ? userClicks.clicks : c2Data.recommended;

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
    setUserClicks({
      key: currentKey,
      clicks: Math.max(6, Math.min(30, customClicks + delta)),
    });
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
                <div className="text-[10px] opacity-75 font-mono mt-0.5">
                  {getC2Clicks(grindSize, level).recommended} {t.clicks}
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
            <Gauge className="w-4 h-4 text-amber-500" />
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
            <span className="text-[10px] font-normal opacity-70">(C2 = C2 Max)</span>
          </div>
          <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {lang === 'hu' ? c2Data.descHu : c2Data.descEn}
          </span>
        </div>

        <div className="flex items-center justify-between bg-zinc-950/20 p-2.5 rounded-lg border border-zinc-800/40">
          <div>
            <span className={`text-[11px] block font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.grinderClicks}:
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-mono text-amber-500">
                {customClicks}
              </span>
              <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.clicks} ({t.recommended}: {c2Data.min === c2Data.max ? c2Data.recommended : `${c2Data.min}–${c2Data.max}`})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleAdjustClick(-1)}
              aria-label="Finomabb (-1 klikk)"
              className={`p-2 rounded-lg border transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 ${
                darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-sm'
              }`}
              title="1 klikkel finomabb (-1)"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleAdjustClick(1)}
              aria-label="Durvább (+1 klikk)"
              className={`p-2 rounded-lg border transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 ${
                darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-sm'
              }`}
              title="1 klikkel durvább (+1)"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Roast & Clicks Reference Guide for Current Grind Size */}
        {(() => {
          const lightData = getC2Clicks(grindSize, 'light');
          const mediumData = getC2Clicks(grindSize, 'medium');
          const darkData = getC2Clicks(grindSize, 'dark');

          const lightLabel = lightData.min === lightData.max ? `${lightData.recommended}` : `${lightData.min}–${lightData.max}`;
          const mediumLabel = mediumData.min === mediumData.max ? `${mediumData.recommended}` : `${mediumData.min}–${mediumData.max}`;
          const darkLabel = darkData.min === darkData.max ? `${darkData.recommended}` : `${darkData.min}–${darkData.max}`;

          return (
            <div className={`flex flex-wrap items-center gap-1.5 text-[10px] p-2 rounded-lg border ${
              darkMode ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
            }`}>
              <span className="font-semibold text-amber-500">Timemore C2 / C2 Max:</span>
              <button
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  onSelectRoast('light');
                }}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  roastLevel === 'light'
                    ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 font-bold border border-amber-500/40'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {lightLabel} {t.clicks} ({t.lightRoast})
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  onSelectRoast('medium');
                }}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  roastLevel === 'medium'
                    ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 font-bold border border-amber-500/40'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {mediumLabel} {t.clicks} ({t.mediumRoast})
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  onSelectRoast('dark');
                }}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  roastLevel === 'dark'
                    ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 font-bold border border-amber-500/40'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {darkLabel} {t.clicks} ({t.darkRoast})
              </button>
            </div>
          );
        })()}

        {/* Visual Clicks Position Slider Track (Honest Coffee Guide: 6 to 30 clicks) */}
        <div className="px-1 pt-1">
          <div className="flex items-center justify-between text-[9px] font-mono opacity-60 mb-1">
            <span>6 (Min)</span>
            <span>11 (Light)</span>
            <span>13 (Medium)</span>
            <span>18 (V60)</span>
            <span>30 (Max)</span>
          </div>
          <div className="w-full bg-zinc-700/30 rounded-full h-1.5 relative overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-200"
              style={{ width: `${Math.min(100, Math.max(0, ((customClicks - 6) / 24) * 100))}%` }}
            />
          </div>
        </div>

        <div className={`flex items-center gap-1.5 text-[11px] italic pt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span>{t.zeroPointNote}</span>
        </div>
      </div>
    </div>
  );
};
