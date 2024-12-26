import { UpdateBottleContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { BottleNotFoundError } from '../../errors/bottle-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function updateBottleController(req: Request, res: Response) {
  const { id } = UpdateBottleContract.paramsRequest.parse(req.params);
  const { name, capacity } = UpdateBottleContract.bodyRequest.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const bottle = await prisma.bottle.findUnique({
    where: { id, userId: authenticated.sub },
  });
  if (!bottle) {
    throw new BottleNotFoundError();
  }

  const bottleUpdated = await prisma.bottle.update({
    where: { id },
    data: { name, capacity },
    select: { name: true, capacity: true },
  });

  res.json({ id, ...bottleUpdated } satisfies UpdateBottleContract.Response);
}
