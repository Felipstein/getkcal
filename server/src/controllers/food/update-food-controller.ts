import { UpdateFoodContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { FoodNotFoundError } from '../../errors/food-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function updateFoodController(req: Request, res: Response) {
  const { id } = UpdateFoodContract.paramsRequest.parse(req.params);
  const { name, defaultWeight, totalProtein } =
    UpdateFoodContract.bodyRequest.parse(req.body);
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

  res.json({
    id,
    name: foodUpdated.name,
    totalProtein: foodUpdated.totalProtein.toNumber(),
    defaultWeight: foodUpdated.defaultWeight.toNumber(),
  } satisfies UpdateFoodContract.Response);
}
