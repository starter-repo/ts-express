import { NextFunction, Request, Response } from 'express'
import configuration from '../config/configuration'
import jwt from 'jsonwebtoken'
import { HttpException } from '../utils/httpException'
import { logger } from '../utils/logger'

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.cookies?.accessToken
    if (!jwtToken) {
      throw new HttpException(401, 'Invalid token')
    }

    jwt.verify(
      jwtToken,
      configuration().secretKey,
      (err: any, decoded: any) => {
        if (err) throw new HttpException(403, 'Forbidden access')
        req.userId = decoded.userId
        logger.info(`success: verified jwt token with userId ${decoded.userId}`)
        next()
      }
    )
  } catch (error: any) {
    logger.error('error: verifying jwt token', {
      errorMessage: error.message,
    })
    next(error)
  }
}
