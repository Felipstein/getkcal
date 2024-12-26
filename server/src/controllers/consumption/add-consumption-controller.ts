import { AddConsumptionContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { BottleNotFoundError } from '../../errors/bottle-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function addConsumptionController(req: Request, res: Response) {
  const data = AddConsumptionContract.bodyRequest.parse(req.body);
  const authenticated = extractAuthenticated(req);

  let quantity: number;
  if (data.format === 'custom') {
    quantity = data.quantity;
  } else {
    const bottle = await prisma.bottle.findUnique({
      where: { id: data.bottleId },
      select: { capacity: true },
    });

    if (!bottle) {
      throw new BottleNotFoundError();
    }

    quantity = bottle.capacity;
  }

  const consumption = await prisma.consumption.create({
    data: {
      userId: authenticated.sub,
      type: data.format === 'bottle' ? 'BY_BOTTLE' : 'CUSTOMIZED',
      bottleId: data.format === 'bottle' ? data.bottleId : undefined,
      quantity,
    },
    select: { id: true, quantity: true },
  });

  res.status(201).json({
    id: consumption.id,
    quantityAdded: consumption.quantity?.toNumber() ?? 0,
    newTotalQuantityAchieved: 0,
  } satisfies AddConsumptionContract.Response);
}
