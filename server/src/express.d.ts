import type { User } from '@prisma/client';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      authenticated?: {
        accessToken: string;
        sub: string;
        user: User;
      };
    }
  }
}
