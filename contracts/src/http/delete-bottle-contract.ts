import { z } from 'zod';

export namespace DeleteBottleContract {
  export const paramsRequest = z.object({
    id: z.string(),
  });

  export const response = z.void();

  export type ParamsRequest = z.infer<typeof paramsRequest>;
  export type Response = z.infer<typeof response>;
}
