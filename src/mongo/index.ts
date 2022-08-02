import mongoose, { Mongoose } from 'mongoose'
import configuration from '../config/configuration'

const connectDb: () => Promise<Mongoose> = () => {
  return mongoose.connect(configuration().mongouri)
}

// import model dependencies and put them inside here
export const models = {}

export { connectDb }
