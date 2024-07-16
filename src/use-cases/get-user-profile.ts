import { User } from '@prisma/client'
import { UsersRepository } from 'src/repositories/prisma/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProfileUseCaseRequest {
  userId: string
}

interface GetProfileUseCaseResponse {
  user: User
}

export default class GetUserProfileUseCase {
  constructor(private readonly userReposirory: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.userReposirory.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User not found')
    }

    return {
      user,
    }
  }
}
