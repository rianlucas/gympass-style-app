import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import CheckInUseCase from './check-in'

let sut: CheckInUseCase
let checkInRepository: InMemoryCheckInsRepository

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual('gym-id')
    expect(checkIn.user_id).toEqual('user-id')
  })
})
