// src/interfaces/GameTypes.ts

export interface Mission {
  id: number;
  title: string;
  instructions: string;
  timeLimit: number;
  targetScore: number;
}

export interface PlayerCoordinates {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

export interface SuitSlot {
  id: string;
  name: string;
  item: string;
  equipped: boolean;
}

export type GamePhase = 'BRIEFING' | 'PLAYING' | 'INVENTORY' | 'MISSION_CLEAR' | 'MISSION_FAILED';
