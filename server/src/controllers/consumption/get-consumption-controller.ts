import type { Request, Response } from 'express';
import moment from 'moment';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function getConsumptionController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const startToday = moment.utc().startOf('day').toDate();
  const finalToday = moment.utc().endOf('day').toDate();

  const consumptions = await prisma.consumption.findMany({
    where: {
      userId: authenticated.sub,
      createdAt: {
        gte: startToday,
        lte: finalToday,
      },
    },
  });

  res.json(consumptions);
}
