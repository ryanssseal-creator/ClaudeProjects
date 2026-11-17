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

/**
 * Validates a single driving test application against specific criteria.
 */
export function validateApplication(application: Application) {
  // TODO: complete me
  return 'Application in correct format. Proceed to booking.';
}
