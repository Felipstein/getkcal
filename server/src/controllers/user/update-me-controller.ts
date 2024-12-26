import { UpdateMeContract } from '@getkcal/contracts';
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function updateMeController(req: Request, res: Response) {
  const { name, password, totalDailyProtein, totalDailyWater } =
    UpdateMeContract.bodyRequest.parse(req.body);
  const authenticated = extractAuthenticated(req);

  let newPassword: typeof password;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  const userUpdated = await prisma.user.update({
    where: { id: authenticated.sub },
    data: { name, password: newPassword, totalDailyProtein, totalDailyWater },
    select: { name: true, totalDailyProtein: true, totalDailyWater: true },
  });

  res.json({
    id: authenticated.sub,
    name: userUpdated.name,
    email: authenticated.user.email,
    totalDailyProtein: userUpdated.totalDailyProtein.toNumber(),
    totalDailyWater: userUpdated.totalDailyWater.toNumber(),
  } satisfies UpdateMeContract.Response);
}
