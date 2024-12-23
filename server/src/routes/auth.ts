import { Router } from 'express';

import { signInController } from '../controllers/auth/sign-in-controller';
import { signUpController } from '../controllers/auth/sign-up-controller';

const route = Router();

route.post('/sign-in', signInController);
route.post('/sign-up', signUpController);

export { route as authRoutes };
