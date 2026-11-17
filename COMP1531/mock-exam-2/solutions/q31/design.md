# Q31 rubric and sample design - Mock Exam 2

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | An endpoint to reserve a textbook (story 1) |
| 1 | An endpoint to cancel a reservation (story 2) |
| 1 | An endpoint to search listings by keyword (story 3) |
| 2 | Invalid operations are rejected with named errors (story 4): already reserved, and cancelling a reservation that isn't yours. 1 mark each. |
| 1 | Every new endpoint requires a session (story 5). Sessions only come from UNSW single-sign-on via `/auth/login`, so requiring one is what guarantees the user is a UNSW student. Must be stated or shown on every endpoint (a 401 error on each is enough). |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: POST/PUT to reserve, DELETE (or POST/PUT) to cancel, GET to search. No GET that changes state. |
| 1 | Sensible, consistent paths that fit the existing API (built on `/listing/{listingId}`), with ids as path parameters, keywords in the query string, session in the header. No body on GET. |
| 1 | Status codes used correctly and consistently with the existing API: 400 for invalid operations/ids, 401 for invalid session. |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

Deduct nothing for formatting. A design that only lists bare paths with no inputs, responses
or errors gets at most 4/10.

## Sample design

### POST /listing/{listingId}/reserve

Reserve the textbook for the logged-in student.

- Path: `listingId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_LISTING_ID` listingId does not refer to an existing listing
  - `ALREADY_RESERVED` the textbook is already reserved
- 401: `UNAUTHORISED` session is empty or invalid

### DELETE /listing/{listingId}/reserve

Cancel the logged-in student's reservation of the textbook.

- Path: `listingId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_LISTING_ID` listingId does not refer to an existing listing
  - `NOT_RESERVED_BY_USER` the logged-in student does not hold the reservation for this textbook
- 401: `UNAUTHORISED`

### GET /listings/search

Search listings whose title or course code contains the keywords.

- Header: `session`
- Query: `keywords`, e.g. `/listings/search?keywords=actuarial`
- 200: `[ { "listingId": 1234, "title": "Actuarial Mathematics", "courseCode": "ACTL1101", "price": 45, "reserved": false } ]`
- 400: `INVALID_KEYWORDS` keywords is empty
- 401: `UNAUTHORISED`

### Story 5

Every endpoint above requires a valid `session` and returns 401 without one. A session can
only be obtained from `/auth/login`, which authenticates against UNSW single-sign-on, so
every user of the exchange is a UNSW student.

### Why this design

- The student is identified by the session, never by a zid in the body. That is what makes
  "a reservation I did not make" checkable.
- Reserve and cancel are the same resource with different methods: POST creates the
  reservation, DELETE removes it.
- Search is a GET with a query string, because it reads data and changes nothing.
