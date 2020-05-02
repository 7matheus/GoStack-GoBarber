import { Router } from 'express'

import AuthenticationUserService from '../services/AuthenticationUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticationUserService()

    const { user } = await authenticateUser.execute({
      email,
      password
    })

    delete user.password

    return response.json({ user })
  } catch (e) {
    return response.status(400).json({ error: e.message })
  }
})

export default sessionsRouter
