export interface Signup {
  username: string;
  profile: {
    email?: string;
    password?: string;
    age?: number;
    newsletter?: boolean;
  }
}

/**
 * Validates a single signup against specific criteria.
 */
export function validateSignup(signup: Signup) {
  // TODO: complete me
  return 'Signup valid. Proceed to verification.';
}
