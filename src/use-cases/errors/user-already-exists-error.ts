export class UserAleadyExistsError extends Error {
  code: string
  constructor(message: string) {
    super(message)
    this.code = 'HUB-1001'
  }
}
