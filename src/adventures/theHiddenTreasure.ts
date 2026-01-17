import type { Adventure } from '../types/game';

/**
 * Simple adventure: "The Hidden Treasure"
 * A quick treasure hunt with a clear win condition
 */

export const theHiddenTreasureAdventure: Adventure = {
  id: 'treasure-hunt',
  title: 'The Hidden Treasure',
  description: 'You find yourself in an old cottage. Rumors speak of a hidden treasure somewhere nearby.',
  startingRoomId: 'cottage',
  rooms: [
    {
      id: 'cottage',
      title: 'Old Cottage',
      description:
        'You stand inside a dusty old cottage. Sunlight streams through broken windows. A wooden table sits in the corner, and a door leads outside.',
      features: ['broken windows', 'wooden table', 'oak door'],
      exits: [
        {
          direction: 'out',
          targetRoomId: 'garden',
          description: 'out to the garden',
        },
        {
          direction: 'north',
          targetRoomId: 'cellar',
          description: 'down to the cellar',
          blockedMessage: 'The cellar door is locked. You need a key.',
          requiresItem: 'rusty-key',
        },
      ],
      objects: [
        {
          id: 'rusty-key',
          name: 'rusty key',
          aliases: ['key', 'rusty'],
          description: 'A rusty old key lies on the table.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'An old key, its surface corroded with rust. It looks like it might open something.',
        },
      ],
    },
    {
      id: 'garden',
      title: 'Overgrown Garden',
      description:
        'Wild vines and flowers have taken over this garden. A stone path leads to a small shed in the distance. You can see the cottage door behind you.',
      features: ['wild vines', 'stone path', 'distant shed'],
      exits: [
        {
          direction: 'in',
          targetRoomId: 'cottage',
          description: 'back into the cottage',
        },
        {
          direction: 'east',
          targetRoomId: 'shed',
          description: 'to the shed',
        },
      ],
      objects: [
        {
          id: 'map',
          name: 'old map',
          aliases: ['map', 'parchment'],
          description: 'A weathered map is pinned to a post.',
          isPickupable: true,
          isReadable: true,
          isExaminable: true,
          readableText:
            'The map shows this cottage and the surrounding area. An "X" is marked inside the cellar beneath the cottage.',
          examinationText: 'A faded map of the area. Weathered and old.',
        },
      ],
    },
    {
      id: 'shed',
      title: 'Old Shed',
      description:
        'A small wooden shed filled with gardening tools. Dust motes dance in the light from a single window. Everything here smells of rust and earth.',
      features: ['gardening tools', 'wooden shelves', 'single window'],
      exits: [
        {
          direction: 'west',
          targetRoomId: 'garden',
          description: 'back to the garden',
        },
      ],
      objects: [
        {
          id: 'shovel',
          name: 'shovel',
          aliases: ['tool', 'digging tool'],
          description: 'An old shovel leans against the wall.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'A sturdy shovel, worn from years of use. Perfect for digging.',
        },
      ],
    },
    {
      id: 'cellar',
      title: 'Dark Cellar',
      description:
        'You descend into a dark, musty cellar. The air is cool and damp. Stone walls surround you, and you can see the outline of an old wooden chest in the corner.',
      features: ['stone walls', 'damp floor', 'wooden chest'],
      exits: [
        {
          direction: 'out',
          targetRoomId: 'cottage',
          description: 'back to the cottage',
        },
      ],
      objects: [
        {
          id: 'treasure',
          name: 'treasure chest',
          aliases: ['chest', 'treasure'],
          description: 'An old wooden chest covered in dust.',
          isPickupable: false,
          isExaminable: true,
          isWinTrigger: true,
          examinationText:
            'You carefully open the ancient chest. Inside you find gleaming gold coins, jeweled artifacts, and scrolls of immense value. You have found the treasure! Your adventure is complete!',
        },
      ],
    },
  ],
};
