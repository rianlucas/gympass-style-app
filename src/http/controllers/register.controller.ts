import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAleadyExistsError } from 'src/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-use-case'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const registerUseCase = makeRegisterUseCase()

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAleadyExistsError) {
      return reply.status(409).send(err)
    }
    throw err
  }

  return reply.status(201).send()
}
