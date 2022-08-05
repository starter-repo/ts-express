import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../utils/httpException'

export const handleHttpError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    const { statusCode, message } = error
    return res.status(statusCode).json({
      statusCode,
      message,
    })
  }
  next(error)
}

export const handleUnexpectedError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: log error
  console.log('unhandled exception', error)
  return res.status(500).json({
    status: '500',
    message: 'Unhandled exception',
  })
}
