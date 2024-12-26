import type { ListBottlesContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function listBottlesController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const bottles = await prisma.bottle.findMany({
    where: { userId: authenticated.sub },
    select: {
      id: true,
      name: true,
      capacity: true,
    },
  });

  res.json(bottles satisfies ListBottlesContract.Response);
}
