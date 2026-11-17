// SOLUTION - Mock Exam 3, Q30 Part 2
//
// The hint in the spec: reuse Part 1. Every input that covered a line in access.ts
// covers the same line when it is sent over HTTP instead.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const user = { zid: 'z5555555', role: 'student', building: 'K17', bookings: [] as string[] };
const door = { room: 'G02', building: 'J17', locked: false, owners: [] as string[], afterHours: false };

function accessRequest(u: typeof user, d: typeof door) {
  const res = request('POST', SERVER_URL + '/campus/access', {
    json: { user: u, door: d }
  });
  return res.getJSON();
}

describe('tests', () => {
  test('visitor', () => {
    expect(accessRequest({ ...user, role: 'visitor' }, door)).toBe(false);
  });

  test('locked door', () => {
    expect(accessRequest(user, { ...door, locked: true })).toBe(false);
  });

  test('security', () => {
    expect(accessRequest({ ...user, role: 'security' }, door)).toBe(true);
  });

  test('student in their own building during the day', () => {
    expect(accessRequest(user, { ...door, building: 'K17' })).toBe(true);
  });

  test('student with a booking for the room', () => {
    expect(accessRequest({ ...user, bookings: ['G02'] }, door)).toBe(true);
  });

  test('student with nothing special', () => {
    expect(accessRequest(user, door)).toBe(false);
  });
});
