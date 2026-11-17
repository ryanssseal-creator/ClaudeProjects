# MCQ answers - Mock Exam 1

```
# 1. B
# 2. C
# 3. B
# 4. C
# 5. B
# 6. C
# 7. B
# 8. C
# 9. B
# 10. B
# 11. B
# 12. C
# 13. B
# 14. C
# 15. A B D
# 16. A B D
# 17. A B
# 18. A B
# 19. A C E
# 20. A B D
```

## Why

1. **B.** `git branch feature` creates the branch but leaves you where you are. `checkout -b` creates and switches.
2. **C.** `package.json` gives version *ranges*; the lock file pins the exact versions that were installed.
3. **B.** Static = analysing code without running it (linting, type checking). A, C and D all execute the program, so they are dynamic.
4. **C.** PUT replaces/updates an existing resource. POST creates, GET reads, DELETE removes.
5. **B.** Don't Repeat Yourself. The fix is one helper or middleware that every route calls.
6. **C.** 401 = we don't know who you are (missing/invalid session). 403 = we know who you are and you're not allowed.
7. **B.** Each `if` needs a true and a false. `(10, true)` takes both true branches, `(30, false)` takes both false branches.
8. **C.** `catch` only runs if something was thrown. `finally` always runs.
9. **B.** A hash can't be reversed. Encryption can be undone by anyone who gets the key.
10. **B.** Verification: building the product right (matches the spec). Validation: building the right product (what the user actually needs).
11. **B.** "As a <role>, I want <goal> so that <benefit>." A is a system requirement, C is an acceptance criterion, D is a task.
12. **C.** Non-functional requirements describe *how well* the system does something (speed, security, reliability). The rest are things the system *does*.
13. **B.** Fetch downloads the remote commits, merge integrates them into your branch.
14. **C.** Strict null checks: you must narrow `name` (e.g. `if (name === undefined)`) before calling a method on it.
15. **A B D.** CI finds problems earlier; it cannot prove there are none.
16. **A B D.** Empty arrays and all non-empty strings (including `'false'`) are truthy. This matters whenever you write `if (!x)` to check for a missing value.
17. **A B.** 2xx is success (201 = Created). 3xx is redirection, 5xx is server error.
18. **A B.** `map` returns a new array and leaves the original alone. `const` stops reassignment (`nums = ...`), not mutation.
19. **A C E.** `push` and `fetch` both talk to the remote.
20. **A B D.** Verification checks the product against its spec/design. UAT asks whether it is what the user wanted, which is validation.
