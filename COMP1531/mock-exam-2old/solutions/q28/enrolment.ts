// SOLUTION - Mock Exam 2, Q28

export interface Enrolment {
  zid: string;
  request: {
    courses?: string[];
    term?: number;
    overloadApproved?: boolean;
  }
}

const ZID_LENGTH = 8;
const COURSE_CODE_LENGTH = 8;
const VALID_TERMS = [1, 2, 3];
const MAX_COURSES = 3;

// Already in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['courses', 'overloadApproved', 'term'] as const;

// Helpers. With a regular expression these are one-liners:
//   /^z\d{7}$/.test(zid)        /^[A-Z]{4}\d{4}$/.test(code)
// but plain string methods work just as well and are easier to get right under pressure.
const DIGITS = '0123456789';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function onlyContains(str: string, allowed: string): boolean {
  for (const char of str) {
    if (!allowed.includes(char)) {
      return false;
    }
  }
  return true;
}

function isValidZid(zid: string): boolean {
  return zid.length === ZID_LENGTH && zid[0] === 'z' && onlyContains(zid.slice(1), DIGITS);
}

function isValidCourseCode(code: string): boolean {
  return code.length === COURSE_CODE_LENGTH &&
    onlyContains(code.slice(0, 4), UPPER) &&
    onlyContains(code.slice(4), DIGITS);
}

/**
 * Validates a single enrolment request against specific criteria.
 */
export function validateEnrolment(enrolment: Enrolment): string {
  const request = enrolment.request;

  // 1. Missing fields. Compare with undefined: `!request.term` would wrongly call
  //    term 0 "missing", and `!request.overloadApproved` would do the same for false.
  const missing = REQUIRED_FIELDS.filter(field => request[field] === undefined);
  if (missing.length > 0) {
    const list = missing.map(field => `'${field}'`).join(', ');
    throw new Error(`Incomplete enrolment. Missing field/s: ${list}.`);
  }

  // After check 1 we know these exist, so the casts are safe.
  const courses = request.courses as string[];
  const term = request.term as number;

  // 2. zID
  if (!isValidZid(enrolment.zid)) {
    throw new Error(`zID '${enrolment.zid}' is invalid.`);
  }

  // 3. Term
  if (!VALID_TERMS.includes(term)) {
    throw new Error(`Term '${term}' does not exist.`);
  }

  // 4. No courses
  if (courses.length === 0) {
    throw new Error('No courses selected.');
  }

  // 5. Course codes: the loop stops at the first invalid one because throw exits the function.
  for (const code of courses) {
    if (!isValidCourseCode(code)) {
      throw new Error(`Course code '${code}' is invalid.`);
    }
  }

  // 6. Overload
  if (courses.length > MAX_COURSES && !request.overloadApproved) {
    throw new Error(`Enrolling in '${courses.length}' courses requires overload approval.`);
  }

  return 'Enrolment valid. Proceed to timetable.';
}
