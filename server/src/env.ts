import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().or(z.number()).default('1d'),
});

const envParsed = envSchema.parse(process.env);

export function env() {
  return envParsed;
}
