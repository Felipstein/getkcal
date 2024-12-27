import { NotFoundError } from './not-found-error';

export class MealNotFoundError extends NotFoundError {
  constructor(message = 'Refeição não encontrada.') {
    super(message);
  }
}
