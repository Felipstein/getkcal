import type { Request, Response } from 'express';
import moment from 'moment';

import { prisma } from '../../database/prisma';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function listMealsController(req: Request, res: Response) {
  const authenticated = extractAuthenticated(req);

  const startDate = moment.utc().startOf('day').toDate();
  const finalDate = moment.utc().endOf('day').toDate();

  const meals = await prisma.meal.findMany({
    where: {
      userId: authenticated.sub,
      createdAt: {
        gte: startDate,
        lte: finalDate,
      },
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      foods: {
        select: {
          food: {
            select: {
              totalProtein: true,
            },
          },
        },
      },
      occurredAt: true,
    },
  });

  let totalProtein = 0;

  const mealsWithTotalProtein = meals.map((meal) => {
    const totalProteinOfMeal = meal.foods.reduce(
      (total, food) => total + food.food.totalProtein.toNumber(),
      0,
    );

    totalProtein += totalProteinOfMeal;

    return {
      id: meal.id,
      name: meal.name,
      totalProtein: totalProteinOfMeal,
      occurredAt: meal.occurredAt,
    };
  });

  res.json({
    totalProtein,
    meals: mealsWithTotalProtein,
  });
}
