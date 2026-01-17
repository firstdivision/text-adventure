import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  const [selectedAdventureIndex, setSelectedAdventureIndex] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus menu on mount and when returning to menu
  useEffect(() => {
    if (!gameState && !currentAdventure && menuRef.current) {
      menuRef.current.focus();
    }
  }, [gameState, currentAdventure]);

  const handleAdventureStart = (adventure: Adventure) => {
    setCurrentAdventure(adventure);
    setGameState(createGameState(adventure));
  };

  const handleAdventureSelect = (adventure: Adventure) => {
    handleAdventureStart(adventure);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameState) return; // Only handle keys in menu

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedAdventureIndex((prev) =>
        prev === 0 ? ADVENTURES.length - 1 : prev - 1
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedAdventureIndex((prev) =>
        prev === ADVENTURES.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleAdventureStart(ADVENTURES[selectedAdventureIndex]);
    }
  };

  const handleCommand = useCallback((command: string) => {
    setGameState((prevState) => {
      if (!prevState) return null;
      const newState = executeCommand(prevState, command);
      
      // If player exits, reset to adventure selection
      if (newState.exited) {
        setCurrentAdventure(null);
        return null;
      }
      
      return newState;
    });
  }, []);

  // Show adventure selection screen if no game is started
  if (!gameState || !currentAdventure) {
    return (
      <div className="game-container" ref={menuRef} onKeyDown={handleKeyDown} tabIndex={0}>
        <header className="game-header">
          <h1>🏛️ Text Adventure Game</h1>
          <p className="subtitle">Choose Your Adventure</p>
        </header>

        <main className="game-main">
          <div className="adventure-selection-screen">
            <div className="adventure-list">
              {ADVENTURES.map((adventure, index) => (
                <button
                  key={adventure.id}
                  className={`adventure-list-item ${selectedAdventureIndex === index ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAdventureIndex(index);
                  }}
                >
                  {adventure.title}
                </button>
              ))}
            </div>
            <div className="adventure-details">
              <div className="adventure-info">
                <h2>{ADVENTURES[selectedAdventureIndex].title}</h2>
                <p>{ADVENTURES[selectedAdventureIndex].description}</p>
                <button
                  className="start-button"
                  onClick={() =>
                    handleAdventureStart(ADVENTURES[selectedAdventureIndex])
                  }
                >
                  Start Adventure (Enter)
                </button>
              </div>
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
        <CommandInput onCommand={handleCommand} disabled={gameState.gameOver || gameState.gameWon || gameState.exited} />
      </footer>
    </div>
  );
};
