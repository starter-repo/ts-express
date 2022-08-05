import { WalletDocument } from '../../mongo/wallet/wallet.model'

export type WalletSuccess = {
  success: true
  statusCode: number
  data: WalletDocument
}

export type WalletFailure = {
  success: false
  statusCode: number
  message: string
}
