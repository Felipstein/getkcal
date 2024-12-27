import { CreateFoodContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function createFoodController(req: Request, res: Response) {
  const { name, defaultWeight, totalProtein } =
    CreateFoodContract.bodyRequest.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const food = await prisma.food.create({
    data: { name, userId: authenticated.sub, defaultWeight, totalProtein },
    select: { id: true, name: true, defaultWeight: true, totalProtein: true },
  });

  res.status(201).json({
    id: food.id,
    name: food.name,
    defaultWeight: food.defaultWeight.toNumber(),
    totalProtein: food.totalProtein.toNumber(),
  } satisfies CreateFoodContract.Response);
}
