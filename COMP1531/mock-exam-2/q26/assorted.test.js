import { describe, test, expect } from 'vitest';
import {
  intersection,
  flatten,
  invert,
  initials,
} from './assorted';

describe('intersection', () => {
  test('returns all elements if all overlap', () => {
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('returns common elements if some overlap', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  test('returns empty if no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  test('works with empty arrays', () => {
    expect(intersection([], [1, 2])).toEqual([]);
    expect(intersection([], [])).toEqual([]);
  });
});

describe('flatten', () => {
  test('joins the inner arrays in order', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  test('returns empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
  });

  test('handles empty inner arrays', () => {
    expect(flatten([[], [1], []])).toEqual([1]);
  });

  test('handles a single inner array', () => {
    expect(flatten([[1, 2, 3]])).toEqual([1, 2, 3]);
  });
});

describe('invert', () => {
  test('swaps keys and values', () => {
    expect(invert({ a: 'x', b: 'y' })).toEqual({ x: 'a', y: 'b' });
  });

  test('works with a single key', () => {
    expect(invert({ name: 'ryan' })).toEqual({ ryan: 'name' });
  });

  test('works with empty object', () => {
    expect(invert({})).toEqual({});
  });
});

describe('initials', () => {
  test('single word', () => {
    expect(initials('hello')).toBe('H');
  });

  test('multiple words', () => {
    expect(initials('hello big world')).toBe('HBW');
    expect(initials('a quick brown fox')).toBe('AQBF');
  });

  test('handles empty string', () => {
    expect(initials('')).toBe('');
  });

  test('words that already start with a capital', () => {
    expect(initials('University of New South Wales')).toBe('UONSW');
  });
});
