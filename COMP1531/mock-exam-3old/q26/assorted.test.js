import { describe, test, expect } from 'vitest';
import {
  sumBy,
  partition,
  mergeCounts,
  isAnagram,
} from './assorted';

describe('sumBy', () => {
  test('adds up the values under the key', () => {
    expect(sumBy([{ marks: 5 }, { marks: 7 }], 'marks')).toBe(12);
  });

  test('uses only the given key', () => {
    expect(sumBy([{ a: 1, b: 10 }, { a: 2, b: 20 }], 'b')).toBe(30);
  });

  test('objects without the key contribute 0', () => {
    expect(sumBy([{ marks: 5 }, { name: 'x' }, { marks: 1 }], 'marks')).toBe(6);
  });

  test('returns 0 for an empty array', () => {
    expect(sumBy([], 'marks')).toBe(0);
  });
});

describe('partition', () => {
  test('splits into passing and failing elements', () => {
    expect(partition([1, 2, 3, 4], n => n % 2 === 0)).toStrictEqual([[2, 4], [1, 3]]);
  });

  test('works with strings and keeps order', () => {
    expect(partition(['bob', 'alexandra', 'li', 'christopher'], s => s.length > 3))
      .toStrictEqual([['alexandra', 'christopher'], ['bob', 'li']]);
  });

  test('everything passes', () => {
    expect(partition([1, 2], () => true)).toStrictEqual([[1, 2], []]);
  });

  test('nothing passes', () => {
    expect(partition([1, 2], () => false)).toStrictEqual([[], [1, 2]]);
  });

  test('handles an empty array', () => {
    expect(partition([], () => true)).toStrictEqual([[], []]);
  });

  test('does not modify the input', () => {
    const input = [3, 1, 2];
    partition(input, n => n > 1);
    expect(input).toStrictEqual([3, 1, 2]);
  });
});

describe('mergeCounts', () => {
  test('adds shared keys and keeps the rest', () => {
    expect(mergeCounts({ x: 1, y: 2 }, { y: 3, z: 4 })).toStrictEqual({ x: 1, y: 5, z: 4 });
  });

  test('no shared keys', () => {
    expect(mergeCounts({ a: 1 }, { b: 2 })).toStrictEqual({ a: 1, b: 2 });
  });

  test('keeps counts of 0', () => {
    expect(mergeCounts({ a: 0 }, { a: 0, b: 0 })).toStrictEqual({ a: 0, b: 0 });
  });

  test('works with empty objects', () => {
    expect(mergeCounts({}, {})).toStrictEqual({});
    expect(mergeCounts({ a: 1 }, {})).toStrictEqual({ a: 1 });
  });

  test('does not modify the inputs', () => {
    const a = { x: 1 };
    const b = { x: 2 };
    mergeCounts(a, b);
    expect(a).toStrictEqual({ x: 1 });
    expect(b).toStrictEqual({ x: 2 });
  });
});

describe('isAnagram', () => {
  test('simple anagram', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
  });

  test('ignores case', () => {
    expect(isAnagram('Listen', 'SILENT')).toBe(true);
  });

  test('ignores spaces', () => {
    expect(isAnagram('dormitory', 'dirty room')).toBe(true);
  });

  test('different letters', () => {
    expect(isAnagram('abc', 'abd')).toBe(false);
  });

  test('same letters, different counts', () => {
    expect(isAnagram('aab', 'abb')).toBe(false);
    expect(isAnagram('aa', 'a')).toBe(false);
  });

  test('two empty strings', () => {
    expect(isAnagram('', '')).toBe(true);
  });
});
