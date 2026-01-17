import React, { useState, useEffect, useRef } from 'react';
import type { GameState, GameMessage } from '../types/game';
import '../styles/Game.css';

interface GameDisplayProps {
  gameState: GameState;
}

export const GameDisplay: React.FC<GameDisplayProps> = ({ gameState }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<GameMessage[]>([]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  // Update displayed messages when game state changes
  useEffect(() => {
    setDisplayedMessages(gameState.gameHistory);
  }, [gameState.gameHistory]);

  return (
    <div className="game-display">
      <div className="messages-container">
        {displayedMessages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

interface InventoryDisplayProps {
  inventory: GameState['inventory'];
}

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({ inventory }) => {
  if (inventory.length === 0) {
    return (
      <div className="inventory-panel">
        <h3>Inventory</h3>
        <p className="empty-inventory">Empty</p>
      </div>
    );
  }

  return (
    <div className="inventory-panel">
      <h3>Inventory ({inventory.length})</h3>
      <ul className="inventory-list">
        {inventory.map((item) => (
          <li key={item.id} className="inventory-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface CommandInputProps {
  onCommand: (command: string) => void;
  disabled?: boolean;
}

export const CommandInput: React.FC<CommandInputProps> = ({ onCommand, disabled = false }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || disabled) return;

    onCommand(input);
    setHistory([...history, input]);
    setHistoryIndex(-1);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="command-input-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <span className="prompt">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="command-input"
          placeholder="Type a command..."
          autoComplete="off"
        />
      </div>
      <button type="submit" disabled={disabled || input.trim() === ''} className="submit-btn">
        Submit
      </button>
    </form>
  );
};
