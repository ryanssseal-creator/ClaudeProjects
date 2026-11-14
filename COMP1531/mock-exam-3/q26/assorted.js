// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Adds up the values stored under a given key across an array of objects.
 * An object that does not have the key contributes 0.
 *
 * @param {Object[]} arr - Array of objects.
 * @param {string} key - The key whose values should be added up.
 * @returns {number} - The total.
 *
 * @example
 * sumBy([{ marks: 5 }, { marks: 7 }], 'marks') // => 12
 */
export function sumBy(arr, key) {
  // TODO
}

/**
 * Splits an array into two arrays using a test function (the predicate).
 * The first array holds the elements for which predicate(element) is true,
 * the second holds the rest. Both keep the original order.
 * The input array is not modified.
 *
 * @param {any[]} arr - Array to split.
 * @param {Function} predicate - Function that takes an element and returns true or false.
 * @returns {any[][]} - [elementsThatPass, elementsThatFail]
 *
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0) // => [[2, 4], [1, 3]]
 */
export function partition(arr, predicate) {
  // TODO
}

/**
 * Combines two objects of numeric counts into a new object.
 * The result has every key from both objects. Where a key is in both,
 * the two values are added together. Neither input object is modified.
 *
 * @param {Object} a - First object of counts.
 * @param {Object} b - Second object of counts.
 * @returns {Object} - New merged object.
 *
 * @example
 * mergeCounts({ x: 1, y: 2 }, { y: 3, z: 4 }) // => { x: 1, y: 5, z: 4 }
 */
export function mergeCounts(a, b) {
  // TODO
}

/**
 * Decides whether two strings are anagrams of each other: made of exactly
 * the same letters, the same number of times each. Case and spaces are ignored.
 *
 * @param {string} a - First string.
 * @param {string} b - Second string.
 * @returns {boolean} - true if they are anagrams, false otherwise.
 *
 * @example
 * isAnagram('Listen', 'Silent') // => true
 */
export function isAnagram(a, b) {
  // TODO
}
