// SOLUTION - Mock Exam 2, Q30 Part 1
//
// Method: walk down the function and write one test per way out of each decision.
// For `a && b`, branch coverage needs: a false / a true + b false / both true.
import { describe, test, expect } from 'vitest';
import { gradeService } from './grades.ts';
import { Assessment, Student } from './interface.ts';

// A "boring" student and assessment that hit no special case.
// Each test overrides only the one thing it is about.
const student: Student = { enrolled: true, specialConsideration: false };
const work: Assessment = { rawMark: 90, examMark: 80, daysLate: 0, hurdle: false, plagiarism: false };

describe('gradeService tests', () => {
  test('not enrolled', () => {
    expect(gradeService({ ...student, enrolled: false }, work)).toBe('WD');
  });

  test('plagiarism', () => {
    expect(gradeService(student, { ...work, plagiarism: true })).toBe('00');
  });

  test('more than 5 days late', () => {
    expect(gradeService(student, { ...work, daysLate: 6 })).toBe('FL');
  });

  test('late penalty applied: 90 - 2 * 5 = 80', () => {
    expect(gradeService(student, { ...work, daysLate: 2 })).toBe('DN');
  });

  test('late with special consideration: no penalty (right side of && is false)', () => {
    expect(gradeService({ ...student, specialConsideration: true }, { ...work, daysLate: 6 })).toBe('HD');
  });

  test('hurdle failed', () => {
    expect(gradeService(student, { ...work, hurdle: true, examMark: 39 })).toBe('UF');
  });

  test('hurdle passed (right side of && is false)', () => {
    expect(gradeService(student, { ...work, hurdle: true, examMark: 40 })).toBe('HD');
  });

  test('HD', () => {
    expect(gradeService(student, work)).toBe('HD');
  });

  test('CR', () => {
    expect(gradeService(student, { ...work, rawMark: 65 })).toBe('CR');
  });

  test('PS', () => {
    expect(gradeService(student, { ...work, rawMark: 50 })).toBe('PS');
  });

  test('FL', () => {
    expect(gradeService(student, { ...work, rawMark: 49 })).toBe('FL');
  });
});
