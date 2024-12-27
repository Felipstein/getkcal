import { z } from 'zod';

import { listedBottleEntity } from '../entities/listed-bottle-entity';

export namespace ListBottlesContract {
  export const response = z.array(listedBottleEntity);

  export type Response = z.infer<typeof response>;
}
