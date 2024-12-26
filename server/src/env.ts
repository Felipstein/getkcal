import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development']),

  DATABASE_URL: z.string(),

  PORT: z.coerce.number(),
  ORIGINS: z
    .string()
    .transform((value) => value.split(';'))
    .default('http://localhost:3000;http://localhost:3001'),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().or(z.coerce.number()).default('1d'),
});

const envParsed = envSchema.parse(process.env);

export function env() {
  return envParsed;
}
