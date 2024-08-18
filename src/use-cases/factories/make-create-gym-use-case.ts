import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import CreateGymUseCase from '../create-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRepository()
  return new CreateGymUseCase(gymsRepository)
}
