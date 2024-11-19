import mongoose from 'mongoose'
import { DATABASE_CONFIG, DATABASE_URI } from '../config/envConfigs'
import logger from '../core/logger'

// const dbURI = `mongodb://${DATABASE_CONFIG.host}:${DATABASE_CONFIG.port}/${DATABASE_CONFIG.name}`

const options = {
  autoIndex: true,
  minPoolSize: DATABASE_CONFIG.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: DATABASE_CONFIG.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

logger.debug(DATABASE_URI)

mongoose.set('strictQuery', true)

// export const dbConnection = async () => {
//   try {
//     await mongoose.connect(DATABASE_URI, options)
//     logger.info('Mongoose connection successfully.')
//     return true
//   } catch (e) {
//     logger.info('Mongoose connection failed.')
//     logger.error(e)
//     return false
//   }
// }

mongoose
  .connect(DATABASE_URI, options)
  .then(() => {
    logger.info('Mongoose connection done')
  })
  .catch((e) => {
    logger.info('Mongoose connection error')
    logger.error(e)
  })

// dbConnection()

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.debug('Mongoose default connection open to ' + DATABASE_URI)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})

export const connection = mongoose.connection
