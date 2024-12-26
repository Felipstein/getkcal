import { CreateBottleContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function createBottleController(req: Request, res: Response) {
  const { name, capacity } = CreateBottleContract.bodyRequest.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const bottle = await prisma.bottle.create({
    data: { name, capacity, userId: authenticated.sub },
    select: { id: true, name: true, capacity: true },
  });

  res.status(201).json(bottle satisfies CreateBottleContract.Response);
}
