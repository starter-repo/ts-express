import { Router } from 'express'
import dtoValidationMiddleware from '../../middleware/dtoValidation'
import { HttpException } from '../../utils/httpException'
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
      const result = await authService.login(loginDto)
      if (!result.success) {
        throw new HttpException(result.statusCode, result.message)
      }
      res.cookie('accessToken', result.authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
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
      const result = await authService.signup(signupDto)
      if (!result.success) {
        throw new HttpException(result.statusCode, result.message)
      }
      res.cookie('accessToken', result.authToken, {
        httpOnly: true,
        // secure: true,
        // sameSite: 'strict',
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
