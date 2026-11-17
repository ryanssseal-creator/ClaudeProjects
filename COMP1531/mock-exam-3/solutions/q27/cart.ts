// SOLUTION - Mock Exam 3, Q27
// All types are defined in THIS file, because only cart.ts is collected.

interface ItemDetails {
  name: string;
  price: number;
}

interface Item extends ItemDetails {
  itemId: number;
  quantity: number;
}

interface ItemId {
  itemId: number;
}

interface ErrorObject {
  error: string;
}

type EmptyObject = Record<string, never>;

let cart: Item[] = [];

/**
 * Find an item with the given name in the cart
 * @param {string} itemName - The name of the item
 * @returns {?} If the item exists, it returns the item object that includes
 * itemId(number), name(string), price(number) and quantity(number).
 */
export function findItem(itemName: string): Item | undefined {
  return cart.find(i => i.name === itemName);
}

/**
 * Add a new item to the cart.
 * @param {Item Object} item - The item is the item object
 * - Item object includes name(string) and price(number) values.
 * @returns {itemId Object} - returns the itemId as the number in the object
 */
export function addItem(item: ItemDetails): ItemId | ErrorObject {
  if (findItem(item.name)) {
    return { error: 'Item already in cart' };
  }

  const itemId = cart.length + 1;
  const newItem = {
    itemId: itemId,
    name: item.name,
    price: item.price,
    quantity: 1
  };
  cart.push(newItem);
  return { itemId: itemId };
}

/**
 * Update the quantity of an item
 * @param {number} itemId - the id of the item
 * @param {number} quantity - the quantity to be updated
 * @returns {} - empty object
 */
export function updateQuantity(itemId: number, quantity: number): EmptyObject | ErrorObject {
  const item = cart.find(i => i.itemId === itemId);
  if (!item) {
    return { error: 'Invalid item Id' };
  }
  item.quantity = quantity;
  return {};
}

/**
 * clear the cart
 * @returns {}
 */
export function clear(): EmptyObject {
  cart = [];
  return {};
}
