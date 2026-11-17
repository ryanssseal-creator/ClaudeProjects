import { describe, test, expect } from 'vitest';
import { Enrolment, validateEnrolment } from './enrolment.ts';

describe('validateEnrolment', () => {
  const baseEnrolment: Enrolment = {
    zid: 5555555,
    request: {
      uoc: 18,
      feesPaid: true,
      prerequisitesMet: true,
      termConfirmed: true,
      wam: 72,
    },
  };

  test('success - all criteria are valid', () => {
    expect(validateEnrolment(baseEnrolment))
      .toBe('Enrolment in correct format. Proceed to timetable.');
  });

  test('error - uoc > 18', () => {
    const enrolment = {
      ...baseEnrolment,
      request: { ...baseEnrolment.request, uoc: 24 },
    };
    expect(() => validateEnrolment(enrolment))
      .toThrow('Student is overloading.');
  });

  test('error - wam < 50', () => {
    const enrolment = {
      ...baseEnrolment,
      request: { ...baseEnrolment.request, wam: 49 },
    };
    expect(() => validateEnrolment(enrolment))
      .toThrow("WAM of '49' insufficient.");
  });

  test('error - zid is not 7 digits', () => {
    const enrolment = { ...baseEnrolment, zid: 12345 };
    expect(() => validateEnrolment(enrolment))
      .toThrow("Provided zid '12345' not in range.");
  });

  test('error - one required field is missing', () => {
    const incompleteEnrolment: Enrolment = {
      zid: 5555555,
      request: {
        uoc: 18,
        feesPaid: true,
        prerequisitesMet: true,
        termConfirmed: true,
        // missing wam
      },
    };

    const expectedMessage =
      "Incomplete enrolment. Missing field/s; 'wam'.";
    expect(() => validateEnrolment(incompleteEnrolment)).toThrow(expectedMessage);
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const incompleteEnrolment: Enrolment = {
      zid: 5555555,
      request: { },
    };

    const expectedMessage =
      "Incomplete enrolment. Missing field/s; 'feesPaid', 'prerequisitesMet', 'termConfirmed', 'uoc', 'wam'.";
    expect(() => validateEnrolment(incompleteEnrolment)).toThrow(expectedMessage);
  });
});
