import Router from 'express'
import { verifyJwt } from '../middleware/verifyJwt'
import authRouter from './auth/auth.controller'
import walletRouter from './wallet/wallet.controller'

const router = Router()

router.use('/auth', authRouter)
router.use('/wallet', verifyJwt, walletRouter)

export default router
