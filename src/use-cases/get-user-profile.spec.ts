import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import GetUserProfileUseCase from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sut: GetUserProfileUseCase
let usersRepository: InMemoryUsersRepository

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should return a user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'teste@example.com',
      name: 'John Doe',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual(createdUser.name)
  })

  it('should throw an error when user not exists', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
