import { z } from 'zod';

import { listedFoodEntity } from '../entities/listed-food-entity';

export namespace UpdateFoodContract {
  export const paramsRequest = z.object({
    id: z.string(),
  });

  export const bodyRequest = z.object({
    name: z.string().optional(),
    defaultWeight: z.coerce
      .number()
      .min(0, 'Defina um valor maior ou igual a 0 para  peso padrão.')
      .optional(),
    totalProtein: z.coerce
      .number()
      .min(
        0,
        'Defina um valor maior ou igual a 0 para a quantidade de proteína.',
      )
      .optional(),
  });

  export const response = listedFoodEntity;

  export type ParamsRequest = z.infer<typeof paramsRequest>;
  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
