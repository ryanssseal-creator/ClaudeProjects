// SOLUTION - Mock Exam 3, Q28

export interface Application {
  applicationId: number;
  requirements: {
    age?: number;
    eyesightTestPassed?: true;
    knowledgeTestPassed?: true;
    feePaid?: true;
    logbookHours?: number;
  }
}

const MIN_AGE = 17;
const MIN_HOURS = 120;
const ID_DIGITS = 6;

// Listed in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['age', 'eyesightTestPassed', 'feePaid', 'knowledgeTestPassed', 'logbookHours'] as const;

/**
 * Validates a single driving test application against specific criteria.
 */
export function validateApplication(application: Application): string {
  const requirements = application.requirements;

  // Missing fields first: the other checks need the fields to exist.
  const missing = REQUIRED_FIELDS.filter(field => requirements[field] === undefined);
  if (missing.length > 0) {
    // ['age', 'feePaid'] -> "'age', 'feePaid'"
    const list = missing.map(field => `'${field}'`).join(', ');
    // The spec says THROWN errors: `throw new Error(...)`, not `return '...'`.
    throw new Error(`Incomplete application. Missing field/s; ${list}.`);
  }

  // Turn the number into a string to count its digits.
  if (String(application.applicationId).length !== ID_DIGITS) {
    throw new Error(`Provided applicationId '${application.applicationId}' not in range.`);
  }

  // We know these exist after the missing check, so the casts are safe.
  const age = requirements.age as number;
  const hours = requirements.logbookHours as number;

  if (age < MIN_AGE) {
    throw new Error('Learner is underage.');
  }

  if (hours < MIN_HOURS) {
    // The quotes go around the number: '90'
    throw new Error(`Logbook hours of '${hours}' insufficient.`);
  }

  return 'Application in correct format. Proceed to booking.';
}
