import { NotFoundError } from './not-found-error';

export class BottleNotFoundError extends NotFoundError {
  constructor(message = 'Garrafa não encontrada.') {
    super(message);
  }
}
