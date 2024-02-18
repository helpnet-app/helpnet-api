import { HttpError } from "./http_error";

export class ItemNotFoundError extends HttpError {
  constructor(message = 'Item não encontrado', status = 400) {
    super(message, status);
  }
}
