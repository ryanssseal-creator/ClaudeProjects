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
  // TODO: complete me
  return 'Parcel accepted. Ready for dispatch.';
}
