import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const bodySchema = z.object({
  name: z.string({ required_error: 'Nome do alimento é obrigatório.' }),
  defaultWeight: z
    .number()
    .min(0, 'Defina um valor maior ou igual a 0 para  peso padrão.')
    .optional(),
  totalProtein: z
    .number({ required_error: 'Quantidade de proteína é obrigatório.' })
    .min(
      0,
      'Defina um valor maior ou igual a 0 para a quantidade de proteína.',
    ),
});

export async function createFoodController(req: Request, res: Response) {
  const { name, defaultWeight, totalProtein } = bodySchema.parse(req.body);
  const authenticated = extractAuthenticated(req);

  const food = await prisma.food.create({
    data: { name, userId: authenticated.sub, defaultWeight, totalProtein },
    select: { id: true, name: true, defaultWeight: true, totalProtein: true },
  });

  res.status(201).json(food);
}
