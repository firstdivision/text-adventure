import type { Adventure } from '../types/game';

/**
 * Beach adventure: "Escape the Island"
 * Find a way off a mysterious island
 */

export const theBeachAdventure: Adventure = {
  id: 'beach-adventure',
  title: 'Escape the Island',
  description: 'You wake up on a strange beach with no memory of how you got here. You need to find a way to escape.',
  startingRoomId: 'beach',
  rooms: [
    {
      id: 'beach',
      title: 'Sandy Beach',
      description:
        'You stand on a pristine sandy beach. Crystal clear water sparkles in the sunlight. Palm trees sway in the gentle breeze. In the distance, you can see rocky cliffs to the north and a calm lagoon to the south.',
      features: ['soft sand', 'palm trees', 'sparkling water', 'distant cliffs'],
      exits: [
        {
          direction: 'north',
          targetRoomId: 'cliffs',
          description: 'to the rocky cliffs',
        },
        {
          direction: 'south',
          targetRoomId: 'lagoon',
          description: 'to the lagoon',
        },
        {
          direction: 'east',
          targetRoomId: 'cave',
          description: 'into a dark cave',
          blockedMessage: 'The cave entrance is blocked by rocks. You need something to clear them.',
          requiresItem: 'crowbar',
        },
      ],
      objects: [
        {
          id: 'bottle',
          name: 'glass bottle',
          aliases: ['bottle', 'glass'],
          description: 'An empty glass bottle lies in the sand.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'A clear glass bottle, weathered by the sea. It could hold something important.',
        },
      ],
    },
    {
      id: 'cliffs',
      title: 'Rocky Cliffs',
      description:
        'You stand atop tall rocky cliffs overlooking the ocean. The view is breathtaking, but the drop is steep and dangerous. You can see the beach below and spot a hidden path leading west.',
      features: ['tall cliffs', 'ocean view', 'narrow path'],
      exits: [
        {
          direction: 'south',
          targetRoomId: 'beach',
          description: 'back to the beach',
        },
        {
          direction: 'west',
          targetRoomId: 'lookout',
          description: 'along a narrow path',
        },
      ],
      objects: [
        {
          id: 'telescope',
          name: 'old telescope',
          aliases: ['telescope', 'scope'],
          description: 'An old brass telescope sits mounted on a post.',
          isPickupable: false,
          isExaminable: true,
          examinationText:
            'You peer through the telescope and see a distant ship on the horizon! There might be hope for rescue after all.',
        },
      ],
    },
    {
      id: 'lookout',
      title: 'Lookout Tower',
      description:
        'An abandoned lookout tower stands here, its wooden structure weathered by years of sea salt and wind. Despite its age, it seems sturdy enough.',
      features: ['wooden tower', 'rope ladder', 'storage boxes'],
      exits: [
        {
          direction: 'east',
          targetRoomId: 'cliffs',
          description: 'back to the cliffs',
        },
      ],
      objects: [
        {
          id: 'crowbar',
          name: 'crowbar',
          aliases: ['tool', 'metal bar'],
          description: 'A heavy iron crowbar leans against the tower wall.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'A sturdy crowbar, perfect for prying things open or moving heavy rocks.',
        },
      ],
    },
    {
      id: 'lagoon',
      title: 'Crystal Lagoon',
      description:
        'The calm lagoon is so clear you can see straight to the bottom. Tropical fish dart between colorful coral. The water is warm and inviting. You notice a pathway leading west.',
      features: ['clear water', 'coral reef', 'tropical fish'],
      exits: [
        {
          direction: 'north',
          targetRoomId: 'beach',
          description: 'back to the beach',
        },
        {
          direction: 'west',
          targetRoomId: 'shipwreck',
          description: 'toward a shipwreck',
        },
      ],
      objects: [
        {
          id: 'flare',
          name: 'signal flare',
          aliases: ['flare', 'signal'],
          description: 'An emergency signal flare sits on a rock by the water.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'A bright red signal flare. This could be used to call for help!',
        },
      ],
    },
    {
      id: 'shipwreck',
      title: 'Sunken Shipwreck',
      description:
        'The remains of an old sailing ship lie partially submerged in the shallow water. Its wooden hull is covered in barnacles and seaweed. Despite its age, the ship\'s cabin is still accessible.',
      features: ['sunken ship', 'wooden hull', 'cabin door'],
      exits: [
        {
          direction: 'east',
          targetRoomId: 'lagoon',
          description: 'back to the lagoon',
        },
      ],
      objects: [
        {
          id: 'compass',
          name: 'old compass',
          aliases: ['compass', 'navigation'],
          description: 'A brass compass sits on the captain\'s desk inside the cabin.',
          isPickupable: true,
          isExaminable: true,
          examinationText: 'An old brass compass. Though aged, it still points true north.',
        },
      ],
    },
    {
      id: 'cave',
      title: 'Hidden Cavern',
      description:
        'You enter a mysterious cave carved into the cliff face. The walls glisten with moisture, and the air is cool and salty. Deep inside, you spot a stone chamber with ancient markings.',
      features: ['cave walls', 'stone chamber', 'ancient markings'],
      exits: [
        {
          direction: 'west',
          targetRoomId: 'beach',
          description: 'back to the beach',
        },
      ],
      objects: [
        {
          id: 'radio',
          name: 'emergency radio',
          aliases: ['radio', 'transmitter'],
          description: 'An old emergency radio sits on a stone pedestal, covered in dust.',
          isPickupable: false,
          isExaminable: true,
          isWinTrigger: true,
          examinationText:
            'You dust off the radio and find it still has power! With trembling hands, you activate the distress signal. Static crackles, then a voice responds: "We read you. A rescue ship is on the way!" You have found your way to safety!',
        },
      ],
    },
  ],
};
