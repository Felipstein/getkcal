import { Router } from 'express';

import { addConsumptionController } from '../controllers/consumption/add-consumption-controller';
import { getTotalConsumptionController } from '../controllers/consumption/get-total-consumption-controller';
import { ensureAuth } from '../middlewares/ensure-auth-middleware';

const route = Router();

route.get('/consumptions/total', ensureAuth, getTotalConsumptionController);
route.post('/consumptions', ensureAuth, addConsumptionController);

export { route as consumptionRoutes };
