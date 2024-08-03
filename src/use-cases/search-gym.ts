import { Gym } from '@prisma/client'
import { GymsRepository } from 'src/repositories/gyms-repository'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export default class SearchGym {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
