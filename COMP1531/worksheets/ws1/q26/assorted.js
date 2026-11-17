// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Splits an array into smaller arrays ("chunks") of a given size.
 * The last chunk holds whatever is left over and may be shorter.
 * size is a positive integer. The input array is not modified.
 *
 * @param {any[]} arr - Array to split.
 * @param {number} size - Length of each chunk.
 * @returns {any[][]} - Array of chunks.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // => [[1, 2], [3, 4], [5]]
 */
export function chunk(arr, size) {
  // const copy = arr
  const copy = arr.slice();
  const result = [];

  while (copy.length > 0) {
    const chunk = [];
    while (chunk.length < size && copy.length > 0) {
      const temp = copy.shift();
      chunk.push(temp);
    }
    result.push(chunk);
  }

  return result;
}

/**
 * Counts how many times each word appears in a string. Words are separated
 * by single spaces and counting is case-insensitive (keys are lower case).
 * An empty string has no words.
 *
 * @param {string} str - The input string.
 * @returns {Object} - Object mapping each word to its count.
 *
 * @example
 * countWords('the cat and The dog') // => { the: 2, cat: 1, and: 1, dog: 1 }
 */
export function countWords(str) {
  const result = {};
  const lowerCase = str.toLowerCase();
  const words = lowerCase.split(" ");

  for (const word of words) {
    if (!word) {
      break;
    }
    if (!Object.keys(result).includes(word)) {
      result[word] = 1;
    } else {
      result[word]++;
    }
  }

  return result;
}

/**
 * Returns true if the string reads the same forwards and backwards, ignoring
 * case and ignoring any character that is not a letter or a digit.
 * The empty string is a palindrome.
 *
 * @param {string} str - The input string.
 * @returns {boolean} - Whether str is a palindrome.
 *
 * @example
 * isPalindrome('Never odd, or even!') // => true
 */
export function isPalindrome(str) {
  const cleaned = str.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
  const reversed = cleaned.split('').reverse().join('');

  return reversed === cleaned;
}

/**
 * Pairs up elements at the same index of two arrays. If the arrays have
 * different lengths, the result is as long as the shorter one.
 * The input arrays are not modified.
 *
 * @param {any[]} a - First array.
 * @param {any[]} b - Second array.
 * @returns {any[][]} - Array of [a[i], b[i]] pairs.
 *
 * @example
 * zip([1, 2, 3], ['a', 'b']) // => [[1, 'a'], [2, 'b']]
 */
export function zip(a, b) {
  const length = Math.min(a.length, b.length);
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }

  return result;
}
