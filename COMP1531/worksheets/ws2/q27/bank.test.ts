import { describe, test, expect, beforeEach } from 'vitest';
import { openAccount, deposit, transfer, getAccountsByType, totalBalance, clear } from './bank.ts';

beforeEach(() => {
  clear();
});

describe('openAccount()', () => {
  test('success > returns the accountId', () => {
    expect(openAccount('Ryan', 'savings')).toStrictEqual({ accountId: expect.any(Number) });
  });

  test('success > with an initial deposit', () => {
    expect(openAccount('Ryan', 'everyday', 50)).toStrictEqual({ accountId: expect.any(Number) });
  });

  test('error > empty owner', () => {
    expect(openAccount('', 'savings')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('deposit()', () => {
  let acc: { accountId: number };
  beforeEach(() => {
    acc = openAccount('Ryan', 'savings', 10) as { accountId: number };
  });

  test('success > returns the new balance', () => {
    expect(deposit(acc.accountId, 15)).toStrictEqual({ balance: 25 });
  });

  test('error > invalid accountId', () => {
    expect(deposit(acc.accountId + 1, 15)).toStrictEqual({ error: expect.any(String) });
  });

  test('error > amount not positive', () => {
    expect(deposit(acc.accountId, 0)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('transfer()', () => {
  let a: { accountId: number };
  let b: { accountId: number };
  beforeEach(() => {
    a = openAccount('Ryan', 'savings', 100) as { accountId: number };
    b = openAccount('Sam', 'everyday') as { accountId: number };
  });

  test('success > moves the money', () => {
    expect(transfer(a.accountId, b.accountId, 40)).toStrictEqual({});
    expect(getAccountsByType('everyday')).toStrictEqual({
      accounts: [{ accountId: b.accountId, owner: 'Sam', type: 'everyday', balance: 40 }],
    });
  });

  test('error > invalid id', () => {
    expect(transfer(a.accountId, 999, 40)).toStrictEqual({ error: expect.any(String) });
  });

  test('error > insufficient funds', () => {
    expect(transfer(b.accountId, a.accountId, 1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('getAccountsByType()', () => {
  test('returns an empty list when there are none', () => {
    openAccount('Ryan', 'savings');
    expect(getAccountsByType('everyday')).toStrictEqual({ accounts: [] });
  });
});

describe('totalBalance()', () => {
  test('adds up every balance', () => {
    expect(totalBalance()).toBe(0);
    openAccount('Ryan', 'savings', 100);
    openAccount('Sam', 'everyday', 25);
    expect(totalBalance()).toBe(125);
  });
});
