import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.json' with { type: "json" };
import { clear, createNote, listNotes, getStats, getNote, setPinned, deleteNote } from './notes.ts';

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || '127.0.0.1';

const app = express();

// Use middleware that allows for access from other domains (needed for frontend to connect)
app.use(cors());
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware to log (print to terminal) incoming HTTP requests (OPTIONAL)
app.use(morgan('dev'));

// ========================================================================= //
// YOUR ROUTES SHOULD BE DEFINED BELOW THIS DIVIDER
// ========================================================================= //

// SOLUTION - Mock Exam 3, Q29
//
// Every route: 1. read + convert inputs, 2. call the backend, 3. send error or result.
// Step 3 is identical everywhere, so it lives in one helper (DRY).

function statusFor(error: string): number {
  if (error === 'UNAUTHORISED') {
    return 401; // we don't know who you are
  }
  if (error === 'FORBIDDEN') {
    return 403; // we know who you are, and you're not allowed
  }
  return 400; // anything else is bad input
}

function respond(res: Response, result: object) {
  if ('error' in result) {
    return res.status(statusFor(result.error as string)).json(result);
  }
  res.json(result);
}

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

app.post('/note', (req: Request, res: Response) => {
  // Header names are always lower case in req.headers.
  const apiKey = req.headers.apikey as string;
  const { title, body } = req.body;

  respond(res, createNote(apiKey, title, body));
});

app.get('/notes', (req: Request, res: Response) => {
  const apiKey = req.headers.apikey as string;
  // Query values are strings. The string 'false' is truthy, so passing it straight
  // through would act like true. Compare with the string 'true' to get a real boolean.
  const pinnedOnly = req.query.pinned === 'true';

  respond(res, listNotes(apiKey, pinnedOnly));
});

// ORDER MATTERS: '/note/stats' must be registered BEFORE '/note/:noteid',
// otherwise Express treats the word 'stats' as a noteid.
app.get('/note/stats', (req: Request, res: Response) => {
  const apiKey = req.headers.apikey as string;

  respond(res, getStats(apiKey));
});

app.get('/note/:noteid', (req: Request, res: Response) => {
  const apiKey = req.headers.apikey as string;
  // Path parameters are strings. The backend compares ids with ===, so convert.
  const noteId = parseInt(req.params.noteid as string);

  respond(res, getNote(apiKey, noteId));
});

app.put('/note/:noteid/pin', (req: Request, res: Response) => {
  const apiKey = req.headers.apikey as string;
  const noteId = parseInt(req.params.noteid as string);
  // JSON bodies keep their types, so this is already a real boolean.
  const { pinned } = req.body;

  respond(res, setPinned(apiKey, noteId, pinned));
});

app.delete('/note/:noteid', (req: Request, res: Response) => {
  const apiKey = req.headers.apikey as string;
  const noteId = parseInt(req.params.noteid as string);

  respond(res, deleteNote(apiKey, noteId));
});

// ========================================================================= //
// YOUR ROUTES SHOULD BE DEFINED ABOVE THIS DIVIDER
// ========================================================================= //

/*
 * 404 Not Found Middleware
 *
 * This should be put at the very end (after all your routes are defined),
 * although still above errorHandlers (if any) and app.listen().
 */
app.use((req: Request, res: Response) => {
  const error = `
    404 Not found - This could be because:
      0. You have defined routes below (not above) this middleware in server.ts
      1. You have not implemented the route ${req.method} ${req.path}
      2. There is a typo in either your test or server, e.g. /admissions/list in one
         and, incorrectly, /admission/list in the other
      3. You are using 'npm start' (instead of 'npm run dev') to start your server and
         have forgotten to manually restart to load the new changes
      4. You've forgotten a leading slash (/), e.g. you have admissions/list instead
         of /admissions/list in your server.ts or test file
  `;
  res.status(404).json({ error });
});

/**
 * Start server
 */
const server = app.listen(PORT, HOST, () => {
  console.log(`Express Server started and awaiting requests at the URL: '${config.url}:${PORT}'`);
});

/**
 * Handle Ctrl+C gracefully
 */
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
