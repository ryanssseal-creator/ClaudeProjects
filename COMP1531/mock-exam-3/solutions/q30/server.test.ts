// SOLUTION - Mock Exam 3, Q30 Part 2
//
// Reuse the Part 1 inputs over HTTP. Statement coverage needs every line run once,
// so one request per `return` in loans.ts is enough. A refused loan also covers the
// 403 line in server.ts, and an approved one covers the 200 line.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const onTime = { title: 'Clean Code', overdue: false };
const student = { type: 'student', suspended: false, loans: [onTime] };
const book = { reference: false, copiesAvailable: 2, highDemand: false };

function loanRequest(member: typeof student, item: typeof book) {
  const res = request('POST', SERVER_URL + '/library/loan', {
    json: { member, item }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

describe('tests', () => {
  test('suspended -> 403', () => {
    expect(loanRequest({ ...student, suspended: true }, book))
      .toStrictEqual({ status: 403, body: { approved: false, reason: 'SUSPENDED' } });
  });

  test('limit reached -> 403', () => {
    const loans = [onTime, onTime, onTime, onTime, onTime];
    expect(loanRequest({ ...student, loans }, book))
      .toStrictEqual({ status: 403, body: { approved: false, reason: 'LIMIT_REACHED' } });
  });

  test('overdue -> 403', () => {
    const loans = [{ title: 'Refactoring', overdue: true }];
    expect(loanRequest({ ...student, loans }, book))
      .toStrictEqual({ status: 403, body: { approved: false, reason: 'OVERDUE_ITEM' } });
  });

  test('unavailable -> 403', () => {
    expect(loanRequest(student, { ...book, reference: true }))
      .toStrictEqual({ status: 403, body: { approved: false, reason: 'UNAVAILABLE' } });
  });

  test('staff, normal item -> 200 with doubled days', () => {
    expect(loanRequest({ ...student, type: 'staff' }, book))
      .toStrictEqual({ status: 200, body: { approved: true, days: 28 } });
  });
});
