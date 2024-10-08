import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case copy'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const authenticateUseCase = makeAuthenticateUseCase()

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      console.log(err)
      return reply.status(400).send({
        message: err.message,
        code: err.code,
      })
    }
    throw err
  }

  return reply.status(200).send()
}
