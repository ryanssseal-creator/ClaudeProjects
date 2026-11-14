/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  DataStore,
  EmptyObject,
  ErrorObject,
  getData,
  NoteId,
  NoteReturn,
  NotesReturn,
  NoteSummary,
  StatsReturn,
} from './dataStore.ts';

// There are exactly two valid API keys.
// The viewer key can only read notes. The editor key can read and change notes.
const VIEWER_KEY = 'viewer-key-123';
const EDITOR_KEY = 'editor-key-456';

const MIN_TITLE = 1;
const MAX_TITLE = 30;
const MAX_BODY = 200;

/**
 * Checks an API key.
 *
 * @param {string} apiKey - the key sent with the request
 * @param {boolean} needsEditor - whether the operation changes data
 * @returns {ErrorObject | null} - UNAUTHORISED if the key is not a valid key,
 * FORBIDDEN if the key is valid but is not allowed to do this, otherwise null.
 */
const checkKey = (apiKey: string, needsEditor: boolean): ErrorObject | null => {
  if (apiKey !== VIEWER_KEY && apiKey !== EDITOR_KEY) {
    return {
      error: 'UNAUTHORISED',
      message: 'API key is missing or invalid'
    };
  }

  if (needsEditor && apiKey !== EDITOR_KEY) {
    return {
      error: 'FORBIDDEN',
      message: 'This API key can only read notes'
    };
  }

  return null;
};

/**
 * Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.notes = [];
  data.nextNoteId = 0;
  return {};
};

/**
 * Creates a new, unpinned note
 *
 * @param {string} apiKey - the key sent with the request
 * @param {string} title - title of the note
 * @param {string} body - text of the note
 * @returns {NoteId | ErrorObject} - Returns the new note's Id on success,
 * or an object containing the error message if validation fails.
 */
export const createNote = (apiKey: string, title: string, body: string): NoteId | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, true);
  if (keyError) {
    return keyError;
  }

  if (!title || title.length < MIN_TITLE || title.length > MAX_TITLE) {
    return {
      error: 'INVALID_TITLE',
      message: 'Title must be between 1 and 30 characters'
    };
  }

  if (typeof body !== 'string' || body.length > MAX_BODY) {
    return {
      error: 'INVALID_BODY',
      message: 'Body must be text of at most 200 characters'
    };
  }

  const noteId = data.nextNoteId;
  data.nextNoteId++;
  data.notes.push({ noteId, title, body, pinned: false });

  return { noteId };
};

/**
 * Lists notes (without their bodies), in the order they were created
 *
 * @param {string} apiKey - the key sent with the request
 * @param {boolean} pinnedOnly - if true, only pinned notes are returned
 * @returns {NotesReturn | ErrorObject} - returns the list of notes,
 * otherwise an object containing the error message if validation fails.
 */
export const listNotes = (apiKey: string, pinnedOnly: boolean): NotesReturn | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, false);
  if (keyError) {
    return keyError;
  }

  let notes = data.notes;
  if (pinnedOnly) {
    notes = notes.filter(n => n.pinned);
  }

  const summaries: NoteSummary[] = notes.map(n => ({ noteId: n.noteId, title: n.title, pinned: n.pinned }));

  return { notes: summaries };
};

/**
 * Counts the notes
 *
 * @param {string} apiKey - the key sent with the request
 * @returns {StatsReturn | ErrorObject} - returns the total number of notes and how many are pinned,
 * otherwise an object containing the error message if validation fails.
 */
export const getStats = (apiKey: string): StatsReturn | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, false);
  if (keyError) {
    return keyError;
  }

  return {
    total: data.notes.length,
    pinned: data.notes.filter(n => n.pinned).length,
  };
};

/**
 * Gets one full note
 *
 * @param {string} apiKey - the key sent with the request
 * @param {number} noteId - the id of the note
 * @returns {NoteReturn | ErrorObject} - returns the note,
 * otherwise an object containing the error message if validation fails.
 */
export const getNote = (apiKey: string, noteId: number): NoteReturn | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, false);
  if (keyError) {
    return keyError;
  }

  const note = data.notes.find(n => n.noteId === noteId);
  if (!note) {
    return {
      error: 'INVALID_NOTE_ID',
      message: 'Invalid noteId'
    };
  }

  return { note };
};

/**
 * Pins or unpins a note
 *
 * @param {string} apiKey - the key sent with the request
 * @param {number} noteId - the id of the note
 * @param {boolean} pinned - whether the note should be pinned
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const setPinned = (apiKey: string, noteId: number, pinned: boolean): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, true);
  if (keyError) {
    return keyError;
  }

  const note = data.notes.find(n => n.noteId === noteId);
  if (!note) {
    return {
      error: 'INVALID_NOTE_ID',
      message: 'Invalid noteId'
    };
  }

  if (typeof pinned !== 'boolean') {
    return {
      error: 'INVALID_PINNED',
      message: 'pinned must be true or false'
    };
  }

  note.pinned = pinned;

  return {};
};

/**
 * Deletes a note
 *
 * @param {string} apiKey - the key sent with the request
 * @param {number} noteId - the id of the note
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const deleteNote = (apiKey: string, noteId: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  const keyError = checkKey(apiKey, true);
  if (keyError) {
    return keyError;
  }

  const index = data.notes.findIndex(n => n.noteId === noteId);
  if (index === -1) {
    return {
      error: 'INVALID_NOTE_ID',
      message: 'Invalid noteId'
    };
  }

  data.notes.splice(index, 1);

  return {};
};
