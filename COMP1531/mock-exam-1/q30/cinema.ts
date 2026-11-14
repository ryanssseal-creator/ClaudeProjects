import { Customer, Session } from "./interface.ts";

/**
 * Works out the price of a ticket depending on who is
 * buying it and which session they are attending
 *
 * @param customer
 * @param session
 * @returns { number }
 */
export function ticketPrice(customer: Customer, session: Session): number {
  if (session.soldOut) {
    throw new Error('Session is sold out');
  }

  let price = session.basePrice;

  if (customer.age < 13 || customer.age >= 65) {
    price = price * 0.5;
  } else if (customer.student && session.day !== 'saturday') {
    price = price * 0.8;
  }

  if (session.format === '3d') {
    price += 4;
  }

  if (customer.member) {
    if (session.day === 'tuesday') {
      return Math.min(price, 10);
    }
    price -= 2;
  }

  return price;
}
