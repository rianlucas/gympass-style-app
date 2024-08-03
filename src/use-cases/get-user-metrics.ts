import { CheckInsRepository } from 'src/repositories/check-ins.repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetrics {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
