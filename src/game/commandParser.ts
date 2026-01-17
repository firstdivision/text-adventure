import type { ParsedCommand } from '../types/game';

/**
 * Parser for user text adventure commands
 * Handles commands like: go east, look at X, take X, drop X, etc.
 */

const DIRECTIONS = ['north', 'south', 'east', 'west', 'up', 'down', 'n', 's', 'e', 'w', 'u', 'd'];

const DIRECTION_ALIASES: Record<string, string> = {
  'n': 'north',
  's': 'south',
  'e': 'east',
  'w': 'west',
  'u': 'up',
  'd': 'down',
};

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);

  if (parts.length === 0) {
    return { type: 'unknown', rawInput: input };
  }

  const firstWord = parts[0];

  // Handle "go" command
  if (firstWord === 'go') {
    const direction = parts[1] || '';
    if (direction) {
      const normalized = DIRECTION_ALIASES[direction] || direction;
      return {
        type: 'go',
        direction: normalized,
        rawInput: input,
      };
    }
  }

  // Handle direction shortcuts (just typing "north" instead of "go north")
  // Accept both standard directions and custom adventure directions
  const normalized = DIRECTION_ALIASES[firstWord] || firstWord;
  if (DIRECTIONS.includes(normalized)) {
    return {
      type: 'go',
      direction: normalized,
      rawInput: input,
    };
  }

  // Handle "look" command
  if (firstWord === 'look' || firstWord === 'l') {
    const rest = parts.slice(1).join(' ');
    
    // "look at X" or just "look"
    if (rest.startsWith('at ')) {
      const objectName = rest.slice(3).trim();
      return {
        type: 'examine',
        objectName,
        rawInput: input,
      };
    } else if (rest) {
      return {
        type: 'examine',
        objectName: rest,
        rawInput: input,
      };
    }
    
    return { type: 'look', rawInput: input };
  }

  // Handle "examine" command
  if (firstWord === 'examine' || firstWord === 'x') {
    const objectName = parts.slice(1).join(' ').trim();
    return {
      type: 'examine',
      objectName,
      rawInput: input,
    };
  }

  // Handle "take" command
  if (firstWord === 'take' || firstWord === 'get') {
    const objectName = parts.slice(1).join(' ').trim();
    return {
      type: 'take',
      objectName,
      rawInput: input,
    };
  }

  // Handle "drop" command
  if (firstWord === 'drop') {
    const objectName = parts.slice(1).join(' ').trim();
    return {
      type: 'drop',
      objectName,
      rawInput: input,
    };
  }

  // Handle "inventory" command
  if (firstWord === 'inventory' || firstWord === 'inv' || firstWord === 'i') {
    return { type: 'inventory', rawInput: input };
  }

  // Handle "read" command
  if (firstWord === 'read') {
    const objectName = parts.slice(1).join(' ').trim();
    return {
      type: 'read',
      objectName,
      rawInput: input,
    };
  }

  // Handle "help" command
  if (firstWord === 'help' || firstWord === '?') {
    return { type: 'help', rawInput: input };
  }

  // Handle "exit" command
  if (firstWord === 'exit' || firstWord === 'quit') {
    return { type: 'exit', rawInput: input };
  }

  return { type: 'unknown', rawInput: input };
}
