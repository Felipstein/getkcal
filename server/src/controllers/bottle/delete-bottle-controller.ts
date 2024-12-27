import { DeleteBottleContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function deleteBottleController(req: Request, res: Response) {
  const { id } = DeleteBottleContract.paramsRequest.parse(req.params);
  const authenticated = extractAuthenticated(req);

  const exists = !!(await prisma.bottle.findUnique({
    where: { id, userId: authenticated.sub },
  }));
  if (!exists) {
    res.sendStatus(204);
    return;
  }

  await prisma.bottle.delete({
    where: { id },
  });

  res.sendStatus(204);
}
