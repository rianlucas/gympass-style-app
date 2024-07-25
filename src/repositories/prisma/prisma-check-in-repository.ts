import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins.repository'
import { prisma } from 'src/lib/prisma'
import dayjs from 'dayjs'

export class PrimsaCheckInRepository implements CheckInsRepository {
  
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data,
    })
  }
}
