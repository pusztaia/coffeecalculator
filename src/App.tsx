import { useState, useEffect, useCallback } from 'react';
import { BREWERS, MOKA_POT_SIZES } from './data/brewers';
import type { Brewer, Recipe, DisplayField, AppSettings, RoastLevel, GrindSize, MokaPotSize } from './types/coffee';
import { TRANSLATIONS } from './data/translations';
import { DigitalDisplay } from './components/DigitalDisplay';
import { Keypad } from './components/Keypad';
import { BrewerArtwork } from './components/BrewerArtwork';
import { MokaPotCupSelector } from './components/MokaPotCupSelector';
import { RoastGrindGuide } from './components/RoastGrindGuide';
import { BrewTimerModal } from './components/BrewTimerModal';
import { SettingsModal } from './components/SettingsModal';
import { BrewerPickerModal } from './components/BrewerPickerModal';
import { sounds } from './utils/audio';
import { Settings, Play, ChevronDown, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';

export default function App() {
  // Application Settings
  const [settings, setSettings] = useState<AppSettings>({
    weightUnit: 'g',
    volumeUnit: 'g',
    tempUnit: 'C',
    soundEnabled: true,
    themeColor: 'amber',
    darkMode: true,
    lang: 'hu', // Default to Hungarian as requested, toggleable anytime
  });

  // Current Brewer and Recipe (Default to AeroPress or Moka Pot)
  const [currentBrewer, setCurrentBrewer] = useState<Brewer>(BREWERS[0]); // AeroPress
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(BREWERS[0].recipes[0]);

  // Scale Inputs & State
  const [ratio, setRatio] = useState<number>(BREWERS[0].defaultRatio);
  const [activeField, setActiveField] = useState<DisplayField>('coffee');
  const [coffeeInput, setCoffeeInput] = useState<string>('15');
  const [waterInput, setWaterInput] = useState<string>('225');

  // Moka Pot specific cup size
  const [mokaCupSize, setMokaCupSize] = useState<number>(3); // 3-cup default

  // Roast & Grind
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('medium');
  const [grindSize, setGrindSize] = useState<GrindSize>(BREWERS[0].defaultGrind);

  // Modals
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showBrewerPicker, setShowBrewerPicker] = useState<boolean>(false);

  const t = TRANSLATIONS[settings.lang];

  // Helper to recompute dependent field
  const computeDependent = useCallback(
    (source: DisplayField, val: string, currentRatio: number) => {
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0) {
        if (source === 'coffee') setWaterInput('0');
        else setCoffeeInput('0');
        return;
      }

      if (source === 'coffee') {
        const computedWater = Math.round(num * currentRatio);
        setWaterInput(computedWater.toString());
      } else {
        const computedCoffee = (num / currentRatio).toFixed(1);
        setCoffeeInput(computedCoffee.endsWith('.0') ? computedCoffee.slice(0, -2) : computedCoffee);
      }
    },
    []
  );

  // Keypad Handlers
  const handleDigit = (digit: string) => {
    if (activeField === 'coffee') {
      const next = coffeeInput === '0' ? digit : coffeeInput + digit;
      if (next.length > 5) return;
      setCoffeeInput(next);
      computeDependent('coffee', next, ratio);
    } else {
      const next = waterInput === '0' ? digit : waterInput + digit;
      if (next.length > 5) return;
      setWaterInput(next);
      computeDependent('water', next, ratio);
    }
  };

  const handleDecimal = () => {
    if (activeField === 'coffee') {
      if (!coffeeInput.includes('.')) {
        const next = coffeeInput + '.';
        setCoffeeInput(next);
      }
    } else {
      if (!waterInput.includes('.')) {
        const next = waterInput + '.';
        setWaterInput(next);
      }
    }
  };

  const handleBackspace = () => {
    if (activeField === 'coffee') {
      const next = coffeeInput.length > 1 ? coffeeInput.slice(0, -1) : '0';
      setCoffeeInput(next);
      computeDependent('coffee', next, ratio);
    } else {
      const next = waterInput.length > 1 ? waterInput.slice(0, -1) : '0';
      setWaterInput(next);
      computeDependent('water', next, ratio);
    }
  };

  const handleClear = () => {
    sounds.playTareBeep();
    if (activeField === 'coffee') {
      setCoffeeInput('0');
      setWaterInput('0');
    } else {
      setWaterInput('0');
      setCoffeeInput('0');
    }
  };

  const handleSwap = () => {
    sounds.playKeyClick();
    setActiveField((prev) => (prev === 'coffee' ? 'water' : 'coffee'));
  };

  const handleNudgeRatio = (delta: number) => {
    const nextRatio = Math.max(1, Math.min(25, parseFloat((ratio + delta).toFixed(1))));
    setRatio(nextRatio);
    if (activeField === 'coffee') {
      computeDependent('coffee', coffeeInput, nextRatio);
    } else {
      computeDependent('water', waterInput, nextRatio);
    }
  };

  // Switch Brewer & Recipe
  const handleSelectBrewer = (brewer: Brewer, recipe?: Recipe) => {
    setCurrentBrewer(brewer);
    const rec = recipe || brewer.recipes[0];
    setCurrentRecipe(rec);
    setRatio(rec.defaultRatio);
    setGrindSize(rec.grindSize);

    if (brewer.id === 'moka-pot') {
      const size3 = MOKA_POT_SIZES.find((s) => s.cups === 3) || MOKA_POT_SIZES[2];
      setCoffeeInput(size3.coffeeGrams.toString());
      setWaterInput(size3.waterMl.toString());
      setRatio(parseFloat((size3.waterMl / size3.coffeeGrams).toFixed(1)));
    } else {
      setCoffeeInput(rec.defaultCoffee.toString());
      setWaterInput(rec.defaultWater.toString());
    }
  };

  // Moka Pot Cup Size Change
  const handleSelectMokaSize = (size: MokaPotSize) => {
    sounds.playKeyClick();
    setMokaCupSize(size.cups);
    setCoffeeInput(size.coffeeGrams.toString());
    setWaterInput(size.waterMl.toString());
    const r = parseFloat((size.waterMl / size.coffeeGrams).toFixed(1));
    setRatio(r);
  };

  // Strength preset buttons
  const handleSetStrength = (str: 'mild' | 'balanced' | 'strong' | 'concentrate') => {
    sounds.playKeyClick();
    let newRatio = ratio;
    if (currentBrewer.id === 'moka-pot') {
      if (str === 'mild') newRatio = 10;
      else if (str === 'balanced') newRatio = 8.5;
      else if (str === 'strong') newRatio = 7;
      else newRatio = 6;
    } else if (currentBrewer.id === 'espresso') {
      if (str === 'mild') newRatio = 2.5;
      else if (str === 'balanced') newRatio = 2.0;
      else if (str === 'strong') newRatio = 1.6;
      else newRatio = 1.3;
    } else {
      // Filter / AeroPress / V60
      if (str === 'mild') newRatio = 17.5;
      else if (str === 'balanced') newRatio = 15.5;
      else if (str === 'strong') newRatio = 13.5;
      else newRatio = 8.0;
    }
    setRatio(newRatio);
    if (activeField === 'coffee') {
      computeDependent('coffee', coffeeInput, newRatio);
    } else {
      computeDependent('water', waterInput, newRatio);
    }
  };

  // Keyboard shortcut listener for desktop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showTimer || showSettings || showBrewerPicker) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        handleDecimal();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleClear();
      } else if (e.key.toLowerCase() === 's') {
        handleSwap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [coffeeInput, waterInput, activeField, ratio, showTimer, showSettings, showBrewerPicker]);

  const coffeeNum = parseFloat(coffeeInput) || 0;
  const waterNum = parseFloat(waterInput) || 0;

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-3 sm:p-5 selection:bg-amber-500 selection:text-black font-sans antialiased">
      {/* Background ambient scale glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[140px] opacity-15 transition-colors duration-700 ${
            settings.themeColor === 'amber'
              ? 'bg-amber-500'
              : settings.themeColor === 'cyan'
              ? 'bg-cyan-500'
              : settings.themeColor === 'emerald'
              ? 'bg-emerald-500'
              : 'bg-zinc-200'
          }`}
        />
      </div>

      <div className="w-full max-w-lg z-10 flex flex-col gap-3.5">
        {/* Top App Header / Scale Brand */}
        <header className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold font-mono tracking-widest text-zinc-100 leading-none">
                {t.appTitle}
              </h1>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5 leading-none">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Language Toggle */}
            <button
              type="button"
              onClick={() => {
                sounds.playKeyClick();
                setSettings((s) => ({ ...s, lang: s.lang === 'hu' ? 'en' : 'hu' }));
              }}
              className="px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 transition-colors cursor-pointer"
              title="Váltás magyar / angol"
            >
              {settings.lang === 'hu' ? 'HU 🇭🇺' : 'EN 🇬🇧'}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !settings.soundEnabled;
                sounds.enabled = next;
                setSettings((s) => ({ ...s, soundEnabled: next }));
                if (next) sounds.playTareBeep();
              }}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={settings.soundEnabled ? t.soundOn : t.soundOff}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playKeyClick();
                setShowSettings(true);
              }}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Primary Brewer Switcher Tabs: Focused on AeroPress & Moka Pot */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
          {/* AeroPress Tab */}
          <button
            type="button"
            onClick={() => handleSelectBrewer(BREWERS[0])}
            className={`py-2 px-1 rounded-xl font-mono text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border ${
              currentBrewer.id === 'aeropress'
                ? 'bg-zinc-900 text-amber-400 border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40'
            }`}
          >
            <span>AeroPress</span>
            <span className="text-[9px] font-normal opacity-70">1:15 Standard</span>
          </button>

          {/* Moka Pot / Kotyogós Tab */}
          <button
            type="button"
            onClick={() => handleSelectBrewer(BREWERS[2])}
            className={`py-2 px-1 rounded-xl font-mono text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border ${
              currentBrewer.id === 'moka-pot'
                ? 'bg-zinc-900 text-amber-400 border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40'
            }`}
          >
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" />
              Kotyogós (Moka)
            </span>
            <span className="text-[9px] font-normal opacity-70">Bialetti 1:8.5</span>
          </button>

          {/* More Brewers Dropdown Button */}
          <button
            type="button"
            onClick={() => setShowBrewerPicker(true)}
            className={`py-2 px-1 rounded-xl font-mono text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border ${
              currentBrewer.id !== 'aeropress' && currentBrewer.id !== 'moka-pot'
                ? 'bg-zinc-900 text-amber-400 border-amber-500/40'
                : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40'
            }`}
          >
            <span className="flex items-center gap-1">
              {currentBrewer.id !== 'aeropress' && currentBrewer.id !== 'moka-pot'
                ? currentBrewer.nameEn.split(' ')[0]
                : 'Többi / More'}
              <ChevronDown className="w-3 h-3" />
            </span>
            <span className="text-[9px] font-normal opacity-70">V60, French, etc.</span>
          </button>
        </div>

        {/* Selected Brewer & Recipe Banner Card */}
        <div className="w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-3.5 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center flex-shrink-0 shadow-inner">
              <BrewerArtwork brewerId={currentBrewer.id} themeColor={settings.themeColor} size={46} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-bold text-zinc-100 truncate">
                  {settings.lang === 'hu' ? currentRecipe.nameHu : currentRecipe.nameEn}
                </h2>
                {currentRecipe.tag && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono font-semibold">
                    {currentRecipe.tag}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 truncate font-mono mt-0.5">
                {currentRecipe.creatorEn} • {currentRecipe.brewTimeSec}s
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowBrewerPicker(true)}
            className="flex-shrink-0 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
          >
            {t.recipe} ▾
          </button>
        </div>

        {/* Special Moka Pot Cup Size & Physical Capacity Picker */}
        {currentBrewer.id === 'moka-pot' && (
          <MokaPotCupSelector
            selectedCups={mokaCupSize}
            onSelectSize={handleSelectMokaSize}
            themeColor={settings.themeColor}
            lang={settings.lang}
          />
        )}

        {/* Main Digital Scale Display */}
        <DigitalDisplay
          coffeeValue={coffeeInput}
          waterValue={waterInput}
          ratio={ratio}
          activeField={activeField}
          onSelectField={(field) => {
            sounds.playKeyClick();
            setActiveField(field);
          }}
          onSwap={handleSwap}
          themeColor={settings.themeColor}
          weightUnit={settings.weightUnit}
          volumeUnit={settings.volumeUnit}
          lang={settings.lang}
        />

        {/* Quick Strength Preset Selector */}
        <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => handleSetStrength('mild')}
            className="py-1.5 px-1 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 active:scale-95 transition-all text-center"
          >
            <span className="block text-[10px] text-zinc-500 uppercase">{t.mild}</span>
            <span className="font-semibold text-[11px]">
              {currentBrewer.id === 'moka-pot' ? '1:10' : currentBrewer.id === 'espresso' ? '1:2.5' : '1:17.5'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSetStrength('balanced')}
            className="py-1.5 px-1 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-amber-400 font-semibold active:scale-95 transition-all text-center"
          >
            <span className="block text-[10px] text-zinc-500 uppercase">{t.balanced}</span>
            <span className="font-bold text-[11px]">
              {currentBrewer.id === 'moka-pot' ? '1:8.5' : currentBrewer.id === 'espresso' ? '1:2.0' : '1:15.5'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSetStrength('strong')}
            className="py-1.5 px-1 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 active:scale-95 transition-all text-center"
          >
            <span className="block text-[10px] text-zinc-500 uppercase">{t.strong}</span>
            <span className="font-semibold text-[11px]">
              {currentBrewer.id === 'moka-pot' ? '1:7' : currentBrewer.id === 'espresso' ? '1:1.6' : '1:13.5'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSetStrength('concentrate')}
            className="py-1.5 px-1 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 active:scale-95 transition-all text-center"
          >
            <span className="block text-[10px] text-zinc-500 uppercase">{t.concentrate}</span>
            <span className="font-semibold text-[11px]">
              {currentBrewer.id === 'moka-pot' ? '1:6' : currentBrewer.id === 'espresso' ? '1:1.3' : '1:8.0'}
            </span>
          </button>
        </div>

        {/* Tactile Keypad */}
        <Keypad
          onDigit={handleDigit}
          onDecimal={handleDecimal}
          onBackspace={handleBackspace}
          onClear={handleClear}
          onSwap={handleSwap}
          onNudgeRatio={handleNudgeRatio}
          themeColor={settings.themeColor}
          ratio={ratio}
        />

        {/* Roast Level & Grind Size Helper Guide */}
        <RoastGrindGuide
          roastLevel={roastLevel}
          onSelectRoast={setRoastLevel}
          grindSize={grindSize}
          onSelectGrind={setGrindSize}
          tempUnit={settings.tempUnit}
          themeColor={settings.themeColor}
          lang={settings.lang}
        />

        {/* Interactive Step-by-Step Brew Timer Trigger */}
        <button
          type="button"
          onClick={() => {
            sounds.playKeyClick();
            setShowTimer(true);
          }}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-mono font-bold text-sm sm:text-base shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{t.startTimer} ({currentRecipe.brewTimeSec}s)</span>
        </button>

        {/* Footer tip */}
        <footer className="text-center text-[11px] font-mono text-zinc-600 py-3">
          {currentBrewer.id === 'aeropress' ? t.tipAeroPress : currentBrewer.id === 'moka-pot' ? t.tipMoka : 'Coffee Calculator • Bench Scale Ratio Engine'}
        </footer>
      </div>

      {/* MODALS */}
      {showTimer && (
        <BrewTimerModal
          recipe={currentRecipe}
          coffeeGrams={coffeeNum}
          waterGrams={waterNum}
          weightUnit={settings.weightUnit}
          themeColor={settings.themeColor}
          lang={settings.lang}
          onClose={() => setShowTimer(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(newSet) => setSettings((s) => ({ ...s, ...newSet }))}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showBrewerPicker && (
        <BrewerPickerModal
          currentBrewer={currentBrewer}
          currentRecipe={currentRecipe}
          onSelectBrewerAndRecipe={(brewer, recipe) => handleSelectBrewer(brewer, recipe)}
          themeColor={settings.themeColor}
          lang={settings.lang}
          onClose={() => setShowBrewerPicker(false)}
        />
      )}
    </div>
  );
}
