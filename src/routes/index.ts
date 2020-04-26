import { Router } from 'express'
import appointmentRouter from './appointments.routes'

const routes = Router()

routes.use('/appointments', appointmentRouter)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
