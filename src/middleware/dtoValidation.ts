import { NextFunction, Request, RequestHandler, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { HttpException } from '../utils/httpException'

export function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObj = plainToInstance(type, req.body)
      const errors = await validate(dtoObj, { skipMissingProperties })

      if (errors.length > 0) {
        const dtoErrors = errors
          .map((error: ValidationError) =>
            (Object as any).values(error.constraints)
          )
          .join(', ')
        throw new HttpException(400, dtoErrors)
      }
      req.body = dtoObj
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default dtoValidationMiddleware
