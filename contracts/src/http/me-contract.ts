import type { z } from 'zod';

import { userEntity } from '../entities/user-entity';

export namespace MeContract {
  export const response = userEntity;

  export type Response = z.infer<typeof response>;
}
