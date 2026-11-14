/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  DataStore,
  EmptyObject,
  ErrorObject,
  getData,
  Item,
  ItemId,
  ItemReturn,
  ItemsReturn,
  Location,
  RemovedReturn,
} from './dataStore.ts';

const LOCATIONS = ['Library', 'Quad', 'K17'];
const MIN_DESCRIPTION = 5;
const MAX_DESCRIPTION = 50;
const MIN_KEYWORD = 2;
const ZID_LENGTH = 8;

/**
 * Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.items = [];
  data.nextItemId = 0;
  return {};
};

/**
 * Reports a newly found item
 *
 * @param {string} description - what the item is
 * @param {Location} location - where it was found
 * @returns {ItemId | ErrorObject} - Returns the new item's Id on success,
 * or an object containing the error message if validation fails.
 */
export const reportItem = (description: string, location: Location): ItemId | ErrorObject => {
  const data: DataStore = getData();

  if (!description || description.length < MIN_DESCRIPTION || description.length > MAX_DESCRIPTION) {
    return {
      error: 'INVALID_DESCRIPTION',
      message: 'Description must be between 5 and 50 characters'
    };
  }

  if (!LOCATIONS.includes(location)) {
    return {
      error: 'INVALID_LOCATION',
      message: 'Location must be Library, Quad or K17'
    };
  }

  const itemId = data.nextItemId;
  data.nextItemId++;
  data.items.push({ itemId, description, location, claimedBy: null });

  return { itemId };
};

/**
 * Searches unclaimed items whose description contains the keyword (case-insensitive)
 *
 * @param {string} keyword - the text to search for
 * @returns {ItemsReturn | ErrorObject} - returns the matching unclaimed items,
 * otherwise an object containing the error message if validation fails.
 */
export const searchItems = (keyword: string): ItemsReturn | ErrorObject => {
  const data: DataStore = getData();

  if (!keyword || keyword.length < MIN_KEYWORD) {
    return {
      error: 'INVALID_KEYWORD',
      message: 'Keyword must be at least 2 characters'
    };
  }

  const items: Item[] = data.items.filter(i =>
    i.claimedBy === null && i.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return { items };
};

/**
 * Gets a single item
 *
 * @param {number} itemId - the id of the item
 * @returns {ItemReturn | ErrorObject} - returns the item,
 * otherwise an object containing the error message if validation fails.
 */
export const getItem = (itemId: number): ItemReturn | ErrorObject => {
  const data: DataStore = getData();

  const item = data.items.find(i => i.itemId === itemId);
  if (!item) {
    return {
      error: 'INVALID_ITEM_ID',
      message: 'Invalid itemId'
    };
  }

  return { item };
};

/**
 * Marks an item as claimed by a student
 *
 * @param {number} itemId - the id of the item
 * @param {string} zid - the zID of the student claiming it
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const claimItem = (itemId: number, zid: string): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  const item = data.items.find(i => i.itemId === itemId);
  if (!item) {
    return {
      error: 'INVALID_ITEM_ID',
      message: 'Invalid itemId'
    };
  }

  if (!zid || zid.length !== ZID_LENGTH || !zid.startsWith('z')) {
    return {
      error: 'INVALID_ZID',
      message: 'zID must be z followed by 7 digits'
    };
  }

  if (item.claimedBy !== null) {
    return {
      error: 'ALREADY_CLAIMED',
      message: 'This item has already been claimed'
    };
  }

  item.claimedBy = zid;

  return {};
};

/**
 * Removes one item from the system
 *
 * @param {string} role - role of the user attempting the removal
 * @param {number} itemId - the id of the item
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const removeItem = (role: string, itemId: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'security') {
    return {
      error: 'INVALID_ROLE',
      message: 'Only security staff can remove items'
    };
  }

  const index = data.items.findIndex(i => i.itemId === itemId);
  if (index === -1) {
    return {
      error: 'INVALID_ITEM_ID',
      message: 'Invalid itemId'
    };
  }

  data.items.splice(index, 1);

  return {};
};

/**
 * Removes every item that has been claimed
 *
 * @param {string} role - role of the user attempting the removal
 * @returns {RemovedReturn | ErrorObject} Returns how many items were removed, or an error object if validation fails.
 */
export const removeClaimed = (role: string): RemovedReturn | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'security') {
    return {
      error: 'INVALID_ROLE',
      message: 'Only security staff can remove items'
    };
  }

  const before = data.items.length;
  data.items = data.items.filter(i => i.claimedBy === null);

  return { removed: before - data.items.length };
};
