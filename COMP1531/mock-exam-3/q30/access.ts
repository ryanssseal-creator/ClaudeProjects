import { Door, User } from "./interface.ts";

/**
 * Decides whether a swipe card should open a door depending on
 * the user's details and information about the door
 *
 * @param user
 * @param door
 * @returns { boolean }
 */
export function accessService(user: User, door: Door): boolean {
  if (user.role === 'visitor') {
    return false;
  }

  if (door.locked) {
    return false
  }

  if (user.role === 'security' || door.owners.includes(user.zid)) {
    return true;
  }

  if (user.role === 'student') {
    if (!door.afterHours && door.building === user.building) {
      return true;
    }
    if (user.bookings.includes(door.room)) {
      return true;
    }
  }
  return false;
}
