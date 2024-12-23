import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const bodySchema = z.object({
  name: z.string({ required_error: 'Nome da garrafa é obrigatório.' }),
  capacity: z
    .number({
      required_error: 'Capacidade total é obrigatório.',
      invalid_type_error: 'Capacidade total deve ser um valor numérico.',
    })
    .min(1, 'A capacidade deve ser maior que 0'),
});

export async function createBottle(req: Request, res: Response) {
  const { name, capacity } = bodySchema.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const bottle = await prisma.bottle.create({
    data: { name, capacity, userId: authenticated.sub },
    select: { id: true, name: true, capacity: true },
  });

  res.status(201).json(bottle);
}
