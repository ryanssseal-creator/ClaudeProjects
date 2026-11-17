import { describe, test, expect, beforeEach } from 'vitest';
import { createEvent, register, cancel, getEvent, countByCategory, clear } from './events.ts';

beforeEach(() => {
  clear();
});

describe('createEvent()', () => {
  test('success > returns the eventId', () => {
    expect(createEvent('Git workshop', 20, 'workshop')).toStrictEqual({ eventId: expect.any(Number) });
  });

  test('error > empty name', () => {
    expect(createEvent('', 20, 'talk')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > capacity below 1', () => {
    expect(createEvent('Trivia', 0, 'social')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('register()', () => {
  let ev: { eventId: number };
  beforeEach(() => {
    ev = createEvent('Trivia', 2, 'social') as { eventId: number };
  });

  test('success > returns spots left', () => {
    expect(register(ev.eventId, 'a@x.com')).toStrictEqual({ spotsLeft: 1 });
    expect(register(ev.eventId, 'b@x.com')).toStrictEqual({ spotsLeft: 0 });
  });

  test('error > invalid eventId', () => {
    expect(register(ev.eventId + 1, 'a@x.com')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > already registered', () => {
    register(ev.eventId, 'a@x.com');
    expect(register(ev.eventId, 'a@x.com')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > event full', () => {
    register(ev.eventId, 'a@x.com');
    register(ev.eventId, 'b@x.com');
    expect(register(ev.eventId, 'c@x.com')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('cancel()', () => {
  let ev: { eventId: number };
  beforeEach(() => {
    ev = createEvent('Trivia', 2, 'social') as { eventId: number };
    register(ev.eventId, 'a@x.com');
  });

  test('success > removes the attendee', () => {
    expect(cancel(ev.eventId, 'a@x.com')).toStrictEqual({});
    expect(getEvent(ev.eventId)).toStrictEqual({
      event: { eventId: ev.eventId, name: 'Trivia', capacity: 2, category: 'social', attendees: [] },
    });
  });

  test('error > not registered', () => {
    expect(cancel(ev.eventId, 'zzz@x.com')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > invalid eventId', () => {
    expect(cancel(ev.eventId + 1, 'a@x.com')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('getEvent()', () => {
  test('returns the event details', () => {
    const ev = createEvent('Git workshop', 20, 'workshop') as { eventId: number };
    register(ev.eventId, 'a@x.com');
    expect(getEvent(ev.eventId)).toStrictEqual({
      event: { eventId: ev.eventId, name: 'Git workshop', capacity: 20, category: 'workshop', attendees: ['a@x.com'] },
    });
  });

  test('error > invalid eventId', () => {
    expect(getEvent(42)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('countByCategory()', () => {
  test('counts events per category', () => {
    createEvent('Git workshop', 20, 'workshop');
    createEvent('Trivia', 10, 'social');
    createEvent('TS workshop', 15, 'workshop');
    expect(countByCategory()).toStrictEqual({ workshop: 2, social: 1 });
  });

  test('no events gives an empty object', () => {
    expect(countByCategory()).toStrictEqual({});
  });
});
