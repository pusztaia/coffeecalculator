import React from 'react';
import { Delete, RotateCcw, ArrowLeftRight, Plus, Minus } from 'lucide-react';
import type { ThemeColor } from '../types/coffee';
import { sounds } from '../utils/audio';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onBackspace: () => void;
  onClear: () => void;
  onSwap: () => void;
  onNudgeRatio: (delta: number) => void;
  themeColor: ThemeColor;
  darkMode: boolean;
  ratio: number;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onDecimal,
  onBackspace,
  onClear,
  onSwap,
  onNudgeRatio,
  themeColor,
  darkMode,
  ratio,
}) => {
  const handleKey = (action: () => void) => {
    sounds.playKeyClick();
    action();
  };

  const getAccentKeyClass = () => {
    switch (themeColor) {
      case 'amber':
        return darkMode
          ? 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10 active:bg-amber-500/20'
          : 'text-amber-800 border-amber-500/40 bg-amber-50 hover:bg-amber-100/80 active:bg-amber-200';
      case 'cyan':
        return darkMode
          ? 'text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 active:bg-cyan-500/20'
          : 'text-cyan-800 border-cyan-500/40 bg-cyan-50 hover:bg-cyan-100/80 active:bg-cyan-200';
      case 'emerald':
        return darkMode
          ? 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 active:bg-emerald-500/20'
          : 'text-emerald-800 border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100/80 active:bg-emerald-200';
      case 'white':
      default:
        return darkMode
          ? 'text-zinc-100 border-zinc-500/40 hover:bg-zinc-700/30 active:bg-zinc-700/50'
          : 'text-zinc-900 border-zinc-400 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400';
    }
  };

  const accentClass = getAccentKeyClass();

  // Primary circular key styling
  const numKeyClass = darkMode
    ? 'h-14 sm:h-16 w-full rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-800/80 hover:border-zinc-700 font-mono text-2xl sm:text-3xl font-semibold shadow-md active:scale-95 active:bg-zinc-700 transition-all flex items-center justify-center select-none cursor-pointer'
    : 'h-14 sm:h-16 w-full rounded-2xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/90 font-mono text-2xl sm:text-3xl font-semibold shadow-sm active:scale-95 active:bg-zinc-100 transition-all flex items-center justify-center select-none cursor-pointer';

  // Function / utility key styling
  const funcKeyClass = darkMode
    ? 'h-14 sm:h-16 w-full rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-mono text-lg font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center select-none cursor-pointer'
    : 'h-14 sm:h-16 w-full rounded-2xl bg-zinc-100/90 hover:bg-zinc-200/80 border border-zinc-200 text-zinc-600 hover:text-zinc-900 font-mono text-lg font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center select-none cursor-pointer';

  const nudgeBarClass = darkMode
    ? 'bg-zinc-950/70 border-zinc-800/70 text-zinc-400'
    : 'bg-white border-zinc-200 text-zinc-600 shadow-sm';

  const nudgeBtnClass = darkMode
    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800';

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-2.5">
      {/* Ratio quick-nudge bar right above keypad */}
      <div className={`flex items-center justify-between px-1 py-1.5 rounded-xl border text-xs font-mono ${nudgeBarClass}`}>
        <span className="pl-2 text-xs">
          RATIO 1:<span className={`font-bold ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{ratio.toFixed(1)}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleKey(() => onNudgeRatio(-0.5))}
            className={`flex items-center gap-0.5 px-2.5 py-1 rounded-lg border active:scale-95 transition-all ${nudgeBtnClass}`}
            title="Nudge ratio down (stronger)"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>0.5</span>
          </button>
          <button
            type="button"
            onClick={() => handleKey(() => onNudgeRatio(0.5))}
            className={`flex items-center gap-0.5 px-2.5 py-1 rounded-lg border active:scale-95 transition-all ${nudgeBtnClass}`}
            title="Nudge ratio up (milder)"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>0.5</span>
          </button>
        </div>
      </div>

      {/* Main numpad grid (4 rows x 3 columns + side/top utilities) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Row 1 */}
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('1'))}
          className={numKeyClass}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('2'))}
          className={numKeyClass}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('3'))}
          className={numKeyClass}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => handleKey(onClear)}
          className={`${funcKeyClass} ${accentClass}`}
          title="All Clear"
        >
          <span className="font-bold tracking-wider">AC</span>
        </button>

        {/* Row 2 */}
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('4'))}
          className={numKeyClass}
        >
          4
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('5'))}
          className={numKeyClass}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('6'))}
          className={numKeyClass}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleKey(onBackspace)}
          className={funcKeyClass}
          title="Backspace"
        >
          <Delete className="w-6 h-6" />
        </button>

        {/* Row 3 */}
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('7'))}
          className={numKeyClass}
        >
          7
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('8'))}
          className={numKeyClass}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('9'))}
          className={numKeyClass}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleKey(onSwap)}
          className={`${funcKeyClass} ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'}`}
          title="Swap Coffee / Water"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        {/* Row 4 */}
        <button
          type="button"
          onClick={() => handleKey(onDecimal)}
          className={`${numKeyClass} text-3xl font-bold`}
        >
          .
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('0'))}
          className={numKeyClass}
        >
          0
        </button>
        <button
          type="button"
          onClick={() => handleKey(() => onDigit('00'))}
          className={`${numKeyClass} text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
        >
          00
        </button>
        <button
          type="button"
          onClick={() => handleKey(onClear)}
          className={funcKeyClass}
          title="Tare / Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
