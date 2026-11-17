export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export type Location = 'Library' | 'Quad' | 'K17';

export interface ItemId {
  itemId: number,
}

export interface Item extends ItemId {
  description: string,
  location: Location,
  claimedBy: string | null,
}

export interface ItemReturn {
  item: Item
}

export interface ItemsReturn {
  items: Item[]
}

export interface RemovedReturn {
  removed: number
}

export interface DataStore {
  items: Item[],
  nextItemId: number,
}

const dataStore: DataStore = {
  items: [],
  nextItemId: 0,
};

export const getData = (): DataStore => dataStore;
