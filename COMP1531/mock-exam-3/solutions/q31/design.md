# Q31 rubric and sample design - Mock Exam 3

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | An endpoint to book a room (story 1) |
| 1 | An endpoint to release a room (story 2) |
| 1 | An endpoint to search rooms by minimum capacity (story 3) |
| 2 | Invalid operations are rejected with named errors (story 4): already booked, and releasing a room you did not book. 1 mark each. |
| 1 | Every new endpoint requires a session (story 5). Sessions only come from UNSW single-sign-on via `/auth/login`, so requiring one is what guarantees the user is UNSW staff or a student. Must be stated or shown on every endpoint (a 401 error on each is enough). |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: POST/PUT to book, DELETE (or POST/PUT) to release, GET to search. No GET that changes state. |
| 1 | Sensible, consistent paths that fit the existing API (built on `/room/{roomId}`), with ids as path parameters, the capacity filter in the query string, session in the header. No body on GET. |
| 1 | Status codes used correctly and consistently with the existing API: 400 for invalid operations/ids, 401 for invalid session. |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

Deduct nothing for formatting. A design that only lists bare paths with no inputs, responses
or errors gets at most 4/10.

## Sample design

### POST /room/{roomId}/booking

Book the room for the logged-in user.

- Path: `roomId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_ROOM_ID` roomId does not refer to an existing room
  - `ALREADY_BOOKED` the room is already booked
- 401: `UNAUTHORISED` session is empty or invalid

### DELETE /room/{roomId}/booking

Release the logged-in user's booking of the room.

- Path: `roomId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_ROOM_ID` roomId does not refer to an existing room
  - `NOT_BOOKED_BY_USER` the logged-in user does not hold the booking for this room
- 401: `UNAUTHORISED`

### GET /rooms/search

Search for rooms that hold at least a given number of people.

- Header: `session`
- Query: `minCapacity`, e.g. `/rooms/search?minCapacity=4`
- 200: `[ { "roomId": 1234, "name": "K17 113", "capacity": 6, "booked": false } ]`
- 400: `INVALID_CAPACITY` minCapacity is not a positive number
- 401: `UNAUTHORISED`

### Story 5

Every endpoint above requires a valid `session` and returns 401 without one. A session can
only be obtained from `/auth/login`, which authenticates against UNSW single-sign-on, so
every user of the system is a UNSW student or staff member.

### Why this design

- The user is identified by the session, never by a zid in the body. That is what makes
  "a room I did not book" checkable.
- Book and release are the same resource with different methods: POST creates the
  booking, DELETE removes it.
- Search is a GET with a query string, because it reads data and changes nothing.
