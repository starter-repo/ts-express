import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDb } from './mongo'
import configuration from './config/configuration'
import { handleHttpError, handleUnexpectedError } from './middleware/httpError'
import routes from './routes'
import { logger } from './utils/logger'

dotenv.config()
const app: Application = express()
const port = configuration().port

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', routes)

app.use(handleHttpError)
app.use(handleUnexpectedError)

connectDb()
  .then(() =>
    app.listen(port, () => {
      logger.info(`App is live at port ${port}`)
    })
  )
  .catch((e) => {
    logger.error('MongoDb failed to start')
  })
