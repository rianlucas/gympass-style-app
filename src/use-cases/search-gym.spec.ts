import { it, describe, expect, beforeEach } from 'vitest'
import SearchGym from './search-gym'
import { GymsRepository } from 'src/repositories/gyms-repository'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'

let sut: SearchGym
let gymsRepository: GymsRepository

describe('Search gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGym(gymsRepository)
  })

  it('Should return a list of gyms', async () => {
    await gymsRepository.create({
      phone: '3123213213',
      description: 'description test',
      title: 'Vite gym',
      latitude: 0,
      longitude: 0,
    })

    const typescriptGym = await gymsRepository.create({
      phone: '3123213213',
      description: 'description test',
      title: 'Typescript gym',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 1,
    })

    expect(gyms).toEqual([typescriptGym])
  })

  it('Should be able to fetch a paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        phone: '3123213213',
        description: 'description test',
        title: `Typescript Gym ${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    })

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym 21' }),
      expect.objectContaining({ title: 'Typescript Gym 22' }),
    ])
  })
})
