import { z } from 'zod';

import { listedFoodEntity } from '../entities/listed-food-entity';

export namespace CreateFoodContract {
  export const bodyRequest = z.object({
    name: z.string({ required_error: 'Nome do alimento é obrigatório.' }),
    defaultWeight: z.coerce
      .number()
      .min(0, 'Defina um valor maior ou igual a 0 para  peso padrão.')
      .optional(),
    totalProtein: z.coerce
      .number({ required_error: 'Quantidade de proteína é obrigatório.' })
      .min(
        0,
        'Defina um valor maior ou igual a 0 para a quantidade de proteína.',
      ),
  });

  export const response = listedFoodEntity;

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
