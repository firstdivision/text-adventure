import React, { useState, useEffect, useRef } from 'react';
import type { GameState, GameMessage, Exit, GameObject } from '../types/game';
import '../styles/Game.css';

interface GameDisplayProps {
  gameState: GameState;
  onCommand?: (command: string) => void;
}

export const GameDisplay: React.FC<GameDisplayProps> = ({ gameState, onCommand }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<GameMessage[]>([]);
  const [availableExits, setAvailableExits] = useState<Exit[]>([]);
  const [roomObjects, setRoomObjects] = useState<GameObject[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  // Update displayed messages, exits, and objects when game state changes
  useEffect(() => {
    setDisplayedMessages(gameState.gameHistory);
    
    // Extract available exits and objects from current room
    const currentRoom = gameState.currentAdventure.rooms.find(
      r => r.id === gameState.currentRoomId
    );
    if (currentRoom) {
      const visibleExits = currentRoom.exits.filter(e => !e.isHidden);
      setAvailableExits(visibleExits);
      setRoomObjects(currentRoom.objects || []);
    }
    setActiveMenu(null);
  }, [gameState.gameHistory, gameState.currentRoomId, gameState.currentAdventure]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExitClick = (direction: string) => {
    if (onCommand) {
      onCommand(`go ${direction}`);
    }
  };

  const handleObjectAction = (action: string, objectName: string) => {
    if (onCommand) {
      onCommand(`${action} ${objectName}`);
    }
    setActiveMenu(null);
  };

  const getAvailableActions = (obj: GameObject) => {
    const actions: Array<{ label: string; command: string }> = [];
    
    if (obj.isExaminable) {
      actions.push({ label: 'Examine', command: 'examine' });
    }
    if (obj.isReadable) {
      actions.push({ label: 'Read', command: 'read' });
    }
    if (obj.isPickupable) {
      actions.push({ label: 'Take', command: 'take' });
    }
    
    return actions;
  };

  const renderMessageWithLinks = (text: string, messageIdx: number) => {
    let content = text;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Find and replace object names with clickable spans
    roomObjects.forEach((obj) => {
      const regex = new RegExp(`\\b${obj.name}\\b`, 'gi');
      const actions = getAvailableActions(obj);
      
      if (actions.length > 0) {
        let match;
        const matches: Array<{ index: number; text: string }> = [];
        
        while ((match = regex.exec(content)) !== null) {
          matches.push({ index: match.index, text: match[0] });
        }

        // Process matches in reverse order to maintain correct indices
        matches.reverse().forEach((m) => {
          const before = content.substring(0, m.index);
          const after = content.substring(m.index + m.text.length);
          content = before + `__OBJECT_${obj.id}__` + after;
        });
      }
    });

    // Split by object placeholders and build JSX
    const objectPattern = /__OBJECT_([^_]+)_+/g;
    let match;
    
    while ((match = objectPattern.exec(content)) !== null) {
      const objId = match[1];
      const obj = roomObjects.find(o => o.id === objId);
      
      if (obj) {
        const before = content.substring(lastIndex, match.index);
        if (before) parts.push(before);

        const actions = getAvailableActions(obj);
        const menuId = `${messageIdx}-${obj.id}`;
        
        parts.push(
          <span key={`obj-${menuId}`} style={{ position: 'relative', display: 'inline-block' }}>
            <span
              className="object-link"
              onClick={() => setActiveMenu(activeMenu === menuId ? null : menuId)}
            >
              {obj.name}
            </span>
            {activeMenu === menuId && (
              <div className="action-menu" ref={menuRef}>
                {actions.map((action) => (
                  <button
                    key={action.command}
                    className="action-button"
                    onClick={() => handleObjectAction(action.command, obj.name)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </span>
        );
        
        lastIndex = match.index + match[0].length;
      }
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="game-display">
      <div className="messages-container">
        {displayedMessages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.type}`}>
            {renderMessageWithLinks(msg.text, idx)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {availableExits.length > 0 && (
        <div className="exits-container">
          <div className="exits-text">
            Exits:{' '}
            {availableExits.map((exit, index) => (
              <span key={exit.direction}>
                <span
                  className="exit-link"
                  onClick={() => handleExitClick(exit.direction)}
                >
                  {exit.direction}
                </span>
                {index < availableExits.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
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
