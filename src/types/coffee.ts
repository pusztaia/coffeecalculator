export type BrewerId = 
  | 'aeropress' 
  | 'aeropress-inverted'
  | 'moka-pot' 
  | 'v60' 
  | 'french-press' 
  | 'espresso'
  | 'chemex'
  | 'cold-brew';

export type WeightUnit = 'g' | 'oz';
export type VolumeUnit = 'ml' | 'g' | 'floz';
export type TempUnit = 'C' | 'F';

export type Strength = 'mild' | 'balanced' | 'strong' | 'concentrate';

export type RoastLevel = 'light' | 'medium' | 'dark';

export type GrindSize = 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

export interface MokaPotSize {
  cups: number;
  label: string;
  coffeeGrams: number; // typical basket capacity
  waterMl: number;     // boiler water to safety valve
  yieldMl: number;     // typical coffee yield
}

export interface BrewStep {
  timeSec: number;     // duration or target timestamp in seconds
  titleEn: string;
  titleHu: string;
  descEn: string;
  descHu: string;
  waterTarget?: number; // target cumulative water if applicable
}

export interface Recipe {
  id: string;
  nameEn: string;
  nameHu: string;
  creatorEn: string;
  creatorHu: string;
  descEn: string;
  descHu: string;
  defaultRatio: number;   // e.g. 15 for 1:15, or 8 for 1:8
  minRatio: number;
  maxRatio: number;
  defaultCoffee: number;  // grams
  defaultWater: number;   // grams
  recommendedTempC: number;
  grindSize: GrindSize;
  brewTimeSec: number;
  steps: BrewStep[];
  tag?: string;
}

export interface Brewer {
  id: BrewerId;
  nameEn: string;
  nameHu: string;
  category: 'immersion' | 'stovetop' | 'pourover' | 'espresso' | 'cold';
  subtitleEn: string;
  subtitleHu: string;
  defaultRatio: number;
  minRatio: number;
  maxRatio: number;
  defaultCoffee: number;
  defaultWater: number;
  defaultGrind: GrindSize;
  tempRangeC: [number, number];
  recipes: Recipe[];
}

export type DisplayField = 'coffee' | 'water';

export type ThemeColor = 'amber' | 'cyan' | 'emerald' | 'white';

export interface AppSettings {
  weightUnit: WeightUnit;
  volumeUnit: VolumeUnit;
  tempUnit: TempUnit;
  soundEnabled: boolean;
  themeColor: ThemeColor;
  darkMode: boolean;
  lang: 'hu' | 'en';
}
