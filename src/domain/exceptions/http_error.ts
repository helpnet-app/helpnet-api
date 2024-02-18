export class HttpError extends Error {
  private _status: number;

  constructor(message = 'Erro no Servidor', status = 400) {
    super(message);
    this._status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public get status() {
    return this._status;
  }
}
