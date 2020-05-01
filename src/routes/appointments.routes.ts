import { Router, request, response } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentRouter = Router()

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate
    })

    return response.json(appointment)
  } catch (e) {
    return response.status(400).json({ error: e.message })
  }
})

export default appointmentRouter
