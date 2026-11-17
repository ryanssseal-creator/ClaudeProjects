import { Guest, Venue } from "./interface.ts";

/**
 * Decides whether a guest is allowed into a venue depending on
 * the guest's details and the venue's settings for the night
 *
 * @param guest
 * @param venue
 * @returns { boolean }
 */
export function entryService(guest: Guest, venue: Venue): boolean {
  if (guest.status === 'banned') {
    return false;
  }

  if (venue.blocked.includes(guest.name)) {
    return false
  }

  if (guest.ticket === 'vip' || venue.hosts.includes(guest.name)) {
    return true;
  }

  if (guest.status === 'member') {
    if (venue.membersNight && guest.ticket === 'general') {
      return true;
    }
    if (venue.guestList.includes(guest.name)) {
      return true;
    }
  }
  return false;
}
