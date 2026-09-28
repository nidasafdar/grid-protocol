// src/interfaces/GameTypes.ts

export interface EmpireResources {
  gold: number;
  food: number;
  timber: number;
  bricks: number;
  stone: number;
  iron: number;
  pitch: number;
  population: number;
  loyalty: number; // 0 to 100
  popularity: number; // Stronghold Popularity Meter 0 to 100 (Campfire threshold: 50)
}

export type RationLevel = 'none' | 'half' | 'normal' | 'double' | 'extra';

export interface FoodStocks {
  bread: number;
  apples: number;
  cheese: number;
  meat: number;
}

export interface PopularityState {
  score: number; // 0 to 100
  rationLevel: RationLevel;
  rationModifier: number; // -8 to +8
  diversityModifier: number; // +1 to +4
  taxRate: number; // -24 to +16
  aleBonus: number; // 0 to +8
  religionBonus: number; // 0 to +8
  fearFactor: number; // -5 to +5 (Bad Things vs Good Things)
  scribeQuote: string;
}

export interface ArmoryState {
  bows: number;
  crossbows: number;
  spears: number;
  pikes: number;
  maces: number;
  swords: number;
  leatherArmor: number;
  plateArmor: number;
}

export interface MilitaryRoster {
  spearmen: number;
  archers: number;
  crossbowmen: number;
  macemen: number;
  pikemen: number;
  swordsmen: number;
  knights: number;
  engineers: number;
}

export interface SiegeDefenseState {
  pitchDitches: number;
  pitchIgnited: boolean;
  boilingOilReady: number;
  batteringRams: number;
  catapults: number;
  trebuchets: number;
}

export type LivestockKind = 'goats' | 'cows' | 'horses';

export interface LivestockData {
  kind: LivestockKind;
  name: string;
  count: number;
  baseCost: number;
  doublingMinutes: number; // Goats: 10, Cows: 15, Horses: 20
  nextDoublingSeconds: number;
  yieldDescription: string;
}

export interface KingState {
  name: string;
  faction: string;
  healthPercent: number; // 0 to 100%
  isUnderAttack: boolean;
  isRescued: boolean;
  hospitalActive: boolean;
}

export interface MarketCommodity {
  id: string;
  name: string;
  icon: string;
  basePrice: number;
  multiplier: number; // e.g. 1.4 for +140%, up to 5.0 for 500%
}

export interface BiomeRegion {
  id: string;
  name: string;
  areaKm2: number;
  primaryColor: number;
  accentColor: number;
  resources: string[];
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
