import mongoose, { Mongoose } from 'mongoose'
import configuration from '../config/configuration'
import { userModel } from './user'

const connectDb: () => Promise<Mongoose> = () => {
  return mongoose.connect(configuration().mongouri)
}

// import model dependencies and put them inside here
export const models = { userModel }

export { connectDb }
