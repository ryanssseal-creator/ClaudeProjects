export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export type Category = 'Social' | 'Academic' | 'Sports';

export interface EventId {
  eventId: number,
}

export interface CampusEvent extends EventId {
  title: string,
  category: Category,
  capacity: number,
}

export interface EventsReturn {
  events: CampusEvent[]
}

export interface DataStore {
  events: CampusEvent[]
}

const dataStore: DataStore = {
  events: []
};

export const getData = (): DataStore => dataStore;
