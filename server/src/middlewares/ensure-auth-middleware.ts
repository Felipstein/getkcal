import type { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { prisma } from '../database/prisma';
import { env } from '../env';
import { UnauthorizedError } from '../errors/unauthorized-error';

export async function ensureAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    throw new UnauthorizedError();
  }

  const [type, token] = tokenHeader.split(' ');

  if (type !== 'Bearer') {
    throw new UnauthorizedError('Tipo de token inválido.');
  }

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload: { sub: string };

  try {
    payload = jwt.verify(token, env().JWT_SECRET) as { sub: string };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Sessão expirada.');
    }

    throw new UnauthorizedError(`Token inválido: ${(error as Error).message}`);
  }

  const { sub } = payload;

  const user = await prisma.user.findUnique({ where: { id: sub } });
  if (!user) {
    throw new UnauthorizedError('Seu cadastro foi descontinuado.');
  }

  req.authenticated = {
    accessToken: token,
    sub,
    user,
  };

  next();
}
