import { compare } from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { env } from '../../env';
import { ForbiddenError } from '../../errors/forbidden-error';

const bodySchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório.' })
    .email('E-mail inválido.'),
  password: z
    .string({ required_error: 'Senha obrigatória.' })
    .min(1, 'Senha obrigatória.'),
});

export async function signInController(req: Request, res: Response) {
  const { email, password } = bodySchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ForbiddenError('Credenciais inválidas.');
  }

  if (!(await compare(password, user.password))) {
    throw new ForbiddenError('Credenciais inválidas.');
  }

  const accessToken = jwt.sign({ sub: user.id }, env().JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.name,
    },
  });
}
