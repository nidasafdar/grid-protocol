// src/interfaces/GameTypes.ts

export interface Mission {
    id: number;
    title: string;
    instructions: string;
    timeLimit: number;
    targetScore: number;
}
