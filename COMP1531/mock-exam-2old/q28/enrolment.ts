export interface Enrolment {
  zid: string;
  request: {
    courses?: string[];
    term?: number;
    overloadApproved?: boolean;
  }
}

/**
 * Validates a single enrolment request against specific criteria.
 */
export function validateEnrolment(enrolment: Enrolment) {
  // TODO: complete me
  return 'Enrolment valid. Proceed to timetable.';
}
