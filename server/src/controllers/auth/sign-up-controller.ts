import { SignUpContract } from '@getkcal/contracts';
import { hash } from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../../database/prisma';
import { env } from '../../env';
import { ConflictError } from '../../errors/conflict-error';

export async function signUpController(req: Request, res: Response) {
  const { name, email, password, totalDailyProtein, totalDailyWater } =
    SignUpContract.bodyRequest.parse(req.body);

  const emailAlreadyTaken = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (emailAlreadyTaken) {
    throw new ConflictError('E-mail já em uso.');
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      totalDailyProtein,
      totalDailyWater,
    },
    select: {
      id: true,
      name: true,
      email: true,
      totalDailyProtein: true,
      totalDailyWater: true,
    },
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
      totalDailyProtein: user.totalDailyProtein.toNumber(),
      totalDailyWater: user.totalDailyWater.toNumber(),
    },
  } satisfies SignUpContract.Response);
}
