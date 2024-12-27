import { z } from 'zod';

export const userEntity = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  totalDailyProtein: z.coerce.number(),
  totalDailyWater: z.coerce.number(),
});

export type UserEntity = z.infer<typeof userEntity>;
