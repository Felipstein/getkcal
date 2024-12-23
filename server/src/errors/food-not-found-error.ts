import { NotFoundError } from './not-found-error';

export class FoodNotFoundError extends NotFoundError {
  constructor(message = 'Comida não encontrada.') {
    super(message);
  }
}
