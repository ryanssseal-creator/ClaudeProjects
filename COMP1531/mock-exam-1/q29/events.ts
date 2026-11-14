/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  CampusEvent,
  Category,
  DataStore,
  EmptyObject,
  ErrorObject,
  EventId,
  EventsReturn,
  getData,
} from './dataStore.ts';

const CATEGORIES = ['Social', 'Academic', 'Sports'];
const MIN_TITLE = 3;
const MAX_TITLE = 30;
const MIN_CAPACITY = 1;
const MAX_CAPACITY = 500;
const MIN_EXTRA = 1;
const MAX_EXTRA = 50;

/**
 * Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.events = [];
  return {};
};

/**
 * Creates a new event given a title, category and capacity
 *
 * @param {string} title - title of the new event
 * @param {Category} category - category of the new event
 * @param {number} capacity - how many people can attend
 * @returns {EventId | ErrorObject} - Returns the created event's Id on success,
 * or an object containing the error message if validation fails.
 */
export const addEvent = (title: string, category: Category, capacity: number): EventId | ErrorObject => {
  const data: DataStore = getData();

  if (!title || title.length < MIN_TITLE || title.length > MAX_TITLE) {
    return {
      error: 'INVALID_TITLE',
      message: 'Event title must be between 3 and 30 characters'
    };
  }

  if (!CATEGORIES.includes(category)) {
    return {
      error: 'INVALID_CATEGORY',
      message: 'Category must be Social, Academic or Sports'
    };
  }

  if (capacity < MIN_CAPACITY || capacity > MAX_CAPACITY) {
    return {
      error: 'INVALID_CAPACITY',
      message: 'Capacity must be between 1 and 500'
    };
  }

  if (data.events.find(e => e.title === title && e.category === category)) {
    return {
      error: 'DUPLICATE_EVENT',
      message: `${category} event ${title} already exists`
    };
  }

  const eventId = data.events.length;
  data.events.push({ eventId, title, category, capacity });

  return { eventId };
};

/**
 * Gets all events in a category, in descending order of capacity
 *
 * @param {string} category - the category of events to retrieve
 * @returns {EventsReturn | ErrorObject} - returns the list of events in the category,
 * otherwise an object containing the error message if validation fails.
 */
export const getEventsByCategory = (category: string): EventsReturn | ErrorObject => {
  const data: DataStore = getData();

  if (!CATEGORIES.includes(category)) {
    return {
      error: 'INVALID_CATEGORY',
      message: 'Category must be Social, Academic or Sports'
    };
  }

  const events: CampusEvent[] = data.events
    .filter(e => e.category === category)
    .sort((a, b) => b.capacity - a.capacity);

  return { events };
};

/**
 * Get events by a list of event Ids.
 * Returns the events in the order of the ids given.
 *
 * @param {number[]} eventIds - list of event ids
 * @returns {EventsReturn | ErrorObject} - Returns the events for the given ids,
 * otherwise an object containing the error message if validation fails.
 */
export const getEventsByIds = (eventIds: number[]): EventsReturn | ErrorObject => {
  const data: DataStore = getData();
  const events: CampusEvent[] = [];

  for (const eventId of eventIds) {
    const event = data.events.find(e => e.eventId === eventId);
    if (!event) {
      return {
        error: 'INVALID_EVENT_ID',
        message: 'One of the eventIds does not refer to a valid event'
      };
    }
    events.push(event);
  }

  return { events };
};

/**
 * Update the capacity of one event
 *
 * @param {string} role - role of the user attempting the update
 * @param {number} eventId - ID of the event to update
 * @param {number} capacity - the new capacity
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updateCapacity = (role: string, eventId: number, capacity: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'organiser') {
    return {
      error: 'INVALID_ROLE',
      message: 'Only organisers can change capacity'
    };
  }

  const event = data.events.find(e => e.eventId === eventId);
  if (!event) {
    return {
      error: 'INVALID_EVENT_ID',
      message: 'Invalid eventId'
    };
  }

  if (capacity < MIN_CAPACITY || capacity > MAX_CAPACITY) {
    return {
      error: 'INVALID_CAPACITY',
      message: 'Capacity must be between 1 and 500'
    };
  }

  event.capacity = capacity;

  return {};
};

/**
 * Increases the capacity of every event by extraCapacity.
 * If the new capacity would be greater than 500, it is capped at 500.
 *
 * @param {string} role - role of the user attempting the update
 * @param {number} extraCapacity - the amount to add to every event's capacity
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const increaseAllCapacities = (role: string, extraCapacity: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'organiser') {
    return {
      error: 'INVALID_ROLE',
      message: 'Only organisers can change capacity'
    };
  }

  if (extraCapacity < MIN_EXTRA || extraCapacity > MAX_EXTRA) {
    return {
      error: 'INVALID_EXTRA_CAPACITY',
      message: 'Extra capacity must be between 1 and 50'
    };
  }

  data.events.forEach((e) => {
    e.capacity = Math.min(e.capacity + extraCapacity, MAX_CAPACITY);
  });

  return {};
};
