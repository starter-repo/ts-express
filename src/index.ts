import express, { Application } from 'express'

const app: Application = express()
const PORT: number = 3000

app.listen(PORT, () => {
  console.log(`App is live at port ${PORT}`)
})
