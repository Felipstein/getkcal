import { z } from 'zod';

import { listedMealEntity } from '../entities/listed-meal-entity';

export namespace AddMealContract {
  export const bodyRequest = z.object({
    name: z.string({ required_error: 'Campo obrigatório.' }),
    occurredAt: z.coerce.date({ required_error: 'Campo obrigatório.' }),
    foods: z
      .array(
        z.object({
          foodId: z.string({ required_error: 'Campo obrigatório.' }),
          quantity: z
            .coerce.number({ required_error: 'Campo obrigatório.' })
            .min(0, 'Deve informar um valor maior que 0 (zero).'),
          weight: z
            .coerce.number({ required_error: 'Campo obrigatório.' })
            .min(0, 'Deve informar um valor maior que 0 (zero).'),
        }),
      )
      .min(1, 'Defina pelo menos um alimento.'),
  });

  export const response = z.object({
    newTotalProtein: z.coerce.number(),
    meal: listedMealEntity,
  });

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
