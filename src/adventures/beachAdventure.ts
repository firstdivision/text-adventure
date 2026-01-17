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
      features: [
        {
          name: 'soft sand',
          aliases: ['sand'],
          examinationText: 'The sand is warm and soft beneath your feet, fine-grained and pristine. As you sift it through your fingers, you notice tiny shells and bits of coral. The beach feels untouched, as if it\'s been waiting for someone to discover it.',
        },
        {
          name: 'palm trees',
          aliases: ['trees', 'tree'],
          examinationText: 'Tall, elegant palm trees sway gently in the ocean breeze. Their fronds rustle with a soothing sound, and you can smell the salt air mingling with the tropical scent of the vegetation. There\'s something about them that feels familiar, reminding you of a vacation long ago—a time when life was simpler.',
        },
        {
          name: 'sparkling water',
          aliases: ['water', 'ocean'],
          examinationText: 'The crystal-clear water is mesmerizing. Sunlight dances across the surface, creating millions of tiny glimmers of light. You can see down several feet into the depths, where colorful fish dart between rocks and seaweed. The water looks inviting and warm.',
        },
        {
          name: 'distant cliffs',
          aliases: ['cliffs', 'rocks'],
          examinationText: 'The rocky cliffs loom majestically on the horizon, their weathered faces telling stories of countless storms and sunsets. Seabirds circle lazily in the sky above them, their cries echoing faintly across the water. There\'s something both ancient and beautiful about them—they make you feel small, yet oddly connected to something greater. For a moment, you feel a pang of nostalgia, as if you\'ve been here before in another lifetime.',
        },
      ],
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
      features: [
        {
          name: 'tall cliffs',
          aliases: ['cliff', 'cliffs', 'rocks'],
          examinationText: 'The cliffs rise dramatically from the churning ocean below. Their gray stone faces are weathered and craggy, with deep crevices and natural formations. Looking down, you can see the waves crashing against the rocks, sending spray high into the air. The height makes your head spin slightly.',
        },
        {
          name: 'ocean view',
          aliases: ['view', 'ocean', 'horizon'],
          examinationText: 'From this vantage point, the ocean stretches endlessly to the horizon. The water changes color from deep blue near the distant shore to turquoise close to land. The view is so expansive and beautiful that it takes your breath away. You feel both incredibly small and strangely at peace.',
        },
        {
          name: 'narrow path',
          aliases: ['path'],
          examinationText: 'A narrow, winding path cuts along the cliff edge heading west. It looks precarious but passable. Native plants grow sparse along its edges, clinging stubbornly to the rocky soil. The path seems to lead toward an old structure in the distance.',
        },
      ],
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
      features: [
        {
          name: 'wooden tower',
          aliases: ['tower', 'structure', 'building'],
          examinationText: 'The tower is constructed of weathered timber, its wood gray and silvered by salt spray and sunlight. Graffiti and marks from countless visitors decorate its surface, each one telling a small story of someone who was here before you. Despite its appearance, the structure feels surprisingly solid beneath your hands.',
        },
        {
          name: 'rope ladder',
          aliases: ['ladder', 'rope'],
          examinationText: 'A weathered rope ladder hangs from the tower\'s upper level. Some rungs are frayed and worn, but it still looks serviceable. You can see it disappears into a trapdoor above, leading to what might be the tower\'s upper observation deck.',
        },
        {
          name: 'storage boxes',
          aliases: ['boxes', 'box'],
          examinationText: 'Several wooden storage boxes are stacked in a corner, their lids firmly closed. They look old and weathered, likely containing supplies left behind by the tower\'s previous keepers. You wonder what secrets they might hold.',
        },
      ],
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
      features: [
        {
          name: 'clear water',
          aliases: ['water', 'lagoon'],
          examinationText: 'The water is so transparent it\'s almost like looking through glass. The bottom is visible and appears to be sandy, with patches of darker seaweed and rock. The clarity is stunning—you can count the tiny fish weaving through the underwater landscape.',
        },
        {
          name: 'coral reef',
          aliases: ['coral', 'reef'],
          examinationText: 'The coral formations are breathtaking—brilliant colors of orange, purple, and yellow rise from the lagoon floor. They seem almost alive with activity, as fish dart in and out of the intricate structures. Some coral formations look ancient, built up over centuries.',
        },
        {
          name: 'tropical fish',
          aliases: ['fish'],
          examinationText: 'Schools of brightly colored fish swim lazily through the lagoon. Some are striped, others are brilliant blue or yellow. They move in unison, creating mesmerizing patterns in the water. Watching them is strangely peaceful, transporting you away from your troubles.',
        },
      ],
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
      features: [
        {
          name: 'sunken ship',
          aliases: ['ship', 'wreck', 'vessel'],
          examinationText: 'The ship is a haunting sight—a remnant of maritime history. Its wooden hull, though weathered and deteriorated, still bears traces of its former grandeur. You can make out faded letters on what remains of the bow, though their meaning is lost to time. The ship seems to have been resting here for decades, perhaps centuries.',
        },
        {
          name: 'wooden hull',
          aliases: ['hull', 'wood'],
          examinationText: 'The wooden hull is covered in a thick layer of barnacles, seaweed, and other marine growth. In places, the wood has rotted away entirely, leaving gaps that fish swim through freely. Despite the decay, you can still sense the craftsmanship that went into building this vessel.',
        },
        {
          name: 'cabin door',
          aliases: ['door', 'cabin'],
          examinationText: 'The cabin door hangs slightly ajar, its hinges corroded by years of saltwater exposure. Through the gap, you can see darkness within, but there appears to be something inside—perhaps supplies left behind by the ship\'s last crew.',
        },
      ],
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
      features: [
        {
          name: 'cave walls',
          aliases: ['walls', 'wall'],
          examinationText: 'The cave walls are smooth in some places, rough and jagged in others. They glisten with moisture, and droplets of water drip steadily from above, creating a rhythmic sound that echoes through the cavern. The walls bear marks of erosion and water flow, creating natural patterns that almost look intentional.',
        },
        {
          name: 'stone chamber',
          aliases: ['chamber', 'stone', 'room'],
          examinationText: 'The chamber is a marvel of natural geology—a large, vaulted space carved by water over thousands of years. The stone is a mix of gray and reddish hues, with bands of different mineral compositions running through it. The chamber feels ancient and sacred.',
        },
        {
          name: 'ancient markings',
          aliases: ['markings', 'marks', 'carvings'],
          examinationText: 'The stone walls are covered with strange markings—some appear to be natural striations, but others seem deliberately carved. They might be ancient symbols, or they could be weathering patterns from countless years of water flow. You can\'t quite decipher their meaning, but they fill you with a sense of mystery.',
        },
      ],
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
