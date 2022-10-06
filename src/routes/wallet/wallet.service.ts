import { v4 } from 'uuid'
import { walletModel } from '../../mongo/wallet'
import { WalletSuccess } from './wallet.model'
import { CreateWalletDto } from './dto/create-wallet.dto'

const create = async (
  createWalletDto: CreateWalletDto,
  userId: string
): Promise<WalletSuccess> => {
  const { walletName } = createWalletDto

  const walletDocument = await walletModel.create({
    userId,
    walletId: v4(),
    walletName,
  })

  return { success: true, statusCode: 201, data: walletDocument }
}

export default { create }
