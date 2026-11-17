# MCQ answers - Mock Exam 2

```
# 1. B
# 2. C
# 3. D
# 4. B
# 5. C
# 6. B
# 7. B
# 8. C
# 9. B
# 10. B
# 11. C
# 12. B
# 13. D
# 14. B
# 15. A C
# 16. A B E
# 17. A B
# 18. A C
# 19. A C D
# 20. A D
```

## Why

1. **B.** Agile = short iterations, working software each time, feedback drives the next iteration. A describes waterfall.
2. **C.** Stash shelves your changes; `git stash pop` brings them back.
3. **D.** `devDependencies` are only needed while developing (tests, linters, build tools). `dependencies` are needed to run the app.
4. **B.** Black-box = you only know the inputs and expected outputs (the spec). A, C and D all depend on seeing inside the implementation (white-box).
5. **C.** `?term=cats` is the query string → `req.query`. `req.params` is for `:name` parts of the path, `req.body` is for POST/PUT JSON.
6. **B.** Express uses the first route that matches, and `:id` matches any text, including `all`. Put fixed paths before parameterised ones.
7. **B.** Every statement runs, but the `if` is only ever true. The false branch is never taken.
8. **C.** A throw unwinds the call stack until something catches it.
9. **B.** Authentication = who are you. Authorisation = are you allowed to do this.
10. **B.** You Aren't Gonna Need It: don't build what hasn't been asked for.
11. **C.** Use cases are detailed, step-by-step flows. User stories are one-sentence role/goal/benefit statements.
12. **B.** Memory is wiped when the process stops.
13. **D.** Work after release (bug fixes, updates) is maintenance.
14. **B.** Optional property.
15. **A C.** A token that can be guessed (B) or shared (D) doesn't identify anyone.
16. **A B E.** `push` and `sort` change the array in place. This is exactly the kind of thing that breaks a "must not modify the input" test.
17. **A B.** Linting is static verification. It doesn't prove correctness (C) and it isn't coverage (D).
18. **A C.** 5xx = server error. 403 is a client error, 201 is success.
19. **A C D.** Tests should be deterministic and independent.
20. **A D.** B: `'pending'` isn't in the union. C: `id` must be a number. `note` is optional, so A is fine without it.
