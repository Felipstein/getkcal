import { Request } from 'express';

export function extractAuthenticated(req: Request) {
  const { authenticated } = req;

  if (!authenticated) {
    throw new Error('No authenticated to extract');
  }

  return authenticated;
}
