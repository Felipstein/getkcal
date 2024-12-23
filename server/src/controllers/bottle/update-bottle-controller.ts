import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const paramsSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  name: z.string().optional(),
  capacity: z.number().min(1, 'A capacidade deve ser maior que 0.').optional(),
});

export async function updateBottle(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params);
  const { name, capacity } = bodySchema.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const bottle = await prisma.bottle.create({
    data: { name, capacity, userId: authenticated.sub },
    select: { id: true, name: true, capacity: true },
  });

  res.status(201).json(bottle);
}
