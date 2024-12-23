import { Router } from 'express';

import { authRoutes } from './auth';
import { userRoutes } from './user';

const route = Router();

route.use(authRoutes);
route.use(userRoutes);

export { route as routes };
