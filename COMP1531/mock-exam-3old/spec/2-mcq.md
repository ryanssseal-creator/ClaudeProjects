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

**1. When does Git report a merge conflict?**

- A) Whenever two branches have changed different files
- B) When two branches have changed the same lines of the same file in different ways
- C) Whenever a branch has more than one commit
- D) When a branch has been pushed before being merged

**2. What does running `npm install` with no arguments do?**

- A) Updates npm itself to the latest version
- B) Installs every package listed in `package.json`
- C) Creates a new `package.json`
- D) Runs the project's test script

**3. Why is `node_modules/` normally listed in `.gitignore`?**

- A) It contains secrets such as passwords
- B) Git cannot track JavaScript files inside it
- C) It is large and can be regenerated from `package.json`, so it does not need to be in the repository
- D) It is only needed in production

**4. What does the HTTP status code 401 mean?**

- A) The request body failed validation
- B) The client has not provided valid authentication
- C) The client is authenticated but not permitted to do this
- D) The server crashed while handling the request

**5. An Express server has the route `app.get('/quiz/:quizid/question/:questionid', ...)`. A client sends `GET /quiz/5/question/9`. What is `req.params`?**

- A) `{ quizid: 5, questionid: 9 }`
- B) `{ quizid: '5', questionid: '9' }`
- C) `['5', '9']`
- D) `{ quiz: '5', question: '9' }`

**6. To find the larger of two numbers, a developer writes a 30-line function using recursion, bit-shifting and nested ternaries, instead of calling `Math.max(a, b)`. Which principle is most directly violated?**

- A) DRY
- B) YAGNI
- C) KISS
- D) Single source of truth

**7. Which sequence describes test-driven development?**

- A) Write the code, write tests that pass, refactor
- B) Write a failing test, write just enough code to pass it, refactor
- C) Write all the code, then write all the tests at the end
- D) Write the tests, then delete them once the code works

**8. What is the result of running this code?**

```js
const user = { name: 'Ana' };
user.name = 'Bo';
console.log(user.name);
```

- A) It prints `Ana`, because `const` objects cannot be changed
- B) It throws an error on the second line
- C) It prints `Bo`, because `const` only prevents the variable being reassigned
- D) It prints `undefined`

**9. A web form checks in the browser that a quiz name is 3 to 30 characters long. Why must the server check this as well?**

- A) Browsers cannot measure the length of a string reliably
- B) Requests can be sent straight to the server without using the frontend at all
- C) The server needs to hash the quiz name
- D) It does not need to; checking twice violates DRY

**10. Which format is used for scenario-based acceptance criteria?**

- A) As a ... I want ... so that ...
- B) Given ... when ... then ...
- C) If ... else ...
- D) Must have / should have / could have / won't have

**11. Which of the following is a functional requirement?**

- A) The system must be available 99.9% of the time
- B) Pages must be usable with a screen reader
- C) Users can upload a profile image
- D) The server must handle 500 requests per second

**12. A test suite reports 100% statement coverage. What does this tell you?**

- A) The code has no bugs
- B) Every requirement has been implemented
- C) Every statement was executed by at least one test
- D) Every possible input has been tested

**13. What does the type `string | number` mean in TypeScript?**

- A) A value that is both a string and a number at the same time
- B) A value that is either a string or a number
- C) A string that contains only digits
- D) A value whose type is decided at runtime by the compiler

**14. A merge request's CI pipeline fails at the lint stage. What is the most appropriate action?**

- A) Merge anyway, since linting does not affect behaviour
- B) Add a comment to disable the lint rule for the whole file
- C) Fix the lint errors, push again, and merge once the pipeline passes
- D) Delete the lint stage from the pipeline

## Multi-Select

In `mcq.md`, write all options that are correct. It may be the case that no options are correct, or all options are correct.

For example:

```
# 2. A B C D
# 3.
```

**15. [Multi-Select] Which of the following are part of a good merge request process?**

- [A] The change is reviewed by someone other than its author
- [B] The pipeline must pass before merging
- [C] Each merge request contains one small, focused change
- [D] Authors approve their own merge requests to save time

**16. [Multi-Select] Which of the following situations are matched with an appropriate status code?**

- [A] The session token is missing or invalid → 401
- [B] A logged-in user tries to edit another user's quiz → 403
- [C] A quiz name in the request body is too short → 400
- [D] The server throws an unexpected exception → 200

**17. [Multi-Select] Given the following code:**

```js
const letters = ['a', 'b'];
for (const x in letters) {
  console.log(x);
}
```

Which statements are true?

- [A] It prints `0` then `1`
- [B] It prints `a` then `b`
- [C] `x` is a string on each iteration
- [D] Replacing `in` with `of` would print `a` then `b`

**18. [Multi-Select] Which of the following reduce accidental complexity?**

- [A] Using a well-tested library instead of writing your own date parser
- [B] Giving variables and functions clear, descriptive names
- [C] Adding features that are not in the requirements
- [D] Removing duplicated code

**19. [Multi-Select] Which of the following are validation activities?**

- [A] Demonstrating a prototype to the client and asking for feedback
- [B] Usability testing with real users
- [C] Type-checking the code with `tsc`
- [D] Unit testing a function against its specification

**20. [Multi-Select] Which of the following statements about HTTP are true?**

- [A] A GET request should not change the server's data
- [B] The body of a POST request is commonly sent as JSON
- [C] A DELETE request cannot use path parameters
- [D] A session token can be sent in a request header
