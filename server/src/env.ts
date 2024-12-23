import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

const envParsed = envSchema.parse(process.env);

export function env() {
  return envParsed;
}

declare global {
  namespace NodeJS {
    // @ts-ignore
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
