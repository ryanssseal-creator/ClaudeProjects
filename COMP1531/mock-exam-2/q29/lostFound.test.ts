import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

function clearRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

function reportRequest(description: string, location: string) {
  const res = request('POST', SERVER_URL + '/item', {
    json: { description, location }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function searchRequest(keyword?: string) {
  const res = request('GET', SERVER_URL + '/item/search', {
    qs: keyword === undefined ? {} : { keyword }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function getItemRequest(itemId: number) {
  const res = request('GET', SERVER_URL + `/item/${itemId}`);
  return { status: res.statusCode, body: res.getJSON() };
}

function claimRequest(itemId: number, zid: string) {
  const res = request('PUT', SERVER_URL + `/item/${itemId}/claim`, {
    json: { zid }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function removeClaimedRequest(role: string) {
  const res = request('DELETE', SERVER_URL + '/item/claimed', {
    headers: { role }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function removeItemRequest(role: string, itemId: number) {
  const res = request('DELETE', SERVER_URL + `/item/${itemId}`, {
    headers: { role }
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

describe('POST /item', () => {
  test('error: description too short', () => {
    expect(reportRequest('Hat', 'Quad')).toStrictEqual({ status: 400, body: ERROR('INVALID_DESCRIPTION') });
  });

  test('error: description too long', () => {
    expect(reportRequest('a'.repeat(51), 'Quad')).toStrictEqual({ status: 400, body: ERROR('INVALID_DESCRIPTION') });
  });

  test('error: invalid location', () => {
    expect(reportRequest('Black umbrella', 'Mars')).toStrictEqual({ status: 400, body: ERROR('INVALID_LOCATION') });
  });

  test('success: returns itemId', () => {
    expect(reportRequest('Black umbrella', 'Library')).toStrictEqual({ status: 200, body: { itemId: expect.any(Number) } });
  });

  test('success: ids are unique', () => {
    const a = reportRequest('Black umbrella', 'Library').body.itemId;
    const b = reportRequest('Blue water bottle', 'Quad').body.itemId;
    expect(a).not.toBe(b);
  });
});

describe('GET /item/search', () => {
  test('error: keyword too short', () => {
    expect(searchRequest('a')).toStrictEqual({ status: 400, body: ERROR('INVALID_KEYWORD') });
  });

  test('error: keyword not given', () => {
    expect(searchRequest()).toStrictEqual({ status: 400, body: ERROR('INVALID_KEYWORD') });
  });

  test('success: no matches', () => {
    reportRequest('Black umbrella', 'Library');
    expect(searchRequest('laptop')).toStrictEqual({ status: 200, body: { items: [] } });
  });

  test('success: matches are case-insensitive', () => {
    const a = reportRequest('Black umbrella', 'Library').body.itemId;
    reportRequest('Blue water bottle', 'Quad');
    expect(searchRequest('UMBRELLA')).toStrictEqual({
      status: 200,
      body: { items: [{ itemId: a, description: 'Black umbrella', location: 'Library', claimedBy: null }] }
    });
  });

  test('success: claimed items are not returned', () => {
    const a = reportRequest('Black umbrella', 'Library').body.itemId;
    claimRequest(a, 'z5555555');
    expect(searchRequest('umbrella')).toStrictEqual({ status: 200, body: { items: [] } });
  });
});

describe('GET /item/{itemid}', () => {
  test('error: invalid item id', () => {
    const a = reportRequest('Black umbrella', 'Library').body.itemId;
    expect(getItemRequest(a + 1)).toStrictEqual({ status: 400, body: ERROR('INVALID_ITEM_ID') });
  });

  test('success: returns the item', () => {
    reportRequest('Black umbrella', 'Library');
    const b = reportRequest('Blue water bottle', 'Quad').body.itemId;
    expect(getItemRequest(b)).toStrictEqual({
      status: 200,
      body: { item: { itemId: b, description: 'Blue water bottle', location: 'Quad', claimedBy: null } }
    });
  });
});

describe('PUT /item/{itemid}/claim', () => {
  let a: number;
  beforeEach(() => {
    a = reportRequest('Black umbrella', 'Library').body.itemId;
  });

  test('error: invalid item id', () => {
    expect(claimRequest(a + 1, 'z5555555')).toStrictEqual({ status: 400, body: ERROR('INVALID_ITEM_ID') });
  });

  test('error: invalid zid', () => {
    expect(claimRequest(a, '5555555')).toStrictEqual({ status: 400, body: ERROR('INVALID_ZID') });
  });

  test('error: already claimed', () => {
    claimRequest(a, 'z5555555');
    expect(claimRequest(a, 'z1111111')).toStrictEqual({ status: 400, body: ERROR('ALREADY_CLAIMED') });
  });

  test('success: returns empty object', () => {
    expect(claimRequest(a, 'z5555555')).toStrictEqual({ status: 200, body: {} });
  });

  test('success: item records who claimed it', () => {
    claimRequest(a, 'z5555555');
    expect(getItemRequest(a).body.item.claimedBy).toBe('z5555555');
  });
});

describe('DELETE /item/claimed', () => {
  let a: number, b: number, c: number;
  beforeEach(() => {
    a = reportRequest('Black umbrella', 'Library').body.itemId;
    b = reportRequest('Blue water bottle', 'Quad').body.itemId;
    c = reportRequest('Scientific calculator', 'K17').body.itemId;
    claimRequest(a, 'z5555555');
    claimRequest(c, 'z1111111');
  });

  test('error: role is not security', () => {
    expect(removeClaimedRequest('student')).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('success: returns how many were removed', () => {
    expect(removeClaimedRequest('security')).toStrictEqual({ status: 200, body: { removed: 2 } });
  });

  test('success: claimed items are gone, unclaimed items remain', () => {
    removeClaimedRequest('security');
    expect(getItemRequest(a).status).toBe(400);
    expect(getItemRequest(c).status).toBe(400);
    expect(getItemRequest(b).status).toBe(200);
  });
});

describe('DELETE /item/{itemid}', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = reportRequest('Black umbrella', 'Library').body.itemId;
    b = reportRequest('Blue water bottle', 'Quad').body.itemId;
  });

  test('error: role is not security', () => {
    expect(removeItemRequest('student', a)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: invalid item id', () => {
    expect(removeItemRequest('security', b + 1)).toStrictEqual({ status: 400, body: ERROR('INVALID_ITEM_ID') });
  });

  test('success: returns empty object', () => {
    expect(removeItemRequest('security', a)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: only that item is removed', () => {
    removeItemRequest('security', a);
    expect(getItemRequest(a).status).toBe(400);
    expect(getItemRequest(b).status).toBe(200);
  });
});
