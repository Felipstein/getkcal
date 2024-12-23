import { Router } from 'express';

import { createBottleController } from '../controllers/bottle/create-bottle-controller';
import { deleteBottleController } from '../controllers/bottle/delete-bottle-controller';
import { listBottlesController } from '../controllers/bottle/list-bottles-controller';
import { updateBottleController } from '../controllers/bottle/update-bottle-controller';
import { ensureAuth } from '../middlewares/ensure-auth-middleware';

const route = Router();

route.get('/bottles', ensureAuth, listBottlesController);
route.post('/bottles', ensureAuth, createBottleController);
route.put('/bottles/:id', ensureAuth, updateBottleController);
route.delete('/bottles/:id', ensureAuth, deleteBottleController);

export { route as bottleRoutes };
