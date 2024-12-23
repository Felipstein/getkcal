import 'express-async-errors';

import cors from 'cors';
import express from 'express';

import { errorHandler } from './middlewares/error-handler-middleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(routes);

app.use(errorHandler);

export { app };
