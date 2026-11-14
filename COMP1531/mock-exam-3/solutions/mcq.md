# MCQ answers - Mock Exam 3

```
# 1. B
# 2. B
# 3. C
# 4. B
# 5. B
# 6. C
# 7. B
# 8. C
# 9. B
# 10. B
# 11. C
# 12. C
# 13. B
# 14. C
# 15. A B C
# 16. A B C
# 17. A C D
# 18. A B D
# 19. A B
# 20. A B D
```

## Why

1. **B.** Git merges changes to different files, or different parts of a file, automatically. It only needs you when both sides changed the same lines.
2. **B.** It reads `package.json` (and the lock file) and installs everything listed.
3. **C.** Anyone can recreate it with `npm install`. Committing it bloats the repo and causes pointless conflicts.
4. **B.** 401 = not authenticated (who are you?). 403 = authenticated but not allowed. 400 = bad input.
5. **B.** The keys are the names after the colons, and the values are always strings. Convert with `parseInt` before comparing to numeric ids.
6. **C.** Keep It Simple. DRY is about repetition, YAGNI is about building things nobody asked for.
7. **B.** Red, green, refactor.
8. **C.** `const` fixes which object the variable points to. The object's contents can still change.
9. **B.** The frontend is a convenience. Anyone can send a request with curl or a script, so the server is the only place validation can be trusted.
10. **B.** Given/When/Then. A is the user story format.
11. **C.** A feature the system provides. The others are qualities (availability, accessibility, performance), which are non-functional.
12. **C.** Coverage measures what was executed, not whether it was correct or complete.
13. **B.** A union type.
14. **C.** The pipeline exists to block exactly this. Disabling the check defeats the purpose.
15. **A B C.** Self-approval removes the review.
16. **A B C.** An unexpected server failure is a 500, never a 200.
17. **A C D.** `for...in` iterates over keys (array indices, as strings). `for...of` iterates over values.
18. **A B D.** Accidental complexity is difficulty we add ourselves. Extra unrequested features add more of it.
19. **A B.** Validation asks whether it's the right product (needs users/clients). C and D check the product against a spec, which is verification.
20. **A B D.** Any method can have path parameters.
