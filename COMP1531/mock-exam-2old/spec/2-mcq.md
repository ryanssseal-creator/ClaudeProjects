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

**1. Which statement best describes an iterative (agile) approach to software development?**

- A) All requirements are fixed up front and each phase is completed once, in order
- B) The software is built in short cycles, each producing something working that is used to gather feedback
- C) Testing is left until all features have been implemented
- D) Documentation is written instead of code

**2. What does `git stash` do?**

- A) Permanently deletes all uncommitted changes
- B) Pushes uncommitted changes to the remote
- C) Temporarily shelves uncommitted changes so the working directory is clean, to be re-applied later
- D) Combines the last two commits into one

**3. A project uses `vitest` to run its tests and `express` to run its server. Where should each be listed in `package.json`?**

- A) Both in `dependencies`
- B) Both in `devDependencies`
- C) `vitest` in `dependencies`, `express` in `devDependencies`
- D) `vitest` in `devDependencies`, `express` in `dependencies`

**4. Which of the following is an example of black-box testing?**

- A) Reading a function's source code and writing one test for each `if` branch
- B) Writing HTTP tests from the API specification without looking at the implementation
- C) Checking the contents of the data store directly after calling a function
- D) Measuring which lines of the implementation the tests execute

**5. A client sends `GET /search?term=cats`. In an Express route handler, how do you read the value `cats`?**

- A) `req.body.term`
- B) `req.params.term`
- C) `req.query.term`
- D) `req.headers.term`

**6. An Express server defines its routes in this order:**

```js
app.get('/user/:id', handlerOne);
app.get('/user/all', handlerTwo);
```

What happens when a client sends `GET /user/all`?

- A) `handlerTwo` runs, because it is the more specific match
- B) `handlerOne` runs, with `req.params.id` equal to `'all'`
- C) Both handlers run, in order
- D) Express returns a 404

**7. Consider this function, tested with the single test `check(5)`:**

```js
function check(x) {
  let y = 0;
  if (x > 0) {
    y = 1;
  }
  return y;
}
```

What coverage does that one test achieve?

- A) 100% statement coverage and 100% branch coverage
- B) 100% statement coverage, but less than 100% branch coverage
- C) Less than 100% statement coverage, but 100% branch coverage
- D) Less than 100% of both

**8. What happens when a function executes `throw new Error('oops')` and there is no `try`/`catch` inside that function?**

- A) The function returns the string `'oops'`
- B) The function returns `undefined` and execution continues on the next line of the caller
- C) The error propagates up the call stack until a `catch` handles it; if none does, the program crashes
- D) The error is logged to the console and then ignored

**9. Before deleting a quiz, a server checks that the logged-in user is the owner of that quiz. This check is an example of:**

- A) Authentication
- B) Authorisation
- C) Hashing
- D) Validation of user requirements

**10. The client asks for marks to be exported as CSV. A developer also builds PDF and XML export "in case they ask for it later". Which principle is most directly violated?**

- A) DRY
- B) YAGNI
- C) Encapsulation
- D) Top-down thinking

**11. Which of the following is typically found in a use case but NOT in a user story?**

- A) The type of user who wants the feature
- B) The benefit the user gets from the feature
- C) A step-by-step description of the interaction between the actor and the system, including alternative flows
- D) A short, informal description written from the user's point of view

**12. Why does a backend persist its data to a file or database rather than keeping it only in a variable?**

- A) Variables cannot store arrays of objects
- B) So the data survives the server being restarted or crashing
- C) Reading from a file is faster than reading from memory
- D) So the frontend can read the file directly

**13. Users report a bug in software that was released six months ago, and a developer fixes it. Which phase of the software development lifecycle is this?**

- A) Requirements analysis
- B) Design
- C) Deployment
- D) Maintenance

**14. In the TypeScript interface below, what does the `?` mean?**

```ts
interface Profile {
  name: string;
  bio?: string;
}
```

- A) `bio` can be any type
- B) `bio` may be left out of the object (it is `string` or `undefined`)
- C) `bio` is checked at runtime rather than at compile time
- D) `bio` cannot be changed after the object is created

## Multi-Select

In `mcq.md`, write all options that are correct. It may be the case that no options are correct, or all options are correct.

For example:

```
# 2. A B C D
# 3.
```

**15. [Multi-Select] Which of the following are good practices for session tokens?**

- [A] Tokens are random and hard to guess
- [B] Tokens are the user's id, so they are easy to look up
- [C] A token stops working once the user logs out
- [D] The same token is shared by all users with the same role

**16. [Multi-Select] Which of the following array methods do NOT modify the array they are called on?**

- [A] `map`
- [B] `filter`
- [C] `push`
- [D] `sort`
- [E] `slice`

**17. [Multi-Select] Which of the following does a linter such as ESLint help with?**

- [A] Enforcing a consistent code style across a team
- [B] Catching some likely bugs without running the code
- [C] Proving that the program meets its requirements
- [D] Measuring how much of the code the tests execute

**18. [Multi-Select] Which of the following HTTP status codes indicate a server-side error?**

- [A] 500
- [B] 403
- [C] 503
- [D] 201

**19. [Multi-Select] Which of the following are properties of a good automated test?**

- [A] It passes or fails the same way every time it is run
- [B] It only passes if another test has run before it
- [C] It tests behaviour through the public interface rather than relying on implementation details
- [D] It can be run on its own, in any order

**20. [Multi-Select] Given the following types:**

```ts
type Status = 'open' | 'closed';

interface Ticket {
  id: number;
  status: Status;
  note?: string;
}
```

Which of the following objects are valid `Ticket`s?

- [A] `{ id: 1, status: 'open' }`
- [B] `{ id: 1, status: 'pending' }`
- [C] `{ id: '1', status: 'closed' }`
- [D] `{ id: 2, status: 'closed', note: 'done' }`
