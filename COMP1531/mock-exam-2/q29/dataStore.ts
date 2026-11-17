export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export type Genre = 'Fiction' | 'Science' | 'History';

export interface BooksReturn {
  books: Book[]
}

export interface BookId {
  bookId: number,
}

export interface Book {
  title: string,
  genre: Genre,
  copies: number
}

export interface BookDataStore extends BookId, Book {}

export interface DataStore {
  books: BookDataStore[]
}

const dataStore: DataStore = {
  books: []
};

export const getData = (): DataStore => dataStore;
