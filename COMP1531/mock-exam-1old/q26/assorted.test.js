import { describe, test, expect } from 'vitest';
import {
  unique,
  countOccurrences,
  pick,
  reverseWords,
} from './assorted';

describe('unique', () => {
  test('removes duplicates, keeping first occurrences in order', () => {
    expect(unique([3, 1, 3, 2, 1])).toStrictEqual([3, 1, 2]);
  });

  test('returns an equal array when there are no duplicates', () => {
    expect(unique([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  test('works with strings', () => {
    expect(unique(['b', 'a', 'b', 'b'])).toStrictEqual(['b', 'a']);
  });

  test('works with an empty array', () => {
    expect(unique([])).toStrictEqual([]);
  });

  test('does not modify the input', () => {
    const input = [2, 2, 1];
    unique(input);
    expect(input).toStrictEqual([2, 2, 1]);
  });
});

describe('countOccurrences', () => {
  test('counts strings', () => {
    expect(countOccurrences(['a', 'b', 'a'])).toStrictEqual({ a: 2, b: 1 });
  });

  test('counts numbers', () => {
    expect(countOccurrences([7, 7, 7, 2])).toStrictEqual({ 7: 3, 2: 1 });
  });

  test('single element', () => {
    expect(countOccurrences(['x'])).toStrictEqual({ x: 1 });
  });

  test('returns an empty object for an empty array', () => {
    expect(countOccurrences([])).toStrictEqual({});
  });
});

describe('pick', () => {
  test('keeps only the specified keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 });
  });

  test('ignores keys that are not on the object', () => {
    expect(pick({ a: 1 }, ['a', 'x'])).toStrictEqual({ a: 1 });
  });

  test('keeps falsy values', () => {
    expect(pick({ a: 0, b: '', c: false }, ['a', 'b', 'c'])).toStrictEqual({ a: 0, b: '', c: false });
  });

  test('returns an empty object when no keys are given', () => {
    expect(pick({ a: 1 }, [])).toStrictEqual({});
  });

  test('does not modify the input', () => {
    const input = { a: 1, b: 2 };
    pick(input, ['a']);
    expect(input).toStrictEqual({ a: 1, b: 2 });
  });
});

describe('reverseWords', () => {
  test('reverses a single word', () => {
    expect(reverseWords('hello')).toBe('olleh');
  });

  test('reverses each word but keeps word order', () => {
    expect(reverseWords('hello world')).toBe('olleh dlrow');
    expect(reverseWords('a quick brown fox')).toBe('a kciuq nworb xof');
  });

  test('preserves capitalisation of letters', () => {
    expect(reverseWords('JavaScript is fun')).toBe('tpircSavaJ si nuf');
  });

  test('handles empty string', () => {
    expect(reverseWords('')).toBe('');
  });
});
