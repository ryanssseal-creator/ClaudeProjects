# Q21-25. Short-Answer Theory (20 marks)

Short-answer theory questions.

A few key phrases, dotpoints, or sentences is sufficient to score full marks in this section of the exam. Aim for concise and correct answers, more words does not mean more marks.

## 21. Requirements (4 marks)

A team is building a quiz platform for UNSW students.

In `q21.md`:

- a) Consider the requirement: *"The system must return search results within 1 second for 95% of searches."* Is this requirement functional or non-functional? Justify your answer. (2 marks)
- b) Consider the feature: *"Students can reset a forgotten password using their email address."* Write a user story for this feature, and one scenario-based acceptance criterion for it. (2 marks)

## 22. Verification and Validation (4 marks)

A team delivers a timetabling app to a client. Every function has unit tests, the test suite passes, and coverage is 100%. At the handover demo the client says: *"This works, but it's not what we asked for. We needed to see clashes across the whole degree, not one term at a time."*

In `q22.md`:

- a) In terms of verification and validation, explain what the team did well and what they failed to do. (2 marks)
- b) Describe two activities the team could have done during the project to catch this problem earlier. (2 marks)

## 23. Git Practices (4 marks)

The night before a deadline, a teammate pushes a single commit straight to `master`. The commit message is `stuff`. It changes 900 lines across 14 files and includes a new feature, two unrelated bug fixes and some reformatting.

In `q23.md`, identify two problems with this way of working, and for each one describe the practice the team should follow instead.

## 24. Authentication and Authorisation (4 marks)

A backend has the following design:

- Passwords are stored in the database exactly as the user typed them.
- When a user logs in, the server returns their `userId` (1, 2, 3, ...) and the frontend sends that number back in a header on every request to prove who they are.

In `q24.md`, identify two security problems with this design, and explain how you would fix each one.

## 25. Cyclomatic Complexity (4 marks)

Consider the following code:

```js
function classify(nums) {
  let evens = 0;
  for (const n of nums) {
    if (n < 0) {
      continue;
    }
    if (n % 2 === 0) {
      evens++;
    }
  }

  if (evens > 10) {
    return 'many';
  } else if (evens > 0) {
    return 'some';
  }
  return 'none';
}
```

In `q25.md`, what is the cyclomatic complexity of the function? Show how you worked it out.
