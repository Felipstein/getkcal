import { Router } from 'express';

import { getMeController } from '../controllers/user/get-me-controller';
import { updateMeController } from '../controllers/user/update-me-controller';
import { ensureAuth } from '../middlewares/ensure-auth-middleware';

const route = Router();

route.get('/me', ensureAuth, getMeController);
route.put('/me', ensureAuth, updateMeController);

export { route as userRoutes };
