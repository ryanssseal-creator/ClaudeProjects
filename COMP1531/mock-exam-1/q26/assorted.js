// DO NOT MODIFY THE FUNCTION DEFINITIONS

/**
 * Returns a new array with duplicate elements removed.
 * The first occurrence of each element is kept and the original order is preserved.
 * The input array is not modified.
 *
 * @param {any[]} arr - Array that may contain duplicates.
 * @returns {any[]} - New array without duplicates.
 *
 * @example
 * unique([3, 1, 3, 2, 1]) // => [3, 1, 2]
 */
export function unique(arr) {
  const seen = [];
  // 'in' uses index, 'of' uses the number itself.
  for (const number of arr) {
    if (!seen.includes(number)) {
      seen.push(number);
    }
  }

  return seen;
}

/**
 * Counts how many times each element appears in an array.
 *
 * @param {(string|number)[]} arr - Array of strings or numbers.
 * @returns {Object} - Object whose keys are the elements and whose values are the counts.
 *
 * @example
 * countOccurrences(['a', 'b', 'a']) // => { a: 2, b: 1 }
 */
export function countOccurrences(arr) {
  const result = {};
  for (const key of arr) {
    if (result[key] === undefined) {
      result[key] = 1;
    } else {
      result[key]++;
    }
  }


  return result;
}

/**
 * Creates a copy of an object containing only the specified keys.
 * Keys that do not exist on the original object are ignored.
 * The original object is not modified.
 *
 * @param {Object} obj - Original object.
 * @param {string[]} keys - Keys to keep.
 * @returns {Object} - New object with only those keys.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // => { a: 1, c: 3 }
 */
export function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (!(obj[key] === undefined)) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Reverses the letters of every word in a string.
 * Words are separated by single spaces and stay in the same order.
 *
 * @param {string} str - The input string.
 * @returns {string} - String with each word reversed.
 *
 * @example
 * reverseWords('hello world') // => 'olleh dlrow'
 */
export function reverseWords(str) {
  // 1. split all of the words
  const split = str.split(' ');
  // Split all of the letters.
  const reversedArray = [];
  for (const word of split) {
    const splitWord = word.split('');
    const reversedLetters = splitWord.reverse();
    const reversedWord = reversedLetters.join('');
    reversedArray.push(reversedWords);
  }

  return reversedArray.join(' ');
}
