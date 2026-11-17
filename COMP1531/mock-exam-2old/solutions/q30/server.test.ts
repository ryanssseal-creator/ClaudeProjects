// SOLUTION - Mock Exam 2, Q30 Part 2
//
// Reuse the Part 1 inputs over HTTP. One extra test is needed for the line in server.ts
// that rejects a request with a missing student or assessment.
import { describe, test, expect } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const student = { enrolled: true, specialConsideration: false };
const work = { rawMark: 90, examMark: 80, daysLate: 0, hurdle: false, plagiarism: false };

function gradeRequest(body: { student?: typeof student, assessment?: typeof work }) {
  const res = request('POST', SERVER_URL + '/grades/final', { json: body });
  return { status: res.statusCode, body: res.getJSON() };
}

describe('tests', () => {
  test('missing assessment -> 400 (covers the early return in server.ts)', () => {
    expect(gradeRequest({ student })).toStrictEqual({ status: 400, body: { error: expect.any(String) } });
  });

  test.each([
    { name: 'not enrolled', s: { ...student, enrolled: false }, a: work, grade: 'WD' },
    { name: 'plagiarism', s: student, a: { ...work, plagiarism: true }, grade: '00' },
    { name: 'very late', s: student, a: { ...work, daysLate: 6 }, grade: 'FL' },
    { name: 'late penalty', s: student, a: { ...work, daysLate: 2 }, grade: 'DN' },
    { name: 'hurdle failed', s: student, a: { ...work, hurdle: true, examMark: 39 }, grade: 'UF' },
    { name: 'HD', s: student, a: work, grade: 'HD' },
    { name: 'CR', s: student, a: { ...work, rawMark: 65 }, grade: 'CR' },
    { name: 'PS', s: student, a: { ...work, rawMark: 50 }, grade: 'PS' },
    { name: 'FL', s: student, a: { ...work, rawMark: 49 }, grade: 'FL' },
  ])('$name', ({ s, a, grade }) => {
    expect(gradeRequest({ student: s, assessment: a })).toStrictEqual({ status: 200, body: { grade } });
  });
});
