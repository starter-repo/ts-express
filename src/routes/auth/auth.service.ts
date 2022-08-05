import { LoginDto } from './dto/login.dto'
import { userModel } from '../../mongo/user'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import configuration from '../../config/configuration'
import { AuthFailure, AuthSuccess } from './auth.model'
import { SignupDto } from './dto/signup.dto'

const login = async (
  loginDto: LoginDto
): Promise<AuthSuccess | AuthFailure> => {
  try {
    const { username, password } = loginDto
    const existingUser = await userModel.findOne({ username })
    if (!existingUser)
      return { success: false, statusCode: 400, message: 'User does not exist' }
    const validPassword = await bcrypt.compare(
      password!,
      existingUser.hashedPassword
    )
    if (!validPassword)
      return {
        success: false,
        statusCode: 400,
        message: 'Password is incorrect',
      }
    const tokenPayload = { userId: existingUser.userId }
    const token = jwt.sign(tokenPayload, configuration().secretKey, {
      expiresIn: configuration().jwtExpiryTime,
    })
    return { success: true, statusCode: 201, authToken: token }
  } catch (error) {
    // TODO: logging
    return { success: false, statusCode: 500, message: 'Unexpected error' }
  }
}

const signup = async (
  signupDto: SignupDto
): Promise<AuthSuccess | AuthFailure> => {
  try {
    const { username, password } = signupDto
    const existingUser = await userModel.findOne({ username })
    if (existingUser)
      return {
        success: false,
        statusCode: 400,
        message: 'username already exist',
      }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password!, salt)
    const newUser = await userModel.create({
      userId: v4(),
      username,
      hashedPassword,
    })

    const tokenPayload = { userId: newUser.userId }
    const token = jwt.sign(tokenPayload, configuration().secretKey, {
      expiresIn: configuration().jwtExpiryTime,
    })
    return { success: true, statusCode: 201, authToken: token }
  } catch (error) {
    // TODO: logging
    return { success: false, statusCode: 500, message: 'Unexpected error' }
  }
}

export default { login, signup }
