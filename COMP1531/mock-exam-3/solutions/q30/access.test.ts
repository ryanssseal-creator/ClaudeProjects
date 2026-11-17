// SOLUTION - Mock Exam 3, Q30 Part 1
//
// Method: walk down the function and write one test for each way out of each `if`.
// For `a || b` and `a && b`, branch coverage also needs each half exercised.
import { describe, test, expect } from 'vitest';
import { accessService } from './access.ts';
import { Door, User } from './interface.ts';

// A "boring" user and door that hit no special case.
// Each test overrides only the one thing it is about.
const user: User = { zid: 'z5555555', role: 'student', building: 'K17', bookings: [] };
const door: Door = { room: 'G02', building: 'J17', locked: false, owners: [], afterHours: false };

describe('accessService tests', () => {
  test('visitor', () => {
    expect(accessService({ ...user, role: 'visitor' }, door)).toBe(false);
  });

  test('locked door', () => {
    expect(accessService(user, { ...door, locked: true })).toBe(false);
  });

  test('security (left side of ||)', () => {
    expect(accessService({ ...user, role: 'security' }, door)).toBe(true);
  });

  test('owner of the room (right side of ||)', () => {
    expect(accessService(user, { ...door, owners: ['z5555555'] })).toBe(true);
  });

  test('student in their own building during the day', () => {
    expect(accessService(user, { ...door, building: 'K17' })).toBe(true);
  });

  test('student in their own building after hours (left side of && is false)', () => {
    expect(accessService(user, { ...door, building: 'K17', afterHours: true })).toBe(false);
  });

  test('student with a booking for the room', () => {
    expect(accessService({ ...user, bookings: ['G02'] }, door)).toBe(true);
  });

  test('student with nothing special (right side of && is false)', () => {
    expect(accessService(user, door)).toBe(false);
  });

  test('staff', () => {
    expect(accessService({ ...user, role: 'staff' }, door)).toBe(false);
  });
});
