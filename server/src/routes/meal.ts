import { Router } from 'express';

import { addMealController } from '../controllers/meal/add-meal-controller';
import { listMealsController } from '../controllers/meal/list-meals-controller';
import { ensureAuth } from '../middlewares/ensure-auth-middleware';

const route = Router();

route.get('/meals', ensureAuth, listMealsController);
route.post('/meals', ensureAuth, addMealController);

export { route as mealRoutes };
