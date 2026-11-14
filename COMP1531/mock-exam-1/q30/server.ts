import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from './config.json' with { type: "json" };
import { ticketPrice } from './cinema.ts';

///////////////////////////////////////////////////////////////////////////////

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || '127.0.0.1';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

///////////////////////////////////////////////////////////////////////////////

app.post('/cinema/price', (req: Request, res: Response) => {
  const { customer, session } = req.body;

  try {
    const price = ticketPrice(customer, session);
    res.json({ price });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

///////////////////////////////////////////////////////////////////////////////

const server = app.listen(PORT, HOST, () => {
  console.log(`Express Server started and awaiting requests at the URL: '${config.url}:${PORT}'`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
