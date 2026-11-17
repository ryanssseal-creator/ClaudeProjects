export interface Enrolment {
  zid: number;
  request: {
    uoc?: number;
    feesPaid?: true;
    prerequisitesMet?: true;
    termConfirmed?: true;
    wam?: number;
  }
}

/**
 * Validates a single enrolment request against specific criteria.
 */
export function validateEnrolment(enrolment: Enrolment) {
  // TODO: complete me
  return 'Enrolment in correct format. Proceed to timetable.';
}
