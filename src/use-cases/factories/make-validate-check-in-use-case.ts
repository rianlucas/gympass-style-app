import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import ValidateCheckInUseCase from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  return new ValidateCheckInUseCase(checkInsRepository)
}
