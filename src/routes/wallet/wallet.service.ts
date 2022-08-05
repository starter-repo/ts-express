import { v4 } from 'uuid'
import { walletModel } from '../../mongo/wallet'
import { logger } from '../../utils/logger'
import { WalletFailure, WalletSuccess } from './wallet.model'
import { CreateWalletDto } from './dto/create-wallet.dto'

const create = async (
  createWalletDto: CreateWalletDto,
  userId: string
): Promise<WalletSuccess | WalletFailure> => {
  try {
    const { walletName } = createWalletDto

    const walletDocument = await walletModel.create({
      userId,
      walletId: v4(),
      walletName,
    })

    return { success: true, statusCode: 201, data: walletDocument }
  } catch (error: any) {
    logger.error(`error: creating wallet with id ${userId}`, {
      method: 'post',
      errorMessage: error.message,
    })
    return { success: false, statusCode: 500, message: 'Unexpected error' }
  }
}

export default { create }
