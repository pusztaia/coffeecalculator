import React from 'react';
import type { Brewer, Recipe, ThemeColor } from '../types/coffee';
import { BREWERS } from '../data/brewers';
import { BrewerArtwork } from './BrewerArtwork';
import { TRANSLATIONS } from '../data/translations';
import { useModal } from '../utils/useModal';
import { X, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BrewerPickerModalProps {
  currentBrewer: Brewer;
  currentRecipe: Recipe;
  onSelectBrewerAndRecipe: (brewer: Brewer, recipe: Recipe) => void;
  themeColor: ThemeColor;
  lang: 'hu' | 'en';
  onClose: () => void;
}

export const BrewerPickerModal: React.FC<BrewerPickerModalProps> = ({
  currentBrewer,
  currentRecipe,
  onSelectBrewerAndRecipe,
  themeColor,
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const dialogRef = useModal(onClose);

  const handleSelect = (brewer: Brewer, recipe: Recipe) => {
    sounds.playKeyClick();
    onSelectBrewerAndRecipe(brewer, recipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-4">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t.recipe} tabIndex={-1} className="outline-none w-full max-w-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-900">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {t.selectBrewer}
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              AeroPress, Kotyogós & More
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlighted Top: AeroPress, Moka Pot & Cold Brew */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-500/90 font-semibold">
            ★ Kiemelt Módszerek / Featured
          </span>
          <div className="grid grid-cols-3 gap-2">
            {BREWERS.filter((b) => b.id === 'aeropress' || b.id === 'moka-pot' || b.id === 'cold-brew').map((brewer) => {
              const isSelected = currentBrewer.id === brewer.id;
              return (
                <button
                  key={brewer.id}
                  type="button"
                  onClick={() => handleSelect(brewer, brewer.recipes[0])}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-900 border-amber-500/70 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <BrewerArtwork brewerId={brewer.id} themeColor={themeColor} size={50} />
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs mt-1 truncate max-w-full">
                    {lang === 'hu' ? brewer.nameHu.split(' ')[0] : brewer.nameEn.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    1:{brewer.defaultRatio}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All Brewers and their Recipes list */}
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-900">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            {t.allRecipes} & Brewers
          </span>

          <div className="flex flex-col gap-3">
            {BREWERS.map((brewer) => (
              <div
                key={brewer.id}
                className="rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <BrewerArtwork brewerId={brewer.id} themeColor={themeColor} size={40} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {lang === 'hu' ? brewer.nameHu : brewer.nameEn}
                    </h4>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
                      {lang === 'hu' ? brewer.subtitleHu : brewer.subtitleEn}
                    </p>
                  </div>
                </div>

                {/* Recipes inside this brewer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {brewer.recipes.map((rec) => {
                    const isRecActive = currentRecipe.id === rec.id && currentBrewer.id === brewer.id;
                    return (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => handleSelect(brewer, rec)}
                        className={`p-2.5 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                          isRecActive
                            ? 'bg-zinc-200 dark:bg-zinc-800 border-zinc-500 text-zinc-900 dark:text-white shadow-sm'
                            : 'bg-white dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold truncate">
                              {lang === 'hu' ? rec.nameHu : rec.nameEn}
                            </span>
                            {rec.tag && (
                              <span className="text-[11px] px-1 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-amber-700 dark:text-amber-400 font-mono">
                                {rec.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 block truncate">
                            {rec.creatorEn} • 1:{rec.defaultRatio}
                          </span>
                        </div>
                        {isRecActive && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
