import { HTTPError } from './http-error';

export class ForbiddenError extends HTTPError {
  constructor(message = 'Não autorizado.') {
    super(403, message);
  }
}
