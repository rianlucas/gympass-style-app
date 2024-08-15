import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import FetchNearByGymUseCase from '../fetch-nearby-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRepository()
  return new FetchNearByGymUseCase(gymsRepository)
}
