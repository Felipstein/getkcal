import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { BottleNotFoundError } from '../../errors/bottle-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const bodySchema = z.discriminatedUnion('format', [
  z.object({
    format: z.literal('bottle'),
    bottleId: z.string({ required_error: 'Campo obrigatório.' }),
  }),
  z.object({
    format: z.literal('custom'),
    quantity: z
      .number({ required_error: 'Campo obrigatório' })
      .min(0, 'Defina um valor maior que 0 (zero).'),
  }),
]);

export async function addConsumptionController(req: Request, res: Response) {
  const data = bodySchema.parse(req.body);
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
    quantityAdded: consumption.quantity,
  });
}
