// SOLUTION - Mock Exam 1, Q30 Part 2
//
// The hint in the spec: reuse Part 1. Every input that covered a line in entry.ts
// covers the same line when it is sent over HTTP instead.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const guest = { name: 'ryan', status: 'member', ticket: 'none' };
const venue = { blocked: [] as string[], hosts: [] as string[], guestList: [] as string[], membersNight: false };

function entryRequest(g: typeof guest, v: typeof venue) {
  const res = request('POST', SERVER_URL + '/events/entry', {
    json: { guest: g, venue: v }
  });
  return res.getJSON();
}

describe('tests', () => {
  test('banned guest', () => {
    expect(entryRequest({ ...guest, status: 'banned' }, venue)).toBe(false);
  });

  test('blocked by the venue', () => {
    expect(entryRequest(guest, { ...venue, blocked: ['ryan'] })).toBe(false);
  });

  test('vip ticket', () => {
    expect(entryRequest({ ...guest, ticket: 'vip' }, venue)).toBe(true);
  });

  test('member with a general ticket on members night', () => {
    expect(entryRequest({ ...guest, ticket: 'general' }, { ...venue, membersNight: true })).toBe(true);
  });

  test('member on the guest list', () => {
    expect(entryRequest(guest, { ...venue, guestList: ['ryan'] })).toBe(true);
  });

  test('member with nothing special', () => {
    expect(entryRequest(guest, venue)).toBe(false);
  });
});
