import { HttpError } from "./http_error";

export class ItemNotCreatedError extends HttpError {
  constructor(message = 'Não foi possível criar item', status = 400) {
    super(message, status);
  }
}
