import { z } from 'zod';

export const listedBottleEntity = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.coerce.number(),
});
