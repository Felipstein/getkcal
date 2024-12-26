import { z } from 'zod';

import { userEntity } from '../entities/user-entity';

export const authResponse = z.object({
  accessToken: z.string(),
  user: userEntity,
});

export type AuthResponse = z.infer<typeof authResponse>;
