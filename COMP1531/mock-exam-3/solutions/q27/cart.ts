// SOLUTION - Mock Exam 3, Q27
// All types are defined in THIS file, because only cart.ts is collected.

interface ItemDetails {
  name: string;
  unitPrice: number;
}

interface CartItem extends ItemDetails {
  itemId: number;
  quantity: number;
}

interface ItemId {
  itemId: number;
}

interface Totals {
  total: number;
  itemCount: number;
}

interface ErrorObject {
  error: string;
}

type EmptyObject = Record<string, never>;

let cart: CartItem[] = [];
let nextItemId = 1;

/**
 * Add an item to the cart.
 * @param {Item details object} details - The details of the item
 * - Details object includes name(string) and unitPrice(number) values.
 * @param {number} quantity - how many of the item to add
 * @returns {itemId Object} - returns the itemId as the number in the object,
 * or an error object that includes error(string).
 */
export function addItem(details: ItemDetails, quantity: number): ItemId | ErrorObject {
  if (quantity <= 0) {
    return { error: 'Quantity must be positive' };
  }
  if (cart.find(i => i.name === details.name)) {
    return { error: 'Item already in cart' };
  }

  const itemId = nextItemId;
  nextItemId++;
  cart.push({
    itemId: itemId,
    name: details.name,
    unitPrice: details.unitPrice,
    quantity: quantity
  });
  return { itemId: itemId };
}

/**
 * Remove an item from the cart
 * @param {number} itemId - the id of the item
 * @returns {} - empty object, or an error object that includes error(string).
 */
export function removeItem(itemId: number): EmptyObject | ErrorObject {
  const index = cart.findIndex(i => i.itemId === itemId);
  if (index === -1) {
    return { error: 'Invalid item Id' };
  }
  cart.splice(index, 1);
  return {};
}

/**
 * Work out the totals for the cart
 * @param {string} discountCode - OPTIONAL. The code 'STUDENT10' takes 10% off the total.
 * @returns {totals Object} - an object that includes total(number), the total price,
 * and itemCount(number), the total quantity of all items.
 */
export function getTotals(discountCode?: string): Totals {
  let total = 0;
  let itemCount = 0;
  for (const item of cart) {
    total += item.unitPrice * item.quantity;
    itemCount += item.quantity;
  }
  if (discountCode === 'STUDENT10') {
    total = total * 0.9;
  }
  return { total: total, itemCount: itemCount };
}

/**
 * Find the item in the cart with the lowest unit price
 * @returns {?} If the cart is not empty, it returns the item object that includes
 * itemId(number), name(string), unitPrice(number) and quantity(number).
 * If the cart is empty, it returns null.
 */
export function findCheapest(): CartItem | null {
  if (cart.length === 0) {
    return null;
  }
  let cheapest = cart[0];
  for (const item of cart) {
    if (item.unitPrice < cheapest.unitPrice) {
      cheapest = item;
    }
  }
  return cheapest;
}

/**
 * clear the cart
 * @returns {}
 */
export function clear(): EmptyObject {
  cart = [];
  nextItemId = 1;
  return {};
}
