import { HttpError } from "./http_error";

export class ItemNotUpdatedError extends HttpError {
  constructor(message = 'Não foi possível atualizar item', status = 400) {
    super(message, status);
  }
}
