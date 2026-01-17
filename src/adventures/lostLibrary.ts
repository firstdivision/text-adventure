import type { Adventure } from '../types/game';

/**
 * Sample adventure: "The Lost Library"
 * Demonstrates the framework capabilities
 */

export const lostLibraryAdventure: Adventure = {
  id: 'lost-library',
  title: 'The Lost Library',
  description: 'You wake up in an abandoned library with no memory of how you got here.',
  startingRoomId: 'entrance',
  rooms: [
    {
      id: 'entrance',
      title: 'Library Entrance',
      description:
        'You stand in the grand entrance of an old library. Dust particles dance in beams of light from tall windows. A thick wooden desk sits near the door, and shelves of books stretch into the shadows. The air smells of aged paper and mystery.',
      features: [
        'tall windows with faded light',
        'thick wooden desk',
        'shelves of books',
      ],
      exits: [
        {
          direction: 'east',
          targetRoomId: 'reading-room',
          description: 'to the Reading Room',
        },
        {
          direction: 'north',
          targetRoomId: 'main-stacks',
          description: 'deeper into the library',
        },
        {
          direction: 'south',
          targetRoomId: 'basement',
          description: 'down to the basement',
          blockedMessage: 'The basement door is locked. You need a key.',
          requiresItem: 'rusty-key',
        },
      ],
      objects: [
        {
          id: 'brass-key',
          name: 'brass key',
          description: 'A small brass key sits on the desk.',
          isPickupable: true,
          isExaminable: true,
          examinationText:
            'An ornate brass key with an unusual shape. It might unlock something important.',
        },
        {
          id: 'ledger',
          name: 'ledger',
          description: 'An old leather-bound ledger rests on the desk.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'You open the dusty ledger. The entries are dated from 1952. Many are illegible, but one entry stands out:\n"Section 7 contains restricted materials. The way forward is through the looking glass."',
          examinationText:
            'A leather-bound ledger, very old. The pages are fragile and yellowed.',
        },
      ],
    },
    {
      id: 'reading-room',
      title: 'Reading Room',
      description:
        'Comfortable reading chairs and tables are arranged throughout this cozy room. Afternoon light filters through tall windows, illuminating floating dust. A fireplace stands cold and empty on the far wall.',
      features: [
        'comfortable leather chairs',
        'wooden tables with reading lamps',
        'cold fireplace',
      ],
      exits: [
        {
          direction: 'west',
          targetRoomId: 'entrance',
          description: 'back to the entrance',
        },
        {
          direction: 'north',
          targetRoomId: 'main-stacks',
          description: 'to the Main Stacks',
        },
        {
          direction: 'south',
          targetRoomId: 'vault',
          description: 'to a restricted vault',
          blockedMessage: 'The vault door requires the brass key.',
          requiresItem: 'brass-key',
        },
      ],
      objects: [
        {
          id: 'newspaper',
          name: 'old newspaper',
          description: 'A yellowed newspaper sits on one of the tables.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'The headline reads: "Local Legend: The Mirror of Shadows"\nAn article describes a mythical mirror said to hold answers to lost mysteries. Its current location is unknown.',
          examinationText: 'A fragile newspaper, dated 1951. Very brittle.',
        },
      ],
    },
    {
      id: 'main-stacks',
      title: 'Main Stacks',
      description:
        'Towering shelves filled with countless books stretch from floor to ceiling. Catwalks and ladders provide access to the higher shelves. The smell of old paper is almost overwhelming. Somewhere in this labyrinth of knowledge lies the answer you seek.',
      features: [
        'towering shelves of books',
        'wooden catwalks and ladders',
        'rolling library ladder',
      ],
      exits: [
        {
          direction: 'south',
          targetRoomId: 'entrance',
          description: 'back to the entrance',
        },
        {
          direction: 'east',
          targetRoomId: 'reading-room',
          description: 'back to the reading room',
        },
        {
          direction: 'up',
          targetRoomId: 'upper-gallery',
          description: 'up a narrow staircase',
        },
      ],
      objects: [
        {
          id: 'ancient-map',
          name: 'ancient map',
          description:
            'A rolled parchment map lies on a reading table among the stacks.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'You unroll the ancient map. It shows the layout of the library with a chamber marked "X" beneath the reading room. There are cryptic notes: "The vault contains what was lost."',
          examinationText: 'An ancient, fragile parchment map of the library.',
        },
      ],
    },
    {
      id: 'upper-gallery',
      title: 'Upper Gallery',
      description:
        'You stand on a high catwalk overlooking the main stacks below. The air is dusty and dim. A few shelves of rare books are kept here, away from common access.',
      features: ['high catwalk', 'rare book collection', 'ornate mirror on wall'],
      exits: [
        {
          direction: 'down',
          targetRoomId: 'main-stacks',
          description: 'down to the main stacks',
        },
        {
          direction: 'west',
          targetRoomId: 'restricted-section',
          description: 'through a hidden doorway',
          isHidden: true,
        },
      ],
      objects: [
        {
          id: 'mirror',
          name: 'ornate mirror',
          description:
            'A beautiful ornate mirror hangs on the wall. Your reflection seems slightly off.',
          isExaminable: true,
          examinationText:
            'As you examine the mirror closely, you notice the reflection shows something that isn\'t actually there - a door in the wall behind you. When you turn around... there it is! A hidden door has appeared!',
          revealsHiddenExit: {
            direction: 'west',
            revealMessage: '✨ The mirror\'s magic reveals a previously hidden doorway to the west!',
          },
        },
      ],
    },
    {
      id: 'vault',
      title: 'The Vault',
      description:
        'You enter a small, secure room lined with metal. A pedestal sits in the center with a glass case. Inside the case, wrapped in cloth, you see... something of great importance.',
      features: ['metal walls', 'glass case on pedestal'],
      exits: [
        {
          direction: 'north',
          targetRoomId: 'reading-room',
          description: 'back to the reading room',
        },
      ],
      objects: [
        {
          id: 'ancient-scroll',
          name: 'ancient scroll',
          description:
            'A cloth-wrapped scroll sits under glass in the center of the vault.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'You carefully unroll the ancient scroll. It contains an elaborate explanation of the library\'s true purpose - it was built as a repository of lost knowledge from forgotten civilizations. The scroll mentions a final chamber with a gift for whoever proves worthy.',
          examinationText:
            'An ancient scroll, carefully preserved. Whatever was written here is of great importance.',
        },
      ],
    },
    {
      id: 'basement',
      title: 'The Basement Archives',
      description:
        'The basement is much older than the rest of the library. Stone walls are lined with filing cabinets and locked boxes. A faint sound echoes from deeper within - perhaps water, perhaps something else.',
      features: ['stone walls', 'wooden filing cabinets', 'metal storage boxes'],
      exits: [
        {
          direction: 'north',
          targetRoomId: 'entrance',
          description: 'back up to the entrance',
        },
        {
          direction: 'south',
          targetRoomId: 'hidden-chamber',
          description: 'deeper into darkness',
        },
      ],
      objects: [
        {
          id: 'rusty-key',
          name: 'rusty key',
          description: 'A heavily corroded iron key hangs from a hook on the wall.',
          isPickupable: true,
          isExaminable: true,
          examinationText:
            'A rusty old key, almost decomposed. Yet it still feels solid. Strange symbols are etched on its surface.',
        },
      ],
    },
    {
      id: 'hidden-chamber',
      title: 'The Hidden Chamber',
      description:
        'You stand in a chamber that appears to be the heart of the library. Ancient symbols cover the walls. In the center of the room stands a stone altar, and the air seems to shimmer slightly around it. This is where the library\'s greatest secrets are kept.',
      features: ['ancient symbols on walls', 'stone altar', 'shimmer in the air'],
      exits: [
        {
          direction: 'north',
          targetRoomId: 'basement',
          description: 'back to the archives',
        },
      ],
      objects: [
        {
          id: 'crystal',
          name: 'crystal',
          description:
            'A glowing crystal sits on the stone altar, pulsing with soft light.',
          isPickupable: true,
          isExaminable: true,
          examinationText:
            'The crystal pulses with an inner light. As you examine it, you feel a connection to the library itself. All the knowledge it contains seems to flow through you. You understand now - you were chosen to find this. The library will reveal its knowledge to those who seek truth.',
        },
      ],
    },
    {
      id: 'restricted-section',
      title: 'Restricted Section',
      description:
        'You stand in a hidden chamber filled with ancient texts and forbidden knowledge. The air is thick with the weight of secrets. Dusty tomes line the shelves, each one seemingly older and more mysterious than the last.',
      features: [
        'towering shelves of ancient books',
        'sealed glass cases with relics',
        'strange symbols etched into the walls',
      ],
      exits: [
        {
          direction: 'east',
          targetRoomId: 'upper-gallery',
          description: 'back to the upper gallery',
        },
      ],
      objects: [
        {
          id: 'forbidden-scroll',
          name: 'forbidden scroll',
          description: 'A sealed scroll with warnings etched upon it.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'The scroll warns: "This knowledge should remain hidden. Some truths are dangerous. Only the pure of heart may proceed."',
          examinationText:
            'The scroll is ancient, its paper preserved by powerful magic. It pulses with otherworldly energy.',
        },
      ],
    },
  ],
};
