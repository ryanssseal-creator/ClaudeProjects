interface BookType {
  bookId: number;
  title: string;
  author: string;
  borrower: string | null;
  year?: number;
};

interface ErrorResponse {
  error: string;
};

let books: BookType[] = [];
let nextId = 1;

/**
 * Add a new book to the library.
 * @param {string} title - the title of the book
 * @param {string} author - the author of the book
 * @param {number} year - OPTIONAL. The year the book was published, e.g. 1965
 * @returns {bookId Object} - returns the bookId as the number in the object,
 * or an error object that includes error(string).
 */
export function addBook(title: string, author: string, year?: number): { bookId: number } | ErrorResponse {
  if (title.length === 0 || author.length === 0) {
    return { error: 'Title and author are required' };
  }

  const book: BookType = {
    bookId: nextId,
    title: title,
    author: author,
    borrower: null,
  };
  if (year !== undefined) {
    book.year = year;
  }
  books.push(book);
  nextId++;
  return { bookId: book.bookId };
}

/**
 * Borrow a book.
 * @param {number} bookId - the id of the book
 * @param {string} borrower - the name of the person borrowing it
 * @returns {} - empty object, or an error object that includes error(string)
 * if the bookId is invalid or the book is already borrowed.
 */
export function borrowBook(bookId: number, borrower: string): Record<string, never> | ErrorResponse {
  const book = books.find(b => b.bookId === bookId);
  if (book === undefined) {
    return { error: 'Invalid bookId' };
  }
  if (book.borrower !== null) {
    return { error: 'Book is already borrowed' };
  }
  book.borrower = borrower;
  return {};
}

/**
 * Get every book written by the given author.
 * @param {string} author - the author to search for
 * @returns {books Object} - an object containing books, which is an array of book objects.
 * Each book object includes bookId(number), title(string), author(string),
 * borrower(string, or null if not borrowed) and, if one was given, year(number).
 */
export function getBooksByAuthor(author: string): { books: BookType[] } {
  return { books: books.filter(b => b.author === author) };
};

/**
 * Count the books that are not currently borrowed.
 * @returns {number} - how many books are available
 */
export function countAvailable(): number {
  return books.filter(b => b.borrower === null).length;
};

/**
 * Clear the library.
 * @returns {}
 */
export function clear(): Record<string, never> {
  books = [];
  nextId = 1;
  return {};
}
