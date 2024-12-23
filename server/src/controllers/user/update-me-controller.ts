import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const bodySchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

export async function updateMeController(req: Request, res: Response) {
  const { name, password } = bodySchema.parse(req.body);
  const authenticated = extractAuthenticated(req);

  let newPassword: typeof password;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  const userUpdated = await prisma.user.update({
    where: { id: authenticated.sub },
    data: { name, password: newPassword },
    select: { name: true },
  });

  res.json({
    id: authenticated.sub,
    name: userUpdated.name,
    email: authenticated.user.email,
  });
}
