/**
 * Core types for the text adventure game framework
 */

export interface GameObject {
  id: string;
  name: string;
  description: string;
  aliases?: string[];
  isReadable?: boolean;
  readableText?: string;
  isPickupable?: boolean;
  isExaminable?: boolean;
  examinationText?: string;
  isWinTrigger?: boolean;
  revealsHiddenExit?: {
    direction: string;
    revealMessage?: string;
  };
}

export interface Exit {
  direction: string;
  targetRoomId: string;
  description?: string;
  isHidden?: boolean;
  requiresItem?: string; // item id required to use this exit
  blockedMessage?: string;
}

export interface GameFeature {
  name: string;
  aliases?: string[];
  examinationText?: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  exits: Exit[];
  objects: GameObject[];
  features?: (string | GameFeature)[]; // descriptions of features that can't be picked up
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  startingRoomId: string;
  rooms: Room[];
}

export interface GameState {
  currentAdventure: Adventure;
  currentRoomId: string;
  inventory: GameObject[];
  visitedRoomIds: Set<string>;
  gameHistory: GameMessage[];
  gameOver: boolean;
  gameWon: boolean;
  exited: boolean;
}

export interface GameMessage {
  type: 'narration' | 'system' | 'error' | 'success';
  text: string;
  timestamp: number;
}

export type CommandType = 'go' | 'look' | 'take' | 'drop' | 'inventory' | 'examine' | 'read' | 'help' | 'exit' | 'unknown';

export interface ParsedCommand {
  type: CommandType;
  direction?: string;
  objectName?: string;
  rawInput: string;
}
