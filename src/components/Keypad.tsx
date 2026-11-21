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
  ratio,
}) => {
  const handleKey = (action: () => void) => {
    sounds.playKeyClick();
    action();
  };

  const getAccentKeyClass = () => {
    switch (themeColor) {
      case 'amber':
        return 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10 active:bg-amber-500/20';
      case 'cyan':
        return 'text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 active:bg-cyan-500/20';
      case 'emerald':
        return 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 active:bg-emerald-500/20';
      case 'white':
      default:
        return 'text-zinc-100 border-zinc-500/40 hover:bg-zinc-700/30 active:bg-zinc-700/50';
    }
  };

  const accentClass = getAccentKeyClass();

  // Primary circular key styling
  const numKeyClass =
    'h-14 sm:h-16 w-full rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-800/80 hover:border-zinc-700 font-mono text-2xl sm:text-3xl font-semibold shadow-md active:scale-95 active:bg-zinc-700 transition-all flex items-center justify-center select-none cursor-pointer';

  // Function / utility key styling
  const funcKeyClass =
    'h-14 sm:h-16 w-full rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-mono text-lg font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center select-none cursor-pointer';

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-2.5">
      {/* Ratio quick-nudge bar right above keypad */}
      <div className="flex items-center justify-between px-1 py-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 text-xs font-mono">
        <span className="text-zinc-400 pl-2 text-xs">
          RATIO 1:<span className="font-bold text-zinc-100">{ratio.toFixed(1)}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleKey(() => onNudgeRatio(-0.5))}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 active:scale-95 transition-all"
            title="Nudge ratio down (stronger)"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>0.5</span>
          </button>
          <button
            type="button"
            onClick={() => handleKey(() => onNudgeRatio(0.5))}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 active:scale-95 transition-all"
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
          className={`${funcKeyClass} text-zinc-300 hover:text-white`}
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
          className={`${numKeyClass} text-xl text-zinc-400`}
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
