// src/interfaces/GameTypes.ts

export interface EmpireResources {
  gold: number;
  food: number;
  timber: number;
  bricks: number;
  population: number;
  loyalty: number; // 0 to 100
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
