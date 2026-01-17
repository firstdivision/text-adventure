# Copilot Instructions

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
- [x] Scaffold the Project
- [x] Customize the Project
- [x] Install Required Extensions
- [x] Compile the Project
- [x] Create and Run Task
- [x] Launch the Project
- [x] Ensure Documentation is Complete

## Project Summary

Text Adventure is a fully-functional React + TypeScript + Vite application for building and playing interactive text-based adventures. The framework makes it easy to create new stories with rooms, objects, and puzzles.

### Core Features
- Complete text adventure game engine with command parser
- Responsive design for desktop and mobile
- Framework for creating new adventures
- Sample "Lost Library" adventure to demonstrate capabilities
- Type-safe TypeScript implementation

### Architecture
- **Game Engine** (`src/game/engine.ts`) - Core gameplay logic
- **Command Parser** (`src/game/commandParser.ts`) - Natural language input handling
- **React Components** (`src/components/`) - UI for game display and inventory
- **Type Definitions** (`src/types/game.ts`) - Game data structures
- **Adventures** (`src/adventures/`) - Story definitions

### How to Get Started
1. Run `npm run dev` to start the development server
2. Try commands like "go north", "look", "take key", "examine bookcase"
3. See `BUILDING_ADVENTURES.md` for creating new adventures

### Next Steps for Expansion
- Create new adventure files in `src/adventures/`
- Add adventure selection menu in UI
- Implement save/load functionality
- Add NPC dialogue system
- Extend command parser for new actions
