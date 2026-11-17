# Theory rubric - Mock Exam 3

Award marks for the idea in any wording. Each bullet is the mark it is worth.

## Q21 Requirements (4)

a) (2) 1 each for any two of:
- It is vague / ambiguous: "fast" and "easy" mean different things to different people.
- It is not measurable or testable: there is no way to write a test or acceptance criterion that says whether it has been met.
- It bundles two separate requirements (speed and usability) into one.
- It doesn't say which user, action or part of the system it applies to.

b) (2) 1 per rewritten requirement. Each must be specific and measurable AND correctly labelled.
- e.g. "Searching for available rooms returns results within 2 seconds for 95% of requests." Non-functional.
- e.g. "A first-time user can complete a booking in under 1 minute without instructions" / "A booking can be made in at most 3 clicks from the home page." Non-functional.
- A functional rewrite is fine if labelled correctly, e.g. "The home page shows the user's next booking." Functional.
- Still vague ("the app should load quickly"): 0 for that one. Wrong label: 0 for that one.

## Q22 Accidental and Essential complexity (4)

- 1: **Essential:** the clash detection itself: representing class times and working out whether two time ranges on the same day overlap.
- 1: Why: that difficulty is part of the problem being solved; no choice of tools or design can remove it.
- 1: **Accidental:** the three time formats with converters between them, and the hand-written HTTP server.
- 1: Why: these difficulties come from the team's own choices, not the problem. One internal time representation removes the converters; Express (an existing, tested library) removes the socket code.

Answers that only label without justifying: max 2.

## Q23 Git Practices (4)

a) (1) Both branches changed the same lines (the same function) since they diverged, so Git cannot decide which version to keep: a merge conflict. Bo's branch is based on an out-of-date `master`.

b) (2) 1 mark for getting the latest master into the branch and resolving, 1 mark for verifying and pushing:
- Pull / merge the latest `master` into his branch (`git pull origin master`, or checkout master, pull, checkout branch, merge master).
- Resolve the conflict by editing the file to combine both changes correctly (ideally talking to Ana), then `git add` and `git commit`.
- Re-run the tests (and lint/tsc) to check the combined code works, then push. The merge request now merges cleanly once the pipeline passes and it is reviewed.

c) (1) Any one of: merge small changes frequently / short-lived branches; pull from master regularly while working; communicate about who is working on which code (stand-ups, task board); split work so two people aren't editing the same function.

## Q24 Continuous Integration (4)

a) (1) Developers merge their work into the shared main branch frequently, and every push / merge request automatically triggers a build and checks (tests, lint, etc.) so problems are detected early.

b) (3) 1 per stage with what it catches. Any three of:
- **Type checking (`tsc`)**: type errors, e.g. wrong argument types or possibly-undefined values, without running the code.
- **Linting (ESLint)**: style violations and suspicious patterns (unused variables, `==`), keeps code consistent.
- **Testing (Vitest)**: behaviour that does not match the specification; regressions in existing features.
- **Coverage**: code that no test exercises.
- **Build / install**: missing dependencies, code that does not compile or start.
- **Deploy** (CD): accept, if they explain it releases the passing build.
- Stage named with no explanation of what it catches: 0.5.

## Q25 Cyclomatic Complexity (4)

- 2: Answer is **7**.
- 2: Working: decision points + 1. Decision points: outer `for`, `if (order.cancelled)`, inner `for`, `if (item.qty > 10)`, `else if (item.qty > 0)`, ternary `? :` = 6. So 6 + 1 = 7.
- Right method with one miscount (commonly 6, from missing the ternary): 2 of 4.
- The ternary operator is a decision point: it is an if/else written on one line. `continue` and `return` are not.
