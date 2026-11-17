// SOLUTION - Mock Exam 2, Q30 Part 2
//
// The hint in the spec: reuse Part 1. Every input that covered a line in refunds.ts
// covers the same line when it is sent over HTTP instead.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const customer = { tier: 'gold', flagged: [] as string[], warranties: [] as string[] };
const order = { status: 'delivered', category: 'laptop', faulty: false, hasReceipt: false, daysSincePurchase: 30 };

function refundRequest(c: typeof customer, o: typeof order) {
  const res = request('POST', SERVER_URL + '/store/refund', {
    json: { customer: c, order: o }
  });
  return res.getJSON();
}

describe('tests', () => {
  test('cancelled order', () => {
    expect(refundRequest(customer, { ...order, status: 'cancelled' })).toBe(false);
  });

  test('customer flagged for this category', () => {
    expect(refundRequest({ ...customer, flagged: ['laptop'] }, order)).toBe(false);
  });

  test('faulty item', () => {
    expect(refundRequest(customer, { ...order, faulty: true })).toBe(true);
  });

  test('gold with a receipt within 60 days', () => {
    expect(refundRequest(customer, { ...order, hasReceipt: true })).toBe(true);
  });

  test('gold with a warranty for this category', () => {
    expect(refundRequest({ ...customer, warranties: ['laptop'] }, order)).toBe(true);
  });

  test('gold with nothing special', () => {
    expect(refundRequest(customer, order)).toBe(false);
  });
});
