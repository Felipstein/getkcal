import { HTTPError } from './http-error';

export class ConflictError extends HTTPError {
  constructor(message = 'Conflito.') {
    super(409, message);
  }
}
