import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) || null
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,
    }

    this.items.push(gym)

    return gym
  }
}
