import React, { useState, useEffect, useRef } from 'react';
import type { Recipe, ThemeColor, RoastLevel } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { sounds } from '../utils/audio';
import { useModal } from '../utils/useModal';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, X, CheckCircle2, Clock, Droplet, Volume2, VolumeX } from 'lucide-react';

interface BrewTimerModalProps {
  recipe: Recipe;
  coffeeGrams: number;
  waterGrams: number;
  roastLevel: RoastLevel;
  themeColor: ThemeColor;
  darkMode: boolean;
  lang: 'hu' | 'en';
  onClose: () => void;
  viewOnly?: boolean;
}

export const BrewTimerModal: React.FC<BrewTimerModalProps> = ({
  recipe,
  coffeeGrams,
  waterGrams,
  roastLevel,
  themeColor,
  darkMode,
  lang,
  onClose,
  viewOnly = false,
}) => {
  const t = TRANSLATIONS[lang];
  const dialogRef = useModal(onClose);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);
  const [isActiveTimer, setIsActiveTimer] = useState(!viewOnly);

  const startRef = useRef(0); // wall-clock start, so the timer stays right when the tab is throttled
  const D = (dark: string, light: string) => (darkMode ? dark : light);

  const isColdBrew = recipe.id.includes('cold-brew');
  const tempDisplay = isColdBrew
    ? (lang === 'hu' ? '4–20°C (Hideg)' : '4–20°C (Cold)')
    : roastLevel === 'light'
    ? '94–96°C'
    : roastLevel === 'medium'
    ? '90–93°C'
    : '84–88°C';

  // Scale any recipe steps dynamically according to the user's dialed coffee and water grams
  const steps = recipe.steps.map((st) => {
    let titleHu = st.titleHu;
    let titleEn = st.titleEn;
    let descHu = st.descHu;
    let descEn = st.descEn;
    let waterTarget = st.waterTarget;

    // Scale water target dynamically
    if (st.waterTarget && recipe.defaultWater) {
      waterTarget = Math.round(waterGrams * (st.waterTarget / recipe.defaultWater));
    }

    // Replace hardcoded coffee and water grams in step descriptions
    const defaultC = recipe.defaultCoffee.toString();
    const defaultW = recipe.defaultWater.toString();

    descHu = descHu
      .replace(new RegExp(`${defaultC}g`, 'g'), `${coffeeGrams}g`)
      .replace(new RegExp(`${defaultW}g`, 'g'), `${waterGrams}g`)
      .replace(/~?85°C|80-85°C|~?90°C|~?92°C|~?95°C|~?98°C/g, tempDisplay);

    descEn = descEn
      .replace(new RegExp(`${defaultC}g`, 'g'), `${coffeeGrams}g`)
      .replace(new RegExp(`${defaultW}g`, 'g'), `${waterGrams}g`)
      .replace(/~?85°C|80-85°C|~?90°C|~?92°C|~?95°C|~?98°C/g, tempDisplay);

    titleHu = titleHu
      .replace(new RegExp(`${defaultC}g`, 'g'), `${coffeeGrams}g`)
      .replace(new RegExp(`${defaultW}g`, 'g'), `${waterGrams}g`);

    titleEn = titleEn
      .replace(new RegExp(`${defaultC}g`, 'g'), `${coffeeGrams}g`)
      .replace(new RegExp(`${defaultW}g`, 'g'), `${waterGrams}g`);

    return {
      ...st,
      waterTarget,
      titleHu,
      titleEn,
      descHu,
      descEn,
    };
  });
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
        disableForReducedMotion: true,
      });
    }
  }, [elapsedSec, steps, currentStepIndex, totalBrewSec, isFinished]);

  // Timer interval
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startRef.current) / 1000));
    }, 250);
    return () => clearInterval(id);
  }, [isRunning]);

  const seek = (sec: number) => {
    startRef.current = Date.now() - sec * 1000;
    setElapsedSec(sec);
  };

  const toggleRun = () => {
    sounds.playKeyClick();
    if (isFinished) {
      seek(0);
      setIsFinished(false);
      setCurrentStepIndex(0);
      setIsRunning(true);
    } else {
      if (!isRunning) seek(elapsedSec);
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
      seek(steps[nextIdx].timeSec);
    }
  };

  const handlePrevStep = () => {
    sounds.playKeyClick();
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      seek(steps[prevIdx].timeSec);
      setIsFinished(false);
    }
  };

  // Format seconds to mm:ss or hh:mm:ss for long steeping (cold brew)
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.min(100, Math.round((elapsedSec / totalBrewSec) * 100));

  const getThemeText = () => {
    switch (themeColor) {
      case 'amber': return 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]';
      case 'emerald': return 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]';
      case 'white': default: return 'text-zinc-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]';
    }
  };

  const getProgressBarClass = () => {
    switch (themeColor) {
      case 'amber': return 'bg-amber-500';
      case 'emerald': return 'bg-emerald-500';
      case 'white': default: return 'bg-zinc-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={lang === 'hu' ? recipe.nameHu : recipe.nameEn} tabIndex={-1} className={`outline-none w-full max-w-lg ${D('bg-zinc-950','bg-white')} border ${D('border-zinc-800','border-zinc-200')} rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 relative max-h-[92vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${D('border-zinc-900','border-zinc-200')}`}>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block">
              {lang === 'hu' ? recipe.creatorHu : recipe.creatorEn}
            </span>
            <h3 className={`text-lg font-bold ${D('text-zinc-100','text-zinc-900')}`}>
              {lang === 'hu' ? recipe.nameHu : recipe.nameEn}
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                sounds.enabled = next;
                setSoundEnabled(next);
                if (next) sounds.playTareBeep();
              }}
              aria-label={soundEnabled ? t.soundOn : t.soundOff}
              title={soundEnabled ? t.soundOn : t.soundOff}
              className={`p-2 rounded-full ${D('bg-zinc-900','bg-zinc-100')} ${D('text-zinc-400','text-zinc-600')} ${D('hover:text-white','hover:text-zinc-900')} ${D('hover:bg-zinc-800','hover:bg-zinc-200')} transition-colors`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className={`p-2 rounded-full ${D('bg-zinc-900','bg-zinc-100')} ${D('text-zinc-400','text-zinc-600')} ${D('hover:text-white','hover:text-zinc-900')} ${D('hover:bg-zinc-800','hover:bg-zinc-200')} transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scaled dose summary badge */}
        <div className={`flex items-center justify-between ${D('bg-zinc-900/70','bg-zinc-100')} border ${D('border-zinc-800/80','border-zinc-200')} px-4 py-2 rounded-xl text-xs font-mono ${D('text-zinc-300','text-zinc-700')}`}>
          <div>
            <span className="text-zinc-500">{t.coffee}: </span>
            <span className={`font-bold ${D('text-zinc-100','text-zinc-900')}`}>{coffeeGrams}g</span>
          </div>
          <div>
            <span className="text-zinc-500">{t.water}: </span>
            <span className={`font-bold ${D('text-zinc-100','text-zinc-900')}`}>{waterGrams}g</span>
          </div>
          <div>
            <span className="text-zinc-500">{t.ratio}: </span>
            <span className={`font-bold ${D('text-zinc-100','text-zinc-900')}`}>1:{(waterGrams / (coffeeGrams || 1)).toFixed(1)}</span>
          </div>
        </div>

        {/* Big Digital Scale Chronometer or All Steps List */}
        {!isActiveTimer ? (
          <div className="flex flex-col gap-3">
            <div className={`flex items-center justify-between text-xs font-mono pb-1 border-b ${D('border-zinc-800/40 text-zinc-400','border-zinc-200 text-zinc-600')}`}>
              <span className="font-semibold uppercase tracking-wider text-amber-500">
                {lang === 'hu' ? 'Elkészítés Lépései' : 'Brewing Steps'} ({steps.length})
              </span>
              <span>{lang === 'hu' ? `Vízhőfok: ${tempDisplay}` : `Water: ${tempDisplay}`}</span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[52vh] overflow-y-auto pr-1">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl ${D('bg-zinc-900/60','bg-zinc-100')} border ${D('border-zinc-800','border-zinc-200')} p-3.5 flex flex-col gap-1.5`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-500 font-bold uppercase tracking-wider">
                      {t.step} {idx + 1}
                    </span>
                    <span className="text-zinc-500">
                      @{formatTime(st.timeSec)}
                    </span>
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold ${D('text-zinc-100','text-zinc-900')}`}>
                    {lang === 'hu' ? st.titleHu : st.titleEn}
                  </h4>

                  <p className={`text-xs ${D('text-zinc-400','text-zinc-600')} leading-relaxed`}>
                    {lang === 'hu' ? st.descHu : st.descEn}
                  </p>

                  {st.waterTarget && (
                    <div className={`mt-1 flex items-center gap-1.5 text-[11px] font-mono font-medium p-1.5 rounded-lg ${D('text-blue-400 bg-blue-950/30 border border-blue-900/50', 'text-blue-700 bg-blue-50 border border-blue-200')}`}>
                      <span className="flex items-center gap-1.5"><Droplet className="w-3.5 h-3.5" aria-hidden="true" />{t.water}: {st.waterTarget}g target</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Big Start button inside view-only modal */}
            <button
              type="button"
              onClick={() => {
                sounds.playKeyClick();
                setIsActiveTimer(true);
                seek(0);
                setIsRunning(true);
              }}
              className="w-full mt-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-mono font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.startTimer}</span>
            </button>
          </div>
        ) : (
          <>
            <div className={`flex flex-col items-center justify-center p-5 rounded-2xl ${D('bg-zinc-900/40','bg-zinc-100')} border ${D('border-zinc-800/60','border-zinc-200')} font-mono`}>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>ELAPSED / TOTAL: {formatTime(totalBrewSec)}</span>
              </div>

              <div className={`text-5xl sm:text-7xl font-bold tracking-tight tabular-nums py-2 ${getThemeText()}`}>
                {formatTime(elapsedSec)}
              </div>

              {totalBrewSec >= 3600 && isRunning && (
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  {lang === 'hu' ? 'Várható befejezés: ~' : 'Estimated completion: ~'}
                  {new Date(Date.now() + (totalBrewSec - elapsedSec) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}

              {/* Progress bar */}
              <div className={`w-full ${D('bg-zinc-800','bg-zinc-200')} rounded-full h-2 mt-3 overflow-hidden`}>
                <div
                  className={`h-full transition-all duration-300 ${getProgressBarClass()}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step Guide Card */}
            {currentStep && (
              <div className={`rounded-2xl ${D('bg-zinc-900/60','bg-zinc-100')} border ${D('border-zinc-800','border-zinc-200')} p-4 flex flex-col gap-2`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider">
                    {t.step} {currentStepIndex + 1} / {steps.length}
                  </span>
                  <span className="text-zinc-500">
                    @{formatTime(currentStep.timeSec)}
                  </span>
                </div>

                <h4 className={`text-base sm:text-lg font-bold ${D('text-zinc-100','text-zinc-900')}`}>
                  {lang === 'hu' ? currentStep.titleHu : currentStep.titleEn}
                </h4>

                <p className={`text-xs sm:text-sm ${D('text-zinc-400','text-zinc-600')} leading-relaxed`}>
                  {lang === 'hu' ? currentStep.descHu : currentStep.descEn}
                </p>

                {currentStep.waterTarget && (
                  <div className={`mt-1 flex items-center gap-1.5 text-xs font-mono font-medium p-2 rounded-lg ${D('text-blue-400 bg-blue-950/30 border border-blue-900/50', 'text-blue-700 bg-blue-50 border border-blue-200')}`}>
                    <span className="flex items-center gap-1.5"><Droplet className="w-3.5 h-3.5" aria-hidden="true" />{t.water}: {currentStep.waterTarget}g target</span>
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
                className={`p-3 rounded-2xl ${D('bg-zinc-900','bg-zinc-100')} ${D('hover:bg-zinc-800','hover:bg-zinc-200')} disabled:opacity-30 border ${D('border-zinc-800','border-zinc-200')} flex items-center justify-center ${D('text-zinc-300','text-zinc-700')} active:scale-95 transition-all cursor-pointer`}
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
                className={`p-3 rounded-2xl ${D('bg-zinc-900','bg-zinc-100')} ${D('hover:bg-zinc-800','hover:bg-zinc-200')} disabled:opacity-30 border ${D('border-zinc-800','border-zinc-200')} flex items-center justify-center ${D('text-zinc-300','text-zinc-700')} active:scale-95 transition-all cursor-pointer`}
                title={t.nextStep}
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        {/* Reset & Dismiss button */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center gap-1.5 ${D('hover:text-zinc-300','hover:text-zinc-700')} py-1 transition-colors`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${D('hover:text-zinc-300','hover:text-zinc-700')} py-1 transition-colors`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
