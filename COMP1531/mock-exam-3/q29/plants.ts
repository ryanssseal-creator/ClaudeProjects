/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  DataStore,
  EmptyObject,
  ErrorObject,
  getData,
  Plant,
  PlantDataStore,
  PlantId,
  PlantSize,
  PlantsReturn,
} from './dataStore.ts';

const MIN_PLANT_NAME = 3;
const MAX_PLANT_NAME = 25;
const MIN_PLANT_PRICE = 5;
const MAX_PLANT_PRICE = 200;
const MIN_DISCOUNT = 1;
const MAX_DISCOUNT = 20;

/**
 *  Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.plants = [];
  return {};
};

/**
 * Creates a new plant given name, size, and price
 *
 * @param {string} name - name of the new plant
 * @param {PlantSize} size - size of the new plant
 * @param {number} price - price of the new plant
 * @returns {PlantId | ErrorObject} - Returns the created plant's Id on success,
 * or an object containing the error message if validation fails.
 */
export const addNewPlant = (name: string, size: PlantSize, price: number): PlantId | ErrorObject => {
  const data: DataStore = getData();

  if (!name) {
    return {
      error: 'INVALID_PLANT_NAME',
      message: 'Empty plant name'
    };
  }

  if (name.length < MIN_PLANT_NAME || name.length > MAX_PLANT_NAME) {
    return {
      error: 'INVALID_PLANT_NAME',
      message: 'Plant name too short or too long'
    };
  }

  if (price < MIN_PLANT_PRICE || price > MAX_PLANT_PRICE) {
    return {
      error: 'INVALID_PLANT_PRICE',
      message: 'Plant price must be between 5 and 200'
    };
  }

  if (data.plants.find(p => p.name === name && p.size === size)) {
    return {
      error: 'INVALID_PLANT',
      message: `${size} ${name} already exists`
    };
  }

  const plantId = data.plants.length;
  const newPlant: PlantDataStore = {
    plantId: plantId,
    name: name,
    size: size,
    price: price
  };
  data.plants.push(newPlant);

  return { plantId };
};

/**
 * Gets plants that have a price lower than, or equal to, the given price (in ascending price order)
 *
 * @param {number} price - the maximum price of plants to be retrieved
 * @returns {PlantsReturn | ErrorObject} - returns a list of plants at or under the given price,
 * otherwise, returns an object containing the error message if validation fails.
 */
export const getPlantsByPrice = (price: number): PlantsReturn | ErrorObject => {
  const data: DataStore = getData();

  if (price < MIN_PLANT_PRICE || price > MAX_PLANT_PRICE) {
    return {
      error: 'INVALID_PLANT_PRICE',
      message: 'Plant price must be between 5 and 200'
    };
  }

  const plants: PlantDataStore[] = data.plants.filter(p => p.price <= price);
  const plantsRet: Plant[] = plants.map(({ plantId, ...rest }) => rest)
    .sort((a, b) => a.price - b.price);

  return {
    plants: plantsRet
  };
};

/**
 * Get plants by IDs given a list of plant Ids.
 * Returns the plants in the order of the ids given.
 *
 * @param {number[]} plantIds - list of plant ids
 * @returns {PlantsReturn | ErrorObject} - Returns the plants given a list of ids if found,
 * otherwise an object containing the error message if validation fails.
 */
export const getPlantsByIds = (plantIds: number[]): PlantsReturn | ErrorObject => {
  const data: DataStore = getData();
  const plants: PlantDataStore[] = [];

  for (const plantId of plantIds) {
    const plant = data.plants.find(p => p.plantId === plantId);
    if (!plant) {
      return {
        error: 'INVALID_PLANT_ID',
        message: 'One of the plantIds does not refer to a valid plant'
      };
    }

    plants.push(plant);
  }

  const plantsRet: Plant[] = plants.map(({ plantId, ...rest }) => rest);

  return {
    plants: plantsRet
  };
};

/**
 * Update plant price given a plant Id
 *
 * @param {string} role - role of the user attempting to update the plant price
 * @param {number} plantId - ID of the plant whose price is to be updated
 * @param {number} newPrice - new price to be set on the plant
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updatePlantPriceById = (role: string, plantId: number, newPrice: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update price'
    };
  }

  const plant = data.plants.find(p => p.plantId === plantId);
  if (!plant) {
    return {
      error: 'INVALID_PLANT_ID',
      message: 'Invalid plantId'
    };
  }

  if (newPrice < MIN_PLANT_PRICE || newPrice > MAX_PLANT_PRICE) {
    return {
      error: 'INVALID_PLANT_PRICE',
      message: 'Plant price must be between 5 and 200'
    };
  }

  plant.price = newPrice;

  return {};
};

/**
 * Puts all plants on sale by taking discountAmount off the original price.
 * If the final price after applying discountAmount is less than 5, the price is set to 5.
 *
 * @param {string} role - role of the user attempting to update plant prices
 * @param {number} discountAmount - the amount that all plant prices are reduced by
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const discountAllPlantPrices = (role: string, discountAmount: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update plant price'
    };
  }

  if (discountAmount < MIN_DISCOUNT || discountAmount > MAX_DISCOUNT) {
    return {
      error: 'INVALID_DISCOUNT_AMOUNT',
      message: 'Discount amount must be between 1 and 20'
    };
  }

  data.plants.forEach((p) => {
    p.price = Math.max(p.price - discountAmount, MIN_PLANT_PRICE);
  });

  return {};
};
