import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

const VIEWER = 'viewer-key-123';
const EDITOR = 'editor-key-456';
const BAD_KEY = 'not-a-key';

function clearRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

function createRequest(apikey: string, title: string, body: string) {
  const res = request('POST', SERVER_URL + '/note', {
    headers: { apikey },
    json: { title, body }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function listRequest(apikey: string, pinned?: boolean) {
  const res = request('GET', SERVER_URL + '/notes', {
    headers: { apikey },
    qs: pinned === undefined ? {} : { pinned }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function statsRequest(apikey: string) {
  const res = request('GET', SERVER_URL + '/note/stats', {
    headers: { apikey }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function getRequest(apikey: string, noteId: number) {
  const res = request('GET', SERVER_URL + `/note/${noteId}`, {
    headers: { apikey }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function pinRequest(apikey: string, noteId: number, pinned: boolean | string) {
  const res = request('PUT', SERVER_URL + `/note/${noteId}/pin`, {
    headers: { apikey },
    json: { pinned }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

function deleteRequest(apikey: string, noteId: number) {
  const res = request('DELETE', SERVER_URL + `/note/${noteId}`, {
    headers: { apikey }
  });
  return { status: res.statusCode, body: res.getJSON() };
}

const ERROR = (name: string) => ({ error: name, message: expect.any(String) });

beforeEach(() => {
  clearRequest();
});

describe('DELETE /clear', () => {
  test('returns empty object', () => {
    expect(clearRequest()).toStrictEqual({ status: 200, body: {} });
  });
});

describe('POST /note', () => {
  test('error: invalid key', () => {
    expect(createRequest(BAD_KEY, 'Retro', 'text')).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('error: viewer key cannot create', () => {
    expect(createRequest(VIEWER, 'Retro', 'text')).toStrictEqual({ status: 403, body: ERROR('FORBIDDEN') });
  });

  test('error: empty title', () => {
    expect(createRequest(EDITOR, '', 'text')).toStrictEqual({ status: 400, body: ERROR('INVALID_TITLE') });
  });

  test('error: title too long', () => {
    expect(createRequest(EDITOR, 'a'.repeat(31), 'text')).toStrictEqual({ status: 400, body: ERROR('INVALID_TITLE') });
  });

  test('error: body too long', () => {
    expect(createRequest(EDITOR, 'Retro', 'a'.repeat(201))).toStrictEqual({ status: 400, body: ERROR('INVALID_BODY') });
  });

  test('success: returns noteId', () => {
    expect(createRequest(EDITOR, 'Retro', 'text')).toStrictEqual({ status: 200, body: { noteId: expect.any(Number) } });
  });
});

describe('GET /notes', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = createRequest(EDITOR, 'Retro', 'Start the tests earlier.').body.noteId;
    b = createRequest(EDITOR, 'Standup', 'Blocked on the pipeline.').body.noteId;
    pinRequest(EDITOR, b, true);
  });

  test('error: invalid key', () => {
    expect(listRequest(BAD_KEY)).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('success: no query returns all notes, viewer key allowed', () => {
    expect(listRequest(VIEWER)).toStrictEqual({
      status: 200,
      body: {
        notes: [
          { noteId: a, title: 'Retro', pinned: false },
          { noteId: b, title: 'Standup', pinned: true },
        ]
      }
    });
  });

  test('success: pinned=true returns only pinned notes', () => {
    expect(listRequest(VIEWER, true)).toStrictEqual({
      status: 200,
      body: { notes: [{ noteId: b, title: 'Standup', pinned: true }] }
    });
  });

  test('success: pinned=false returns all notes', () => {
    const { status, body } = listRequest(VIEWER, false);
    expect(status).toBe(200);
    expect(body.notes.length).toBe(2);
  });
});

describe('GET /note/stats', () => {
  test('error: invalid key', () => {
    expect(statsRequest(BAD_KEY)).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('success: empty', () => {
    expect(statsRequest(VIEWER)).toStrictEqual({ status: 200, body: { total: 0, pinned: 0 } });
  });

  test('success: counts notes and pinned notes', () => {
    createRequest(EDITOR, 'Retro', 'text');
    const b = createRequest(EDITOR, 'Standup', 'text').body.noteId;
    createRequest(EDITOR, 'Demo', 'text');
    pinRequest(EDITOR, b, true);
    expect(statsRequest(VIEWER)).toStrictEqual({ status: 200, body: { total: 3, pinned: 1 } });
  });
});

describe('GET /note/{noteid}', () => {
  let a: number;
  beforeEach(() => {
    a = createRequest(EDITOR, 'Retro', 'Start the tests earlier.').body.noteId;
  });

  test('error: invalid key', () => {
    expect(getRequest(BAD_KEY, a)).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('error: invalid note id', () => {
    expect(getRequest(VIEWER, a + 1)).toStrictEqual({ status: 400, body: ERROR('INVALID_NOTE_ID') });
  });

  test('success: returns the full note', () => {
    expect(getRequest(VIEWER, a)).toStrictEqual({
      status: 200,
      body: { note: { noteId: a, title: 'Retro', body: 'Start the tests earlier.', pinned: false } }
    });
  });
});

describe('PUT /note/{noteid}/pin', () => {
  let a: number;
  beforeEach(() => {
    a = createRequest(EDITOR, 'Retro', 'text').body.noteId;
  });

  test('error: invalid key', () => {
    expect(pinRequest(BAD_KEY, a, true)).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('error: viewer key cannot pin', () => {
    expect(pinRequest(VIEWER, a, true)).toStrictEqual({ status: 403, body: ERROR('FORBIDDEN') });
  });

  test('error: invalid note id', () => {
    expect(pinRequest(EDITOR, a + 1, true)).toStrictEqual({ status: 400, body: ERROR('INVALID_NOTE_ID') });
  });

  test('error: pinned is not a boolean', () => {
    expect(pinRequest(EDITOR, a, 'yes')).toStrictEqual({ status: 400, body: ERROR('INVALID_PINNED') });
  });

  test('success: pin then unpin', () => {
    expect(pinRequest(EDITOR, a, true)).toStrictEqual({ status: 200, body: {} });
    expect(getRequest(VIEWER, a).body.note.pinned).toBe(true);
    expect(pinRequest(EDITOR, a, false)).toStrictEqual({ status: 200, body: {} });
    expect(getRequest(VIEWER, a).body.note.pinned).toBe(false);
  });
});

describe('DELETE /note/{noteid}', () => {
  let a: number, b: number;
  beforeEach(() => {
    a = createRequest(EDITOR, 'Retro', 'text').body.noteId;
    b = createRequest(EDITOR, 'Standup', 'text').body.noteId;
  });

  test('error: invalid key', () => {
    expect(deleteRequest(BAD_KEY, a)).toStrictEqual({ status: 401, body: ERROR('UNAUTHORISED') });
  });

  test('error: viewer key cannot delete', () => {
    expect(deleteRequest(VIEWER, a)).toStrictEqual({ status: 403, body: ERROR('FORBIDDEN') });
  });

  test('error: invalid note id', () => {
    expect(deleteRequest(EDITOR, b + 1)).toStrictEqual({ status: 400, body: ERROR('INVALID_NOTE_ID') });
  });

  test('success: returns empty object', () => {
    expect(deleteRequest(EDITOR, a)).toStrictEqual({ status: 200, body: {} });
  });

  test('success: only that note is removed', () => {
    deleteRequest(EDITOR, a);
    expect(getRequest(VIEWER, a).status).toBe(400);
    expect(getRequest(VIEWER, b).status).toBe(200);
  });
});
