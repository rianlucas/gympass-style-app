import { it, describe, expect, beforeEach } from 'vitest'
import { FetchUserCheckIns } from './fetch-user-check-ins'
import { CheckInsRepository } from 'src/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'

let sut: FetchUserCheckIns
let checkInsRepository: CheckInsRepository

describe('Fetch User Check Ins Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckIns(checkInsRepository)
  })

  it('Should return a list of user check ins', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'user_id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_1' }),
      expect.objectContaining({ gym_id: 'gym_2' }),
    ])
  })

  it('Should be able to fetch a paginated list of user check ins', async () => {
    for (let i = 1; i <= 22; i++) {
      checkInsRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_id',
        validated_at: new Date(),
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
