import app from './app'
import logger from './core/logger'
import { PORT } from './config/envConfigs'

app
  .listen(PORT, () => {
    logger.info(`Server running on PORT: ${PORT}`)
  })
  .on('error', (e) => logger.error(e))
