export const ENVIROMENT = process.env.NODE_ENV
export const PORT = process.env.PORT
export const TIME_ZONE = process.env.TZ

export const DATABASE_CONFIG = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10')
}

export const DATABASE_URI = process.env.DATABASE_URI || ''

export const CORS_URLS = ['http://localhost:3000']

export const TOKEN_INFO = {
  jwtSecret: process.env.JWT_SECRET || '',
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || ''
}

export const LOG_DIRECTORY = process.env.LOG_DIR

export const SUPER_ADMIN_API_KEY = process.env.SUPER_ADMIN_API_KEY

export const MEDIA_UPLOAD_SIZE_LIMI = process.env.MEDIA_UPLOAD_SIZE_LIMIT
