// SOLUTION - Mock Exam 1, Q30 Part 1
//
// Method: walk down the function and write one test for each way out of each `if`.
// For `a || b` and `a && b`, branch coverage also needs each half exercised.
import { describe, test, expect } from 'vitest';
import { entryService } from './entry.ts';
import { Guest, Venue } from './interface.ts';

// A "boring" guest and venue that hit no special case.
// Each test overrides only the one thing it is about.
const guest: Guest = { name: 'ryan', status: 'member', ticket: 'none' };
const venue: Venue = { blocked: [], hosts: [], guestList: [], membersNight: false };

describe('entryService tests', () => {
  test('banned guest', () => {
    expect(entryService({ ...guest, status: 'banned' }, venue)).toBe(false);
  });

  test('blocked by the venue', () => {
    expect(entryService(guest, { ...venue, blocked: ['ryan'] })).toBe(false);
  });

  test('vip ticket (left side of ||)', () => {
    expect(entryService({ ...guest, ticket: 'vip' }, venue)).toBe(true);
  });

  test('host (right side of ||)', () => {
    expect(entryService(guest, { ...venue, hosts: ['ryan'] })).toBe(true);
  });

  test('member with a general ticket on members night', () => {
    expect(entryService({ ...guest, ticket: 'general' }, { ...venue, membersNight: true })).toBe(true);
  });

  test('member with no ticket on members night (right side of && is false)', () => {
    expect(entryService(guest, { ...venue, membersNight: true })).toBe(false);
  });

  test('member on the guest list', () => {
    expect(entryService(guest, { ...venue, guestList: ['ryan'] })).toBe(true);
  });

  test('member with nothing special', () => {
    expect(entryService(guest, venue)).toBe(false);
  });

  test('regular guest', () => {
    expect(entryService({ ...guest, status: 'regular' }, venue)).toBe(false);
  });
});
