import express, { Application } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './mongo'
import configuration from './config/configuration'
import { handleHttpError, handleUnexpectedError } from './middleware/httpError'

dotenv.config()
const app: Application = express()
const port = configuration().port

app.use(handleHttpError)
app.use(handleUnexpectedError)

connectDb()
  .then(() =>
    app.listen(port, () => {
      console.log(`App is live at port ${port}`)
    })
  )
  .catch((e) => {
    console.log(e)
  })
