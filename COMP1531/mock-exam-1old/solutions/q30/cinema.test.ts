// SOLUTION - Mock Exam 1, Q30 Part 1
//
// Method: walk down the function and write one test per way out of each decision.
// Compound conditions (|| and &&) need each half exercised for branch coverage.
import { describe, test, expect } from 'vitest';
import { ticketPrice } from './cinema.ts';
import { Customer, Session } from './interface.ts';

// A "boring" customer and session that hit no special case.
// Each test overrides only the one thing it is about.
const adult: Customer = { age: 30, student: false, member: false };
const friday: Session = { basePrice: 20, day: 'friday', format: '2d', soldOut: false };

describe('ticketPrice tests', () => {
  test('sold out session throws', () => {
    expect(() => ticketPrice(adult, { ...friday, soldOut: true })).toThrow('Session is sold out');
  });

  test('plain adult pays base price', () => {
    expect(ticketPrice(adult, friday)).toBe(20);
  });

  test('child is half price (left side of ||)', () => {
    expect(ticketPrice({ ...adult, age: 10 }, friday)).toBe(10);
  });

  test('senior is half price (right side of ||)', () => {
    expect(ticketPrice({ ...adult, age: 70 }, friday)).toBe(10);
  });

  test('student gets 20% off on a weekday', () => {
    expect(ticketPrice({ ...adult, student: true }, friday)).toBe(16);
  });

  test('student gets no discount on saturday (right side of && is false)', () => {
    expect(ticketPrice({ ...adult, student: true }, { ...friday, day: 'saturday' })).toBe(20);
  });

  test('3d adds a surcharge', () => {
    expect(ticketPrice(adult, { ...friday, format: '3d' })).toBe(24);
  });

  test('member on tuesday is capped at 10', () => {
    expect(ticketPrice({ ...adult, member: true }, { ...friday, day: 'tuesday' })).toBe(10);
  });

  test('member on another day gets 2 off', () => {
    expect(ticketPrice({ ...adult, member: true }, friday)).toBe(18);
  });
});
