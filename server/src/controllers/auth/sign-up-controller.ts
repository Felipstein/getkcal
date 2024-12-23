import { hash } from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { env } from '../../env';
import { ConflictError } from '../../errors/conflict-error';

const bodySchema = z.object({
  name: z
    .string({ required_error: 'NOme obrigatório.' })
    .min(1, 'Nome obrigatório.'),
  email: z
    .string({ required_error: 'E-mail obrigatório.' })
    .email('E-mail inválido.'),
  password: z
    .string({ required_error: 'Senha obrigatória.' })
    .min(1, 'Senha obrigatória.'),
});

export async function signUpController(req: Request, res: Response) {
  const { name, email, password } = bodySchema.parse(req.body);

  const emailAlreadyTaken = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (emailAlreadyTaken) {
    throw new ConflictError('E-mail já em uso.');
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const accessToken = jwt.sign({ sub: user.id }, env().JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(201).json({
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.name,
    },
  });
}
