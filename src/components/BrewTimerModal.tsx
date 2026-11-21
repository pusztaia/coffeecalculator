import React, { useState, useEffect, useRef } from 'react';
import type { Recipe, ThemeColor, WeightUnit } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, X, CheckCircle2, Clock } from 'lucide-react';

interface BrewTimerModalProps {
  recipe: Recipe;
  coffeeGrams: number;
  waterGrams: number;
  weightUnit: WeightUnit;
  themeColor: ThemeColor;
  lang: 'hu' | 'en';
  onClose: () => void;
}

export const BrewTimerModal: React.FC<BrewTimerModalProps> = ({
  recipe,
  coffeeGrams,
  waterGrams,
  themeColor,
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<number | null>(null);

  const steps = recipe.steps;
  const totalBrewSec = recipe.brewTimeSec || 180;

  // Track active step based on elapsed seconds
  useEffect(() => {
    if (steps.length === 0) return;
    let activeIdx = 0;
    for (let i = 0; i < steps.length; i++) {
      if (elapsedSec >= steps[i].timeSec) {
        activeIdx = i;
      }
    }
    if (activeIdx !== currentStepIndex) {
      setCurrentStepIndex(activeIdx);
      sounds.playStepChime();
    }

    if (elapsedSec >= totalBrewSec && !isFinished) {
      setIsFinished(true);
      setIsRunning(false);
      sounds.playSuccessFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [elapsedSec, steps, currentStepIndex, totalBrewSec, isFinished]);

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleRun = () => {
    sounds.playKeyClick();
    if (isFinished) {
      setElapsedSec(0);
      setIsFinished(false);
      setCurrentStepIndex(0);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    sounds.playKeyClick();
    setIsRunning(false);
    setElapsedSec(0);
    setCurrentStepIndex(0);
    setIsFinished(false);
  };

  const handleNextStep = () => {
    sounds.playKeyClick();
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setElapsedSec(steps[nextIdx].timeSec);
    }
  };

  const handlePrevStep = () => {
    sounds.playKeyClick();
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      setElapsedSec(steps[prevIdx].timeSec);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.min(100, Math.round((elapsedSec / totalBrewSec) * 100));

  const getThemeText = () => {
    switch (themeColor) {
      case 'amber': return 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]';
      case 'cyan': return 'text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]';
      case 'emerald': return 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]';
      case 'white': default: return 'text-zinc-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]';
    }
  };

  const getProgressBarClass = () => {
    switch (themeColor) {
      case 'amber': return 'bg-amber-500';
      case 'cyan': return 'bg-cyan-500';
      case 'emerald': return 'bg-emerald-500';
      case 'white': default: return 'bg-zinc-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 relative max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
              {lang === 'hu' ? recipe.creatorHu : recipe.creatorEn}
            </span>
            <h3 className="text-lg font-bold text-zinc-100">
              {lang === 'hu' ? recipe.nameHu : recipe.nameEn}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scaled dose summary badge */}
        <div className="flex items-center justify-between bg-zinc-900/70 border border-zinc-800/80 px-4 py-2 rounded-xl text-xs font-mono text-zinc-300">
          <div>
            <span className="text-zinc-500">{t.coffee}: </span>
            <span className="font-bold text-zinc-100">{coffeeGrams}g</span>
          </div>
          <div>
            <span className="text-zinc-500">{t.water}: </span>
            <span className="font-bold text-zinc-100">{waterGrams}g</span>
          </div>
          <div>
            <span className="text-zinc-500">{t.ratio}: </span>
            <span className="font-bold text-zinc-100">1:{(waterGrams / (coffeeGrams || 1)).toFixed(1)}</span>
          </div>
        </div>

        {/* Big Digital Scale Chronometer */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 font-mono">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>ELAPSED / TOTAL: {formatTime(totalBrewSec)}</span>
          </div>

          <div className={`text-6xl sm:text-7xl font-bold tracking-tight tabular-nums py-2 ${getThemeText()}`}>
            {formatTime(elapsedSec)}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getProgressBarClass()}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Guide Card */}
        {currentStep && (
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-semibold uppercase tracking-wider">
                {t.step} {currentStepIndex + 1} / {steps.length}
              </span>
              <span className="text-zinc-500">
                @{formatTime(currentStep.timeSec)}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-zinc-100">
              {lang === 'hu' ? currentStep.titleHu : currentStep.titleEn}
            </h4>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {lang === 'hu' ? currentStep.descHu : currentStep.descEn}
            </p>

            {currentStep.waterTarget && (
              <div className="mt-1 flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 p-2 rounded-lg">
                <span>💧 {t.water}: {currentStep.waterTarget}g target</span>
              </div>
            )}
          </div>
        )}

        {/* Completion Message */}
        {isFinished && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span className="font-medium">{t.brewFinished}</span>
          </div>
        )}

        {/* Control Action Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 border border-zinc-800 flex items-center justify-center text-zinc-300 active:scale-95 transition-all cursor-pointer"
            title={t.previousStep}
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={toggleRun}
            className={`col-span-2 py-3 px-4 rounded-2xl font-mono font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-zinc-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>{t.pause}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{elapsedSec > 0 ? t.resume : t.startTimer}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            disabled={currentStepIndex === steps.length - 1}
            className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 border border-zinc-800 flex items-center justify-center text-zinc-300 active:scale-95 transition-all cursor-pointer"
            title={t.nextStep}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Reset & Dismiss button */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 hover:text-zinc-300 py-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-zinc-300 py-1 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
