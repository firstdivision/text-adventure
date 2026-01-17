# Text Adventure Framework - Quick Reference

## Player Commands Cheat Sheet

| Command | Aliases | Example | Purpose |
|---------|---------|---------|---------|
| `go [direction]` | - | `go north`, `north`, `n` | Move in a direction |
| `look` | - | `look` | View current room |
| `examine [obj]` | `x [obj]` | `examine key`, `x bookcase` | Inspect an object |
| `take [obj]` | `get [obj]` | `take key`, `get torch` | Pick up an item |
| `drop [obj]` | - | `drop key` | Drop from inventory |
| `inventory` | `inv`, `i` | `inventory` | View what you carry |
| `read [obj]` | - | `read note` | Read readable items |
| `help` | `?` | `help` | Show command help |

## Directions

### Cardinal Directions
- `north`, `n` - Go north
- `south`, `s` - Go south
- `east`, `e` - Go east
- `west`, `w` - Go west

### Vertical Directions
- `up`, `u` - Go up
- `down`, `d` - Go down

### Other Directions
- `forward`, `backward`, `left`, `right`, etc. (adventure-specific)

## Adventure Structure (TypeScript)

```typescript
const adventure: Adventure = {
  id: 'unique-id',
  title: 'Adventure Title',
  description: 'Short description',
  startingRoomId: 'first-room-id',
  rooms: [
    // Room definitions
  ],
};
```

## Room Template

```typescript
{
  id: 'room-id',
  title: 'Room Title',
  description: 'Detailed description players see',
  features: ['feature1', 'feature2'],  // Optional
  exits: [
    { direction: 'north', targetRoomId: 'next-room' },
    // More exits...
  ],
  objects: [
    // Object definitions
  ],
}
```

## Object Types

### Basic Object
```typescript
{
  id: 'obj-id',
  name: 'object name',
  description: 'What player sees',
}
```

### Pickupable Object
```typescript
{
  id: 'key',
  name: 'brass key',
  description: 'A small brass key sits here.',
  isPickupable: true,
}
```

### Examinable Object
```typescript
{
  id: 'desk',
  name: 'wooden desk',
  description: 'A sturdy wooden desk.',
  isExaminable: true,
  examinationText: 'Detailed examination text...',
}
```

### Object that Reveals Hidden Exit
```typescript
{
  id: 'mirror',
  name: 'ornate mirror',
  description: 'A mysterious mirror.',
  isExaminable: true,
  examinationText: 'The mirror reveals a hidden passage!',
  revealsHiddenExit: {
    direction: 'west',
    revealMessage: 'A doorway to the west becomes visible!',
  },
}
```

### Readable Object
```typescript
{
  id: 'note',
  name: 'scribbled note',
  description: 'A hastily written note.',
  isReadable: true,
  readableText: 'The note says: "Meet me at midnight"',
}
```

### Complex Object
```typescript
{
  id: 'artifact',
  name: 'ancient artifact',
  description: 'A mysterious ancient artifact.',
  isPickupable: true,
  isExaminable: true,
  isReadable: true,
  readableText: 'Inscriptions tell an ancient tale...',
  examinationText: 'It glows faintly with inner light...',
}
```

## Exit Types

### Simple Exit
```typescript
{
  direction: 'north',
  targetRoomId: 'next-room-id',
}
```

### Exit with Description
```typescript
{
  direction: 'east',
  targetRoomId: 'treasury',
  description: 'through ornate doors',
}
```

### Hidden Exit
```typescript
{
  direction: 'secret',
  targetRoomId: 'hidden-room',
  isHidden: true,  // Won't show in "look"
}
```

### Locked Exit
```typescript
{
  direction: 'south',
  targetRoomId: 'vault',
  requiresItem: 'brass-key',
  blockedMessage: 'The door is locked. You need a key.',
}
```

## File Organization

```
src/
  components/          # React UI components
    Game.tsx           # Main game container
    GameComponents.tsx # Reusable components
  
  game/               # Game logic
    engine.ts         # State management & commands
    commandParser.ts  # Input parsing
  
  types/              # TypeScript definitions
    game.ts           # All interfaces
  
  adventures/         # Story definitions
    lostLibrary.ts    # Sample adventure
    myAdventure.ts    # Your adventure here
  
  styles/             # CSS
    Game.css          # Game UI styles
  
  App.tsx             # App entry point
  main.tsx            # React DOM render
```

## Development Workflow

1. **Create Adventure**
   ```bash
   # Create src/adventures/myAdventure.ts
   ```

2. **Load in Game Component**
   ```typescript
   // src/components/Game.tsx
   import { myAdventure } from '../adventures/myAdventure';
   
   const [gameState, setGameState] = useState<GameState>(() =>
     createGameState(myAdventure)
   );
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Play & Test**
   - Try all commands
   - Check all paths
   - Test item gates
   - Verify descriptions

5. **Build & Deploy**
   ```bash
   npm run build
   ```

## Quick Tips

✅ **DO:**
- Write vivid, atmospheric descriptions
- Use objects to tell your story
- Create puzzles with item requirements
- Test every path and command
- Use hidden exits for secrets
- Combine multiple interaction types on objects

❌ **DON'T:**
- Make the first puzzle unsolvable
- Leave players stranded with no exits
- Use overly complicated descriptions
- Forget to make items examinable
- Create dead ends (unless intentional)

## Object Property Reference

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `id` | string | required | Unique identifier |
| `name` | string | required | Display name |
| `description` | string | required | What player sees |
| `isPickupable` | boolean | false | Can be taken |
| `isExaminable` | boolean | false | Can be examined |
| `examinationText` | string | - | Details when examined |
| `isReadable` | boolean | false | Can be read |
| `readableText` | string | - | Text when read |
| `revealsHiddenExit` | object | - | Reveals a hidden exit when examined |
| `revealsHiddenExit.direction` | string | - | Direction of exit to reveal |
| `revealsHiddenExit.revealMessage` | string | default | Message shown when revealed |

## Example: Create a Simple Room

```typescript
{
  id: 'cottage',
  title: 'Cozy Cottage',
  description: 'You stand in a small cottage with a warm fireplace.',
  features: ['crackling fireplace', 'wooden furniture'],
  exits: [
    { direction: 'outside', targetRoomId: 'garden' },
  ],
  objects: [
    {
      id: 'diary',
      name: 'old diary',
      description: 'A leather-bound diary sits on the table.',
      isPickupable: true,
      isReadable: true,
      readableText: 'The diary contains memories of adventures long past...',
    },
    {
      id: 'box',
      name: 'wooden box',
      description: 'A mysterious box sits in the corner.',
      isExaminable: true,
      examinationText: 'The box is locked tight.',
    },
  ],
}
```

## Common Patterns

### Puzzle: Item-Gated Room
```typescript
{
  direction: 'down',
  targetRoomId: 'dungeon',
  requiresItem: 'torch',
  blockedMessage: 'It\'s too dark to go down. You need a light.',
}
```

### Puzzle: Find & Solve
1. Room has object with clue → `read` or `examine`
2. Clue points to item needed
3. Player gets item, uses it to progress

### Puzzle: Sequential Exploration
1. First room has objects and exits
2. Each room adds more context/items
3. Final room provides resolution

## Performance Tips

- Keep descriptions reasonably sized
- Don't create unnecessary nested rooms
- Use descriptive object IDs (helps debugging)
- Test with many items in inventory
- Compile with `npm run build` before deployment

## Debugging Tips

- Check console for TypeScript errors
- Verify object and room IDs are unique
- Ensure all `targetRoomId` values exist
- Test each exit with and without items
- Check that `starting RoomId` exists
- Look for typos in direction names

---

**See full documentation in:**
- `README.md` - Main project guide
- `BUILDING_ADVENTURES.md` - Detailed adventure creation
- `IMPLEMENTATION.md` - Technical details
