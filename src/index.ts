import express, { Application } from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { connectDb } from './mongo'
import configuration from './config/configuration'
import { handleHttpError, handleUnexpectedError } from './middleware/httpError'
import routes from './routes'

dotenv.config()
const app: Application = express()
const port = configuration().port

app.use(express.json())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Starter Project API',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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
