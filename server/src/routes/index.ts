import { Router } from 'express';

import { authRoutes } from './auth';
import { bottleRoutes } from './bottle';
import { foodRoutes } from './food';
import { userRoutes } from './user';

const route = Router();

route.use(authRoutes);
route.use(userRoutes);
route.use(foodRoutes);
route.use(bottleRoutes);

export { route as routes };
