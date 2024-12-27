import { z } from 'zod';

import { listedBottleEntity } from '../entities/listed-bottle-entity';

export namespace UpdateBottleContract {
  export const paramsRequest = z.object({
    id: z.string(),
  });

  export const bodyRequest = z.object({
    name: z.string().optional(),
    capacity: z.coerce
      .number()
      .min(1, 'A capacidade deve ser maior que 0.')
      .optional(),
  });

  export const response = listedBottleEntity;

  export type ParamsRequest = z.infer<typeof paramsRequest>;
  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
