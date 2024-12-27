import { z } from 'zod';

import { userEntity } from '../entities/user-entity';

export namespace UpdateMeContract {
  export const bodyRequest = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    totalDailyProtein: z.coerce.number().optional(),
    totalDailyWater: z.coerce.number().optional(),
  });

  export const response = userEntity;

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
