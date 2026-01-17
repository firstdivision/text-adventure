import React, { useState, useCallback } from 'react';
import { GameDisplay, CommandInput } from './GameComponents';
import { createGameState, executeCommand } from '../game/engine';
import type { GameState } from '../types/game';
import { lostLibraryAdventure } from '../adventures/lostLibrary';
import '../styles/Game.css';

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() =>
    createGameState(lostLibraryAdventure)
  );

  const handleCommand = useCallback((command: string) => {
    setGameState((prevState) => executeCommand(prevState, command));
  }, []);

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>🏛️ Text Adventure Game</h1>
        <p className="subtitle">{gameState.currentAdventure.title}</p>
      </header>

      <main className="game-main">
        <div className="game-content">
          <GameDisplay gameState={gameState} />
        </div>
      </main>

      <footer className="game-footer">
        <CommandInput onCommand={handleCommand} disabled={gameState.gameOver || gameState.gameWon} />
      </footer>
    </div>
  );
};
