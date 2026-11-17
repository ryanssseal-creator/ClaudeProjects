// SOLUTION - Mock Exam 1, Q28

export interface Parcel {
  trackingId: number;
  details: {
    weightKg?: number;
    addressVerified?: true;
    senderVerified?: true;
    postagePaid?: true;
    declaredValue?: number;
  }
}

const MAX_WEIGHT = 22;
const MAX_VALUE = 5000;
const TRACKING_DIGITS = 8;

// Listed in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['addressVerified', 'declaredValue', 'postagePaid', 'senderVerified', 'weightKg'] as const;

/**
 * Validates a single parcel booking against specific criteria.
 */
export function validateParcel(parcel: Parcel): string {
  const details = parcel.details;

  // Missing fields first: the other checks need the fields to exist.
  const missing = REQUIRED_FIELDS.filter(field => details[field] === undefined);
  if (missing.length > 0) {
    // ['a', 'b'] -> "'a', 'b'"
    const list = missing.map(field => `'${field}'`).join(', ');
    // The spec says THROWN errors: `throw new Error(...)`, not `return '...'`.
    throw new Error(`Incomplete parcel. Missing field/s; ${list}.`);
  }

  // Turn the number into a string to count its digits.
  if (String(parcel.trackingId).length !== TRACKING_DIGITS) {
    throw new Error(`Provided trackingId '${parcel.trackingId}' not in range.`);
  }

  // We know these exist after the missing check, so the casts are safe.
  const weight = details.weightKg as number;
  const value = details.declaredValue as number;

  if (weight > MAX_WEIGHT) {
    throw new Error('Parcel is overweight.');
  }

  if (value > MAX_VALUE) {
    // The quotes go around the number: '6000'
    throw new Error(`Declared value of '${value}' too high.`);
  }

  return 'Parcel in correct format. Proceed to dispatch.';
}
