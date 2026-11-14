import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.json' with { type: "json" };
import { clear, reportItem, searchItems, getItem, claimItem, removeItem, removeClaimed } from './lostFound.ts';

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

// SOLUTION - Mock Exam 2, Q29
//
// Every route: 1. read + convert inputs, 2. call the backend, 3. send error or result.
// The status code lookup is shared, so it lives in one helper (DRY).

function statusFor(error: string): number {
  // Wrong role is a permissions problem (403). Everything else here is bad input (400).
  return error === 'INVALID_ROLE' ? 403 : 400;
}

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

app.post('/item', (req: Request, res: Response) => {
  const { description, location } = req.body;

  const result = reportItem(description, location);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
});

// ORDER MATTERS: '/item/search' must be registered BEFORE '/item/:itemid',
// otherwise Express treats the word 'search' as an itemid.
app.get('/item/search', (req: Request, res: Response) => {
  // GET has no body: the keyword is in the query string.
  const keyword = req.query.keyword as string;

  const result = searchItems(keyword);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
});

app.get('/item/:itemid', (req: Request, res: Response) => {
  // Path parameters are strings. The backend compares with ===, so convert.
  const itemId = parseInt(req.params.itemid as string);

  const result = getItem(itemId);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
});

app.put('/item/:itemid/claim', (req: Request, res: Response) => {
  const itemId = parseInt(req.params.itemid as string);
  const { zid } = req.body;

  const result = claimItem(itemId, zid);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
});

// ORDER MATTERS again: '/item/claimed' before '/item/:itemid'.
app.delete('/item/claimed', (req: Request, res: Response) => {
  const role = req.headers.role as string;

  const result = removeClaimed(role);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
});

app.delete('/item/:itemid', (req: Request, res: Response) => {
  const role = req.headers.role as string;
  const itemId = parseInt(req.params.itemid as string);

  const result = removeItem(role, itemId);
  if ('error' in result) {
    return res.status(statusFor(result.error)).json(result);
  }
  res.json(result);
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
