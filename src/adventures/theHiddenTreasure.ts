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
      features: [
        {
          name: 'broken windows',
          aliases: ['window', 'windows', 'glass'],
          examinationText: 'The windows are cracked and covered with grime from years of neglect. Only fragments of glass remain in some panes, while others are completely shattered. Through the breaks, you can see the overgrown garden outside.',
        },
        {
          name: 'wooden table',
          aliases: ['table', 'furniture'],
          examinationText: 'The table is made of sturdy oak wood, though its surface is scarred and weathered. Dust covers every inch of it, undisturbed for what must be years. You can see where something has rolled across it, disturbing the dust.',
        },
        {
          name: 'oak door',
          aliases: ['door'],
          examinationText: 'A heavy wooden door leads outside. Its paint is peeling, revealing older layers of color beneath. The hinges are rusty, but the door appears to still function.',
        },
      ],
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
      features: [
        {
          name: 'wild vines',
          aliases: ['vines', 'vine', 'plants'],
          examinationText: 'Thick, twisted vines climb up every surface, their leaves a vibrant green despite the garden\'s neglected state. They smell earthy and alive. In some places, they\'ve grown so thick that they\'ve completely obscured what lies beneath.',
        },
        {
          name: 'stone path',
          aliases: ['path', 'stone', 'stones'],
          examinationText: 'The path is made of flat gray stones, worn smooth by years of foot traffic long ago. Moss and weeds grow between the gaps, but you can still make out the original route. It leads directly toward the shed.',
        },
        {
          name: 'distant shed',
          aliases: ['shed', 'structure', 'building'],
          examinationText: 'The shed is visible through the overgrown vegetation, a small wooden structure with weathered boards. Its roof is partially collapsed in one corner. You can just make out what looks like tools inside.',
        },
      ],
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
      features: [
        {
          name: 'gardening tools',
          aliases: ['tools', 'tool'],
          examinationText: 'Various gardening implements hang on the walls—rakes, hoes, trowels, and more. Most are rusty and corroded, but a sturdy shovel leans prominently against the wall. You wonder what gardener once maintained this place.',
        },
        {
          name: 'wooden shelves',
          aliases: ['shelves', 'shelf'],
          examinationText: 'Wooden shelves line one wall, holding old clay pots, glass jars, and bottles of mysterious liquids. The shelves themselves are warped and weathered. Spider webs connect many of the items, suggesting nothing has been disturbed in a long time.',
        },
        {
          name: 'single window',
          aliases: ['window'],
          examinationText: 'A small window lets in scattered beams of dusty light. The glass is filthy but unbroken. Through it, you can see the overgrown garden and the path leading back to the cottage.',
        },
      ],
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
      features: [
        {
          name: 'stone walls',
          aliases: ['walls', 'wall', 'stones'],
          examinationText: 'The walls are constructed from rough-hewn stone blocks, stacked carefully but showing signs of age. Moisture seeps down the walls in places, creating dark stains. The stone feels cool and damp to the touch.',
        },
        {
          name: 'damp floor',
          aliases: ['floor', 'ground'],
          examinationText: 'The cellar floor is slick with moisture and covered in a thin layer of dust. You can feel the cold dampness through your boots. In some places, small pools of water have formed, indicating ongoing moisture seepage from above.',
        },
        {
          name: 'wooden chest',
          aliases: ['chest', 'box', 'furniture'],
          examinationText: 'An ancient wooden chest sits in the corner, covered in dust and cobwebs. Its wood is dark with age and moisture. Metal bands reinforce its corners, and an ornate lock adorns its face. It calls to you with the promise of hidden treasure.',
        },
      ],
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
