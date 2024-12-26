import { z } from 'zod';

export const listedMealEntity = z.object({
  id: z.string(),
  name: z.string(),
  totalProtein: z.coerce.number(),
  occurredAt: z.coerce.date(),
});

export type ListedMealEntity = z.infer<typeof listedMealEntity>;
