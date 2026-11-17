// SOLUTION - Mock Exam 2, Q28

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

const MAX_UOC = 18;
const MIN_WAM = 50;
const ZID_DIGITS = 7;

// Listed in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['feesPaid', 'prerequisitesMet', 'termConfirmed', 'uoc', 'wam'] as const;

/**
 * Validates a single enrolment request against specific criteria.
 */
export function validateEnrolment(enrolment: Enrolment): string {
  const request = enrolment.request;

  // Missing fields first: the other checks need the fields to exist.
  const missing = REQUIRED_FIELDS.filter(field => request[field] === undefined);
  if (missing.length > 0) {
    // ['uoc', 'wam'] -> "'uoc', 'wam'"
    const list = missing.map(field => `'${field}'`).join(', ');
    // The spec says THROWN errors: `throw new Error(...)`, not `return '...'`.
    throw new Error(`Incomplete enrolment. Missing field/s; ${list}.`);
  }

  // Turn the number into a string to count its digits.
  if (String(enrolment.zid).length !== ZID_DIGITS) {
    throw new Error(`Provided zid '${enrolment.zid}' not in range.`);
  }

  // We know these exist after the missing check, so the casts are safe.
  const uoc = request.uoc as number;
  const wam = request.wam as number;

  if (uoc > MAX_UOC) {
    throw new Error('Student is overloading.');
  }

  if (wam < MIN_WAM) {
    // The quotes go around the number: '49'
    throw new Error(`WAM of '${wam}' insufficient.`);
  }

  return 'Enrolment in correct format. Proceed to timetable.';
}
