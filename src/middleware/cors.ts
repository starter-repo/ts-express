import cors, { CorsOptions } from 'cors'

const allowLocalhost3000InDev =
  process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000']

const options: CorsOptions = {
  origin: allowLocalhost3000InDev,
}

export const corsWithOptions = cors(options)
