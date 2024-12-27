import { z } from 'zod';

import { listedBottleEntity } from '../entities/listed-bottle-entity';

export namespace CreateBottleContract {
  export const bodyRequest = z.object({
    name: z.string({ required_error: 'Nome da garrafa é obrigatório.' }),
    capacity: z.coerce
      .number({
        required_error: 'Capacidade total é obrigatório.',
        invalid_type_error: 'Capacidade total deve ser um valor numérico.',
      })
      .min(1, 'A capacidade deve ser maior que 0'),
  });

  export const response = listedBottleEntity;

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
