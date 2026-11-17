import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

function clearRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

function addPlantRequest(name: string, size: string, price: number) {
  const res = request('POST', SERVER_URL + '/plant/add', {
    json: { name, size, price }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function filterRequest(price: number) {
  const res = request('GET', SERVER_URL + '/plant/filter', {
    qs: { price }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function listRequest(plantIds: string) {
  const res = request('GET', SERVER_URL + '/plant/list', {
    qs: { plantIds }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function updatePriceRequest(role: string, plantId: number, price: number) {
  const res = request('PUT', SERVER_URL + `/plant/${plantId}`, {
    headers: { role },
    json: { price }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function discountAllRequest(role: string, discountAmount: number) {
  const res = request('PUT', SERVER_URL + '/plant/all', {
    headers: { role },
    json: { discountAmount }
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

describe('POST /plant/add', () => {
  test('error: name is empty', () => {
    expect(addPlantRequest('', 'Small', 25)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_NAME') });
  });

  test('error: name too short', () => {
    expect(addPlantRequest('Ox', 'Small', 25)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_NAME') });
  });

  test('error: name too long', () => {
    expect(addPlantRequest('p'.repeat(26), 'Small', 25)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_NAME') });
  });

  test('error: invalid price', () => {
    expect(addPlantRequest('Monstera', 'Small', 4)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_PRICE') });
    expect(addPlantRequest('Monstera', 'Small', 201)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_PRICE') });
  });

  test('error: plant already exists', () => {
    addPlantRequest('Monstera', 'Small', 25);
    expect(addPlantRequest('Monstera', 'Small', 30)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT') });
  });

  test('success: returns plantId', () => {
    expect(addPlantRequest('Monstera', 'Small', 25)).toStrictEqual({ status: 200, body: { plantId: expect.any(Number) } });
  });
});

describe('GET /plant/filter', () => {
  test('error: price too low', () => {
    expect(filterRequest(4)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_PRICE') });
  });

  test('error: price too high', () => {
    expect(filterRequest(201)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_PRICE') });
  });

  test('success: empty list', () => {
    expect(filterRequest(50)).toStrictEqual({ status: 200, body: { plants: [] } });
  });

  test('success: plants at or under the price, in ascending price order', () => {
    addPlantRequest('Monstera', 'Small', 25);
    addPlantRequest('Fiddle Leaf Fig', 'Large', 120);
    addPlantRequest('Succulent', 'Small', 8);
    addPlantRequest('Peace Lily', 'Medium', 30);
    expect(filterRequest(30)).toStrictEqual({
      status: 200,
      body: {
        plants: [
          { name: 'Succulent', size: 'Small', price: 8 },
          { name: 'Monstera', size: 'Small', price: 25 },
          { name: 'Peace Lily', size: 'Medium', price: 30 },
        ]
      }
    });
  });
});

describe('GET /plant/list', () => {
  let a: number, b: number, c: number;
  beforeEach(() => {
    a = addPlantRequest('Monstera', 'Small', 25).body.plantId;
    b = addPlantRequest('Fiddle Leaf Fig', 'Large', 120).body.plantId;
    c = addPlantRequest('Succulent', 'Small', 8).body.plantId;
  });

  test('error: one id is invalid', () => {
    expect(listRequest(`${a},${c + 100}`)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_ID') });
  });

  test('success: single id', () => {
    expect(listRequest(`${b}`)).toStrictEqual({
      status: 200,
      body: { plants: [{ name: 'Fiddle Leaf Fig', size: 'Large', price: 120 }] }
    });
  });

  test('success: multiple ids, in the order given', () => {
    expect(listRequest(`${c},${a},${b}`)).toStrictEqual({
      status: 200,
      body: {
        plants: [
          { name: 'Succulent', size: 'Small', price: 8 },
          { name: 'Monstera', size: 'Small', price: 25 },
          { name: 'Fiddle Leaf Fig', size: 'Large', price: 120 },
        ]
      }
    });
  });
});

describe('PUT /plant/{plantid}', () => {
  let a: number;
  beforeEach(() => {
    a = addPlantRequest('Monstera', 'Small', 25).body.plantId;
  });

  test('error: role is not admin', () => {
    expect(updatePriceRequest('NOT_ADMIN', a, 30)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: invalid plant id', () => {
    expect(updatePriceRequest('admin', a + 1, 30)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_ID') });
  });

  test('error: invalid price', () => {
    expect(updatePriceRequest('admin', a, 201)).toStrictEqual({ status: 400, body: ERROR('INVALID_PLANT_PRICE') });
  });

  test('success: returns empty object', () => {
    expect(updatePriceRequest('admin', a, 30)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: price is updated', () => {
    updatePriceRequest('admin', a, 30);
    expect(listRequest(`${a}`).body.plants[0].price).toBe(30);
  });
});

describe('PUT /plant/all', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = addPlantRequest('Monstera', 'Small', 25).body.plantId;
    b = addPlantRequest('Succulent', 'Small', 8).body.plantId;
  });

  test('error: role is not admin', () => {
    expect(discountAllRequest('NOT_ADMIN', 5)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: discountAmount too small', () => {
    expect(discountAllRequest('admin', 0)).toStrictEqual({ status: 400, body: ERROR('INVALID_DISCOUNT_AMOUNT') });
  });

  test('error: discountAmount too large', () => {
    expect(discountAllRequest('admin', 21)).toStrictEqual({ status: 400, body: ERROR('INVALID_DISCOUNT_AMOUNT') });
  });

  test('success: returns empty object', () => {
    expect(discountAllRequest('admin', 5)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: every price is reduced, but never below 5', () => {
    discountAllRequest('admin', 5);
    const plants = listRequest(`${a},${b}`).body.plants;
    expect(plants[0].price).toBe(20);
    expect(plants[1].price).toBe(5);
  });
});
