import { describe, test, expect } from 'vitest';
import { runLengthEncode, transpose, pick, deepSum } from './assorted';

describe('runLengthEncode', () => {
  test('encodes runs', () => {
    expect(runLengthEncode('aaabccdddd')).toBe('a3b1c2d4');
  });

  test('no repeats', () => {
    expect(runLengthEncode('abc')).toBe('a1b1c1');
  });

  test('same character in separate runs', () => {
    expect(runLengthEncode('aabaa')).toBe('a2b1a2');
  });

  test('single character and empty string', () => {
    expect(runLengthEncode('z')).toBe('z1');
    expect(runLengthEncode('')).toBe('');
  });
});

describe('transpose', () => {
  test('transposes a rectangular matrix', () => {
    expect(transpose([[1, 2, 3], [4, 5, 6]])).toStrictEqual([[1, 4], [2, 5], [3, 6]]);
  });

  test('transposes a square matrix', () => {
    expect(transpose([[1, 2], [3, 4]])).toStrictEqual([[1, 3], [2, 4]]);
  });

  test('a single row becomes a column', () => {
    expect(transpose([[1, 2, 3]])).toStrictEqual([[1], [2], [3]]);
  });

  test('empty matrix', () => {
    expect(transpose([])).toStrictEqual([]);
  });

  test('does not modify the input', () => {
    const input = [[1, 2], [3, 4]];
    transpose(input);
    expect(input).toStrictEqual([[1, 2], [3, 4]]);
  });
});

describe('pick', () => {
  test('keeps only the listed keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 });
  });

  test('ignores keys that do not exist', () => {
    expect(pick({ a: 1 }, ['a', 'z'])).toStrictEqual({ a: 1 });
    expect(pick({ a: 1 }, ['z'])).toStrictEqual({});
  });

  test('keeps falsy values', () => {
    expect(pick({ a: 0, b: '', c: false }, ['a', 'b', 'c'])).toStrictEqual({ a: 0, b: '', c: false });
  });

  test('does not modify the input', () => {
    const input = { a: 1, b: 2 };
    pick(input, ['a']);
    expect(input).toStrictEqual({ a: 1, b: 2 });
  });
});

describe('deepSum', () => {
  test('flat object', () => {
    expect(deepSum({ a: 1, b: 2 })).toBe(3);
  });

  test('nested objects', () => {
    expect(deepSum({ a: 1, b: { c: 2, d: { e: 3 } } })).toBe(6);
  });

  test('ignores non-numbers', () => {
    expect(deepSum({ a: 1, b: 'x', c: true, d: { e: '5', f: 4 } })).toBe(5);
  });

  test('empty object', () => {
    expect(deepSum({})).toBe(0);
    expect(deepSum({ a: {} })).toBe(0);
  });
});
