import { describe, test, expect } from 'vitest';
import {
  intersection,
  rotate,
  invert,
  toCamelCase,
} from './assorted';

describe('intersection', () => {
  test('returns the common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toStrictEqual([2, 3]);
  });

  test('keeps the order of the first array', () => {
    expect(intersection([3, 1, 2], [1, 2, 3])).toStrictEqual([3, 1, 2]);
  });

  test('does not repeat elements', () => {
    expect(intersection([1, 2, 2, 3], [3, 2, 4])).toStrictEqual([2, 3]);
  });

  test('returns empty when nothing is shared', () => {
    expect(intersection([1, 2], [3, 4])).toStrictEqual([]);
  });

  test('works with empty arrays', () => {
    expect(intersection([], [1, 2])).toStrictEqual([]);
    expect(intersection([1, 2], [])).toStrictEqual([]);
  });
});

describe('rotate', () => {
  test('shifts elements right and wraps around', () => {
    expect(rotate([1, 2, 3, 4, 5], 2)).toStrictEqual([4, 5, 1, 2, 3]);
    expect(rotate([1, 2, 3], 1)).toStrictEqual([3, 1, 2]);
  });

  test('rotating by 0 gives an equal array', () => {
    expect(rotate([1, 2, 3], 0)).toStrictEqual([1, 2, 3]);
  });

  test('rotating by the length gives an equal array', () => {
    expect(rotate([1, 2, 3], 3)).toStrictEqual([1, 2, 3]);
  });

  test('handles k larger than the length', () => {
    expect(rotate([1, 2, 3], 7)).toStrictEqual([3, 1, 2]);
  });

  test('handles an empty array', () => {
    expect(rotate([], 4)).toStrictEqual([]);
  });

  test('does not modify the input', () => {
    const input = [1, 2, 3];
    rotate(input, 1);
    expect(input).toStrictEqual([1, 2, 3]);
  });
});

describe('invert', () => {
  test('swaps keys and values', () => {
    expect(invert({ a: 'x', b: 'y' })).toStrictEqual({ x: 'a', y: 'b' });
  });

  test('works with number values', () => {
    expect(invert({ one: 1, two: 2 })).toStrictEqual({ 1: 'one', 2: 'two' });
  });

  test('works with an empty object', () => {
    expect(invert({})).toStrictEqual({});
  });

  test('does not modify the input', () => {
    const input = { a: 'x' };
    invert(input);
    expect(input).toStrictEqual({ a: 'x' });
  });
});

describe('toCamelCase', () => {
  test('joins words, capitalising all but the first', () => {
    expect(toCamelCase('hello big world')).toBe('helloBigWorld');
  });

  test('a single word is lower-cased', () => {
    expect(toCamelCase('hello')).toBe('hello');
    expect(toCamelCase('Hello')).toBe('hello');
  });

  test('normalises existing capitalisation', () => {
    expect(toCamelCase('Hello World')).toBe('helloWorld');
    expect(toCamelCase('JAVA script IS fun')).toBe('javaScriptIsFun');
  });

  test('handles empty string', () => {
    expect(toCamelCase('')).toBe('');
  });
});
