import { Schema, model, Model } from 'mongoose'
import { WalletDocument } from './wallet.model'

const walletSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  walletId: {
    type: String,
    required: true,
    unique: true,
  },
  walletName: {
    type: String,
    required: true,
  },
})

export const walletModel: Model<WalletDocument> = model('wallets', walletSchema)
