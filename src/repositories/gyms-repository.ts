import { Gym, Prisma } from '@prisma/client'

export interface FindByNearByParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindByNearByParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
