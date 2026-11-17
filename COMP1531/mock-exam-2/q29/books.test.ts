import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

function clearRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

function addBookRequest(title: string, genre: string, copies: number) {
  const res = request('POST', SERVER_URL + '/book/add', {
    json: { title, genre, copies }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function filterRequest(genre: string) {
  const res = request('GET', SERVER_URL + '/book/filter', {
    qs: { genre }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function listRequest(bookIds: string) {
  const res = request('GET', SERVER_URL + '/book/list', {
    qs: { bookIds }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function updateCopiesRequest(role: string, bookId: number, copies: number) {
  const res = request('PUT', SERVER_URL + `/book/${bookId}`, {
    headers: { role },
    json: { copies }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function updateAllRequest(role: string, extraCopies: number) {
  const res = request('PUT', SERVER_URL + '/book/all', {
    headers: { role },
    json: { extraCopies }
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

describe('POST /book/add', () => {
  test('error: title is empty', () => {
    expect(addBookRequest('', 'Fiction', 3)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK_TITLE') });
  });

  test('error: title too short', () => {
    expect(addBookRequest('It', 'Fiction', 3)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK_TITLE') });
  });

  test('error: title too long', () => {
    expect(addBookRequest('a'.repeat(41), 'Fiction', 3)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK_TITLE') });
  });

  test('error: invalid copies', () => {
    expect(addBookRequest('Dune', 'Fiction', 0)).toStrictEqual({ status: 400, body: ERROR('INVALID_COPIES') });
    expect(addBookRequest('Dune', 'Fiction', 21)).toStrictEqual({ status: 400, body: ERROR('INVALID_COPIES') });
  });

  test('error: book already exists', () => {
    addBookRequest('Dune', 'Fiction', 3);
    expect(addBookRequest('Dune', 'Fiction', 5)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK') });
  });

  test('success: returns bookId', () => {
    expect(addBookRequest('Dune', 'Fiction', 3)).toStrictEqual({ status: 200, body: { bookId: expect.any(Number) } });
  });
});

describe('GET /book/filter', () => {
  test('error: invalid genre', () => {
    expect(filterRequest('Cooking')).toStrictEqual({ status: 400, body: ERROR('INVALID_GENRE') });
  });

  test('success: empty list', () => {
    expect(filterRequest('History')).toStrictEqual({ status: 200, body: { books: [] } });
  });

  test('success: only that genre, in descending order of copies', () => {
    addBookRequest('Dune', 'Fiction', 3);
    addBookRequest('Cosmos', 'Science', 10);
    addBookRequest('Emma', 'Fiction', 8);
    expect(filterRequest('Fiction')).toStrictEqual({
      status: 200,
      body: {
        books: [
          { title: 'Emma', genre: 'Fiction', copies: 8 },
          { title: 'Dune', genre: 'Fiction', copies: 3 },
        ]
      }
    });
  });
});

describe('GET /book/list', () => {
  let a: number, b: number, c: number;
  beforeEach(() => {
    a = addBookRequest('Dune', 'Fiction', 3).body.bookId;
    b = addBookRequest('Cosmos', 'Science', 10).body.bookId;
    c = addBookRequest('SPQR', 'History', 5).body.bookId;
  });

  test('error: one id is invalid', () => {
    expect(listRequest(`${a},${c + 100}`)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK_ID') });
  });

  test('success: single id', () => {
    expect(listRequest(`${b}`)).toStrictEqual({
      status: 200,
      body: { books: [{ title: 'Cosmos', genre: 'Science', copies: 10 }] }
    });
  });

  test('success: multiple ids, in the order given', () => {
    expect(listRequest(`${c},${a},${b}`)).toStrictEqual({
      status: 200,
      body: {
        books: [
          { title: 'SPQR', genre: 'History', copies: 5 },
          { title: 'Dune', genre: 'Fiction', copies: 3 },
          { title: 'Cosmos', genre: 'Science', copies: 10 },
        ]
      }
    });
  });
});

describe('PUT /book/{bookid}', () => {
  let a: number;
  beforeEach(() => {
    a = addBookRequest('Dune', 'Fiction', 3).body.bookId;
  });

  test('error: role is not admin', () => {
    expect(updateCopiesRequest('NOT_ADMIN', a, 6)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: invalid book id', () => {
    expect(updateCopiesRequest('admin', a + 1, 6)).toStrictEqual({ status: 400, body: ERROR('INVALID_BOOK_ID') });
  });

  test('error: invalid copies', () => {
    expect(updateCopiesRequest('admin', a, 21)).toStrictEqual({ status: 400, body: ERROR('INVALID_COPIES') });
  });

  test('success: returns empty object', () => {
    expect(updateCopiesRequest('admin', a, 6)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: copies are updated', () => {
    updateCopiesRequest('admin', a, 6);
    expect(listRequest(`${a}`).body.books[0].copies).toBe(6);
  });
});

describe('PUT /book/all', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = addBookRequest('Dune', 'Fiction', 3).body.bookId;
    b = addBookRequest('Cosmos', 'Science', 19).body.bookId;
  });

  test('error: role is not admin', () => {
    expect(updateAllRequest('NOT_ADMIN', 2)).toStrictEqual({ status: 403, body: ERROR('INVALID_ROLE') });
  });

  test('error: extraCopies too small', () => {
    expect(updateAllRequest('admin', 0)).toStrictEqual({ status: 400, body: ERROR('INVALID_EXTRA_COPIES') });
  });

  test('error: extraCopies too large', () => {
    expect(updateAllRequest('admin', 6)).toStrictEqual({ status: 400, body: ERROR('INVALID_EXTRA_COPIES') });
  });

  test('success: returns empty object', () => {
    expect(updateAllRequest('admin', 2)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: every book is increased, capped at 20', () => {
    updateAllRequest('admin', 2);
    const books = listRequest(`${a},${b}`).body.books;
    expect(books[0].copies).toBe(5);
    expect(books[1].copies).toBe(20);
  });
});
