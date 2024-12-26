import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../database/prisma';
import { ConflictError } from '../../errors/conflict-error';
import { extractAuthenticated } from '../../utils/extract-authenticated';

const bodySchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório.' }),
  occurredAt: z.coerce.date({ required_error: 'Campo obrigatório.' }),
  foods: z
    .array(
      z.object({
        foodId: z.string({ required_error: 'Campo obrigatório.' }),
        quantity: z
          .number({ required_error: 'Campo obrigatório.' })
          .min(0, 'Deve informar um valor maior que 0 (zero).'),
        weight: z
          .number({ required_error: 'Campo obrigatório.' })
          .min(0, 'Deve informar um valor maior que 0 (zero).'),
      }),
    )
    .min(1, 'Defina pelo menos um alimento.'),
});

export async function addMealController(req: Request, res: Response) {
  const { name, occurredAt, foods } = bodySchema.parse(req.body);
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
      },
    });

    res.status(201).json(meal);
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
