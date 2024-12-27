import { z } from 'zod';

import { listedFoodEntity } from '../entities/listed-food-entity';

export namespace ListFoodsContract {
  export const response = z.array(listedFoodEntity);

  export type Response = z.infer<typeof response>;
}
