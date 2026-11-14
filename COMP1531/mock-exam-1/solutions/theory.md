# Theory rubric - Mock Exam 1

Award marks for the idea in any wording. Each bullet is the mark it is worth.

## Q21 Requirements (4)

a) (2)
- 1: Non-functional.
- 1: Justification: it describes *how well* the system performs (a quality/constraint: response time), not a behaviour or feature the system provides. "Search" is the function; "within 1 second" is the quality.

b) (2)
- 1: User story in role / goal / benefit form, e.g. *As a student, I want to reset my password using my email so that I can get back into my account if I forget it.* Must have all three parts.
- 1: One acceptance criterion in scenario (Given / When / Then) form, e.g. *Given I have an account registered with my email, when I request a password reset and open the emailed link, then I can set a new password and log in with it.* A plain rule list ("if email invalid, deny") is NOT scenario-based: 0.

## Q22 Verification and Validation (4)

a) (2)
- 1: They did verification well: the tests show the software was built correctly against what the team understood the spec to be ("built the product right").
- 1: They failed at validation: they never confirmed that what they were building was what the client actually needed ("built the wrong product"). Passing tests / 100% coverage says nothing about that.

b) (2) 1 each for any two of:
- Regular demos / sprint reviews with the client for feedback
- Prototyping or mock-ups shown to the client early
- Reviewing requirements / user stories / acceptance criteria with the client before building
- User acceptance testing during development rather than at handover
(Not accepted: "write more tests", "increase coverage", "code review". Those are verification.)

## Q23 Git Practices (4)

Two problems, each 1 for the problem and 1 for the matching practice. Any two of:

- **Pushed straight to master with no review.** Untested, unreviewed code is now in everyone's base and can break the whole team's work the night before the deadline. *Instead:* work on a feature branch and merge via a merge request that is reviewed by someone else and passes the CI pipeline.
- **One huge commit mixing unrelated changes.** Impossible to review properly, impossible to revert one part (e.g. a bad bug fix) without losing the rest, hard to find which change caused a bug. *Instead:* small, atomic commits/merge requests, one logical change each.
- **Meaningless commit message.** Nobody (including the author later) can tell from the history what changed or why. *Instead:* descriptive messages that say what the change does.
- **Integrating late (night before the deadline).** Big merges late cause conflicts and leave no time to fix them. *Instead:* merge small changes often.

## Q24 Authentication and Authorisation (4)

- 1: Problem: plaintext passwords. Anyone who reads or leaks the database gets every user's password (and users reuse passwords elsewhere).
- 1: Fix: store a hash of the password (one-way), and compare hashes at login.
- 1: Problem: the "token" is a predictable/guessable sequential ID. Anyone can pretend to be user 2 by sending `2`. It also never expires and can't be invalidated on logout.
- 1: Fix: on login generate a random, hard-to-guess session token (or a signed JWT), store it server-side against the user, validate it on every request, and remove it on logout.

## Q25 Cyclomatic Complexity (4)

- 2: Answer is **6**.
- 2: Working: count decision points and add 1 (or count regions / E - N + 2 on a correct graph).
  Decision points: `for`, `if (n < 0)`, `if (n % 2 === 0)`, `if (evens > 10)`, `else if (evens > 0)` = 5. So 5 + 1 = 6.
- If the method is right but one decision point is miscounted (answer 5 or 7 with working shown): 2 of 4.
- `continue`, `return` and plain `else` are NOT decision points.
