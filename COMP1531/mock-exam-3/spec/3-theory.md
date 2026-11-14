# Q21-25. Short-Answer Theory (20 marks)

Short-answer theory questions.

A few key phrases, dotpoints, or sentences is sufficient to score full marks in this section of the exam. Aim for concise and correct answers, more words does not mean more marks.

## 21. Requirements (4 marks)

During requirements elicitation for a room booking app, a stakeholder says:

> "The app should be fast and easy to use."

In `q21.md`:

- a) Explain why this is a poor requirement. (2 marks)
- b) Rewrite it as two improved requirements. For each one, state whether it is functional or non-functional. (2 marks)

## 22. Accidental complexity and Essential complexity (4 marks)

A team is building a tool that tells a student whether any two of their classes clash. In their implementation:

- class times are stored as strings in three different formats (`"Tue 2pm-4pm"`, `"14:00-16:00 Tuesday"` and `"T14-16"`) depending on which module created them, and the team has written converter functions between every pair of formats;
- the team wrote their own HTTP server from raw network sockets rather than using Express.

In `q22.md`, identify what is essential complexity and what is accidental complexity in this project. Justify your answer.

## 23. Git Practices (4 marks)

Two teammates, Ana and Bo, each create a branch from `master` on Monday and both edit the same function. Ana's merge request is merged on Wednesday. On Thursday, Bo opens a merge request and GitLab reports that it cannot be merged automatically.

In `q23.md`:

- a) Explain why GitLab cannot merge Bo's branch automatically. (1 mark)
- b) Describe the steps Bo should take to get the merge request merged. (2 marks)
- c) Suggest one practice that would make this situation less likely in future. (1 mark)

## 24. Continuous Integration (4 marks)

In `q24.md`:

- a) Explain what continuous integration is. (1 mark)
- b) Name three stages you would include in a CI pipeline for a TypeScript backend, and state what kind of problem each one catches. (3 marks)

## 25. Cyclomatic Complexity (4 marks)

Consider the following code:

```js
function summarise(orders) {
  let total = 0;
  for (const order of orders) {
    if (order.cancelled) {
      continue;
    }
    for (const item of order.items) {
      if (item.qty > 10) {
        total += item.price * item.qty * 0.9;
      } else if (item.qty > 0) {
        total += item.price * item.qty;
      }
    }
  }
  return total > 1000 ? 'large' : 'small';
}
```

In `q25.md`, what is the cyclomatic complexity of the function? Show how you worked it out.
