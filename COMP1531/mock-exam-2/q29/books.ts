/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  Book,
  BookDataStore,
  BookId,
  BooksReturn,
  DataStore,
  EmptyObject,
  ErrorObject,
  Genre,
  getData,
} from './dataStore.ts';

const GENRES = ['Fiction', 'Science', 'History'];
const MIN_BOOK_TITLE = 3;
const MAX_BOOK_TITLE = 40;
const MIN_COPIES = 1;
const MAX_COPIES = 20;
const MIN_EXTRA_COPIES = 1;
const MAX_EXTRA_COPIES = 5;

/**
 *  Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.books = [];
  return {};
};

/**
 * Creates a new book given title, genre, and number of copies
 *
 * @param {string} title - title of the new book
 * @param {Genre} genre - genre of the new book
 * @param {number} copies - how many copies the shop has
 * @returns {BookId | ErrorObject} - Returns the created book's Id on success,
 * or an object containing the error message if validation fails.
 */
export const addNewBook = (title: string, genre: Genre, copies: number): BookId | ErrorObject => {
  const data: DataStore = getData();

  if (!title) {
    return {
      error: 'INVALID_BOOK_TITLE',
      message: 'Empty book title'
    };
  }

  if (title.length < MIN_BOOK_TITLE || title.length > MAX_BOOK_TITLE) {
    return {
      error: 'INVALID_BOOK_TITLE',
      message: 'Book title too short or too long'
    };
  }

  if (copies < MIN_COPIES || copies > MAX_COPIES) {
    return {
      error: 'INVALID_COPIES',
      message: 'Copies must be between 1 and 20'
    };
  }

  if (data.books.find(b => b.title === title && b.genre === genre)) {
    return {
      error: 'INVALID_BOOK',
      message: `${genre} book ${title} already exists`
    };
  }

  const bookId = data.books.length;
  const newBook: BookDataStore = {
    bookId: bookId,
    title: title,
    genre: genre,
    copies: copies
  };
  data.books.push(newBook);

  return { bookId };
};

/**
 * Gets books of the given genre (in descending order of copies)
 *
 * @param {string} genre - the genre of books to be retrieved
 * @returns {BooksReturn | ErrorObject} - returns a list of books of the given genre if valid,
 * otherwise, returns an object containing the error message if validation fails.
 */
export const getBooksByGenre = (genre: string): BooksReturn | ErrorObject => {
  const data: DataStore = getData();

  if (!GENRES.includes(genre)) {
    return {
      error: 'INVALID_GENRE',
      message: 'Genre must be Fiction, Science or History'
    };
  }

  const books: BookDataStore[] = data.books.filter(b => b.genre === genre);
  const booksRet: Book[] = books.map(({ bookId, ...rest }) => rest)
    .sort((a, b) => b.copies - a.copies);

  return {
    books: booksRet
  };
};

/**
 * Get books by IDs given a list of book Ids.
 * Returns the books in the order of the ids given.
 *
 * @param {number[]} bookIds - list of book ids
 * @returns {BooksReturn | ErrorObject} - Returns the books given a list of ids if found,
 * otherwise an object containing the error message if validation fails.
 */
export const getBooksByIds = (bookIds: number[]): BooksReturn | ErrorObject => {
  const data: DataStore = getData();
  const books: BookDataStore[] = [];

  for (const bookId of bookIds) {
    const book = data.books.find(b => b.bookId === bookId);
    if (!book) {
      return {
        error: 'INVALID_BOOK_ID',
        message: 'One of the bookIds does not refer to a valid book'
      };
    }

    books.push(book);
  }

  const booksRet: Book[] = books.map(({ bookId, ...rest }) => rest);

  return {
    books: booksRet
  };
};

/**
 * Update the number of copies of a book given a book Id
 *
 * @param {string} role - role of the user attempting to update the copies
 * @param {number} bookId - ID of the book whose copies are to be updated
 * @param {number} newCopies - new number of copies to be set on the book
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updateBookCopiesById = (role: string, bookId: number, newCopies: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update copies'
    };
  }

  const book = data.books.find(b => b.bookId === bookId);
  if (!book) {
    return {
      error: 'INVALID_BOOK_ID',
      message: 'Invalid bookId'
    };
  }

  if (newCopies < MIN_COPIES || newCopies > MAX_COPIES) {
    return {
      error: 'INVALID_COPIES',
      message: 'Copies must be between 1 and 20'
    };
  }

  book.copies = newCopies;

  return {};
};

/**
 * Updates all books by adding extraCopies to the original number of copies.
 * If the final number of copies is greater than 20, it is capped at 20.
 *
 * @param {string} role - role of the user attempting to update copies
 * @param {number} extraCopies - the number of copies to add to every book
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updateAllBookCopies = (role: string, extraCopies: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update copies'
    };
  }

  if (extraCopies < MIN_EXTRA_COPIES || extraCopies > MAX_EXTRA_COPIES) {
    return {
      error: 'INVALID_EXTRA_COPIES',
      message: 'Extra copies must be between 1 and 5'
    };
  }

  data.books.forEach((b) => {
    b.copies = Math.min(b.copies + extraCopies, MAX_COPIES);
  });

  return {};
};
