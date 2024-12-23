import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { BottleNotFoundError } from '../../errors/bottle-not-found-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const paramsSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  name: z.string().optional(),
  capacity: z.number().min(1, 'A capacidade deve ser maior que 0.').optional(),
});

export async function updateBottleController(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params);
  const { name, capacity } = bodySchema.parse(req.body);
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

  res.json({ id, ...bottleUpdated });
}
