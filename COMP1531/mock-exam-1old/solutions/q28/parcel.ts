// SOLUTION - Mock Exam 1, Q28

export interface Parcel {
  trackingId: string;
  details: {
    weightKg?: number;
    destinationPostcode?: number;
    senderName?: string;
    fragile?: boolean;
    declaredValue?: number;
  }
}

const TRACKING_LENGTH = 10;
const MAX_WEIGHT = 22;
const MIN_POSTCODE = 1000;
const MAX_POSTCODE = 9999;

// Already in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['declaredValue', 'destinationPostcode', 'fragile', 'senderName', 'weightKg'] as const;

/**
 * Validates a single parcel booking against specific criteria.
 */
export function validateParcel(parcel: Parcel): string {
  const details = parcel.details;

  // 1. Missing fields.
  //    Compare with undefined. `!details.fragile` would wrongly treat false (and 0) as missing.
  const missing = REQUIRED_FIELDS.filter(field => details[field] === undefined);
  if (missing.length > 0) {
    const list = missing.map(field => `'${field}'`).join(', ');
    // The spec says THROWN errors: `throw new Error(...)`, not `return '...'`.
    throw new Error(`Incomplete parcel. Missing field/s: ${list}.`);
  }

  // 2. Tracking ID
  if (parcel.trackingId.length !== TRACKING_LENGTH || !parcel.trackingId.startsWith('AU')) {
    throw new Error(`Tracking ID '${parcel.trackingId}' is invalid.`);
  }

  // After check 1 we know these exist, so the casts are safe.
  const weight = details.weightKg as number;
  const postcode = details.destinationPostcode as number;

  // 3. Weight
  if (weight <= 0 || weight > MAX_WEIGHT) {
    throw new Error(`Weight of '${weight}'kg is out of range.`);
  }

  // 4. Postcode
  if (postcode < MIN_POSTCODE || postcode > MAX_POSTCODE) {
    throw new Error(`Postcode '${postcode}' is invalid.`);
  }

  // 5. Fragile
  if (details.fragile && details.declaredValue === 0) {
    throw new Error('Fragile parcels must declare a value.');
  }

  return 'Parcel accepted. Ready for dispatch.';
}
