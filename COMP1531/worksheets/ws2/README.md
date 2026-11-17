# Worksheet 2

## Q26. Problem Solving (10 marks)

Complete the functions in `q26/assorted.js`:

- `groupBy`: groups an array of objects by the value of a key. (3 marks)
- `flatten`: flattens arbitrarily nested arrays. (3 marks)
- `mostFrequent`: returns the most common element, with ties going to the earliest. (2 marks)
- `mergeCounts`: merges two objects of numbers, adding shared keys. (2 marks)

The full behaviour is in each header comment. None of the functions may modify their inputs.
Check with `npm run test`. Only `q26/assorted.js` is collected.

## Q27. Bank (10 marks)

Based on the JSDoc comments, modify `q27/bank.ts` so that it is type-safe and lint free.

- Type all function parameters and all return types.
- Fix wrong parameter and return types so they match the JSDoc.
- You may create interfaces or type aliases **in the main file**.
- You may add type annotations to local variables where the compiler needs them.
- Do NOT change variable names, function prototypes, parameters, or any logic. The provided tests must still pass.
- No `eslint-disable`, `@ts-ignore`, `@ts-expect-error` or `@ts-nocheck`: automatic zero.
- No `any`.

Check with `npm run tsc`, `npm run lint`, `npm run test`. Only `q27/bank.ts` is collected.
