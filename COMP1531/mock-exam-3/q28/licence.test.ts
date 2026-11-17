import { describe, test, expect } from 'vitest';
import { Application, validateApplication } from './licence.ts';

describe('validateApplication', () => {
  const baseApp: Application = {
    applicationId: 123456,
    requirements: {
      age: 18,
      eyesightTestPassed: true,
      knowledgeTestPassed: true,
      feePaid: true,
      logbookHours: 130,
    },
  };

  test('success - all criteria are valid', () => {
    expect(validateApplication(baseApp))
      .toBe('Application in correct format. Proceed to booking.');
  });

  test('error - age < 17', () => {
    const app = {
      ...baseApp,
      requirements: { ...baseApp.requirements, age: 16 },
    };
    expect(() => validateApplication(app))
      .toThrow('Learner is underage.');
  });

  test('error - logbook hours < 120', () => {
    const app = {
      ...baseApp,
      requirements: { ...baseApp.requirements, logbookHours: 90 },
    };
    expect(() => validateApplication(app))
      .toThrow("Logbook hours of '90' insufficient.");
  });

  test('error - applicationId is not 6 digits', () => {
    const app = { ...baseApp, applicationId: 1234 };
    expect(() => validateApplication(app))
      .toThrow("Provided applicationId '1234' not in range.");
  });

  test('error - one required field is missing', () => {
    const incompleteApp: Application = {
      applicationId: 123456,
      requirements: {
        age: 18,
        eyesightTestPassed: true,
        knowledgeTestPassed: true,
        feePaid: true,
        // missing logbookHours
      },
    };

    const expectedMessage =
      "Incomplete application. Missing field/s; 'logbookHours'.";
    expect(() => validateApplication(incompleteApp)).toThrow(expectedMessage);
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const incompleteApp: Application = {
      applicationId: 123456,
      requirements: { },
    };

    const expectedMessage =
      "Incomplete application. Missing field/s; 'age', 'eyesightTestPassed', 'feePaid', 'knowledgeTestPassed', 'logbookHours'.";
    expect(() => validateApplication(incompleteApp)).toThrow(expectedMessage);
  });
});
