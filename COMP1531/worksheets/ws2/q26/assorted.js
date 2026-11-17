// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Groups an array of objects by the value each object has for a given key.
 * Returns an object whose keys are those values and whose values are arrays
 * of the matching objects, in their original order.
 * The input array is not modified.
 *
 * @param {Object[]} arr - Array of objects.
 * @param {string} key - The key to group by.
 * @returns {Object} - Object mapping each value to an array of objects.
 *
 * @example
 * groupBy([{ n: 'a', t: 'x' }, { n: 'b', t: 'y' }, { n: 'c', t: 'x' }], 't')
 * // => { x: [{ n: 'a', t: 'x' }, { n: 'c', t: 'x' }], y: [{ n: 'b', t: 'y' }] }
 */
export function groupBy(arr, key) {
  // TODO
}

/**
 * Flattens an array that may contain nested arrays (to any depth) into a
 * single flat array, keeping the original left-to-right order.
 * The input array is not modified.
 *
 * @param {any[]} arr - Possibly nested array.
 * @returns {any[]} - New flat array.
 *
 * @example
 * flatten([1, [2, [3, [4]], 5]]) // => [1, 2, 3, 4, 5]
 */
export function flatten(arr) {
  // TODO
}

/**
 * Returns the element that appears most often in an array. If several
 * elements are tied, return the one that appears first in the array.
 * Return undefined for an empty array.
 *
 * @param {any[]} arr - The input array.
 * @returns {any} - The most frequent element.
 *
 * @example
 * mostFrequent([3, 1, 3, 2, 1]) // => 3
 */
export function mostFrequent(arr) {
  // TODO
}

/**
 * Merges two objects whose values are all numbers into a new object.
 * Keys that appear in only one object keep their value. Keys that appear
 * in both have their values added together.
 * Neither input object is modified.
 *
 * @param {Object} a - First object.
 * @param {Object} b - Second object.
 * @returns {Object} - New merged object.
 *
 * @example
 * mergeCounts({ apple: 2, pear: 1 }, { apple: 3, fig: 4 })
 * // => { apple: 5, pear: 1, fig: 4 }
 */
export function mergeCounts(a, b) {
  // TODO
}
