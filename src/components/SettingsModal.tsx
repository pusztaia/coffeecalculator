import React from 'react';
import type { AppSettings, ThemeColor } from '../types/coffee';
import { TRANSLATIONS } from '../data/translations';
import { X, Volume2, VolumeX, Moon, Sun, Globe } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const t = TRANSLATIONS[settings.lang];

  const colors: { id: ThemeColor; labelEn: string; labelHu: string; colorHex: string }[] = [
    { id: 'amber', labelEn: 'Amber Glow', labelHu: 'Borostyán Sárga', colorHex: '#f59e0b' },
    { id: 'cyan', labelEn: 'Ice Cyan', labelHu: 'Jég Kék', colorHex: '#06b6d4' },
    { id: 'emerald', labelEn: 'Phosphor Green', labelHu: 'Foszfor Zöld', colorHex: '#10b981' },
    { id: 'white', labelEn: 'Pearl White', labelHu: 'Gyöngyház Fehér', colorHex: '#e2e8f0' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
          <h3 className="text-lg font-bold text-zinc-100 font-mono">
            ⚙️ {t.settings}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono font-medium text-zinc-400 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            Nyelv / Language
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onUpdateSettings({ lang: 'hu' })}
              className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                settings.lang === 'hu'
                  ? 'bg-zinc-100 text-zinc-950 border-white'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              🇭🇺 Magyar
            </button>
            <button
              type="button"
              onClick={() => onUpdateSettings({ lang: 'en' })}
              className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                settings.lang === 'en'
                  ? 'bg-zinc-100 text-zinc-950 border-white'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Display Glow Theme Color */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono font-medium text-zinc-400">
            {t.theme}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((c) => {
              const isSelected = settings.themeColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onUpdateSettings({ themeColor: c.id })}
                  className={`py-2.5 px-3 rounded-xl font-mono text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-400 text-zinc-100'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: c.colorHex, boxShadow: `0 0 8px ${c.colorHex}` }}
                  />
                  <span className="truncate">
                    {settings.lang === 'hu' ? c.labelHu : c.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Units Configuration */}
        <div className="flex flex-col gap-3 pt-2 border-t border-zinc-900 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">{t.weightUnit}</span>
            <div className="flex rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
              <button
                type="button"
                onClick={() => onUpdateSettings({ weightUnit: 'g' })}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.weightUnit === 'g' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                Grams (g)
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ weightUnit: 'oz' })}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.weightUnit === 'oz' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                Ounces (oz)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">{t.volumeUnit}</span>
            <div className="flex rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
              <button
                type="button"
                onClick={() => onUpdateSettings({ volumeUnit: 'g' })}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.volumeUnit === 'g' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                g
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ volumeUnit: 'ml' })}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.volumeUnit === 'ml' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                ml
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ volumeUnit: 'floz' })}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.volumeUnit === 'floz' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                fl oz
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">{t.tempUnit}</span>
            <div className="flex rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
              <button
                type="button"
                onClick={() => onUpdateSettings({ tempUnit: 'C' })}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.tempUnit === 'C' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ tempUnit: 'F' })}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  settings.tempUnit === 'F' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        {/* Audio / Haptic Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-900 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
            <span>{t.sound}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !settings.soundEnabled;
              sounds.enabled = next;
              onUpdateSettings({ soundEnabled: next });
              if (next) sounds.playTareBeep();
            }}
            className={`px-3 py-1 rounded-lg border font-bold transition-all ${
              settings.soundEnabled
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            {settings.soundEnabled ? t.soundOn : t.soundOff}
          </button>
        </div>

        {/* Dark Mode Theme Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-900 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            {settings.darkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>Scale Finish</span>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
            className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold transition-all"
          >
            {settings.darkMode ? 'Matte Obsidian' : 'Brushed Silver'}
          </button>
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 py-3 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-bold text-sm shadow-lg transition-all"
        >
          {t.done}
        </button>
      </div>
    </div>
  );
};
