// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Returns an array of the elements that exist in both input arrays.
 * Elements appear in the same order as in the first array, and each
 * element appears at most once in the result.
 *
 * @param {any[]} a - First array.
 * @param {any[]} b - Second array.
 * @returns {any[]} - Array of elements in both a and b.
 *
 * @example
 * intersection([1, 2, 2, 3], [3, 2, 4]) // => [2, 3]
 */
export function intersection(a, b) {
  const seen = [];
  for (const number of a) {
    if (b.includes(number) && !seen.includes(number)) {
      seen.push(number);
    }
  }

  return seen;
}

/**
 * Returns a copy of an array with every element shifted to the right by
 * k positions. Elements that fall off the end wrap around to the front.
 * k is a non-negative integer and may be larger than the array's length.
 * The input array is not modified.
 *
 * @param {any[]} arr - Array to rotate.
 * @param {number} k - Number of positions to shift right by.
 * @returns {any[]} - New rotated array.
 *
 * @example
 * rotate([1, 2, 3, 4, 5], 2) // => [4, 5, 1, 2, 3]
 */
export function rotate(arr, k) {
  if (arr.length === 0) {
    return [];
  }

  for (let i = 0; i < k; i++) {
    const endNumber = arr.pop();
    arr.unshift(endNumber);
  }

  return arr;
}

/**
 * Creates a new object where the keys and values of the original are swapped.
 * You can assume all values are unique strings or numbers.
 * The original object is not modified.
 *
 * @param {Object} obj - Original object.
 * @returns {Object} - New object with keys and values swapped.
 *
 * @example
 * invert({ a: 'x', b: 'y' }) // => { x: 'a', y: 'b' }
 */
export function invert(obj) {
  const inverted = {}

  for (const [key, value] of Object.entries(obj)) {
    inverted[value] = key;
  }

  return inverted;
}

/**
 * Converts a string of words separated by single spaces into camelCase:
 * the first word is entirely lower case, every later word has its first
 * letter in upper case and the rest in lower case, and the spaces are removed.
 *
 * @param {string} str - The input string.
 * @returns {string} - The camelCase string.
 *
 * @example
 * toCamelCase('hello big world') // => 'helloBigWorld'
 */
export function toCamelCase(str) {
  const lowerCase = str.toLowerCase();
  const words = lowerCase.split(" ");
  
  const result = [words[0]];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (word) {
      const capitalised = word[0].toUpperCase() + word.slice(1);
      result.push(capitalised);
    }
  }
  return result.join("");
}
