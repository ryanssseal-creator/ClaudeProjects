# Theory rubric - Mock Exam 2

Award marks for the idea in any wording. Each bullet is the mark it is worth.

## Q21 Requirements (4)

a) (2) 1 mark per acceptance criterion, each must be a scenario (Given / When / Then, or
equivalent context / action / outcome). At least one must be a failure case, otherwise max 1.
- e.g. *Given I am logged in as a tutor of class W11B, when I click "Export marks", then a CSV file downloads containing one row per student in W11B with their zID and marks.*
- e.g. *Given I am logged in as a tutor, when I try to export marks for a class I do not teach, then the export is refused and I am shown an error.*
- A list of rules ("if not tutor, deny") is not scenario-based: 0 for that criterion.

b) (2)
- 1: A functional requirement: something the system does. e.g. "The system generates a CSV with columns zID, name, mark for every student in the selected class."
- 1: A non-functional requirement: a quality or constraint, ideally measurable. e.g. "The export completes within 5 seconds for a class of 30", "Only authenticated tutors can access marks", "The file is UTF-8 encoded and opens in Excel".
- If the two are swapped or both are the same type: 1 at most.

## Q22 Design Principles (4)

Characteristic 1 (2)
- 1: Violates **DRY** (Don't Repeat Yourself).
- 1: Problem + fix: any change or bug fix to session checking must be made in 12 places and it is easy to miss one. Extract it into one helper function / Express middleware that every route uses.

Characteristic 2 (2)
- 1: Violates **YAGNI** (You Aren't Gonna Need It). Accept **KISS** as well.
- 1: Problem + fix: time spent building, testing and maintaining functionality nobody asked for, and more complexity/more places for bugs. Build only what the spec needs now (a simple check of `admin` vs `user`), and extend it if and when the requirement appears.

## Q23 Testing (4)

a) (1) HTTP tests against the spec = black-box. Inspecting the data store = white-box. Both needed for the mark.

b) (2) 1 each for any two of:
- They test what the user/marker actually sees (the interface in the spec), including routing, status codes and parameter handling, not just internal state.
- They don't break when the implementation is refactored (e.g. changing the data store structure), so they stay valid as long as behaviour is unchanged.
- They can be written from the spec before or independently of the implementation (and work against anyone's implementation, e.g. the automarker's).
- They don't assume a particular internal design, so they can't "pass" just because the test and code share the same wrong assumption about internals.

c) (1) Any one of:
- How much of the code was executed: need coverage measurement (white-box).
- Type errors / style problems on paths the tests don't run: need static verification (tsc, lint).
- Whether the product is what users want: need validation (demos, acceptance testing).
- Where exactly a bug is: unit tests localise it better.

## Q24 Persistence (4)

a) (1) Variables live in the process's memory. Releasing a new version restarts the server process, so the memory (and all data in it) is lost.

b) (1) Persist the data outside the process: write it to a file (e.g. JSON) or a database, and load it when the server starts.

c) (2)
- 1: Advantage of saving on every change: no data is lost if the server crashes or restarts; the stored copy is always up to date.
- 1: Disadvantage: slower, since every modifying request pays for a disk write (poor performance under load). (The five-minute approach is faster but can lose up to five minutes of data.)

## Q25 Cyclomatic Complexity (4)

- 2: Answer is **5**.
- 2: Working: decision points + 1. Decision points: outer `for`, inner `for`, `if (nums[i] + nums[j] === target)`, `if (pairs.length === 0)` = 4. So 4 + 1 = 5.
- Right method with one miscount (4 or 6 with working shown): 2 of 4.
- `throw` and `return` are not decision points. A nested loop counts as one decision, the same as a loop that isn't nested.
