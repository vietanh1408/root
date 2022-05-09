import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/Http.exception'
import { errorMessages } from './../constants/errorMessages'

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500
  const message = error.message || errorMessages.somethingWentWrong

  response.status(status).json({
    message,
    status
  })
}
