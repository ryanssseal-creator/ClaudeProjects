# Q31 rubric and sample design - Mock Exam 2

## Rubric (10 marks)

**Satisfies the user stories (6 marks)**

| Marks | For |
|---|---|
| 1 | Filtering listings by course code and max price (story 1), as optional query parameters on a GET |
| 1 | An endpoint to make an offer, including the offered price (story 2) |
| 1 | An endpoint to withdraw an offer (story 3) |
| 1 | An endpoint for the seller to list offers on a listing (story 4) |
| 1 | An endpoint to accept an offer, which marks the listing sold (story 5) |
| 1 | Invalid operations rejected with named errors (story 6): own listing, sold listing, not the seller. All three needed for the mark; 0.5 for one or two. |

**Proper use of HTTP (4 marks)**

| Marks | For |
|---|---|
| 1 | Sensible methods: GET to read/filter, POST to create an offer, DELETE to withdraw, PUT/POST to accept. No GET that changes state, no body on GET. |
| 1 | Sensible, consistent resource paths that fit the existing API (offers nested under `/listing/{listingId}`), ids in the path, filters in the query string, session in the header. |
| 1 | Status codes distinguish the cases: 400 bad input / invalid state, 401 invalid session, 403 logged in but not allowed (not the seller, not your offer). |
| 1 | Each endpoint states its inputs, its success response and its errors clearly enough to implement. |

A design that only lists bare paths with no inputs, responses or errors gets at most 4/10.

## Sample design

### GET /listings (extended)

Same route as before, with two optional query parameters. With neither, behaves as it does now.

- Header: `session`
- Query: `courseCode` (optional), `maxPrice` (optional), e.g. `/listings?courseCode=ACTL1101&maxPrice=50`
- 200: array of listings whose course code matches and whose price is at most `maxPrice`
- 400: `INVALID_MAX_PRICE` maxPrice is not a non-negative number
- 401: `UNAUTHORISED`

### POST /listing/{listingId}/offers

Make an offer on a listing. The logged-in student is the buyer.

- Path: `listingId`
- Header: `session`
- Body: `{ "amount": 40 }`
- 200: `{ "offerId": 5678 }`
- 400:
  - `INVALID_LISTING_ID` listingId does not refer to a listing
  - `INVALID_AMOUNT` amount is not a positive number
  - `LISTING_SOLD` the listing's status is `SOLD`
  - `OWN_LISTING` the logged-in student is the seller of this listing
- 401: `UNAUTHORISED`

### GET /listing/{listingId}/offers

List all offers on a listing. Seller only.

- Path: `listingId`
- Header: `session`
- 200: `[ { "offerId": 5678, "buyerZid": "z7654321", "amount": 40, "status": "PENDING" } ]`
- 400: `INVALID_LISTING_ID`
- 401: `UNAUTHORISED`
- 403: `FORBIDDEN` the logged-in student is not the seller of this listing

### DELETE /listing/{listingId}/offer/{offerId}

Withdraw an offer. Only the buyer who made it can withdraw it.

- Path: `listingId`, `offerId`
- Header: `session`
- 200: `{}`
- 400: `INVALID_LISTING_ID`, `INVALID_OFFER_ID`, `OFFER_ALREADY_ACCEPTED`
- 401: `UNAUTHORISED`
- 403: `FORBIDDEN` the offer was made by a different student

### PUT /listing/{listingId}/offer/{offerId}/accept

Accept an offer. The listing's status becomes `SOLD` and all other offers on it are declined. Seller only.

- Path: `listingId`, `offerId`
- Header: `session`
- 200: `{}`
- 400: `INVALID_LISTING_ID`, `INVALID_OFFER_ID`, `LISTING_SOLD`
- 401: `UNAUTHORISED`
- 403: `FORBIDDEN` the logged-in student is not the seller of this listing

### Why this design

- Who is acting always comes from the session, never from a zid in the body. That is what
  makes "not your listing" and "not your offer" enforceable.
- 401 vs 403: 401 means we don't know who you are; 403 means we do, and you're not allowed.
- Filters go in the query string of a GET, because filtering reads data and changes nothing.
- Offers are nested under the listing they belong to, matching the existing `/listing/{listingId}`.
