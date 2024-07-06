import { hashSync } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/prisma/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hashSync(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('e-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
