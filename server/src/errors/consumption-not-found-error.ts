import { NotFoundError } from './not-found-error';

export class ConsumptionNotFoundError extends NotFoundError {
  constructor(message = 'Consumo não encontrado.') {
    super(message);
  }
}
