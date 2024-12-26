import { HTTPError } from './http-error';

export class TooManyRequestsError extends HTTPError {
  constructor(
    message = 'Você enviou muitas requisições ao nosso servidor em um curto período de tempo, aguarde alguns minutos.',
  ) {
    super(429, message);
  }
}
