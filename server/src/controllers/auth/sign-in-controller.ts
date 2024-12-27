import { SignInContract } from '@getkcal/contracts';
import { compare } from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../../database/prisma';
import { env } from '../../env';
import { ForbiddenError } from '../../errors/forbidden-error';

export async function signInController(req: Request, res: Response) {
  const { email, password } = SignInContract.bodyRequest.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      totalDailyProtein: true,
      totalDailyWater: true,
    },
  });
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
      email: user.email,
      totalDailyProtein: user.totalDailyProtein.toNumber(),
      totalDailyWater: user.totalDailyWater.toNumber(),
    },
  } satisfies SignInContract.Response);
}
