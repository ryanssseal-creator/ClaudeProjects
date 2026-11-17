import { describe, test, expect } from 'vitest';
import { Enrolment, validateEnrolment } from './enrolment.ts';

describe('validateEnrolment', () => {
  const SUCCESS = 'Enrolment valid. Proceed to timetable.';
  const base: Enrolment = {
    zid: 'z5555555',
    request: {
      courses: ['COMP1531', 'COMP2521', 'MATH1231'],
      term: 3,
      overloadApproved: true,
    },
  };
  const withRequest = (changes: Partial<Enrolment['request']>): Enrolment =>
    ({ ...base, request: { ...base.request, ...changes } });

  test('success - all details valid', () => {
    expect(validateEnrolment(base)).toBe(SUCCESS);
  });

  test('success - three courses do not need overload approval', () => {
    expect(validateEnrolment(withRequest({ overloadApproved: false }))).toBe(SUCCESS);
  });

  test('success - four courses with overload approved', () => {
    const enrolment = withRequest({ courses: ['COMP1531', 'COMP2521', 'MATH1231', 'ACTL1101'] });
    expect(validateEnrolment(enrolment)).toBe(SUCCESS);
  });

  test('error - one field is missing', () => {
    const enrolment: Enrolment = {
      zid: 'z5555555',
      request: { courses: ['COMP1531'], overloadApproved: true },
    };
    expect(() => validateEnrolment(enrolment))
      .toThrow("Incomplete enrolment. Missing field/s: 'term'.");
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const enrolment: Enrolment = { zid: 'z5555555', request: { } };
    expect(() => validateEnrolment(enrolment))
      .toThrow("Incomplete enrolment. Missing field/s: 'courses', 'overloadApproved', 'term'.");
  });

  test('error - missing fields are reported before any other error', () => {
    const enrolment: Enrolment = { zid: 'bad', request: { term: 9 } };
    expect(() => validateEnrolment(enrolment))
      .toThrow("Incomplete enrolment. Missing field/s: 'courses', 'overloadApproved'.");
  });

  test('error - zID is too short', () => {
    expect(() => validateEnrolment({ ...base, zid: 'z123' })).toThrow("zID 'z123' is invalid.");
  });

  test('error - zID does not start with z', () => {
    expect(() => validateEnrolment({ ...base, zid: 'a5555555' })).toThrow("zID 'a5555555' is invalid.");
  });

  test('error - zID contains non-digits', () => {
    expect(() => validateEnrolment({ ...base, zid: 'z55555ab' })).toThrow("zID 'z55555ab' is invalid.");
  });

  test('error - term does not exist', () => {
    expect(() => validateEnrolment(withRequest({ term: 4 }))).toThrow("Term '4' does not exist.");
  });

  test('error - term 0 is present, but does not exist', () => {
    expect(() => validateEnrolment(withRequest({ term: 0 }))).toThrow("Term '0' does not exist.");
  });

  test('error - no courses', () => {
    expect(() => validateEnrolment(withRequest({ courses: [] }))).toThrow('No courses selected.');
  });

  test('error - course code in lower case', () => {
    expect(() => validateEnrolment(withRequest({ courses: ['COMP1531', 'comp2521'] })))
      .toThrow("Course code 'comp2521' is invalid.");
  });

  test('error - course code too short, first invalid code is reported', () => {
    expect(() => validateEnrolment(withRequest({ courses: ['COMP153', 'MATH12311'] })))
      .toThrow("Course code 'COMP153' is invalid.");
  });

  test('error - four courses without overload approval', () => {
    const enrolment = withRequest({
      courses: ['COMP1531', 'COMP2521', 'MATH1231', 'ACTL1101'],
      overloadApproved: false,
    });
    expect(() => validateEnrolment(enrolment))
      .toThrow("Enrolling in '4' courses requires overload approval.");
  });
});
