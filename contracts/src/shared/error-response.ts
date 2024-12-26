import { z } from 'zod';

export const errorResponse = z.object({
  name: z.string(),
  message: z.string(),
  stack: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponse>;
