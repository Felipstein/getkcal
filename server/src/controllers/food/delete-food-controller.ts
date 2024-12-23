import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const paramsSchema = z.object({
  id: z.string(),
});

export async function deleteFoodController(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params);
  const authenticated = extractAuthenticated(req);

  const exists = !!(await prisma.food.findUnique({
    where: { id, userId: authenticated.sub },
  }));
  if (!exists) {
    res.sendStatus(204);
    return;
  }

  await prisma.food.delete({
    where: { id },
  });

  res.sendStatus(204);
}
