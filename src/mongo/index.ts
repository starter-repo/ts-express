import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.MONGODB_URI ?? 'mongodb://localhost:27017'
console.log(DATABASE_URL)
const connectDb: () => Promise<Mongoose> = () => {
  return mongoose.connect(DATABASE_URL)
}

// import model dependencies and put them inside here
export const models = {}

export { connectDb }
