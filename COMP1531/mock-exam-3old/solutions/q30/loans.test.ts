// SOLUTION - Mock Exam 3, Q30 Part 1
//
// Method: walk down the function and write one test per way out of each decision.
// Things that count as branches and are easy to miss:
//   - each side of a ternary (a ? b : c)
//   - each half of || and &&
//   - a loop body's `if` being false (loop runs but doesn't return)
import { describe, test, expect } from 'vitest';
import { loanService } from './loans.ts';
import { Item, Loan, Member } from './interface.ts';

// "Boring" defaults that hit no special case. Each test overrides one thing.
const student: Member = { type: 'student', suspended: false, loans: [] };
const staff: Member = { ...student, type: 'staff' };
const book: Item = { reference: false, copiesAvailable: 2, highDemand: false };
const onTime: Loan = { title: 'Clean Code', overdue: false };

describe('loanService tests', () => {
  test('suspended member', () => {
    expect(loanService({ ...student, suspended: true }, book))
      .toStrictEqual({ approved: false, reason: 'SUSPENDED' });
  });

  test('student at the limit of 5', () => {
    const loans = [onTime, onTime, onTime, onTime, onTime];
    expect(loanService({ ...student, loans }, book))
      .toStrictEqual({ approved: false, reason: 'LIMIT_REACHED' });
  });

  test('staff with 5 on-time loans is under their limit of 10, and gets double time', () => {
    const loans = [onTime, onTime, onTime, onTime, onTime];
    expect(loanService({ ...staff, loans }, book))
      .toStrictEqual({ approved: true, days: 28 });
  });

  test('overdue loan', () => {
    const loans = [onTime, { title: 'Refactoring', overdue: true }];
    expect(loanService({ ...student, loans }, book))
      .toStrictEqual({ approved: false, reason: 'OVERDUE_ITEM' });
  });

  test('reference item (left side of ||)', () => {
    expect(loanService(student, { ...book, reference: true }))
      .toStrictEqual({ approved: false, reason: 'UNAVAILABLE' });
  });

  test('no copies available (right side of ||)', () => {
    expect(loanService(student, { ...book, copiesAvailable: 0 }))
      .toStrictEqual({ approved: false, reason: 'UNAVAILABLE' });
  });

  test('student, normal item: 14 days', () => {
    expect(loanService(student, book)).toStrictEqual({ approved: true, days: 14 });
  });

  test('student, high demand item: 3 days', () => {
    expect(loanService(student, { ...book, highDemand: true }))
      .toStrictEqual({ approved: true, days: 3 });
  });

  test('staff, high demand item: 3 days, not doubled (right side of && is false)', () => {
    expect(loanService(staff, { ...book, highDemand: true }))
      .toStrictEqual({ approved: true, days: 3 });
  });
});
