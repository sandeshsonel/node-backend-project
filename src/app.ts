import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express'
import cors from 'cors'
import { CORS_URLS, ENVIROMENT } from './config/envConfigs'
import logger from './core/logger'

import routes from './routes'
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError
} from './core/apiError'

import './database'
// import { dbConnection } from './database'

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
)
app.use(cors({ origin: CORS_URLS, optionsSuccessStatus: 200 }))

// routes
app.use('/v1', routes)

// health check
app.get('/health', async (req, res) => {
  // const dbConnected = await dbConnection()
  res.status(200).json({
    status: 'UP',
    // database: dbConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  })
})

// catch 404 and forward to error handler
app.use((request: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError())
)

// Middleware Error Handler
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    if (err.type === ErrorType.INTERNAL) {
      logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
    }
    ApiError.handle(err, res)
  } else {
    logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    )
    logger.error(err)
    if (ENVIROMENT === 'development') {
      res.status(500).send(err)
    }
    ApiError.handle(new InternalError(), res)
  }
}

app.use(errorHandler)

export default app
