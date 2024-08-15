import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckIns } from '../fetch-user-check-ins'

export function makeFetchUserCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  return new FetchUserCheckIns(checkInsRepository)
}
