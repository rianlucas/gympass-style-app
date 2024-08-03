import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from 'src/repositories/check-ins.repository'

interface FetchUserCheckInsRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckIns {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsRequest): Promise<FetchUserCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
