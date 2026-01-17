import type {
  GameState,
  Adventure,
  GameMessage,
  ParsedCommand,
} from '../types/game';
import { parseCommand } from './commandParser';

/**
 * Core game engine for managing state and executing commands
 */

const HELP_TEXT = `
Available Commands:
  go [direction]           - Move in a direction (or just type the direction)
                            Directions: north/n, south/s, east/e, west/w, up/u, down/d
  look (l)                - Examine the current room
  examine [object] (x)    - Examine an object in detail
  take [object] (get)     - Pick up an item
  drop [object]           - Drop an item from inventory
  inventory (i, inv)      - Check what you're carrying
  read [object]           - Read a readable object
  help (?)                - Show this help message
`;

export function createGameState(adventure: Adventure): GameState {
  return {
    currentAdventure: adventure,
    currentRoomId: adventure.startingRoomId,
    inventory: [],
    visitedRoomIds: new Set([adventure.startingRoomId]),
    gameHistory: [
      {
        type: 'system',
        text: `Welcome to ${adventure.title}!\n\nType "help" at any time for a list of commands.`,
        timestamp: Date.now(),
      },
      {
        type: 'system',
        text: HELP_TEXT,
        timestamp: Date.now(),
      },
    ],
    gameOver: false,
    gameWon: false,
  };
}

export function getCurrentRoom(state: GameState) {
  return state.currentAdventure.rooms.find((r) => r.id === state.currentRoomId);
}

export function executeCommand(state: GameState, input: string): GameState {
  if (state.gameOver || state.gameWon) {
    return addMessage(state, 'system', 'Game has ended. Please refresh to restart.');
  }

  const command = parseCommand(input);
  let newState = { ...state };

  switch (command.type) {
    case 'go':
      newState = handleGoCommand(newState, command);
      break;
    case 'look':
      newState = handleLookCommand(newState);
      break;
    case 'examine':
      newState = handleExamineCommand(newState, command);
      break;
    case 'take':
      newState = handleTakeCommand(newState, command);
      break;
    case 'drop':
      newState = handleDropCommand(newState, command);
      break;
    case 'inventory':
      newState = handleInventoryCommand(newState);
      break;
    case 'read':
      newState = handleReadCommand(newState, command);
      break;
    case 'help':
      newState = addMessage(newState, 'system', HELP_TEXT);
      break;
    case 'unknown':
      newState = addMessage(newState, 'error', `I don't understand "${command.rawInput}". Type "help" for commands.`);
      break;
  }

  return newState;
}

function handleGoCommand(state: GameState, command: ParsedCommand): GameState {
  const direction = command.direction || '';
  const currentRoom = getCurrentRoom(state);

  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  const exit = currentRoom.exits.find(
    (e) => e.direction.toLowerCase() === direction.toLowerCase()
  );

  if (!exit) {
    return addMessage(state, 'error', `You can't go ${direction} from here.`);
  }

  if (exit.isHidden) {
    return addMessage(state, 'error', `You can't go ${direction} from here.`);
  }

  if (exit.requiresItem) {
    const hasItem = state.inventory.some((obj) => obj.id === exit.requiresItem);
    if (!hasItem) {
      return addMessage(
        state,
        'error',
        exit.blockedMessage || `You need something to go ${direction}.`
      );
    }
  }

  let newState = { ...state };
  newState.currentRoomId = exit.targetRoomId;
  newState.visitedRoomIds.add(exit.targetRoomId);

  const targetRoom = getCurrentRoom(newState);
  if (targetRoom) {
    let description = `\n=== ${targetRoom.title} ===\n${targetRoom.description}`;

    if (targetRoom.objects && targetRoom.objects.length > 0) {
      description += '\n\nYou can see:';
      targetRoom.objects.forEach((obj) => {
        description += `\n  - ${obj.name}`;
      });
    }

    if (targetRoom.features && targetRoom.features.length > 0) {
      description += '\n\nYou notice:';
      targetRoom.features.forEach((feature) => {
        description += `\n  - ${feature}`;
      });
    }

    if (targetRoom.exits && targetRoom.exits.length > 0) {
      description += '\n\nExits:';
      targetRoom.exits
        .filter((e) => !e.isHidden)
        .forEach((exit) => {
          const desc = exit.description || `(${exit.direction})`;
          description += `\n  - ${exit.direction}: ${desc}`;
        });
    }

    newState = addMessage(newState, 'narration', description);
  }

  return newState;
}

function handleLookCommand(state: GameState): GameState {
  const currentRoom = getCurrentRoom(state);

  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  let description = `\n=== ${currentRoom.title} ===\n${currentRoom.description}`;

  if (currentRoom.objects && currentRoom.objects.length > 0) {
    description += '\n\nYou can see:';
    currentRoom.objects.forEach((obj) => {
      description += `\n  - ${obj.name}`;
    });
  }

  if (currentRoom.features && currentRoom.features.length > 0) {
    description += '\n\nYou notice:';
    currentRoom.features.forEach((feature) => {
      description += `\n  - ${feature}`;
    });
  }

  if (currentRoom.exits && currentRoom.exits.length > 0) {
    description += '\n\nExits:';
    currentRoom.exits
      .filter((e) => !e.isHidden)
      .forEach((exit) => {
        const desc = exit.description || `(${exit.direction})`;
        description += `\n  - ${exit.direction}: ${desc}`;
      });
  }

  return addMessage(state, 'narration', description);
}

function handleExamineCommand(state: GameState, command: ParsedCommand): GameState {
  if (!command.objectName) {
    return addMessage(state, 'error', 'Examine what?');
  }

  const currentRoom = getCurrentRoom(state);
  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  const objectName = command.objectName.toLowerCase();

  // Look in room objects
  const roomObject = currentRoom.objects.find(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (roomObject) {
    if (!roomObject.isExaminable) {
      return addMessage(state, 'error', `You can't examine the ${roomObject.name}.`);
    }
    const text = roomObject.examinationText || roomObject.description;
    let newState = addMessage(state, 'narration', text);

    // Reveal hidden exits if this object has that property
    if (roomObject.revealsHiddenExit) {
      newState = revealHiddenExit(newState, roomObject.revealsHiddenExit);
    }

    return newState;
  }

  // Look in inventory
  const inventoryObject = state.inventory.find(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (inventoryObject) {
    if (!inventoryObject.isExaminable) {
      return addMessage(state, 'error', `You can't examine the ${inventoryObject.name}.`);
    }
    const text = inventoryObject.examinationText || inventoryObject.description;
    let newState = addMessage(state, 'narration', text);

    // Reveal hidden exits if this object has that property
    if (inventoryObject.revealsHiddenExit) {
      newState = revealHiddenExit(newState, inventoryObject.revealsHiddenExit);
    }

    return newState;
  }

  return addMessage(state, 'error', `You don't see the ${command.objectName} here.`);
}

function revealHiddenExit(
  state: GameState,
  exitReveal: { direction: string; revealMessage?: string }
): GameState {
  const currentRoom = getCurrentRoom(state);
  if (!currentRoom) return state;

  const exitIndex = currentRoom.exits.findIndex(
    (e) => e.direction.toLowerCase() === exitReveal.direction.toLowerCase()
  );

  if (exitIndex === -1) return state;

  const exit = currentRoom.exits[exitIndex];
  if (!exit.isHidden) return state;

  // Create new state with the exit unhidden
  let newState = { ...state };
  newState.currentAdventure = {
    ...newState.currentAdventure,
    rooms: newState.currentAdventure.rooms.map((room) => {
      if (room.id === currentRoom.id) {
        return {
          ...room,
          exits: room.exits.map((e, i) => {
            if (i === exitIndex) {
              return { ...e, isHidden: false };
            }
            return e;
          }),
        };
      }
      return room;
    }),
  };

  // Add a message about the revelation
  const revealMsg =
    exitReveal.revealMessage ||
    `A previously hidden exit to the ${exitReveal.direction} has been revealed!`;
  newState = addMessage(newState, 'system', revealMsg);

  return newState;
}

function handleTakeCommand(state: GameState, command: ParsedCommand): GameState {
  if (!command.objectName) {
    return addMessage(state, 'error', 'Take what?');
  }

  const currentRoom = getCurrentRoom(state);
  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  const objectName = command.objectName.toLowerCase();
  const objectIndex = currentRoom.objects.findIndex(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (objectIndex === -1) {
    return addMessage(state, 'error', `You don't see the ${command.objectName} here.`);
  }

  const object = currentRoom.objects[objectIndex];

  if (!object.isPickupable) {
    return addMessage(state, 'error', `You can't take the ${object.name}.`);
  }

  let newState = { ...state };
  newState.currentAdventure = {
    ...newState.currentAdventure,
    rooms: newState.currentAdventure.rooms.map((room) => {
      if (room.id === currentRoom.id) {
        return {
          ...room,
          objects: room.objects.filter((_, i) => i !== objectIndex),
        };
      }
      return room;
    }),
  };

  newState.inventory = [...newState.inventory, object];
  newState = addMessage(newState, 'success', `You take the ${object.name}.`);

  return newState;
}

function handleDropCommand(state: GameState, command: ParsedCommand): GameState {
  if (!command.objectName) {
    return addMessage(state, 'error', 'Drop what?');
  }

  const objectName = command.objectName.toLowerCase();
  const objectIndex = state.inventory.findIndex(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (objectIndex === -1) {
    return addMessage(state, 'error', `You don't have the ${command.objectName}.`);
  }

  const object = state.inventory[objectIndex];
  const currentRoom = getCurrentRoom(state);

  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  let newState = { ...state };
  newState.inventory = newState.inventory.filter((_, i) => i !== objectIndex);
  newState.currentAdventure = {
    ...newState.currentAdventure,
    rooms: newState.currentAdventure.rooms.map((room) => {
      if (room.id === currentRoom.id) {
        return {
          ...room,
          objects: [...room.objects, object],
        };
      }
      return room;
    }),
  };

  newState = addMessage(newState, 'success', `You drop the ${object.name}.`);

  return newState;
}

function handleInventoryCommand(state: GameState): GameState {
  if (state.inventory.length === 0) {
    return addMessage(state, 'narration', "You're not carrying anything.");
  }

  let message = 'You are carrying:\n';
  state.inventory.forEach((item) => {
    message += `  - ${item.name}\n`;
  });

  return addMessage(state, 'narration', message);
}

function handleReadCommand(state: GameState, command: ParsedCommand): GameState {
  if (!command.objectName) {
    return addMessage(state, 'error', 'Read what?');
  }

  const currentRoom = getCurrentRoom(state);
  if (!currentRoom) {
    return addMessage(state, 'error', 'Error: Current room not found.');
  }

  const objectName = command.objectName.toLowerCase();

  // Look in room objects
  const roomObject = currentRoom.objects.find(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (roomObject) {
    if (!roomObject.isReadable) {
      return addMessage(state, 'error', `You can't read the ${roomObject.name}.`);
    }
    const text = roomObject.readableText || roomObject.description;
    return addMessage(state, 'narration', text);
  }

  // Look in inventory
  const inventoryObject = state.inventory.find(
    (obj) => obj.name.toLowerCase() === objectName
  );

  if (inventoryObject) {
    if (!inventoryObject.isReadable) {
      return addMessage(state, 'error', `You can't read the ${inventoryObject.name}.`);
    }
    const text = inventoryObject.readableText || inventoryObject.description;
    return addMessage(state, 'narration', text);
  }

  return addMessage(state, 'error', `You don't see the ${command.objectName} here.`);
}

function addMessage(state: GameState, type: GameMessage['type'], text: string): GameState {
  return {
    ...state,
    gameHistory: [
      ...state.gameHistory,
      {
        type,
        text,
        timestamp: Date.now(),
      },
    ],
  };
}
