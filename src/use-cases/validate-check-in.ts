import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from 'src/repositories/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from "dayjs";
import {LateCheckInValidationError} from "@/use-cases/errors/late-check-in-validation-error";

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
        checkIn.created_at,
        'minutes'
    )

    if (distanceInMinutesFromCheckInCreation> 20 ) {
      throw new LateCheckInValidationError('The time to check in is over 20 minutes')
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
