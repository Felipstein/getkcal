import { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function listFoodsController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const foods = await prisma.food.findMany({
    where: { userId: authenticated.sub },
  });

  res.json(foods);
}
