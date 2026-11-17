// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Compresses a string by replacing each run of the same character with the
 * character followed by how many times it repeats in a row.
 *
 * @param {string} str - The input string.
 * @returns {string} - The encoded string.
 *
 * @example
 * runLengthEncode('aaabccdddd') // => 'a3b1c2d4'
 */
export function runLengthEncode(str) {
  // TODO
}

/**
 * Returns the transpose of a matrix: row i of the result is column i of the
 * input. Every row of the input has the same length.
 * An empty matrix ([]) transposes to [].
 * The input is not modified.
 *
 * @param {any[][]} matrix - Array of rows.
 * @returns {any[][]} - New transposed matrix.
 *
 * @example
 * transpose([[1, 2, 3], [4, 5, 6]]) // => [[1, 4], [2, 5], [3, 6]]
 */
export function transpose(matrix) {
  // TODO
}

/**
 * Creates a new object containing only the given keys from the original.
 * Keys in the list that are not in the original object are ignored.
 * The original object is not modified.
 *
 * @param {Object} obj - Original object.
 * @param {string[]} keys - Keys to keep.
 * @returns {Object} - New object with only those keys.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z']) // => { a: 1, c: 3 }
 */
export function pick(obj, keys) {
  // TODO
}

/**
 * Adds up every number stored anywhere in an object, including inside
 * nested objects (to any depth). Values that are not numbers or objects
 * (e.g. strings, booleans) are ignored. There are no arrays or nulls.
 *
 * @param {Object} obj - Possibly nested object.
 * @returns {number} - Sum of all numbers.
 *
 * @example
 * deepSum({ a: 1, b: { c: 2, d: { e: 3 } }, f: 'x' }) // => 6
 */
export function deepSum(obj) {
  // TODO
}
