import chalk from 'chalk';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HTTPError } from '../errors/http-error';

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof HTTPError) {
    console.info();
    if (error.statusCode < 500) {
      console.warn(chalk.yellow('Safe error detected.'));
      console.warn(error);
      console.warn(chalk.yellow('Caused on', req.method, req.path));
    } else {
      console.error(chalk.red('Internal server error detected.'));
      console.error(error);
      console.error(chalk.red('Caused on', req.method, req.path));
    }
    console.info();

    res
      .status(error.statusCode)
      .json({ name: error.name, message: error.message, stack: error.stack });
    return;
  }

  if (error instanceof ZodError) {
    const issue = error.issues[0];

    const message = `${issue.path.join('.')}: ${issue.message}`;

    console.info();
    console.warn(chalk.yellow('Safe error detected.'));
    console.warn(error);
    console.warn(chalk.yellow('Caused on', req.method, req.path));
    console.info();

    res.status(400).json({
      name: 'InvalidFieldsError',
      message,
    });
    return;
  }

  console.info();
  console.error(chalk.red('Internal server error detected.'));
  console.error(error);
  console.error(chalk.red('Caused on', req.method, req.path));
  console.info();

  res.status(500).json({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
}
