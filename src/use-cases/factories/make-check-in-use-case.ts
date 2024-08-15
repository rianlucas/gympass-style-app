import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import CheckInUseCase from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymRepository()
  return new CheckInUseCase(checkInsRepository, gymsRepository)
}
