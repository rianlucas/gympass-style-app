import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetrics } from '../get-user-metrics'

export function makeUserProfileUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  return new GetUserMetrics(checkInsRepository)

}
