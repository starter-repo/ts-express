import express, { Application } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './mongo'

const app: Application = express()
const port = process.env.PORT || 3000
dotenv.config()

connectDb()
  .then(() =>
    app.listen(port, () => {
      console.log(`App is live at port ${port}`)
    })
  )
  .catch((e) => {
    console.log(e)
  })
