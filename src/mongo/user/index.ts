import { Schema, model, Model } from 'mongoose'
import { UserDocument } from './user.model'

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
})

export const userModel: Model<UserDocument> = model('users', userSchema)
