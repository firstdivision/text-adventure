# Text Adventure Game Framework

A fully-functional React + TypeScript + Vite application for creating and playing interactive text-based adventures. Built with modern tooling for fast development and a smooth player experience on both desktop and mobile devices.

## Features

✨ **Complete Game Framework**
- Rich text-based adventure gameplay with rooms, objects, and inventory
- Intuitive command system (go, look, take, drop, examine, read, etc.)
- Flexible adventure builder for creating new stories
- Full TypeScript support for type safety

📱 **Responsive Design**
- Works seamlessly on desktop, tablet, and mobile devices
- Touch-friendly command input
- Optimized UI for all screen sizes

🚀 **Developer-Friendly**
- Easy-to-use API for building new adventures
- Modular architecture with clear separation of concerns
- Well-documented framework with examples

## Quick Start

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The game will be available at `http://localhost:5173`

The dev server includes hot module replacement (HMR), so changes will appear instantly.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

### Basic Commands

```
go [direction]     Move in a direction (north, south, east, west, up, down)
look               View the current room description
examine [object]   Look closely at an object (or "x [object]")
take [object]      Pick up an item (or "get [object]")
drop [object]      Drop an item from inventory
inventory          Check what you're carrying (or "inv" or "i")
read [object]      Read a readable object
help               Show all available commands
```

### Example Commands

```
go north
look
examine bookcase
take key
inventory
read note
drop torch
```

## Building Your Own Adventures

The framework makes it easy to create new text adventures. See [BUILDING_ADVENTURES.md](./BUILDING_ADVENTURES.md) for a comprehensive guide.

### Quick Example

1. Create a new adventure file in `src/adventures/`:

```typescript
import type { Adventure } from '../types/game';

export const myAdventure: Adventure = {
  id: 'my-adventure',
  title: 'My Adventure',
  description: 'An exciting tale',
  startingRoomId: 'room1',
  rooms: [
    {
      id: 'room1',
      title: 'A Room',
      description: 'You are in a mysterious room.',
      exits: [
        { direction: 'north', targetRoomId: 'room2' }
      ],
      objects: [
        {
          id: 'key',
          name: 'rusty key',
          description: 'An old key lies on the floor.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'A rusty key with strange symbols.',
        }
      ],
    },
    // Add more rooms...
  ],
};
```

2. Load your adventure in `src/components/Game.tsx`:

```typescript
import { myAdventure } from '../adventures/myAdventure';

// In the Game component:
const [gameState, setGameState] = useState<GameState>(() =>
  createGameState(myAdventure)
);
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool with HMR
- **CSS** - Mobile-responsive styling
- **ESLint** - Code quality

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── Game.tsx       # Main game component
  │   └── GameComponents.tsx  # UI components
  ├── game/              # Game engine
  │   ├── engine.ts      # Core game logic
  │   └── commandParser.ts    # Command parsing
  ├── types/             # TypeScript types
  │   └── game.ts        # Game type definitions
  ├── adventures/        # Adventure definitions
  │   └── lostLibrary.ts # Sample adventure
  ├── styles/            # CSS files
  │   └── Game.css       # Game UI styles
  ├── App.tsx            # App entry point
  ├── App.css            # App styles
  └── main.tsx           # React DOM render
```

## Architecture

The framework consists of several key modules:

### Game Engine (`src/game/engine.ts`)
Manages game state, handles commands, and controls game flow. Uses immutable state updates for predictable behavior.

### Command Parser (`src/game/commandParser.ts`)
Parses user input and converts it into structured commands with semantic meaning.

### Type System (`src/types/game.ts`)
Defines all TypeScript interfaces for adventures, rooms, objects, and game state.

### React Components (`src/components/`)
- `Game.tsx` - Main game container
- `GameComponents.tsx` - Reusable UI components (display, inventory, input)

## Key Concepts

### Rooms
Locations with descriptions, objects, features, and exits to other rooms.

### Objects
Items that can be in rooms or inventories. Support properties like:
- `isPickupable` - Can be taken
- `isExaminable` - Can be examined for details
- `isReadable` - Can be read (books, notes, etc.)

### Exits
Connections between rooms with optional requirements (keys, special items, etc.)

### Adventure
A complete game consisting of rooms, objects, and connections forming a narrative experience.

## Development Guidelines

When building adventures:
- Write vivid, atmospheric room descriptions
- Use objects to create puzzles and challenges
- Hide secrets and special exits
- Provide clear feedback for all player actions
- Test thoroughly - try all paths and edge cases

## Mobile Optimization

The game is fully optimized for mobile devices:
- Responsive layout that adapts to screen size
- Touch-friendly buttons and input fields
- Optimized scrolling and performance
- Viewport height handling for mobile browsers

## Future Enhancements

Potential improvements for future versions:
- Adventure selection menu
- Save/load game progress
- NPCs and dialogue
- Inventory limits and weight system
- Sound effects and music
- More command types (push, pull, use, etc.)
- Achievements and scoring

## Contributing

Feel free to create new adventures and expand the framework! Refer to [BUILDING_ADVENTURES.md](./BUILDING_ADVENTURES.md) for detailed instructions.

## License

This project is open source and available under the MIT License.

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
