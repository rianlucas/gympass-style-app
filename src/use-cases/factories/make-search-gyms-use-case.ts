import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import SearchGym from '../search-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRepository()
  return new SearchGym(gymsRepository)
}
