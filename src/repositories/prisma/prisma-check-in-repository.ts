import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins.repository'
import { prisma } from 'src/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInsRepository {
  async save(checkIn: CheckIn): Promise<CheckIn> {
    return prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findById(id: string): Promise<CheckIn | null> {
    return prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
  }

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return prisma.checkIn.create({
      data,
    })
  }
}
