import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from 'src/repositories/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInCaseRequest {
  checkinId: string
}

interface ValidateCheckInCaseResponse {
  checkIn: CheckIn
}

export default class ValidateCheckInUseCase {
  constructor(
    private readonly checkInRepository: CheckInsRepository,
  ) {}

  async execute({
    checkinId,
  }: ValidateCheckInCaseRequest): Promise<ValidateCheckInCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkinId)

    if (!checkIn) {
      throw new ResourceNotFoundError('CheckIn not found')
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
