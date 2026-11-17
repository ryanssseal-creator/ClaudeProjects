import { Customer, Order } from "./interface.ts";

/**
 * Decides whether an order should be refunded depending on
 * the customer's details and information about the order
 *
 * @param customer
 * @param order
 * @returns { boolean }
 */
export function refundService(customer: Customer, order: Order): boolean {
  if (order.status === 'cancelled') {
    return false;
  }

  if (customer.flagged.includes(order.category)) {
    return false
  }

  if (order.faulty || order.daysSincePurchase <= 7) {
    return true;
  }

  if (customer.tier === 'gold') {
    if (order.hasReceipt && order.daysSincePurchase <= 60) {
      return true;
    }
    if (customer.warranties.includes(order.category)) {
      return true;
    }
  }
  return false;
}
