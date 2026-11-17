import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

function clearRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

function addEventRequest(title: string, category: string, capacity: number) {
  const res = request('POST', SERVER_URL + '/event/add', {
    json: { title, category, capacity }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function filterRequest(category: string) {
  const res = request('GET', SERVER_URL + '/event/filter', {
    qs: { category }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function listRequest(eventIds: string) {
  const res = request('GET', SERVER_URL + '/event/list', {
    qs: { eventIds }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function updateCapacityRequest(role: string, eventId: number, capacity: number) {
  const res = request('PUT', SERVER_URL + `/event/${eventId}`, {
    headers: { role },
    json: { capacity }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function increaseAllRequest(role: string, extraCapacity: number) {
  const res = request('PUT', SERVER_URL + '/event/all', {
    headers: { role },
    json: { extraCapacity }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

const ERROR = (name: string) => ({ error: name, message: expect.any(String) });

beforeEach(() => {
  clearRequest();
});

describe('DELETE /clear', () => {
  test('returns empty object', () => {
    expect(clearRequest()).toStrictEqual({ status: 200, body: {} });
  });
});

describe('POST /event/add', () => {
  test('error: title too short', () => {
    expect(addEventRequest('ab', 'Social', 50)).toStrictEqual({ status: 400, body: ERROR('INVALID_TITLE') });
  });

  test('error: title too long', () => {
    expect(addEventRequest('a'.repeat(31), 'Social', 50)).toStrictEqual({ status: 400, body: ERROR('INVALID_TITLE') });
  });

  test('error: invalid category', () => {
    expect(addEventRequest('Trivia Night', 'Party', 50)).toStrictEqual({ status: 400, body: ERROR('INVALID_CATEGORY') });
  });

  test('error: invalid capacity', () => {
    expect(addEventRequest('Trivia Night', 'Social', 0)).toStrictEqual({ status: 400, body: ERROR('INVALID_CAPACITY') });
    expect(addEventRequest('Trivia Night', 'Social', 501)).toStrictEqual({ status: 400, body: ERROR('INVALID_CAPACITY') });
  });

  test('error: duplicate event', () => {
    addEventRequest('Trivia Night', 'Social', 50);
    expect(addEventRequest('Trivia Night', 'Social', 60)).toStrictEqual({ status: 400, body: ERROR('DUPLICATE_EVENT') });
  });

  test('success: returns eventId', () => {
    expect(addEventRequest('Trivia Night', 'Social', 50)).toStrictEqual({ status: 200, body: { eventId: expect.any(Number) } });
  });

  test('success: same title in a different category', () => {
    addEventRequest('Welcome Week', 'Social', 50);
    expect(addEventRequest('Welcome Week', 'Sports', 50).status).toBe(200);
  });
});

describe('GET /event/filter', () => {
  test('error: invalid category', () => {
    expect(filterRequest('Party')).toStrictEqual({ status: 400, body: ERROR('INVALID_CATEGORY') });
  });

  test('success: empty list', () => {
    expect(filterRequest('Sports')).toStrictEqual({ status: 200, body: { events: [] } });
  });

  test('success: only that category, in descending capacity order', () => {
    const a = addEventRequest('Trivia Night', 'Social', 50).body.eventId;
    addEventRequest('Exam Revision', 'Academic', 300);
    const c = addEventRequest('Boat Cruise', 'Social', 200).body.eventId;
    expect(filterRequest('Social')).toStrictEqual({
      status: 200,
      body: {
        events: [
          { eventId: c, title: 'Boat Cruise', category: 'Social', capacity: 200 },
          { eventId: a, title: 'Trivia Night', category: 'Social', capacity: 50 },
        ]
      }
    });
  });
});

describe('GET /event/list', () => {
  let a: number, b: number, c: number;
  beforeEach(() => {
    a = addEventRequest('Trivia Night', 'Social', 50).body.eventId;
    b = addEventRequest('Exam Revision', 'Academic', 300).body.eventId;
    c = addEventRequest('Futsal Finals', 'Sports', 40).body.eventId;
  });

  test('error: one id is invalid', () => {
    expect(listRequest(`${a},${c + 100}`)).toStrictEqual({ status: 400, body: ERROR('INVALID_EVENT_ID') });
  });

  test('success: single id', () => {
    expect(listRequest(`${b}`)).toStrictEqual({
      status: 200,
      body: { events: [{ eventId: b, title: 'Exam Revision', category: 'Academic', capacity: 300 }] }
    });
  });

  test('success: multiple ids, in the order given', () => {
    const { status, body } = listRequest(`${c},${a},${b}`);
    expect(status).toBe(200);
    expect(body.events.map((e: { eventId: number }) => e.eventId)).toStrictEqual([c, a, b]);
  });
});

describe('PUT /event/{eventid}', () => {
  let a: number;
  beforeEach(() => {
    a = addEventRequest('Trivia Night', 'Social', 50).body.eventId;
  });

  test('error: role is not organiser', () => {
    expect(updateCapacityRequest('student', a, 60)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: invalid event id', () => {
    expect(updateCapacityRequest('organiser', a + 1, 60)).toStrictEqual({ status: 400, body: ERROR('INVALID_EVENT_ID') });
  });

  test('error: invalid capacity', () => {
    expect(updateCapacityRequest('organiser', a, 501)).toStrictEqual({ status: 400, body: ERROR('INVALID_CAPACITY') });
  });

  test('success: returns empty object', () => {
    expect(updateCapacityRequest('organiser', a, 60)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: capacity is updated', () => {
    updateCapacityRequest('organiser', a, 60);
    expect(listRequest(`${a}`).body.events[0].capacity).toBe(60);
  });
});

describe('PUT /event/all', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = addEventRequest('Trivia Night', 'Social', 50).body.eventId;
    b = addEventRequest('Exam Revision', 'Academic', 480).body.eventId;
  });

  test('error: role is not organiser', () => {
    expect(increaseAllRequest('student', 10)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: extraCapacity too small', () => {
    expect(increaseAllRequest('organiser', 0)).toStrictEqual({ status: 400, body: ERROR('INVALID_EXTRA_CAPACITY') });
  });

  test('error: extraCapacity too large', () => {
    expect(increaseAllRequest('organiser', 51)).toStrictEqual({ status: 400, body: ERROR('INVALID_EXTRA_CAPACITY') });
  });

  test('success: returns empty object', () => {
    expect(increaseAllRequest('organiser', 30)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: every capacity is increased, capped at 500', () => {
    increaseAllRequest('organiser', 30);
    const events = listRequest(`${a},${b}`).body.events;
    expect(events[0].capacity).toBe(80);
    expect(events[1].capacity).toBe(500);
  });
});
