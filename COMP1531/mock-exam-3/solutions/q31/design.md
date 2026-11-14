# Q31 rubric and sample design - Mock Exam 3

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | An endpoint to book a room, taking a date, start time and end time (story 1) |
| 1 | An endpoint to see a room's existing bookings for a date (story 2) |
| 1 | An endpoint to list the logged-in student's own bookings (story 3) |
| 1 | An endpoint to cancel a booking (story 4) |
| 1 | Invalid operations rejected with named errors (story 5): overlap, longer than 2 hours, not your booking. All three for the mark; 0.5 for one or two. |
| 1 | Admins can cancel any booking (story 6): either the same cancel endpoint with the rule stated explicitly, or a separate admin endpoint that returns 403 for non-admins. |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: POST to create a booking, GET to read, DELETE to cancel. No GET that changes state, no body on GET. |
| 1 | Sensible, consistent resource paths that fit the existing API (bookings nested under `/room/{roomId}` or a top-level `/booking/{bookingId}`), ids in the path, the date filter in the query string, session in the header. |
| 1 | Status codes distinguish the cases: 400 bad input / clash, 401 invalid session, 403 logged in but not allowed (someone else's booking and not an admin). |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

A design that only lists bare paths with no inputs, responses or errors gets at most 4/10.

## Sample design

### POST /room/{roomId}/bookings

Book the room for the logged-in student.

- Path: `roomId`
- Header: `session`
- Body: `{ "date": "2026-11-20", "startTime": "14:00", "endTime": "15:30" }`
- 200: `{ "bookingId": 5678 }`
- 400:
  - `INVALID_ROOM_ID` roomId does not refer to a room
  - `INVALID_TIME` date or times are malformed, or endTime is not after startTime
  - `BOOKING_TOO_LONG` the booking is longer than 2 hours
  - `TIME_UNAVAILABLE` the time overlaps an existing booking for this room
- 401: `UNAUTHORISED`

### GET /room/{roomId}/bookings

List the bookings for a room on a date, so a student can see which times are taken.

- Path: `roomId`
- Header: `session`
- Query: `date`, e.g. `/room/1234/bookings?date=2026-11-20`
- 200: `[ { "bookingId": 5678, "startTime": "14:00", "endTime": "15:30" } ]`
- 400: `INVALID_ROOM_ID`, `INVALID_DATE`
- 401: `UNAUTHORISED`

### GET /bookings

List the logged-in student's own bookings.

- Header: `session`
- 200: `[ { "bookingId": 5678, "roomId": 1234, "roomName": "K17 113", "date": "2026-11-20", "startTime": "14:00", "endTime": "15:30" } ]`
- 401: `UNAUTHORISED`

### DELETE /booking/{bookingId}

Cancel a booking. A student can cancel only their own bookings. An admin can cancel any booking.

- Path: `bookingId`
- Header: `session`
- 200: `{}`
- 400: `INVALID_BOOKING_ID` bookingId does not refer to a booking
- 401: `UNAUTHORISED`
- 403: `FORBIDDEN` the booking belongs to another user and the session's role is not `ADMIN`

### Why this design

- Who is acting always comes from the session, never from a zid in the body. That is what
  makes "not your booking" enforceable.
- One DELETE endpoint covers stories 4 and 6. The difference between a student and an admin
  is an authorisation rule (403), not a different URL.
- The date filter is a query parameter on a GET, because it narrows a read and changes nothing.
- 401 vs 403: 401 means we don't know who you are; 403 means we do, and you're not allowed.
