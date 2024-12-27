import { Router } from 'express';

import { authRoutes } from './auth';
import { bottleRoutes } from './bottle';
import { consumptionRoutes } from './consumption';
import { foodRoutes } from './food';
import { mealRoutes } from './meal';
import { userRoutes } from './user';

const route = Router();

route.use(authRoutes);
route.use(userRoutes);
route.use(foodRoutes);
route.use(bottleRoutes);
route.use(consumptionRoutes);
route.use(mealRoutes);

export { route as routes };
