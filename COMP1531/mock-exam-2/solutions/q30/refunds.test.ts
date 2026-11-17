// SOLUTION - Mock Exam 2, Q30 Part 1
//
// Method: walk down the function and write one test for each way out of each `if`.
// For `a || b` and `a && b`, branch coverage also needs each half exercised.
import { describe, test, expect } from 'vitest';
import { refundService } from './refunds.ts';
import { Customer, Order } from './interface.ts';

// A "boring" customer and order that hit no special case.
// Each test overrides only the one thing it is about.
const customer: Customer = { tier: 'gold', flagged: [], warranties: [] };
const order: Order = { status: 'delivered', category: 'laptop', faulty: false, hasReceipt: false, daysSincePurchase: 30 };

describe('refundService tests', () => {
  test('cancelled order', () => {
    expect(refundService(customer, { ...order, status: 'cancelled' })).toBe(false);
  });

  test('customer flagged for this category', () => {
    expect(refundService({ ...customer, flagged: ['laptop'] }, order)).toBe(false);
  });

  test('faulty item (left side of ||)', () => {
    expect(refundService(customer, { ...order, faulty: true })).toBe(true);
  });

  test('within 7 days (right side of ||)', () => {
    expect(refundService(customer, { ...order, daysSincePurchase: 7 })).toBe(true);
  });

  test('gold with a receipt within 60 days', () => {
    expect(refundService(customer, { ...order, hasReceipt: true })).toBe(true);
  });

  test('gold with a receipt after 60 days (right side of && is false)', () => {
    expect(refundService(customer, { ...order, hasReceipt: true, daysSincePurchase: 61 })).toBe(false);
  });

  test('gold with a warranty for this category', () => {
    expect(refundService({ ...customer, warranties: ['laptop'] }, order)).toBe(true);
  });

  test('gold with nothing special', () => {
    expect(refundService(customer, order)).toBe(false);
  });

  test('standard customer', () => {
    expect(refundService({ ...customer, tier: 'standard' }, order)).toBe(false);
  });
});
