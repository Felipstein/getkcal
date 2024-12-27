import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './env';
import { LockedError } from './errors/locked-error';
import { TooManyRequestsError } from './errors/too-many-requests-error';
import { errorHandler } from './middlewares/error-handler-middleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());

app.use(morgan(env().NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use(
  rateLimit({
    limit: 100,
    windowMs: 60 * 1000, // 100 requests per minute
    handler: () => {
      throw new TooManyRequestsError();
    },
  }),
);

app.use(routes);
app.use('*', () => {
  throw new LockedError();
});
app.use(errorHandler);

export { app };
