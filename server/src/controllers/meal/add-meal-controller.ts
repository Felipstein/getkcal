import { AddMealContract } from '@getkcal/contracts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';

import { prisma } from '../../database/prisma';
import { ConflictError } from '../../errors/conflict-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

export async function addMealController(req: Request, res: Response) {
  const { name, occurredAt, foods } = AddMealContract.bodyRequest.parse(
    req.body,
  );
  const authenticated = extractAuthenticated(req);

  try {
    const meal = await prisma.meal.create({
      data: {
        userId: authenticated.sub,
        name,
        occurredAt,
        foods: {
          createMany: { data: foods },
        },
      },
      select: {
        id: true,
        name: true,
        occurredAt: true,
        foods: {
          select: {
            food: {
              select: {
                totalProtein: true,
              },
            },
          },
        },
      },
    });

    const totalProtein = meal.foods.reduce(
      (total, food) => total + food.food.totalProtein.toNumber(),
      0,
    );

    res.status(201).json({
      meal: {
        ...meal,
        totalProtein,
      },
      newTotalProtein: 0,
    } satisfies AddMealContract.Response);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const fieldName = error.meta?.field_name;

      if (
        fieldName &&
        typeof fieldName === 'string' &&
        fieldName.includes('meal_foods_food_id_fkey')
      ) {
        throw new ConflictError('Há algum alimento informado que não existe.');
      }
    }
  }
}
