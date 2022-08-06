import { Router } from 'express'
import dtoValidationMiddleware from '../../middleware/dtoValidation'
import { HttpException } from '../../utils/httpException'
import { logger } from '../../utils/logger'
import { CreateWalletDto } from './dto/create-wallet.dto'
import walletService from './wallet.service'

const router = Router()

router.post(
  '/',
  dtoValidationMiddleware(CreateWalletDto),
  async (req, res, next) => {
    try {
      const createWalletDto: CreateWalletDto = req.body
      logger.debug(`create wallet with userId: ${req.userId}`)
      const result = await walletService.create(createWalletDto, req.userId)
      if (!result.success) {
        throw new HttpException(result.statusCode, result.message)
      }
      logger.info(`success: create wallet with userId: ${req.userId}`, {
        method: 'post',
        userId: req.userId,
        walletId: result.data.walletId,
      })
      return res.status(res.statusCode).json(result.data)
    } catch (error) {
      next(error)
    }
  }
)

export default router
