import { DeleteFoodContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function deleteFoodController(req: Request, res: Response) {
  const { id } = DeleteFoodContract.paramsRequest.parse(req.params);
  const authenticated = extractAuthenticated(req);

  const exists = !!(await prisma.food.findUnique({
    where: { id, userId: authenticated.sub },
    select: { id: true },
  }));
  if (!exists) {
    res.sendStatus(204);
    return;
  }

  await prisma.food.delete({
    where: { id },
  });

  res.sendStatus(204);
}
