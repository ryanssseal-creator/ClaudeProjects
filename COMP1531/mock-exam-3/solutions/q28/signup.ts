// SOLUTION - Mock Exam 3, Q28

export interface Signup {
  username: string;
  profile: {
    email?: string;
    password?: string;
    age?: number;
    newsletter?: boolean;
  }
}

const MIN_USERNAME = 3;
const MAX_USERNAME = 15;
const MIN_PASSWORD = 8;
const MIN_AGE = 16;
const DIGITS = '0123456789';

// Already in alphabetical order, so the missing list comes out sorted.
const REQUIRED_FIELDS = ['age', 'email', 'newsletter', 'password'] as const;

function isValidEmail(email: string): boolean {
  // 'a@b.c'.split('@') -> ['a', 'b.c'].  No @ gives 1 part, two @ give 3 parts.
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  const [before, after] = parts;
  return before.length > 0 && after.includes('.');
}

function hasDigit(str: string): boolean {
  for (const char of str) {
    if (DIGITS.includes(char)) {
      return true;
    }
  }
  return false;
}

/**
 * Validates a single signup against specific criteria.
 */
export function validateSignup(signup: Signup): string {
  const profile = signup.profile;

  // 1. Missing fields. Compare with undefined: `!profile.age` would wrongly call
  //    age 0 "missing", and `!profile.newsletter` would do the same for false.
  const missing = REQUIRED_FIELDS.filter(field => profile[field] === undefined);
  if (missing.length > 0) {
    const list = missing.map(field => `'${field}'`).join(', ');
    // THROW, don't return: the spec says "thrown errors".
    throw new Error(`Incomplete signup. Missing field/s: ${list}.`);
  }

  // After check 1 we know these exist, so the casts are safe.
  const email = profile.email as string;
  const password = profile.password as string;
  const age = profile.age as number;

  // 2. Username
  const username = signup.username;
  if (username.length < MIN_USERNAME || username.length > MAX_USERNAME || username.includes(' ')) {
    throw new Error(`Username '${username}' is invalid.`);
  }

  // 3. Email
  if (!isValidEmail(email)) {
    throw new Error(`Email '${email}' is invalid.`);
  }

  // 4. Password
  if (password.length < MIN_PASSWORD || !hasDigit(password)) {
    throw new Error('Password is too weak.');
  }

  // 5. Age
  if (age < MIN_AGE) {
    throw new Error('User is underage.');
  }

  return 'Signup valid. Proceed to verification.';
}
