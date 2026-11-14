# API Design Sample

The following is an example of how you could express the API definition in
Markdown format. Your design will be hand-marked, and so as long as we can
understand it, we are happy.

## POST /listings

List a textbook for sale. The logged-in student becomes the seller.

### Header

```
SESSION: a complex and secure session token
```

### Body

```json
{
  "title": "Actuarial Mathematics",
  "courseCode": "ACTL1101",
  "price": 45
}
```

### 200

```json
{
  "listingId": 1234
}
```

### 400

Error object:
* `INVALID_TITLE` Title is empty or longer than 100 characters.
* `INVALID_PRICE` Price is negative.

### 401

Error object:
* `UNAUTHORISED` Session is empty or invalid (does not refer to a valid logged-in
  session)

## Careful!

Don't add your definitions here! This file is not collected for marking! Go over
to `design.md` and write them there instead.
