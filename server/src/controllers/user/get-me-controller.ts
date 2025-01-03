import type { MeContract } from '@getkcal/contracts';
import type { Request, Response } from 'express';

import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function getMeController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  res.json({
    id: authenticated.sub,
    name: authenticated.user.name,
    email: authenticated.user.email,
    totalDailyProtein: authenticated.user.totalDailyProtein.toNumber(),
    totalDailyWater: authenticated.user.totalDailyWater.toNumber(),
  } satisfies MeContract.Response);
}
