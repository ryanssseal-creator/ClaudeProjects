import { describe, test, expect } from 'vitest';
import { chunk, countWords, isPalindrome, zip } from './assorted';

describe('chunk', () => {
  test('splits evenly', () => {
    expect(chunk([1, 2, 3, 4], 2)).toStrictEqual([[1, 2], [3, 4]]);
  });

  test('last chunk holds the leftovers', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]]);
  });

  test('size larger than the array gives one chunk', () => {
    expect(chunk([1, 2, 3], 10)).toStrictEqual([[1, 2, 3]]);
  });

  test('size 1 wraps every element', () => {
    expect(chunk(['a', 'b'], 1)).toStrictEqual([['a'], ['b']]);
  });

  test('empty array gives no chunks', () => {
    expect(chunk([], 3)).toStrictEqual([]);
  });

  test('does not modify the input', () => {
    const input = [1, 2, 3];
    chunk(input, 2);
    expect(input).toStrictEqual([1, 2, 3]);
  });
});

describe('countWords', () => {
  test('counts each word', () => {
    expect(countWords('a b a')).toStrictEqual({ a: 2, b: 1 });
  });

  test('is case-insensitive', () => {
    expect(countWords('the cat and The dog')).toStrictEqual({ the: 2, cat: 1, and: 1, dog: 1 });
  });

  test('single word', () => {
    expect(countWords('Hello')).toStrictEqual({ hello: 1 });
  });

  test('empty string has no words', () => {
    expect(countWords('')).toStrictEqual({});
  });
});

describe('isPalindrome', () => {
  test('simple palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('abba')).toBe(true);
  });

  test('not a palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('ignores case and punctuation', () => {
    expect(isPalindrome('Never odd, or even!')).toBe(true);
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('digits count', () => {
    expect(isPalindrome('12 3 21')).toBe(true);
    expect(isPalindrome('123')).toBe(false);
  });

  test('empty string is a palindrome', () => {
    expect(isPalindrome('')).toBe(true);
  });
});

describe('zip', () => {
  test('pairs equal-length arrays', () => {
    expect(zip([1, 2], ['a', 'b'])).toStrictEqual([[1, 'a'], [2, 'b']]);
  });

  test('stops at the shorter array', () => {
    expect(zip([1, 2, 3], ['a', 'b'])).toStrictEqual([[1, 'a'], [2, 'b']]);
    expect(zip([1], ['a', 'b', 'c'])).toStrictEqual([[1, 'a']]);
  });

  test('empty arrays', () => {
    expect(zip([], [1, 2])).toStrictEqual([]);
  });

  test('does not modify the inputs', () => {
    const a = [1, 2];
    const b = [3, 4];
    zip(a, b);
    expect(a).toStrictEqual([1, 2]);
    expect(b).toStrictEqual([3, 4]);
  });
});
