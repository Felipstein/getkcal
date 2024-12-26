import { z } from 'zod';

export namespace AddConsumptionContract {
  export const bodyRequest = z.discriminatedUnion('format', [
    z.object({
      format: z.literal('bottle'),
      bottleId: z.string({ required_error: 'Campo obrigatório.' }),
    }),
    z.object({
      format: z.literal('custom'),
      quantity: z.coerce
        .number({ required_error: 'Campo obrigatório' })
        .min(0, 'Defina um valor maior que 0 (zero).'),
    }),
  ]);

  export const response = z.object({
    id: z.string(),
    newTotalQuantityAchieved: z.coerce.number(),
    quantityAdded: z.coerce.number(),
  });

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
