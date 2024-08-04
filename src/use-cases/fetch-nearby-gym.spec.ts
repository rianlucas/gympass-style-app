import { it, describe, expect, beforeEach } from 'vitest'
import { GymsRepository } from 'src/repositories/gyms-repository'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import FetchNearByGymUseCase from './fetch-nearby-gym'

let sut: FetchNearByGymUseCase
let gymsRepository: GymsRepository

describe('Fetch NearBy use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymUseCase(gymsRepository)
  })

  it('Shold return a list of gyms nearby user', async () => {
    await gymsRepository.create({
      phone: '3123213213',
      description: 'description test',
      title: 'FarGym',
      latitude: 41212,
      longitude: 654543,
    })

    await gymsRepository.create({
      phone: '3123213213',
      title: 'Near Gym',
      description: 'description test',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
