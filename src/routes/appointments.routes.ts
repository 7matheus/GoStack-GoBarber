import { Router, request, response } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentRouter = Router()

const appointmentsRepository = new AppointmentsRepository()

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()

  return response.json(appointments)
})

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository
    )

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate
    })

    return response.json(appointment)
  } catch (e) {
    return response.status(400).json({ error: e.message })
  }
})

export default appointmentRouter
