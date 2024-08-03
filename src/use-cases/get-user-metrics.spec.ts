import { it, describe, expect, beforeEach } from 'vitest'
import { CheckInsRepository } from 'src/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetrics } from './get-user-metrics'

let sut: GetUserMetrics
let checkInsRepository: CheckInsRepository

describe('Get User Metric Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetrics(checkInsRepository)
  })

  it('Should be able to get check ins count from metrics', async () => {
    checkInsRepository.create({
      gym_id: 'gym_1',
      user_id: 'user_id',
      validated_at: new Date(),
    })

    checkInsRepository.create({
      gym_id: 'gym_2',
      user_id: 'user_id',
      validated_at: new Date(),
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_id',
    })

    expect(checkInsCount).toEqual(2)
  })
})
