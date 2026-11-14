# Q1-20. Multiple-Choice (20 marks)

## Marking

Each MCQ question is worth 1 mark. There are no partial nor negative marks.

This means 1 mark will be awarded for a fully correct answer and 0 marks otherwise.

## Single-Select

In `mcq.md`, write the answer you believe to be correct next to the question.

For example:

```
# 1. A
```

**1. Which Git command creates a new branch called `feature` AND switches to it?**

- A) `git branch feature`
- B) `git checkout -b feature`
- C) `git merge feature`
- D) `git clone feature`

**2. What is the main purpose of `package-lock.json`?**

- A) To list the scripts that can be run with `npm run`
- B) To prevent other developers from installing new packages
- C) To record the exact version of every installed package so installs are reproducible
- D) To store packages that are only needed in production

**3. Which of the following is an example of static verification?**

- A) Running a Vitest test suite against the server
- B) Running ESLint and the TypeScript compiler over the codebase
- C) Clicking through the frontend to check a feature works
- D) Sending 10,000 requests to the server to measure response time

**4. Which HTTP method is the most appropriate for replacing the details of an existing resource?**

- A) GET
- B) POST
- C) PUT
- D) DELETE

**5. A developer copies the same 8-line session-checking block into every one of their 15 route handlers. Which principle is most directly violated?**

- A) KISS
- B) DRY
- C) YAGNI
- D) Top-down thinking

**6. A logged-in student (valid session) tries to delete a quiz that belongs to a different user. Which status code should the server return?**

- A) 400
- B) 401
- C) 403
- D) 404

**7. Consider this function:**

```js
function fee(age, member) {
  let cost = 20;
  if (age < 18) {
    cost -= 5;
  }
  if (member) {
    cost -= 10;
  }
  return cost;
}
```

What is the minimum number of tests needed for 100% branch coverage?

- A) 1
- B) 2
- C) 3
- D) 4

**8. For the following code:**

```js
try {
  safeFunction();
} catch (e) {
  handleError(e);
} finally {
  cleanup();
}
```

If `safeFunction` does NOT throw, which functions are called, and in what order?

- A) `safeFunction` → `handleError` → `cleanup`
- B) `safeFunction` only
- C) `safeFunction` → `cleanup`
- D) `cleanup` → `safeFunction`

**9. Why should passwords be stored as hashes rather than encrypted?**

- A) Hashes take up less disk space than encrypted text
- B) Hashing is one-way, so a leaked database does not directly reveal the original passwords
- C) Hashing lets the server email users their password if they forget it
- D) Encrypted passwords cannot be compared during login

**10. "Are we building the product right?" is the question answered by:**

- A) Validation
- B) Verification
- C) Requirements elicitation
- D) Deployment

**11. Which of the following is a well-formed user story?**

- A) The system shall hash all passwords using SHA-256.
- B) As a student, I want to filter quizzes by course so that I can find relevant practice quickly.
- C) Given I am logged in, when I click logout, then my session ends.
- D) Add a logout button to the navbar.

**12. Which of the following is a non-functional requirement?**

- A) Users can upload a profile picture
- B) Admins can export all quiz results as a CSV file
- C) The quiz list page must load within 2 seconds on a 4G connection
- D) Users receive an email when their password changes

**13. `git pull` is equivalent to which pair of commands?**

- A) `git add` then `git commit`
- B) `git fetch` then `git merge`
- C) `git commit` then `git push`
- D) `git clone` then `git checkout`

**14. With `strict` mode on, what happens with this TypeScript?**

```ts
function shout(name: string | undefined): string {
  return name.toUpperCase();
}
```

- A) It compiles, and returns `undefined` at runtime if `name` is undefined
- B) It compiles, and throws at runtime only if `name` is undefined
- C) It fails to compile, because `name` might be `undefined`
- D) It fails to compile, because union types cannot be used as parameters

## Multi-Select

In `mcq.md`, write all options that are correct. It may be the case that no options are correct, or all options are correct.

For example:

```
# 2. A B C D
# 3.
```

**15. [Multi-Select] Which of the following are benefits of Continuous Integration?**

- [A] Integration problems are found soon after they are introduced
- [B] Tests and linting run automatically on every push
- [C] It guarantees the software is free of bugs
- [D] Developers get fast feedback on whether their change broke something

**16. [Multi-Select] Which of the following values are falsy in JavaScript?**

- [A] `0`
- [B] `''`
- [C] `[]`
- [D] `null`
- [E] `'false'`

**17. [Multi-Select] Which of the following HTTP status codes indicate success?**

- [A] 200
- [B] 201
- [C] 302
- [D] 500

**18. [Multi-Select] Given the following code:**

```ts
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
nums.push(4);
```

Which statements are true after it runs?

- [A] `doubled` is `[2, 4, 6]`
- [B] `nums` is `[1, 2, 3, 4]`
- [C] `map` modified `nums` in place
- [D] `nums.push(4)` throws an error because `nums` was declared with `const`

**19. [Multi-Select] Which of the following Git commands work entirely on your local repository (they do not contact the remote)?**

- [A] `git commit`
- [B] `git push`
- [C] `git add`
- [D] `git fetch`
- [E] `git status`

**20. [Multi-Select] Which of the following are verification activities?**

- [A] Writing unit tests that check a function against its specification
- [B] Reviewing a merge request against the agreed design
- [C] User acceptance testing with the client
- [D] Running a linter
