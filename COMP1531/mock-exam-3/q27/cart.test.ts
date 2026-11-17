import { describe, test, expect, beforeEach } from 'vitest';
import { findItem, addItem, updateQuantity, clear } from './cart.ts';

const item1 = { name: 'Notebook', price: 6 };

beforeEach(() => {
  clear();
});

describe('findItem()', () => {
  test('success > returns the right item if it exists', () => {
    addItem(item1);
    expect(findItem('Notebook')).toStrictEqual({
      itemId: expect.any(Number),
      name: 'Notebook',
      price: 6,
      quantity: 1
    });
  });

  test('error > returns undefined for empty item name', () => {
    expect(findItem('')).toBeUndefined();
  });

  test('error > returns undefined for unknown item name', () => {
    addItem(item1);
    expect(findItem('Pen')).toBeUndefined();
  });
});

describe('addItem()', () => {
  test('success > returns the itemId if success', () => {
    expect(addItem(item1)).toStrictEqual({ itemId: expect.any(Number) });
  });

  test('error > returns error for existing item name', () => {
    addItem(item1);
    expect(addItem(item1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('updateQuantity()', () => {
  let itemId1: { itemId: number };
  beforeEach(() => {
    itemId1 = addItem(item1) as { itemId: number };
  });

  test('success > returns empty object', () => {
    expect(updateQuantity(itemId1.itemId, 3)).toStrictEqual({});
  });

  test('error > returns error for invalid item id', () => {
    expect(updateQuantity(itemId1.itemId + 1, 3)).toStrictEqual({ error: expect.any(String) });
  });
});
