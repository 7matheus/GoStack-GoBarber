import { Router } from 'express'
import { uuid } from 'uuidv4'
import { startOfHour, parseISO, isEqual } from 'date-fns'

const appointmentRouter = Router()

const appointments = []

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDate = startOfHour(parseISO(date))

  // const findAppointmentInSameDate = appointments.find(appointment =>
  //   isEqual(parsedDate, appointment.date)
  // )

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate
  }

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentRouter
