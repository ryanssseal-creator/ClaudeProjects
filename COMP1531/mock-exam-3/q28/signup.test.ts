import { describe, test, expect } from 'vitest';
import { Signup, validateSignup } from './signup.ts';

describe('validateSignup', () => {
  const SUCCESS = 'Signup valid. Proceed to verification.';
  const base: Signup = {
    username: 'ryan_s',
    profile: {
      email: 'ryan@unsw.edu.au',
      password: 'correct4horse',
      age: 19,
      newsletter: true,
    },
  };
  const withProfile = (changes: Partial<Signup['profile']>): Signup =>
    ({ ...base, profile: { ...base.profile, ...changes } });

  test('success - all details valid', () => {
    expect(validateSignup(base)).toBe(SUCCESS);
  });

  test('success - newsletter false, exactly 16, 8 character password', () => {
    expect(validateSignup(withProfile({ newsletter: false, age: 16, password: 'abcdefg1' }))).toBe(SUCCESS);
  });

  test('error - one field is missing', () => {
    const signup: Signup = {
      username: 'ryan_s',
      profile: { email: 'ryan@unsw.edu.au', age: 19, newsletter: true },
    };
    expect(() => validateSignup(signup))
      .toThrow("Incomplete signup. Missing field/s: 'password'.");
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const signup: Signup = { username: 'ryan_s', profile: { } };
    expect(() => validateSignup(signup))
      .toThrow("Incomplete signup. Missing field/s: 'age', 'email', 'newsletter', 'password'.");
  });

  test('error - missing fields are reported before any other error', () => {
    const signup: Signup = { username: 'x', profile: { email: 'nope', newsletter: false } };
    expect(() => validateSignup(signup))
      .toThrow("Incomplete signup. Missing field/s: 'age', 'password'.");
  });

  test('error - username too short', () => {
    expect(() => validateSignup({ ...base, username: 'ab' })).toThrow("Username 'ab' is invalid.");
  });

  test('error - username too long', () => {
    expect(() => validateSignup({ ...base, username: 'a'.repeat(16) }))
      .toThrow("Username 'aaaaaaaaaaaaaaaa' is invalid.");
  });

  test('error - username contains a space', () => {
    expect(() => validateSignup({ ...base, username: 'ryan s' })).toThrow("Username 'ryan s' is invalid.");
  });

  test('error - email has no @', () => {
    expect(() => validateSignup(withProfile({ email: 'ryan.unsw.edu.au' })))
      .toThrow("Email 'ryan.unsw.edu.au' is invalid.");
  });

  test('error - email has two @', () => {
    expect(() => validateSignup(withProfile({ email: 'ryan@unsw@edu.au' })))
      .toThrow("Email 'ryan@unsw@edu.au' is invalid.");
  });

  test('error - email has nothing before the @', () => {
    expect(() => validateSignup(withProfile({ email: '@unsw.edu.au' })))
      .toThrow("Email '@unsw.edu.au' is invalid.");
  });

  test('error - email has no . after the @', () => {
    expect(() => validateSignup(withProfile({ email: 'ryan.s@unsw' })))
      .toThrow("Email 'ryan.s@unsw' is invalid.");
  });

  test('error - password too short', () => {
    expect(() => validateSignup(withProfile({ password: 'short1' }))).toThrow('Password is too weak.');
  });

  test('error - password has no digit', () => {
    expect(() => validateSignup(withProfile({ password: 'longenoughbutnodigit' }))).toThrow('Password is too weak.');
  });

  test('error - underage', () => {
    expect(() => validateSignup(withProfile({ age: 15 }))).toThrow('User is underage.');
  });

  test('error - age 0 is present, but underage', () => {
    expect(() => validateSignup(withProfile({ age: 0 }))).toThrow('User is underage.');
  });
});
