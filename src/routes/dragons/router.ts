import express from 'express'
import dragonsController from '../../controllers/dragons.controller'

const router = express.Router()

router
  .route('/')
  .get(dragonsController.getAllDragons)
  .post(dragonsController.addDragon)

router
  .route('/:dragonId')
  .get(dragonsController.getDragonById)
  .delete(dragonsController.deleteDragonById)
  .patch(dragonsController.updateDragonById)

export default router
