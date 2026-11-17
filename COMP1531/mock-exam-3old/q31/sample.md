# API Design Sample

The following is an example of how you could express the API definition in
Markdown format. Your design will be hand-marked, and so as long as we can
understand it, we are happy.

## POST /rooms

Add a study room to the system.

### Header

```
SESSION: a complex and secure session token
```

### Body

```json
{
  "name": "K17 113",
  "capacity": 6
}
```

### 200

```json
{
  "roomId": 1234
}
```

### 400

Error object:
* `INVALID_NAME` Name is empty or longer than 30 characters.
* `INVALID_CAPACITY` Capacity is less than 1.

### 401

Error object:
* `UNAUTHORISED` Session is empty or invalid (does not refer to a valid logged-in
  session)

### 403

Error object:
* `FORBIDDEN` Session corresponds to a user whose role is not `ADMIN`

## Careful!

Don't add your definitions here! This file is not collected for marking! Go over
to `design.md` and write them there instead.
