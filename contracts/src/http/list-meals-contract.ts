import { z } from 'zod';

import { listedMealEntity } from '../entities/listed-meal-entity';

export namespace ListMealsContract {
  export const response = z.object({
    totalProtein: z.coerce.number(),
    meals: z.array(listedMealEntity),
  });

  export type Response = z.infer<typeof response>;
}
