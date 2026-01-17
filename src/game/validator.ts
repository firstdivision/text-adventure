import type { Adventure } from '../types/game';

/**
 * Adventure validation utilities
 * Checks for conflicts and issues in adventure definitions
 */

/**
 * Validate adventure for object name/alias conflicts within rooms
 * Logs warnings to console if conflicts are found
 */
export function validateAdventure(adventure: Adventure): void {
  let hasErrors = false;

  adventure.rooms.forEach((room) => {
    if (!room.objects || room.objects.length === 0) return;

    // Build a map of all names and aliases (lowercase) to detect conflicts
    const nameMap = new Map<string, { objectId: string; objectName: string; type: 'name' | 'alias' }>();

    room.objects.forEach((obj) => {
      // Check object name
      const nameLower = obj.name.toLowerCase();
      if (nameMap.has(nameLower)) {
        const existing = nameMap.get(nameLower)!;
        console.warn(
          `⚠️ Name conflict in room "${room.id}": ` +
          `"${obj.name}" (${obj.id}) conflicts with "${existing.objectName}" (${existing.objectId})`
        );
        hasErrors = true;
      } else {
        nameMap.set(nameLower, { objectId: obj.id, objectName: obj.name, type: 'name' });
      }

      // Check aliases
      if (obj.aliases) {
        obj.aliases.forEach((alias) => {
          const aliasLower = alias.toLowerCase();
          if (nameMap.has(aliasLower)) {
            const existing = nameMap.get(aliasLower)!;
            const conflictType = existing.type === 'name' ? 'name' : 'alias';
            console.warn(
              `⚠️ Alias conflict in room "${room.id}": ` +
              `alias "${alias}" of "${obj.name}" (${obj.id}) conflicts with ${conflictType} "${existing.objectName}" (${existing.objectId})`
            );
            hasErrors = true;
          } else {
            nameMap.set(aliasLower, { objectId: obj.id, objectName: obj.name, type: 'alias' });
          }
        });
      }
    });
  });

  if (hasErrors) {
    console.warn(
      `❌ Adventure "${adventure.title}" has object naming conflicts. ` +
      `These may cause issues with player commands.`
    );
  } else {
    console.log(
      `✅ Adventure "${adventure.title}" passed validation - no object name conflicts found.`
    );
  }
}
