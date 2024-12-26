import type { ListFoodsContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function listFoodsController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const foods = await prisma.food.findMany({
    where: { userId: authenticated.sub },
    select: { id: true, name: true, defaultWeight: true, totalProtein: true },
  });

  res.json(
    foods.map((food) => ({
      ...food,
      defaultWeight: food.defaultWeight.toNumber(),
      totalProtein: food.totalProtein.toNumber(),
    })) satisfies ListFoodsContract.Response,
  );
}
