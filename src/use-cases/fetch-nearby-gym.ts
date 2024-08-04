import { Gym } from '@prisma/client'
import { GymsRepository } from 'src/repositories/gyms-repository'

interface FetchNearByGymRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymResponse {
  gyms: Gym[]
}

export default class FetchNearByGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymRequest): Promise<FetchNearByGymResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
