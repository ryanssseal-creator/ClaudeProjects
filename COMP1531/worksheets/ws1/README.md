# Worksheet 1

## Q26. Problem Solving (10 marks)

Complete the functions in `q26/assorted.js`:

- `chunk`: splits an array into chunks of a given size. (3 marks)
- `countWords`: counts how often each word appears, case-insensitively. (3 marks)
- `isPalindrome`: checks whether a string is a palindrome, ignoring case and punctuation. (2 marks)
- `zip`: pairs up elements at the same index of two arrays. (2 marks)

The full behaviour is in each header comment. None of the functions may modify their inputs.
Check with `npm run test`. Only `q26/assorted.js` is collected.

## Q27. Library (10 marks)

Based on the JSDoc comments, modify `q27/library.ts` so that it is type-safe and lint free.

- Type all function parameters and all return types.
- Fix wrong parameter and return types so they match the JSDoc.
- You may create interfaces or type aliases **in the main file**.
- You may add type annotations to local variables where the compiler needs them.
- Do NOT change variable names, function prototypes, parameters, or any logic. The provided tests must still pass.
- No `eslint-disable`, `@ts-ignore`, `@ts-expect-error` or `@ts-nocheck`: automatic zero.
- No `any`.

Check with `npm run tsc`, `npm run lint`, `npm run test`. Only `q27/library.ts` is collected.
