# Q31 rubric and sample design - Mock Exam 1

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | An endpoint to book a class (story 1) |
| 1 | An endpoint to cancel a booking (story 2) |
| 1 | An endpoint to list the member's own bookings (story 3) |
| 2 | Invalid operations are rejected with named errors (story 4): class full, already booked, no booking to cancel. 2 marks for all three, 1 mark for one or two. |
| 1 | An endpoint for a trainer to list attendees of a class, restricted to trainers (story 5) |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: POST/PUT to create a booking, DELETE to cancel, GET to read. No GET that changes state. |
| 1 | Sensible, consistent resource paths that fit the existing API (e.g. build on `/class/{classId}`), with ids as path parameters. Data placed sensibly: session in the header like the existing routes, no body on GET. |
| 1 | Status codes used correctly and consistently with the existing API: 400 for invalid operations/ids, 401 for invalid session, 403 for wrong role. |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

Deduct nothing for formatting. A design that is correct but only lists bare paths with no
inputs, responses or errors gets at most 4/10.

## Sample design

### POST /class/{classId}/booking

Book the logged-in member into the class. Uses one spot.

- Path: `classId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_CLASS_ID` classId does not refer to an existing class
  - `CLASS_FULL` the class has no spots left
  - `ALREADY_BOOKED` the member already has a booking for this class
- 401: `UNAUTHORISED` session is empty or invalid

### DELETE /class/{classId}/booking

Cancel the logged-in member's booking for the class. Frees one spot.

- Path: `classId`
- Header: `session`
- 200: `{}`
- 400:
  - `INVALID_CLASS_ID` classId does not refer to an existing class
  - `NOT_BOOKED` the member does not have a booking for this class
- 401: `UNAUTHORISED`

### GET /bookings

List every class the logged-in member is booked into.

- Header: `session`
- 200: `[ { "classId": 1234, "name": "Spin", "startTime": "2026-11-20T07:00" } ]`
- 401: `UNAUTHORISED`

### GET /class/{classId}/attendees

List the members booked into a class. Trainers only.

- Path: `classId`
- Header: `session`
- 200: `[ { "zid": "z1234567" } ]`
- 400: `INVALID_CLASS_ID`
- 401: `UNAUTHORISED`
- 403: `FORBIDDEN` session belongs to a user whose role is not `TRAINER`

### Why this design

- The user is identified by the session, never by a zid in the body. That is what stops a
  member cancelling someone else's booking.
- Booking and cancelling are the same resource (`/class/{classId}/booking`) with different
  methods, which is the idiomatic way to say "create it" and "remove it".
- Reads are GET with no body. Anything that changes state is POST or DELETE.
