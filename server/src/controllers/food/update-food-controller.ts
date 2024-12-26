import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { FoodNotFoundError } from '../../errors/food-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const paramsSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  name: z.string().optional(),
  defaultWeight: z
    .number()
    .min(0, 'Defina um valor maior ou igual a 0 para  peso padrão.')
    .optional(),
  totalProtein: z
    .number()
    .min(0, 'Defina um valor maior ou igual a 0 para a quantidade de proteína.')
    .optional(),
});

export async function updateFoodController(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params);
  const { name, defaultWeight, totalProtein } = bodySchema.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const food = await prisma.food.findUnique({
    where: { id, userId: authenticated.sub },
  });
  if (!food) {
    throw new FoodNotFoundError();
  }

  const foodUpdated = await prisma.food.update({
    where: { id },
    data: { name, defaultWeight, totalProtein },
    select: { name: true, defaultWeight: true, totalProtein: true },
  });

  res.json({ id, ...foodUpdated });
}
