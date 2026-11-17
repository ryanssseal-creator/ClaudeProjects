import { describe, test, expect } from 'vitest';
import { groupBy, flatten, mostFrequent, mergeCounts } from './assorted';

describe('groupBy', () => {
  test('groups objects by a key', () => {
    const input = [{ n: 'a', t: 'x' }, { n: 'b', t: 'y' }, { n: 'c', t: 'x' }];
    expect(groupBy(input, 't')).toStrictEqual({
      x: [{ n: 'a', t: 'x' }, { n: 'c', t: 'x' }],
      y: [{ n: 'b', t: 'y' }],
    });
  });

  test('works with number values', () => {
    const input = [{ name: 'Ann', age: 20 }, { name: 'Bo', age: 21 }, { name: 'Cy', age: 20 }];
    expect(groupBy(input, 'age')).toStrictEqual({
      20: [{ name: 'Ann', age: 20 }, { name: 'Cy', age: 20 }],
      21: [{ name: 'Bo', age: 21 }],
    });
  });

  test('empty array gives an empty object', () => {
    expect(groupBy([], 'anything')).toStrictEqual({});
  });

  test('does not modify the input', () => {
    const input = [{ n: 'a', t: 'x' }];
    groupBy(input, 't');
    expect(input).toStrictEqual([{ n: 'a', t: 'x' }]);
  });
});

describe('flatten', () => {
  test('flattens one level', () => {
    expect(flatten([1, [2, 3], 4])).toStrictEqual([1, 2, 3, 4]);
  });

  test('flattens deeply nested arrays', () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('an already flat array is unchanged', () => {
    expect(flatten(['a', 'b'])).toStrictEqual(['a', 'b']);
  });

  test('empty nested arrays disappear', () => {
    expect(flatten([[], [[]], 1])).toStrictEqual([1]);
    expect(flatten([])).toStrictEqual([]);
  });

  test('does not modify the input', () => {
    const input = [1, [2, [3]]];
    flatten(input);
    expect(input).toStrictEqual([1, [2, [3]]]);
  });
});

describe('mostFrequent', () => {
  test('returns the most common element', () => {
    expect(mostFrequent([1, 2, 2, 3])).toBe(2);
    expect(mostFrequent(['a', 'b', 'b', 'b', 'a'])).toBe('b');
  });

  test('ties go to the element seen first', () => {
    expect(mostFrequent([3, 1, 3, 2, 1])).toBe(3);
    expect(mostFrequent([5, 6])).toBe(5);
  });

  test('empty array gives undefined', () => {
    expect(mostFrequent([])).toBeUndefined();
  });
});

describe('mergeCounts', () => {
  test('adds shared keys and keeps the rest', () => {
    expect(mergeCounts({ apple: 2, pear: 1 }, { apple: 3, fig: 4 })).toStrictEqual({ apple: 5, pear: 1, fig: 4 });
  });

  test('no shared keys', () => {
    expect(mergeCounts({ a: 1 }, { b: 2 })).toStrictEqual({ a: 1, b: 2 });
  });

  test('empty objects', () => {
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
