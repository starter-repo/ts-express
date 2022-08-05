import express, { Application } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './mongo'
import configuration from './config/configuration'
import { handleHttpError, handleUnexpectedError } from './middleware/httpError'
import routes from './routes'

dotenv.config()
const app: Application = express()
const port = configuration().port

app.use(express.json())

app.use('/api', routes)

app.use(handleHttpError)
app.use(handleUnexpectedError)

connectDb()
  .then(() =>
    app.listen(port, () => {
      console.log(`App is live at port ${port}`)
    })
  )
  .catch((e) => {
    // TODO: log error
    console.log(e)
  })
