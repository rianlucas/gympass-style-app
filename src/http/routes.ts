import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'

export async function Routes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
