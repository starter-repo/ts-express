import mongoose, { Mongoose } from 'mongoose'
import configuration from '../config/configuration'
import { userModel } from './user'
import { walletModel } from './wallet'

const connectDb: () => Promise<Mongoose> = () => {
  return mongoose.connect(configuration().mongouri)
}

// import model dependencies and put them inside here
export const models = { userModel, walletModel }

export { connectDb }
