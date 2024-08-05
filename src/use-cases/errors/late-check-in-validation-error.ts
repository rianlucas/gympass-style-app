export class LateCheckInValidationError extends Error {
  public readonly code: string
  constructor(message: string) {
    super(message)
    this.code = 'DJI-6597'
  }
}
