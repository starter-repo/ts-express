import { NextFunction, Response } from 'express'
import { HttpException } from '../utils/httpException'

export const handleHttpError = (
  err: any,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    const { statusCode, message } = err
    res.status(500).json({
      statusCode,
      message,
    })
  }
  next(err)
}

export const handleUnexpectedError = (err: any, res: Response) => {
  // TODO: log error
  console.log(err)
  return res.status(500).json({
    status: '500',
    message: 'Unhandled exception',
  })
}
