import { NotFoundError } from './not-found-error';

export class UserNotFoundError extends NotFoundError {
  constructor(message = 'Usuário não encontrado.') {
    super(message);
  }
}
