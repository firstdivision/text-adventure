# Building Text Adventures

This guide explains how to create new text adventures for the Text Adventure Game framework.

## Core Concepts

The framework is built around a few key concepts:

- **Rooms**: Locations where the player can be. Each room has a description, objects, and exits to other rooms.
- **Game Objects**: Items that can exist in a room or inventory. They can be pickable, readable, or examinable.
- **Exits**: Connections between rooms. Exits can be hidden or require items to use.
- **Adventures**: A collection of rooms and objects that form a complete story.

## Creating Your First Adventure

### 1. Define the Data Structure

Start by creating a new file in `src/adventures/` (e.g., `myAdventure.ts`):

```typescript
import { Adventure } from '../types/game';

export const myAdventure: Adventure = {
  id: 'my-adventure-id',
  title: 'My Adventure Title',
  description: 'A brief description of your adventure',
  startingRoomId: 'starting-room-id',
  rooms: [
    // Your rooms go here
  ],
};
```

### 2. Add Rooms

Each room needs:
- `id`: Unique identifier
- `title`: Display name
- `description`: Atmospheric description shown to the player
- `exits`: Array of directions the player can go
- `objects`: Array of items in the room
- `features`: (Optional) Non-interactive descriptions of room features

```typescript
{
  id: 'library',
  title: 'The Library',
  description: 'You stand in a vast library. Books line every wall. A librarian sits at a desk.',
  features: [
    'towering bookshelves',
    'wooden reading tables',
  ],
  exits: [
    {
      direction: 'north',
      targetRoomId: 'hallway',
      description: 'to the hallway',
    },
    {
      direction: 'east',
      targetRoomId: 'vault',
      blockedMessage: 'The vault is locked. You need a key.',
      requiresItem: 'brass-key',
    },
  ],
  objects: [
    {
      id: 'book',
      name: 'ancient book',
      description: 'A very old book sits on a table.',
      isPickupable: true,
      isExaminable: true,
      examinationText: 'The book is bound in leather with strange symbols...',
    },
  ],
}
```

### 3. Add Game Objects

Objects can have different properties depending on what you want:

```typescript
{
  id: 'key',
  name: 'brass key',
  description: 'A small brass key lies on the floor.',
  
  // Make it pickupable
  isPickupable: true,
  
  // Make it examinable with detailed text
  isExaminable: true,
  examinationText: 'A small brass key with intricate engravings.',
  
  // Make it readable (for scrolls, notes, etc.)
  isReadable: true,
  readableText: 'The key has an inscription: "For those who seek truth"',
}
```

#### Advanced: Revealing Hidden Exits

Objects can reveal hidden exits when examined. This is perfect for puzzles where players discover secret doors:

```typescript
{
  id: 'mirror',
  name: 'ornate mirror',
  description: 'A mysterious mirror hangs on the wall.',
  isExaminable: true,
  examinationText: 'The mirror shows something impossible - a door that isn\'t there!',
  
  // Reveal a hidden exit when examined
  revealsHiddenExit: {
    direction: 'west',
    revealMessage: '✨ A hidden doorway becomes visible!',
  },
}
```

When players examine this object, the hidden exit will be permanently revealed and they can navigate to it.

### 4. Create Meaningful Exits

Exits can be simple or complex:

**Simple Exit:**
```typescript
{
  direction: 'north',
  targetRoomId: 'next-room-id',
  description: 'to the next room',
}
```

**Hidden Exit:**
```typescript
{
  direction: 'secret',
  targetRoomId: 'hidden-room',
  isHidden: true, // Won't show in room description
}
```

**Exit Requiring an Item:**
```typescript
{
  direction: 'south',
  targetRoomId: 'locked-room',
  requiresItem: 'key-id',
  blockedMessage: 'The door is locked. You need a key.',
}
```

## Player Commands

Players can use these commands in your adventure:

```
go [direction]     - Move in a direction (north, south, east, west, up, down, etc.)
look               - View the current room description
examine [object]   - Look closely at an object (or "x [object]")
take [object]      - Pick up an item (or "get [object]")
drop [object]      - Drop an item from inventory
inventory          - View items you're carrying (or "inv" or "i")
read [object]      - Read a readable object
help               - Show command help
```

## Best Practices

### 1. Create an Engaging Narrative

```typescript
description: 'Dust particles drift through beams of golden sunlight. The smell of old paper and leather fills the air. You feel a sense of timelessness in this place.'
```

vs

```typescript
description: 'This is a library.'
```

### 2. Make Objects Interactive

Combine `isPickupable`, `isExaminable`, and `isReadable` to create rich interactions:

```typescript
{
  id: 'note',
  name: 'hastily written note',
  description: 'A crumpled piece of paper sits on the table.',
  isPickupable: true,
  isReadable: true,
  isExaminable: true,
  readableText: 'The note reads: "Room 7. Midnight."',
  examinationText: 'The paper is recent, written in a shaky hand.',
}
```

### 3. Use Exits for Pacing

Guide players through your story with well-described exits:

```typescript
{
  direction: 'forward',
  targetRoomId: 'climax',
  description: 'through the grand doors to the chamber beyond',
}
```

### 4. Create Bottlenecks with Items

Use item requirements to gate progression:

```typescript
{
  direction: 'down',
  targetRoomId: 'basement',
  requiresItem: 'torch',
  blockedMessage: 'It\'s too dark. You need something to light the way.',
}
```

## Using Your Adventure

1. Import your adventure in `src/components/Game.tsx`:

```typescript
import { myAdventure } from '../adventures/myAdventure';
```

2. Replace `lostLibraryAdventure` with your adventure:

```typescript
const [gameState, setGameState] = useState<GameState>(() =>
  createGameState(myAdventure)
);
```

## Example Adventure Structure

```typescript
export const exampleAdventure: Adventure = {
  id: 'example',
  title: 'An Example',
  description: 'A simple adventure to get started',
  startingRoomId: 'room1',
  rooms: [
    {
      id: 'room1',
      title: 'Starting Room',
      description: 'You are in a simple room.',
      exits: [
        { direction: 'east', targetRoomId: 'room2' },
      ],
      objects: [],
    },
    {
      id: 'room2',
      title: 'Second Room',
      description: 'You are in another room.',
      exits: [
        { direction: 'west', targetRoomId: 'room1' },
      ],
      objects: [
        {
          id: 'item1',
          name: 'some object',
          description: 'An object is here.',
          isPickupable: true,
        },
      ],
    },
  ],
};
```

## Tips for Great Adventures

1. **Test thoroughly** - Try all paths, pick up/drop items, check for missing exits
2. **Write vivid descriptions** - The description is everything in a text adventure
3. **Hide surprises** - Use hidden exits, secret rooms, and unexpected items
4. **Create challenges** - Use locked doors and item requirements to create puzzles
5. **Provide feedback** - Always tell the player what happened when they act
6. **Guide players gently** - Include hints in room descriptions and NPCs' words
7. **Make items count** - Every item should be discoverable and useful

## Adding Your Adventure to the Game Menu

Once you're happy with your adventure, you can create a menu system to let players choose which adventure to play. This would involve:

1. Creating a menu component
2. Managing adventure selection in App.tsx
3. Displaying available adventures

This is left as a future enhancement!
