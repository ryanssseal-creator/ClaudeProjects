import { describe, test, expect } from 'vitest';
import { Parcel, validateParcel } from './parcel.ts';

describe('validateParcel', () => {
  const base: Parcel = {
    trackingId: 'AU12345678',
    details: {
      weightKg: 2.5,
      destinationPostcode: 2052,
      senderName: 'Hayden Smith',
      fragile: true,
      declaredValue: 120,
    },
  };

  test('success - all details valid', () => {
    expect(validateParcel(base)).toBe('Parcel accepted. Ready for dispatch.');
  });

  test('success - not fragile, with a declared value of 0', () => {
    const parcel = { ...base, details: { ...base.details, fragile: false, declaredValue: 0 } };
    expect(validateParcel(parcel)).toBe('Parcel accepted. Ready for dispatch.');
  });

  test('error - one field is missing', () => {
    const parcel: Parcel = {
      trackingId: 'AU12345678',
      details: {
        weightKg: 2.5,
        destinationPostcode: 2052,
        fragile: true,
        declaredValue: 120,
        // missing senderName
      },
    };
    expect(() => validateParcel(parcel))
      .toThrow("Incomplete parcel. Missing field/s: 'senderName'.");
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const parcel: Parcel = { trackingId: 'AU12345678', details: { } };
    expect(() => validateParcel(parcel))
      .toThrow("Incomplete parcel. Missing field/s: 'declaredValue', 'destinationPostcode', 'fragile', 'senderName', 'weightKg'.");
  });

  test('error - missing fields are reported before any other error', () => {
    const parcel: Parcel = {
      trackingId: 'bad',
      details: { weightKg: 500, destinationPostcode: 1, senderName: 'Hayden Smith' },
    };
    expect(() => validateParcel(parcel))
      .toThrow("Incomplete parcel. Missing field/s: 'declaredValue', 'fragile'.");
  });

  test('error - tracking ID is the wrong length', () => {
    const parcel = { ...base, trackingId: 'AU123' };
    expect(() => validateParcel(parcel)).toThrow("Tracking ID 'AU123' is invalid.");
  });

  test('error - tracking ID does not start with AU', () => {
    const parcel = { ...base, trackingId: 'NZ12345678' };
    expect(() => validateParcel(parcel)).toThrow("Tracking ID 'NZ12345678' is invalid.");
  });

  test('error - weight over 22kg', () => {
    const parcel = { ...base, details: { ...base.details, weightKg: 22.5 } };
    expect(() => validateParcel(parcel)).toThrow("Weight of '22.5'kg is out of range.");
  });

  test('error - weight of 0', () => {
    const parcel = { ...base, details: { ...base.details, weightKg: 0 } };
    expect(() => validateParcel(parcel)).toThrow("Weight of '0'kg is out of range.");
  });

  test('success - weight of exactly 22kg', () => {
    const parcel = { ...base, details: { ...base.details, weightKg: 22 } };
    expect(validateParcel(parcel)).toBe('Parcel accepted. Ready for dispatch.');
  });

  test('error - postcode is not 4 digits', () => {
    const parcel = { ...base, details: { ...base.details, destinationPostcode: 205 } };
    expect(() => validateParcel(parcel)).toThrow("Postcode '205' is invalid.");
  });

  test('error - fragile with no declared value', () => {
    const parcel = { ...base, details: { ...base.details, declaredValue: 0 } };
    expect(() => validateParcel(parcel)).toThrow('Fragile parcels must declare a value.');
  });
});
