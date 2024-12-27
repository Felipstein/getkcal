import { z } from 'zod';

export const listedFoodEntity = z.object({
  id: z.string(),
  name: z.string(),
  defaultWeight: z.coerce.number(),
  totalProtein: z.coerce.number(),
});
