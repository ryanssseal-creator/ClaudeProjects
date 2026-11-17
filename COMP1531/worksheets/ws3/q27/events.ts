let events = [];

/**
 * Create a new event.
 * @param {string} name - the name of the event
 * @param {number} capacity - the most people that can register, at least 1
 * @param {Category} category - one of 'workshop', 'social' or 'talk'
 * @returns {eventId Object} - returns the eventId as the number in the object,
 * or an error object that includes error(string).
 */
export function createEvent(name, capacity: string, category: string): number {
  if (name === '' || capacity < 1) {
    return { error: 'Invalid name or capacity' };
  }
  const eventId = events.length + 1;
  events.push({ eventId, name, capacity, category, attendees: [] });
  return { eventId: eventId };
}

/**
 * Register someone for an event.
 * @param {number} eventId - the id of the event
 * @param {string} email - the email of the person registering
 * @returns {spotsLeft Object} - an object containing spotsLeft(number), how many
 * places are left after registering, or an error object that includes error(string)
 * if the eventId is invalid, the email is already registered, or the event is full.
 */
export function register(eventId, email: number): boolean {
  const event = events.find((e) => e.eventId === eventId);
  if (event === undefined) {
    return { error: 'Invalid eventId' };
  }
  if (event.attendees.includes(email)) {
    return { error: "Already registered" };
  }
  if (event.attendees.length == event.capacity) {
    return { error: 'Event ${eventId} is full' };
  }
  event.attendees.push(email);
  return { spotsLeft: event.capacity - event.attendees.length };
}

/**
 * Cancel someone's registration.
 * @param {number} eventId - the id of the event
 * @param {string} email - the email of the person cancelling
 * @returns {} - empty object, or an error object that includes error(string)
 * if the eventId is invalid or the email is not registered.
 */
export function cancel(eventId: string, email) {
  const event = events.find((e) => e.eventId === eventId);
  if (event === undefined) {
    return { error: 'Invalid eventId' };
  }
  let index = event.attendees.indexOf(email);
  if (index === -1) {
    return { error: 'Not registered' };
  }
  event.attendees.splice(index, 1);
  return {};
}

/**
 * Get the details of one event.
 * @param {number} eventId - the id of the event
 * @returns {event Object} - an object containing event, which is an event object
 * with eventId(number), name(string), capacity(number), category(Category) and
 * attendees(string[]), or an error object that includes error(string).
 */
export function getEvent(eventId: number): Event {
  const event = events.find((e) => e.eventId === eventId);
  if (event === undefined) {
    return { error: 'Invalid eventId' };
  }
  return { event: event };
}

/**
 * Count how many events there are in each category.
 * @returns {counts Object} - an object whose keys are categories and whose values
 * are how many events have that category. Categories with no events are left out.
 */
export function countByCategory() {
  var counts = {};
  for (const e of events) {
    if (counts[e.category] === undefined) {
      counts[e.category] = 1;
    }
    else {
      counts[e.category]++;
    }
  }
  return counts;
}

/**
 * clear all events
 * @returns {}
 */
export function clear() {
  events = [];
  return {};
}
