type AccountType = 'savings' | 'everyday';

interface Account {
  accountId: number;
  owner: string;
  type: AccountType;
  balance: number;
}

interface ErrorObject {
  error: string;
}

let accounts: Account[] = [];
// MIN_DEPOSIT was never used: no-unused-vars wants it deleted

/**
 * Open a new bank account.
 * @param {string} owner - the name of the account holder
 * @param {AccountType} type - the type of account, which is one of
 * 'savings' or 'everyday'
 * @param {number} initialDeposit - OPTIONAL. The starting balance. Defaults to 0.
 * @returns {accountId Object} - returns the accountId as the number in the object,
 * or an error object that includes error(string).
 */
export function openAccount(owner: string, type: AccountType, initialDeposit?: number): { accountId: number } | ErrorObject {
  if (owner === '') {
    return { error: 'Owner cannot be empty' };
  }

  let balance = 0;
  if (initialDeposit) {
    balance = initialDeposit;
  }
  const accountId = accounts.length + 1;
  accounts.push({ accountId, owner, type, balance });
  return { accountId };
}

/**
 * Deposit money into an account.
 * @param {number} accountId - the id of the account
 * @param {number} amount - how much to deposit, which must be positive
 * @returns {balance Object} - an object containing the new balance(number),
 * or an error object that includes error(string).
 */
export function deposit(accountId: number, amount: number): { balance: number } | ErrorObject {
  const account = accounts.find(a => a.accountId === accountId);
  if (!account) {
    return { error: 'Invalid accountId' };
  }
  if (amount <= 0) {
    return { error: 'Amount must be positive' };
  }
  account.balance += amount;
  return { balance: account.balance };
}

/**
 * Move money from one account to another.
 * @param {number} fromId - the id of the account the money comes from
 * @param {number} toId - the id of the account the money goes to
 * @param {number} amount - how much to move, which must be positive
 * @returns {} - empty object, or an error object that includes error(string)
 * if either id is invalid, the amount is not positive, or there is not enough money.
 */
export function transfer(fromId: number, toId: number, amount: number): Record<string, never> | ErrorObject {
  const from = accounts.find(a => a.accountId === fromId);
  const to = accounts.find(a => a.accountId === toId);
  if (!from || !to) {
    return { error: 'Invalid accountId' };
  }
  if (amount <= 0) {
    return { error: 'Amount must be positive' };
  }
  if (from.balance < amount) {
    return { error: 'Insufficient funds' };
  }
  from.balance -= amount;
  to.balance += amount;
  return {};
}

/**
 * Get every account of the given type
 * @param {AccountType} type - one of 'savings' or 'everyday'
 * @returns {accounts Object} - an object containing accounts, which is an array of
 * account objects. Each account object includes accountId(number), owner(string),
 * type(AccountType) and balance(number).
 */
export function getAccountsByType(type: AccountType): { accounts: Account[] } {
  return { accounts: accounts.filter(a => a.type === type) };
}

/**
 * Add up the balances of every account
 * @returns {number} - the total balance
 */
export function totalBalance(): number {
  return accounts.reduce((sum, a) => sum + a.balance, 0);
}

/**
 * clear all accounts
 * @returns {}
 */
export function clear(): Record<string, never> {
  accounts = [];
  return {};
}
