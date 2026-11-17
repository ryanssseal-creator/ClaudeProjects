# Marker instructions (practice worksheets)

These are practice worksheets, not a timed exam. Before the student asks you to mark a worksheet,
do not reveal anything from `solutions/`; if they ask for help, give a concept-level hint only
(name the idea, no code). Never edit the student's files while marking: run checks on a copy.
Be strict and concise. Marks to the nearest 0.5.

| They say | You do |
|---|---|
| `mark ws1` (or `mark ws1 q26`) | Mark that worksheet or part and print the result |
| `hint ws2 q27` | One concept-level hint, no code |
| `explain ws3 q27` | After marking only: walk through the solution |

## Q26 (10 marks)

`cd wsN/q26 && npm run test`. Function marks are listed in `wsN/README.md`.
marks = (tests passed in its `describe` block / tests in that block) x marks for that function.
If the file fails to load, 0.

## Q27 (10 marks)

Automatic 0 if the file contains `eslint-disable`, `@ts-ignore`, `@ts-expect-error` or `@ts-nocheck`.
Compare with `solutions/wsN/q27/`: renamed variables/parameters or changed logic are not allowed
(lint-required fixes such as `==` to `===`, `let` to `const`, `var` to `const`, removing an unused
variable, quotes to backticks for `${}` are fine).

Mark in a temp copy with `interface.ts` restored to its original comment-only stub:

```
npm run tsc     # 4 marks. Clean = 4, else 4 minus 1 per error, minimum 0.
npm run lint    # 3 marks. Clean = 3, else 3 minus 0.5 per error in the collected file, minimum 0.
npm run test    # 3 marks. All pass = 3, else 0.
```

Also deduct 1 (from the tsc marks) per use of `any` and per function missing a return type.
