import { describe, test, expect } from 'vitest';
import { Parcel, validateParcel } from './parcel.ts';

describe('validateParcel', () => {
  const baseParcel: Parcel = {
    trackingId: 12345678,
    details: {
      weightKg: 5,
      addressVerified: true,
      senderVerified: true,
      postagePaid: true,
      declaredValue: 200,
    },
  };

  test('success - all details are valid', () => {
    expect(validateParcel(baseParcel))
      .toBe('Parcel in correct format. Proceed to dispatch.');
  });

  test('error - weight > 22', () => {
    const parcel = {
      ...baseParcel,
      details: { ...baseParcel.details, weightKg: 23 },
    };
    expect(() => validateParcel(parcel))
      .toThrow('Parcel is overweight.');
  });

  test('error - declared value > 5000', () => {
    const parcel = {
      ...baseParcel,
      details: { ...baseParcel.details, declaredValue: 6000 },
    };
    expect(() => validateParcel(parcel))
      .toThrow("Declared value of '6000' too high.");
  });

  test('error - trackingId is not 8 digits', () => {
    const parcel = { ...baseParcel, trackingId: 12345 };
    expect(() => validateParcel(parcel))
      .toThrow("Provided trackingId '12345' not in range.");
  });

  test('error - one required field is missing', () => {
    const incompleteParcel: Parcel = {
      trackingId: 12345678,
      details: {
        weightKg: 5,
        addressVerified: true,
        senderVerified: true,
        postagePaid: true,
        // missing declaredValue
      },
    };

    const expectedMessage =
      "Incomplete parcel. Missing field/s; 'declaredValue'.";
    expect(() => validateParcel(incompleteParcel)).toThrow(expectedMessage);
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const incompleteParcel: Parcel = {
      trackingId: 12345678,
      details: { },
    };

    const expectedMessage =
      "Incomplete parcel. Missing field/s; 'addressVerified', 'declaredValue', 'postagePaid', 'senderVerified', 'weightKg'.";
    expect(() => validateParcel(incompleteParcel)).toThrow(expectedMessage);
  });
});
