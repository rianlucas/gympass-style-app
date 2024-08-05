import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import ValidateCheckInUseCase from './validate-check-in'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let sut: ValidateCheckInUseCase
let checkInRepository: InMemoryCheckInsRepository

describe('Validate check-in Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const { checkIn } = await sut.execute({
      checkinId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(async () => {
      await sut.execute({
        checkinId: 'inexistent-checkin-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
