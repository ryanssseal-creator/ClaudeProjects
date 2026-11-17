import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.json' with { type: "json" };
import { clear, addNewPlant, getPlantsByPrice, getPlantsByIds, updatePlantPriceById, discountAllPlantPrices } from './plants.ts';

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
// The pattern for every route is the same three steps:
//   1. pull the inputs out of the request (body / query / params / headers), converting types
//   2. call the backend function
//   3. if it returned an error, send it with the right status code; otherwise send the result

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

app.post('/plant/add', (req: Request, res: Response) => {
  const { name, size, price } = req.body;

  const result = addNewPlant(name, size, price);
  if ('error' in result) {
    // Send the backend's error object straight through.
    return res.status(400).json(result);
  }
  res.json(result);
});

app.get('/plant/filter', (req: Request, res: Response) => {
  // GET requests have no body. The data is in the query string, and it is always
  // a string, so turn it into a number.
  const price = parseFloat(req.query.price as string);

  const result = getPlantsByPrice(price);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

app.get('/plant/list', (req: Request, res: Response) => {
  // '0,2,1' -> ['0', '2', '1'] -> [0, 2, 1]
  const plantIds = (req.query.plantIds as string).split(',').map(id => parseInt(id));

  const result = getPlantsByIds(plantIds);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// ORDER MATTERS: this must be registered BEFORE '/plant/:plantid'.
// Express uses the first route that matches, and ':plantid' matches the word 'all'.
app.put('/plant/all', (req: Request, res: Response) => {
  const role = req.headers.role as string;
  const { discountAmount } = req.body;

  const result = discountAllPlantPrices(role, discountAmount);
  if ('error' in result) {
    // Wrong role is a permissions problem (403), everything else is bad input (400).
    const status = result.error === 'INVALID_ROLE' ? 403 : 400;
    return res.status(status).json(result);
  }
  res.json(result);
});

app.put('/plant/:plantid', (req: Request, res: Response) => {
  const role = req.headers.role as string;
  // Path parameters are strings too.
  const plantId = parseInt(req.params.plantid as string);
  const { price } = req.body;

  const result = updatePlantPriceById(role, plantId, price);
  if ('error' in result) {
    const status = result.error === 'INVALID_ROLE' ? 403 : 400;
    return res.status(status).json(result);
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
