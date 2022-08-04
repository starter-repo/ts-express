export class HttpException extends Error {
  readonly statusCode: number
  readonly message: string

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}
