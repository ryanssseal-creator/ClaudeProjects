# Q21-25. Short-Answer Theory (20 marks)

Short-answer theory questions.

A few key phrases, dotpoints, or sentences is sufficient to score full marks in this section of the exam. Aim for concise and correct answers, more words does not mean more marks.

## 21. Requirements (4 marks)

Consider the following user story:

> As a tutor, I want to export my class's marks as a CSV file so that I can upload them to the university's results system.

In `q21.md`:

- a) Write two scenario-based acceptance criteria for this user story. At least one must describe a case where the export should NOT succeed. (2 marks)
- b) Give one functional requirement and one non-functional requirement related to this feature. (2 marks)

## 22. Design Principles (4 marks)

A team's backend has the following two characteristics:

1. Each of its 12 route handlers begins with the same six lines of code, which look up the session token, check that it is valid, and return a 401 error if it is not.
2. The specification only has two roles, `admin` and `user`. The team has built a configurable "permission rules engine" that supports 15 role types and custom rule files.

In `q22.md`, for each characteristic, name the design principle that is being violated, explain the problem it causes, and say what the team should do instead.

## 23. Testing (4 marks)

In the major project, your tests send HTTP requests to your server and check the responses against the specification. A teammate suggests that it would be easier to write tests that import the data store directly and check its contents after each function call.

In `q23.md`:

- a) Which of these is black-box testing and which is white-box testing? (1 mark)
- b) Give two reasons why the HTTP tests written against the specification are the better choice. (2 marks)
- c) Give one thing that the HTTP tests alone cannot tell you, that another technique can. (1 mark)

## 24. Persistence (4 marks)

A server keeps all of its data in a global variable. After the application is deployed, users complain that every time a new version is released, all of their data has disappeared.

In `q24.md`:

- a) Explain why this happens. (1 mark)
- b) Describe a solution. (1 mark)
- c) The team decides to save the data every time any request changes it. Give one advantage and one disadvantage of this compared to saving it once every five minutes. (2 marks)

## 25. Cyclomatic Complexity (4 marks)

Consider the following code:

```js
function findPairs(nums, target) {
  const pairs = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        pairs.push([nums[i], nums[j]]);
      }
    }
  }

  if (pairs.length === 0) {
    throw new Error('No pairs found');
  }
  return pairs;
}
```

In `q25.md`, what is the cyclomatic complexity of the function? Show how you worked it out.
