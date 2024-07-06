import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from 'src/use-cases/register.use-case'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
