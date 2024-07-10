export class InvalidCredentialsError extends Error {
  code: string
  constructor() {
    super('Invalid credentials')
    this.code = 'DHP-6783'
  }
}
