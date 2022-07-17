import { Router } from 'express'
import authService from './auth.service'

const router = Router()

router.post('/login', (req, res, next) => {
  const loginDto = req.body
  const result = authService.login()
  return res.status(201).json(result)
})

export default router
