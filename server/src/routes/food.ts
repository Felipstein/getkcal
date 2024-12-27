import { Router } from 'express';

import { createFoodController } from '../controllers/food/create-food-controller';
import { deleteFoodController } from '../controllers/food/delete-food-controller';
import { listFoodsController } from '../controllers/food/list-foods-controller';
import { updateFoodController } from '../controllers/food/update-food-controller';
import { ensureAuth } from '../middlewares/ensure-auth-middleware';

const route = Router();

route.get('/foods', ensureAuth, listFoodsController);
route.post('/foods', ensureAuth, createFoodController);
route.put('/foods/:id', ensureAuth, updateFoodController);
route.delete('/foods/:id', ensureAuth, deleteFoodController);

export { route as foodRoutes };
