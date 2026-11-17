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

/**
 * Validates a single parcel booking against specific criteria.
 */
export function validateParcel(parcel: Parcel) {
  const missing = checkFields(parcel);
  if (missing.length > 0) {
    const list = missing.map((field) => `'${field}'`).join(', ');
    throw new Error(`Incomplete parcel. Missing field/s: ${list}.`);
  }

  const details = parcel.details;

  if (parcel.trackingId.length !== 10 || !parcel.trackingId.startsWith('AU')) {
    throw new Error(`Tracking ID '${parcel.trackingId}' is invalid.`);
  }

  if (details.weightKg <= 0 || details.weightKg > 22) {
    throw new Error(`Weight of '${details.weightKg}'kg is out of range.`);
  }

  if (details.destinationPostcode < 1000 || details.destinationPostcode > 9999) {
    throw new Error(`Postcode '${details.destinationPostcode}' is invalid.`);
  }

  if (details.fragile === true && details.declaredValue === 0) {
    throw new Error('Fragile parcels must declare a value.');
  }
  return 'Parcel accepted. Ready for dispatch.';
}

function checkFields(parcel: Parcel): string[] {
  const fields = ['weightKg', 'destinationPostcode', 'senderName', 'fragile',
    'declaredValue'];
  const missing: string[] = [];

  for (const field of fields) {
    if (!(field in parcel.details)) {
      missing.push(field);
    }
  }

  return missing.sort();
}
