import { z } from 'zod';

import { authResponse } from '../shared/auth-response';

export namespace SignUpContract {
  export const bodyRequest = z.object({
    name: z
      .string({ required_error: 'NOme obrigatório.' })
      .min(1, 'Nome obrigatório.'),
    email: z
      .string({ required_error: 'E-mail obrigatório.' })
      .email('E-mail inválido.'),
    password: z
      .string({ required_error: 'Senha obrigatória.' })
      .min(1, 'Senha obrigatória.'),
    totalDailyProtein: z.coerce.number({
      required_error: 'Total de proteína diária é obrigatório.',
    }),
    totalDailyWater: z.coerce.number({
      required_error: 'Total de água diária é obrigatório.',
    }),
  });

  export const response = authResponse;

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
