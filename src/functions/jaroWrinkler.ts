/**
 * Computes the Jaro-Winkler distance between two strings.
 *
 * The Jaro-Winkler distance is a measure of similarity between two strings,
 * where 0 indicates no similarity and 1 indicates an exact match.
 * It is particularly useful for short strings and emphasizes matching characters
 * at the beginning of the strings, which is useful for tasks like name matching.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @param scalingFactor - The scaling factor for Jaro-Winkler (default is 0.1).
 * @returns The Jaro-Winkler distance between the two strings. The distance is a
 *          value between 0 (completely dissimilar) and 1 (exact match).
 *
 * @example
 * jaroWinkler("martha", "marhta"); // Returns ~0.961
 * jaroWinkler("dwayne", "duane");  // Returns ~0.84
 */
export function jaroWinkler(a: string, b: string, scalingFactor: number = 0.1): number {
  const jaroDistance = calculateJaroDistance(a, b);

  // Jaro-Winkler adjustment for strings that match from the start
  const prefixLength = getPrefixLength(a, b);

  return jaroDistance + scalingFactor * prefixLength * (1 - jaroDistance);
}

/**
 * Calculates the Jaro distance between two strings.
 *
 * The Jaro distance is a measure of similarity between two strings, where 0 indicates
 * no similarity and 1 indicates an exact match. It is based on the number of matching
 * characters and transpositions.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns The Jaro distance between the two strings. The distance is a value between
 *          0 (completely dissimilar) and 1 (exact match).
 */
function calculateJaroDistance(a: string, b: string): number {
  if (a === b) {
    return 1.0;
  }

  const lenA = a.length;
  const lenB = b.length;

  const matchDistance = Math.floor(Math.max(lenA, lenB) / 2) - 1;

  let matches = 0;
  let transpositions = 0;
  const matchedA: boolean[] = Array(lenA).fill(false);
  const matchedB: boolean[] = Array(lenB).fill(false);

  // Find matches
  for (let i = 0; i < lenA; i++) {
    for (let j = Math.max(0, i - matchDistance); j < Math.min(lenB, i + matchDistance + 1); j++) {
      if (matchedB[j]) {
        continue;
      }
      if (a[i] === b[j]) {
        matchedA[i] = true;
        matchedB[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) {
    return 0.0;
  }

  // Count transpositions
  let k = 0;
  for (let i = 0; i < lenA; i++) {
    if (matchedA[i]) {
      while (!matchedB[k]) {
        k++;
      }
      if (a[i] !== b[k]) {
        transpositions++;
      }
      k++;
    }
  }

  return (matches / lenA + matches / lenB + (matches - transpositions / 2) / matches) / 3;
}

/**
 * Calculates the length of the common prefix between two strings.
 * The Jaro-Winkler distance gives more weight to strings that start with matching characters.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns The length of the common prefix between the two strings.
 */
function getPrefixLength(a: string, b: string): number {
  const maxPrefixLength = 4; // Common default for Jaro-Winkler.
  const len = Math.min(a.length, b.length, maxPrefixLength);

  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return i;
    }
  }

  return len;
}

// Example usage:
console.log(jaroWinkler('martha', 'marhta')); // ~0.961
console.log(jaroWinkler('dwayne', 'duane')); // ~0.84
