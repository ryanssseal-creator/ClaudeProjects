import { describe, test, expect, beforeEach } from 'vitest';
import { addItem, removeItem, getTotals, findCheapest, clear } from './cart.ts';

const pen = { name: 'Pen', unitPrice: 2 };
const notebook = { name: 'Notebook', unitPrice: 6 };

beforeEach(() => {
  clear();
});

describe('addItem()', () => {
  test('success > returns the itemId', () => {
    expect(addItem(pen, 3)).toStrictEqual({ itemId: expect.any(Number) });
  });

  test('error > quantity is not positive', () => {
    expect(addItem(pen, 0)).toStrictEqual({ error: expect.any(String) });
  });

  test('error > item already in cart', () => {
    addItem(pen, 3);
    expect(addItem(pen, 1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('removeItem()', () => {
  let id1: { itemId: number };
  beforeEach(() => {
    id1 = addItem(pen, 3) as { itemId: number };
  });

  test('success > returns empty object', () => {
    expect(removeItem(id1.itemId)).toStrictEqual({});
    expect(getTotals().itemCount).toBe(0);
  });

  test('error > invalid item id', () => {
    expect(removeItem(id1.itemId + 1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('getTotals()', () => {
  test('empty cart', () => {
    expect(getTotals()).toStrictEqual({ total: 0, itemCount: 0 });
  });

  test('without a discount code', () => {
    addItem(pen, 5);
    addItem(notebook, 15);
    expect(getTotals()).toStrictEqual({ total: 100, itemCount: 20 });
  });

  test('with the student discount code', () => {
    addItem(pen, 5);
    addItem(notebook, 15);
    const totals = getTotals('STUDENT10');
    expect(totals.total).toBeCloseTo(90);
    expect(totals.itemCount).toBe(20);
  });

  test('with an unknown discount code', () => {
    addItem(pen, 5);
    expect(getTotals('FREE')).toStrictEqual({ total: 10, itemCount: 5 });
  });
});

describe('findCheapest()', () => {
  test('returns null for an empty cart', () => {
    expect(findCheapest()).toBeNull();
  });

  test('returns the item with the lowest unit price', () => {
    addItem(notebook, 1);
    const penId = addItem(pen, 10) as { itemId: number };
    expect(findCheapest()).toStrictEqual({ itemId: penId.itemId, name: 'Pen', unitPrice: 2, quantity: 10 });
  });
});
