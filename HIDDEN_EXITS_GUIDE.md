# Testing the Hidden Exit Reveal Feature

## How to Test in "The Lost Library"

### Step-by-Step Instructions

1. **Start the game:**
   ```bash
   npm run dev
   ```

2. **Navigate to the Upper Gallery:**
   ```
   go north          (from entrance to main stacks)
   go up             (from main stacks to upper gallery)
   ```

3. **Examine the mirror:**
   ```
   examine mirror
   ```

   **Expected Output:**
   - The examination text describing the mirror
   - A system message: "✨ The mirror's magic reveals a previously hidden doorway to the west!"

4. **Go to the restricted section:**
   ```
   go down           (return to main stacks)
   go west           (NOW this will work! Previously it was hidden)
   ```

   **What happens:**
   - You can now access the restricted section (which doesn't exist yet in the adventure)
   - The framework supports it, but we haven't built that room yet

## How It Works

### The Mechanism

1. **Object Definition:**
   ```typescript
   revealsHiddenExit: {
     direction: 'west',
     revealMessage: '✨ The mirror\'s magic reveals a previously hidden doorway to the west!',
   }
   ```

2. **When Examined:**
   - The object's `examinationText` is displayed
   - The `revealsHiddenExit` property is checked
   - The hidden exit is permanently unhidden
   - A system message confirms the revelation

3. **Result:**
   - The exit is now visible in "look" commands
   - The exit can now be used with "go west"
   - This is permanent for the game session

## Creating Your Own Hidden Exits

```typescript
{
  id: 'painting',
  name: 'mysterious painting',
  description: 'An old painting of a forest.',
  isExaminable: true,
  examinationText: 'As you study the painting, you notice a small symbol on the frame. It looks like a door...',
  revealsHiddenExit: {
    direction: 'north',
    revealMessage: 'The painting slides aside, revealing a passage to the north!',
  },
}
```

## Combining with Other Features

You can combine the reveal mechanic with other object properties:

```typescript
{
  id: 'ancient-map',
  name: 'crumpled map',
  description: 'A fragile, ancient map.',
  isPickupable: true,           // Can be taken
  isReadable: true,              // Can be read
  isExaminable: true,            // Can be examined
  readableText: 'The map shows a route to a secret chamber.',
  examinationText: 'The map has cryptic markings.',
  revealsHiddenExit: {           // Reveals exit when examined
    direction: 'up',
    revealMessage: 'The map shows you how to reach the hidden chamber above!',
  },
}
```

## Game Design Tips

### Puzzle Pattern: Discovery → Revelation

**Room 1 (Hint Room):**
- Contains an object with examination text that hints at a secret
- When examined, reveals a hidden exit

**Room 2 (Next Area):**
- Only accessible after discovering the secret
- Contains clues or items for future puzzles

### Example Puzzle

```typescript
// Entrance room
{
  id: 'portrait',
  name: 'family portrait',
  description: 'A painting of ancestors.',
  isExaminable: true,
  examinationText: 'In the portrait, one ancestor points toward a wall. You notice a crack forming...',
  revealsHiddenExit: {
    direction: 'down',
    revealMessage: 'The wall cracks open! A staircase descends into darkness.',
  },
}

// The hidden room becomes accessible
{
  direction: 'down',
  targetRoomId: 'secret-chamber',
  isHidden: true,  // Not visible until revealed
}
```

## Advanced: Multiple Reveals

You can have multiple exits in a room, with different objects revealing different ones:

```typescript
// Same room, two objects
{
  id: 'book',
  name: 'ancient book',
  isExaminable: true,
  revealsHiddenExit: {
    direction: 'north',
    revealMessage: 'The book glows! A doorway to the north materializes!',
  },
},
{
  id: 'ring',
  name: 'mystical ring',
  isExaminable: true,
  revealsHiddenExit: {
    direction: 'south',
    revealMessage: 'The ring pulses with power! A hidden passage opens to the south!',
  },
}
```

Players can discover multiple secrets by examining different objects!

## Troubleshooting

**The exit doesn't appear after examining:**
- Make sure the exit has `isHidden: true`
- Verify the `direction` in `revealsHiddenExit` matches an actual exit in the room
- Check that you're using the correct object ID

**The message doesn't show:**
- Custom `revealMessage` is optional; a default will be used if not provided
- The system message appears after the examination text

**Multiple reveals of same exit:**
- Each object can only reveal once per discovery
- Examining the same object multiple times won't re-reveal
- This is intentional to avoid spam

---

Enjoy creating secret passages in your adventures! 🔮✨
