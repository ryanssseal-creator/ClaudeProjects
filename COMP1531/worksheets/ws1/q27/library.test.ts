import { describe, test, expect, beforeEach } from 'vitest';
import { addBook, borrowBook, getBooksByAuthor, countAvailable, clear } from './library.ts';

beforeEach(() => {
  clear();
});

describe('addBook()', () => {
  test('success > returns the bookId', () => {
    expect(addBook('Dune', 'Frank Herbert')).toStrictEqual({ bookId: expect.any(Number) });
  });

  test('success > with a year', () => {
    expect(addBook('Dune', 'Frank Herbert', 1965)).toStrictEqual({ bookId: expect.any(Number) });
  });

  test('error > empty title', () => {
    expect(addBook('', 'Frank Herbert')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > empty author', () => {
    expect(addBook('Dune', '')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('borrowBook()', () => {
  let book: { bookId: number };
  beforeEach(() => {
    book = addBook('Dune', 'Frank Herbert') as { bookId: number };
  });

  test('success > returns empty object', () => {
    expect(borrowBook(book.bookId, 'Ryan')).toStrictEqual({});
  });

  test('error > invalid bookId', () => {
    expect(borrowBook(book.bookId + 1, 'Ryan')).toStrictEqual({ error: expect.any(String) });
  });

  test('error > already borrowed', () => {
    borrowBook(book.bookId, 'Ryan');
    expect(borrowBook(book.bookId, 'Sam')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('getBooksByAuthor()', () => {
  test('returns only that author\'s books', () => {
    const a = addBook('Dune', 'Frank Herbert') as { bookId: number };
    addBook('Emma', 'Jane Austen');
    const c = addBook('Dune Messiah', 'Frank Herbert', 1969) as { bookId: number };
    borrowBook(c.bookId, 'Ryan');
    expect(getBooksByAuthor('Frank Herbert')).toStrictEqual({
      books: [
        { bookId: a.bookId, title: 'Dune', author: 'Frank Herbert', borrower: null },
        { bookId: c.bookId, title: 'Dune Messiah', author: 'Frank Herbert', borrower: 'Ryan', year: 1969 },
      ]
    });
  });

  test('returns an empty list when there are none', () => {
    expect(getBooksByAuthor('Nobody')).toStrictEqual({ books: [] });
  });
});

describe('countAvailable()', () => {
  test('counts books that are not borrowed', () => {
    const a = addBook('Dune', 'Frank Herbert') as { bookId: number };
    addBook('Emma', 'Jane Austen');
    expect(countAvailable()).toBe(2);
    borrowBook(a.bookId, 'Ryan');
    expect(countAvailable()).toBe(1);
  });
});
