export default () => ({
  port: process.env.PORT || 8000,
  mongouri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  secretKey: process.env.SECRET_KEY || ';fV<yvD9n%;C|,{(tJP!nR<tfUnux+',
  jwtExpiryTime: process.env.JWT_EXPIRY_TIME || '7d',
})
