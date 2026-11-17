# Q31 rubric and sample design - Mock Exam 1

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | An endpoint to book a class (story 1) |
| 1 | An endpoint to cancel a booking (story 2) |
| 1 | An endpoint to search classes by keyword (story 3) |
| 2 | Invalid operations are rejected with named errors (story 4): class full, and cancelling a booking you do not have. 1 mark each. |
| 1 | Every new endpoint requires a session (story 5). Sessions only come from UNSW single-sign-on via `/auth/login`, so requiring one is what guarantees the user is UNSW staff or a student. Must be stated or shown on every endpoint (a 401 error on each is enough). |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: POST/PUT to book, DELETE (or POST/PUT) to cancel, GET to search. No GET that changes state. |
| 1 | Sensible, consistent paths that fit the existing API (built on `/class/{classId}`), with ids as path parameters, keywords in the query string, session in the header. No body on GET. |
| 1 | Status codes used correctly and consistently with the existing API: 400 for invalid operations/ids, 401 for invalid session. |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

Deduct nothing for formatting. A design that only lists bare paths with no inputs, responses
or errors gets at most 4/10.

## Sample design

### POST /class/{classId}/booking

Book the logged-in member into the class. Uses one spot.

- Path: `classId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_CLASS_ID` classId does not refer to an existing class
  - `CLASS_FULL` the class has no spots left
- 401: `UNAUTHORISED` session is empty or invalid

### DELETE /class/{classId}/booking

Cancel the logged-in member's booking for the class. Frees one spot.

- Path: `classId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_CLASS_ID` classId does not refer to an existing class
  - `NOT_BOOKED` the logged-in member does not have a booking for this class
- 401: `UNAUTHORISED`

### GET /classes/search

Search for classes whose name contains the keywords.

- Header: `session`
- Query: `keywords`, e.g. `/classes/search?keywords=spin`
- 200: `[ { "classId": 1234, "name": "Spin", "startTime": "2026-11-20T07:00", "capacity": 12, "spotsLeft": 3 } ]`
- 400: `INVALID_KEYWORDS` keywords is empty
- 401: `UNAUTHORISED`

### Story 5

Every endpoint above requires a valid `session` and returns 401 without one. A session can
only be obtained from `/auth/login`, which authenticates against UNSW single-sign-on, so
every user of the gym is a UNSW student or staff member.

### Why this design

- The member is identified by the session, never by a zid in the body. That is what makes
  "a booking I did not make" checkable.
- Booking and cancelling are the same resource with different methods: POST creates the
  booking, DELETE removes it.
- Search is a GET with a query string, because it reads data and changes nothing.
