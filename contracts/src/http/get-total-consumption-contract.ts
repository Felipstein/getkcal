import { z } from 'zod';

export namespace GetTotalConsumptionContract {
  export const response = z.object({
    quantityAchieved: z.coerce.number(),
  });

  export type Response = z.infer<typeof response>;
}
