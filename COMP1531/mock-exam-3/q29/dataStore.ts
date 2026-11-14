export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export interface NoteId {
  noteId: number,
}

export interface NoteSummary extends NoteId {
  title: string,
  pinned: boolean,
}

export interface Note extends NoteSummary {
  body: string,
}

export interface NoteReturn {
  note: Note
}

export interface NotesReturn {
  notes: NoteSummary[]
}

export interface StatsReturn {
  total: number,
  pinned: number,
}

export interface DataStore {
  notes: Note[],
  nextNoteId: number,
}

const dataStore: DataStore = {
  notes: [],
  nextNoteId: 0,
};

export const getData = (): DataStore => dataStore;
