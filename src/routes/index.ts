import express from 'express'

import capsuleRouters from './capsules/router'
import dragonRouters from './dragons/router'

const router = express.Router()

router.use('/capsules', capsuleRouters)
router.use('/dragons', dragonRouters)

export default router
