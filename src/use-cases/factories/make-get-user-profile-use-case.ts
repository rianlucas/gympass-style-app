import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import GetUserProfileUseCase from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new InMemoryUsersRepository()
  return new GetUserProfileUseCase(usersRepository)
}
