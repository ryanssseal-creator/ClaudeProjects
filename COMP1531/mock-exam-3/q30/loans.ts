import { Decision, Item, Member } from "./interface.ts";

/**
 * Decides whether a library member may borrow an item and,
 * if they may, how many days they can keep it for
 *
 * @param member
 * @param item
 * @returns { Decision }
 */
export function loanService(member: Member, item: Item): Decision {
  if (member.suspended) {
    return { approved: false, reason: 'SUSPENDED' };
  }

  const limit = member.type === 'staff' ? 10 : 5;
  if (member.loans.length >= limit) {
    return { approved: false, reason: 'LIMIT_REACHED' };
  }

  for (const loan of member.loans) {
    if (loan.overdue) {
      return { approved: false, reason: 'OVERDUE_ITEM' };
    }
  }

  if (item.reference || item.copiesAvailable === 0) {
    return { approved: false, reason: 'UNAVAILABLE' };
  }

  let days = item.highDemand ? 3 : 14;
  if (member.type === 'staff' && !item.highDemand) {
    days *= 2;
  }

  return { approved: true, days };
}
