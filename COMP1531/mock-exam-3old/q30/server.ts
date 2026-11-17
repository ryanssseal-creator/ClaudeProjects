import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from './config.json' with { type: "json" };
import { loanService } from './loans.ts';

///////////////////////////////////////////////////////////////////////////////

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || '127.0.0.1';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

///////////////////////////////////////////////////////////////////////////////

app.post('/library/loan', (req: Request, res: Response) => {
  const { member, item } = req.body;
  const decision = loanService(member, item);

  if (!decision.approved) {
    return res.status(403).json(decision);
  }

  res.json(decision);
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
