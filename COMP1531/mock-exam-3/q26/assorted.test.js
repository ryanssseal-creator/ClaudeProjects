import { describe, test, expect } from 'vitest';
import {
  sumBy,
  lastN,
  renameKey,
  isPalindrome,
} from './assorted';

describe('sumBy', () => {
  test('adds up the values under the key', () => {
    expect(sumBy([{ marks: 5 }, { marks: 7 }], 'marks')).toBe(12);
  });

  test('uses only the given key', () => {
    expect(sumBy([{ a: 1, b: 10 }, { a: 2, b: 20 }], 'b')).toBe(30);
  });

  test('single object', () => {
    expect(sumBy([{ marks: 9 }], 'marks')).toBe(9);
  });

  test('returns 0 for an empty array', () => {
    expect(sumBy([], 'marks')).toBe(0);
  });
});

describe('lastN', () => {
  test('returns the last n elements in order', () => {
    expect(lastN([1, 2, 3, 4], 2)).toEqual([3, 4]);
    expect(lastN([1, 2, 3, 4, 5], 1)).toEqual([5]);
  });

  test('returns empty array for empty input', () => {
    expect(lastN([], 3)).toEqual([]);
  });

  test('handles n larger than the array', () => {
    expect(lastN([1, 2], 5)).toEqual([1, 2]);
  });

  test('handles n equal to the length', () => {
    expect(lastN([1, 2, 3], 3)).toEqual([1, 2, 3]);
  });
});

describe('renameKey', () => {
  test('renames the key and keeps its value', () => {
    expect(renameKey({ a: 1, b: 2 }, 'a', 'z')).toEqual({ z: 1, b: 2 });
  });

  test('returns same object if the key does not exist', () => {
    expect(renameKey({ a: 1 }, 'x', 'y')).toEqual({ a: 1 });
  });

  test('works with empty object', () => {
    expect(renameKey({}, 'a', 'b')).toEqual({});
  });
});

describe('isPalindrome', () => {
  test('simple palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('noon')).toBe(true);
  });

  test('not palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('ab')).toBe(false);
  });

  test('ignores capitalisation', () => {
    expect(isPalindrome('Racecar')).toBe(true);
  });

  test('handles empty string and single letters', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
  });
});
