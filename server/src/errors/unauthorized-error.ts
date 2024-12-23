import { HTTPError } from './http-error';

export class UnauthorizedError extends HTTPError {
  constructor(message = 'Não autenticado.') {
    super(401, message);
  }
}
