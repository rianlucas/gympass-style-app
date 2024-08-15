import {
  FindByNearByParams,
  GymsRepository,
} from '@/repositories/gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaGymRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findManyNearBy(params: FindByNearByParams): Promise<Gym[]> {
    return prisma.$queryRaw<Gym[]>`
        SELECT * FROM gyms
        WHERE ( 6371 * acos ( cos (radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) * sin(radians( latitude ) ) ) ) <= 10
      `;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({
      data,
    });
  }
}
