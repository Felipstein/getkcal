import { Router } from 'express';
import { ensureAuthMiddleware } from '../middlewares/ensure-auth-middleware';
import { getMeController } from '../controllers/user/get-me-controller';
import { updateMeController } from '../controllers/user/update-me-controller';

const route = Router();

route.get('/me', ensureAuthMiddleware, getMeController);
route.put('/me', ensureAuthMiddleware, updateMeController);

export { route as userRoutes };
