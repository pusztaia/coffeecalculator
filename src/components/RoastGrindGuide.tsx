import React from 'react';
import type { RoastLevel, GrindSize, TempUnit, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { Thermometer, Gauge } from 'lucide-react';

interface RoastGrindGuideProps {
  roastLevel: RoastLevel;
  onSelectRoast: (roast: RoastLevel) => void;
  grindSize: GrindSize;
  onSelectGrind: (grind: GrindSize) => void;
  tempUnit: TempUnit;
  themeColor: ThemeColor;
  lang: 'hu' | 'en';
}

export const RoastGrindGuide: React.FC<RoastGrindGuideProps> = ({
  roastLevel,
  onSelectRoast,
  grindSize,
  onSelectGrind,
  tempUnit,
  themeColor,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  // Temperatures based on roast
  const getTempDisplay = (roast: RoastLevel) => {
    let c = '92°C';
    let f = '198°F';
    if (roast === 'light') {
      c = '94-96°C';
      f = '201-205°F';
    } else if (roast === 'medium') {
      c = '90-93°C';
      f = '194-200°F';
    } else if (roast === 'dark') {
      c = '84-88°C';
      f = '183-190°F';
    }
    return tempUnit === 'C' ? c : f;
  };

  const grindSizes: { id: GrindSize; label: string; dots: number }[] = [
    { id: 'extra-fine', label: t.extraFine, dots: 1 },
    { id: 'fine', label: t.fine, dots: 2 },
    { id: 'medium-fine', label: t.mediumFine, dots: 3 },
    { id: 'medium', label: t.medium, dots: 4 },
    { id: 'medium-coarse', label: t.mediumCoarse, dots: 5 },
    { id: 'coarse', label: t.coarse, dots: 6 },
  ];

  const getAccentClass = () => {
    switch (themeColor) {
      case 'amber': return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
      case 'cyan': return 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10';
      case 'emerald': return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
      case 'white': default: return 'text-zinc-100 border-zinc-400 bg-zinc-700/30';
    }
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-3.5 flex flex-col gap-3 font-mono text-xs">
      {/* Roast Level selection & recommended water temperature */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
            <Thermometer className="w-4 h-4 text-rose-400" />
            {t.roastLevel} & {t.waterTemp}
          </span>
          <span className="text-zinc-300 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
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
                onClick={() => onSelectRoast(level)}
                className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                  isSelected
                    ? getAccentClass()
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800'
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

      {/* Grind Size visual scale */}
      <div className="pt-2 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
            <Gauge className="w-4 h-4 text-cyan-400" />
            {t.grindSize}
          </span>
          <span className="text-zinc-300 font-semibold text-[11px] capitalize">
            {grindSizes.find((g) => g.id === grindSize)?.label}
          </span>
        </div>

        {/* Visual particle size indicator */}
        <div className="grid grid-cols-6 gap-1">
          {grindSizes.map((item) => {
            const isSelected = grindSize === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectGrind(item.id)}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isSelected
                    ? getAccentClass()
                    : 'bg-zinc-900/80 text-zinc-500 hover:text-zinc-300 border-zinc-800'
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
                <span className="text-[9px] font-mono leading-none truncate max-w-full text-center">
                  {item.id === 'extra-fine' ? 'X-Fine' : item.id === 'medium-fine' ? 'M-Fine' : item.id === 'medium-coarse' ? 'M-Coarse' : item.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
