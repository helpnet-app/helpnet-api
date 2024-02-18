import { HttpError } from './http_error';

export class ItemNotDeletedError extends HttpError {
  constructor(message = 'Não foi possível deletar item', status = 400) {
    super(message, status);
  }
}
