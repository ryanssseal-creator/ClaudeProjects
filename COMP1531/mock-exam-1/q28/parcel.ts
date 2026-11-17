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

/**
 * Validates a single parcel booking against specific criteria.
 */
export function validateParcel(parcel: Parcel) {
  // TODO: complete me
  return 'Parcel in correct format. Proceed to dispatch.';
}
