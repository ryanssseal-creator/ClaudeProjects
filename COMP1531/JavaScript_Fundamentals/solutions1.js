// Practice: fill in each function, then run `node <this file>`

/**
 * Return the sum of two numbers.
 */
function add(a, b) {
  return a + b;
}

/**
 * Return str reversed.
 */
function reverseString(str) {
  const array = str.split('');
  const reversed = array.reverse();
  return reversed.join('');
}

/**
 * Return the largest number in an array. Return undefined if empty.
 */
function largest(nums) {
  // TODO
}

/**
 * Return a new object with the same keys, but every value doubled.
 * e.g. { a: 1, b: 2 } -> { a: 2, b: 4 }
 */
function doubleValues(obj) {
  // TODO
}

/**
 * Return true if str is a palindrome (ignore case, letters only).
 */
function isPalindrome(str) {
  // TODO
}

/**
 * Return a new array with only the even numbers from nums.
 */
function evens(nums) {
  // TODO
}

/**
 * Count how many times each character appears in str.
 * e.g. 'aab' -> { a: 2, b: 1 }
 */
function charCount(str) {
  // TODO
}

/**
 * Return an array of the keys in obj whose value is greater than n.
 * e.g. ({ a: 1, b: 5 }, 2) -> ['b']
 */
function keysAbove(obj, n) {
  // TODO
}

/**
 * Merge two objects. If a key is in both, the value from b wins.
 */
function merge(a, b) {
  // TODO
}

/**
 * Return the first word in a sentence that is longer than n characters,
 * or undefined if there isn't one. Words are separated by single spaces.
 */
function firstLongWord(sentence, n) {
  // TODO
}

// ---- Tests ----
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}` +
    (pass ? '' : `  (got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)})`));
}

check('add(2, 3)', add(2, 3), 5);
check('add(-1, 1)', add(-1, 1), 0);

check("reverseString('hello')", reverseString('hello'), 'olleh');
check("reverseString('')", reverseString(''), '');

check('largest([1, 7, 3])', largest([1, 7, 3]), 7);
check('largest([])', largest([]), undefined);

check('doubleValues({ a: 1, b: 2 })', doubleValues({ a: 1, b: 2 }), { a: 2, b: 4 });
check('doubleValues({})', doubleValues({}), {});

check("isPalindrome('Racecar')", isPalindrome('Racecar'), true);
check("isPalindrome('hello')", isPalindrome('hello'), false);

check('evens([1, 2, 3, 4])', evens([1, 2, 3, 4]), [2, 4]);
check('evens([1, 3])', evens([1, 3]), []);

check("charCount('aab')", charCount('aab'), { a: 2, b: 1 });
check("charCount('')", charCount(''), {});

check('keysAbove({ a: 1, b: 5 }, 2)', keysAbove({ a: 1, b: 5 }, 2), ['b']);
check('keysAbove({ a: 1 }, 10)', keysAbove({ a: 1 }, 10), []);

check('merge({ a: 1 }, { b: 2 })', merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
check('merge({ a: 1 }, { a: 9 })', merge({ a: 1 }, { a: 9 }), { a: 9 });

check("firstLongWord('the quick brown fox', 3)", firstLongWord('the quick brown fox', 3), 'quick');
check("firstLongWord('a bb', 5)", firstLongWord('a bb', 5), undefined);
