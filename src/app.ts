import { fastify } from 'fastify'
import { Routes } from './http/routes'
import { ZodError } from 'zod'
import { env } from 'process'
import { UserAleadyExistsError } from './use-cases/errors/user-already-exists-error'

export const app = fastify()

app.register(Routes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (error instanceof UserAleadyExistsError) {
    reply.status(400).send({
      message: error.message,
      code: error.code,
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.error(error)
  } else {
    // TODO: Send error to monitoring service
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
