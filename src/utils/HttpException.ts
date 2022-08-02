export class HttpException {
  readonly response: string
  readonly status: number

  constructor(status: number, response: string) {
    this.status = status
    this.response = response
    this.init()
  }

  private init = function () {
    return 'hello'
  }
}
