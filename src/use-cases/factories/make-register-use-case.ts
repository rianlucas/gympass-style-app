import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '../register.use-case'

export function makeRegisterUseCase() {
  const usersRepository = new InMemoryUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
