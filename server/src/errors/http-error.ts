export class HTTPError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}
