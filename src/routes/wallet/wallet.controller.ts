import { Router } from 'express'
import dtoValidationMiddleware from '../../middleware/dtoValidation'
import { CreateWalletDto } from './dto/create-wallet.dto'
import walletService from './wallet.service'

const router = Router()

router.post(
  '/',
  dtoValidationMiddleware(CreateWalletDto),
  async (req, res, next) => {
    try {
      const createWalletDto: CreateWalletDto = req.body
      const result = await walletService.create(createWalletDto, req.userId)
      return res.status(res.statusCode).json(result.data)
    } catch (error) {
      next(error)
    }
  }
)

export default router
