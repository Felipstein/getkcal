import { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function listBottlesController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const bottles = await prisma.bottle.findMany({
    where: { userId: authenticated.sub },
  });

  res.json(bottles);
}
