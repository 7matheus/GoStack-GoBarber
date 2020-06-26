import 'reflect-metadata'

import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

import uploadConfig from '@config/upload'
import routes from '@shared/infra/http/routes'
import AppError from '@shared/errors/AppError'

import '@shared/infra/typeorm'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((e: Error, request: Request, response: Response, _: NextFunction) => {
  if (e instanceof AppError) {
    return response
      .status(e.statusCode)
      .json({ status: 'error', message: e.message })
  }

  console.error(e)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})