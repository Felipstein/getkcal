import { HTTPError } from './http-error';

export class NotFoundError extends HTTPError {
  constructor(message = 'Não encontrado.') {
    super(404, message);
  }
}
