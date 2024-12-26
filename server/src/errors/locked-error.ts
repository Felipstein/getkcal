import { HTTPError } from './http-error';

export class LockedError extends HTTPError {
  constructor(message = 'Recurso bloqueado.') {
    super(423, message);
  }
}
