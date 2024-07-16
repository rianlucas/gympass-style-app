export class ResourceNotFoundError extends Error {
  public readonly code: string
  constructor(message: string) {
    super(message)
    this.code = 'FUW-4862'
  }
}
