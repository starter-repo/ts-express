import { Router } from 'express'
import dtoValidationMiddleware from '../../middleware/dtoValidation'
import { HttpException } from '../../utils/httpException'
import { logger } from '../../utils/logger'
import authService from './auth.service'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'

const router = Router()

router.post(
  '/login',
  dtoValidationMiddleware(LoginDto),
  async (req, res, next) => {
    try {
      const loginDto: LoginDto = req.body
      logger.debug(`login user with username: ${loginDto.username}`)
      const result = await authService.login(loginDto)
      if (!result.success) {
        throw new HttpException(result.statusCode, result.message)
      }
      res.cookie('accessToken', result.authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      logger.info(`success: login user with username: ${loginDto.username}`, {
        metthod: 'post',
        username: loginDto.username,
      })
      return res.status(res.statusCode).json({ message: 'Successful Login' })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/signup',
  dtoValidationMiddleware(SignupDto),
  async (req, res, next) => {
    try {
      const signupDto: SignupDto = req.body
      logger.debug(`signup user with username: ${signupDto.username}`)
      const result = await authService.signup(signupDto)
      if (!result.success) {
        throw new HttpException(result.statusCode, result.message)
      }
      res.cookie('accessToken', result.authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      logger.info(`success: signup user with username: ${signupDto.username}`, {
        metthod: 'post',
        username: signupDto.username,
      })
      return res
        .status(res.statusCode)
        .json({ message: 'Successful Registration' })
    } catch (error) {
      next(error)
    }
  }
)

export default router
