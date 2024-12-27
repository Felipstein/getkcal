import { z } from 'zod';

import { authResponse } from '../shared/auth-response';

export namespace SignInContract {
  export const bodyRequest = z.object({
    email: z
      .string({ required_error: 'E-mail obrigatório.' })
      .email('E-mail inválido.'),
    password: z
      .string({ required_error: 'Senha obrigatória.' })
      .min(1, 'Senha obrigatória.'),
  });

  export const response = authResponse;

  export type BodyRequest = z.infer<typeof bodyRequest>;
  export type Response = z.infer<typeof response>;
}
