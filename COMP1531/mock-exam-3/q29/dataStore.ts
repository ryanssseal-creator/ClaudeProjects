export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export type PlantSize = 'Small' | 'Medium' | 'Large';

export interface PlantsReturn {
  plants: Plant[]
}

export interface PlantId {
  plantId: number,
}

export interface Plant {
  name: string,
  size: PlantSize,
  price: number
}

export interface PlantDataStore extends PlantId, Plant {}

export interface DataStore {
  plants: PlantDataStore[]
}

const dataStore: DataStore = {
  plants: []
};

export const getData = (): DataStore => dataStore;
