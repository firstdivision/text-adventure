import React, { useState, useCallback } from 'react';
import { GameDisplay, CommandInput } from './GameComponents';
import { createGameState, executeCommand } from '../game/engine';
import type { GameState, Adventure } from '../types/game';
import { theHiddenTreasureAdventure } from '../adventures/theHiddenTreasure';
import { theBeachAdventure } from '../adventures/beachAdventure';
import '../styles/Game.css';

const ADVENTURES: Adventure[] = [theHiddenTreasureAdventure, theBeachAdventure];

export const Game: React.FC = () => {
  const [currentAdventure, setCurrentAdventure] = useState<Adventure | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleAdventureStart = (adventure: Adventure) => {
    setCurrentAdventure(adventure);
    setGameState(createGameState(adventure));
  };

  const handleAdventureSelect = (adventure: Adventure) => {
    handleAdventureStart(adventure);
  };

  const handleCommand = useCallback((command: string) => {
    setGameState((prevState) => {
      if (!prevState) return null;
      return executeCommand(prevState, command);
    });
  }, []);

  // Show adventure selection screen if no game is started
  if (!gameState || !currentAdventure) {
    return (
      <div className="game-container">
        <header className="game-header">
          <h1>🏛️ Text Adventure Game</h1>
          <p className="subtitle">Choose Your Adventure</p>
        </header>

        <main className="game-main">
          <div className="adventure-selection-screen">
            <div className="adventure-grid">
              {ADVENTURES.map((adventure) => (
                <div key={adventure.id} className="adventure-card">
                  <h2>{adventure.title}</h2>
                  <p>{adventure.description}</p>
                  <button onClick={() => handleAdventureStart(adventure)} className="start-button">
                    Start Adventure
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>🏛️ Text Adventure Game</h1>
        <p className="subtitle">{gameState.currentAdventure.title}</p>
        {(gameState.gameOver || gameState.gameWon) && (
          <div className="adventure-selector">
            <p>Choose another adventure:</p>
            <div className="adventure-buttons">
              {ADVENTURES.map((adv) => (
                <button
                  key={adv.id}
                  onClick={() => handleAdventureSelect(adv)}
                  className={currentAdventure.id === adv.id ? 'active' : ''}
                >
                  {adv.title}
                </button>
              ))}
            </div>
          </div>
        )}
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
