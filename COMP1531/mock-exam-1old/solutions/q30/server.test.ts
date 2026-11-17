// SOLUTION - Mock Exam 1, Q30 Part 2
//
// The hint in the spec: reuse Part 1. Every input that covered a line in cinema.ts will
// cover the same line when sent over HTTP. The sold-out case also covers the catch block
// in server.ts.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const adult = { age: 30, student: false, member: false };
const friday = { basePrice: 20, day: 'friday', format: '2d', soldOut: false };

function priceRequest(customer: typeof adult, session: typeof friday) {
  const res = request('POST', SERVER_URL + '/cinema/price', {
    json: { customer, session }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

describe('tests', () => {
  test('sold out -> 400 (covers the catch block)', () => {
    expect(priceRequest(adult, { ...friday, soldOut: true }))
      .toStrictEqual({ status: 400, body: { error: 'Session is sold out' } });
  });

  test('plain adult', () => {
    expect(priceRequest(adult, friday)).toStrictEqual({ status: 200, body: { price: 20 } });
  });

  test('child, 3d', () => {
    expect(priceRequest({ ...adult, age: 10 }, { ...friday, format: '3d' }))
      .toStrictEqual({ status: 200, body: { price: 14 } });
  });

  test('student on a weekday', () => {
    expect(priceRequest({ ...adult, student: true }, friday))
      .toStrictEqual({ status: 200, body: { price: 16 } });
  });

  test('member on tuesday', () => {
    expect(priceRequest({ ...adult, member: true }, { ...friday, day: 'tuesday' }))
      .toStrictEqual({ status: 200, body: { price: 10 } });
  });

  test('member on another day', () => {
    expect(priceRequest({ ...adult, member: true }, friday))
      .toStrictEqual({ status: 200, body: { price: 18 } });
  });
});
