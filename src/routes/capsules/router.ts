import express from 'express'

import controller from '../../controllers/capsules.controller'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'

const router = express.Router()

// Add Capules
router.post(
  '/',
  validator(schema.addCapsuleSchema, ValidationSource.BODY),
  controller.addCapsule
)

// Update Capules
router.patch(
  '/:capsule_serial',
  validator(schema.updateCapsuleSchema, ValidationSource.BODY),
  controller.updateCapsule
)

// Delete Capules
router.delete(
  '/:capsule_serial',
  // validator(schema.capsuleSerialSchema, ValidationSource.PARAM),
  controller.deleteCapsule
)

// Get All Capsules
router.get(
  '/',
  validator(schema.allCapsuleQuerySchema, ValidationSource.QUERY),
  controller.getAllCapsules
)

// Get One Capsule
router.get(
  '/:capsule_serial',
  // validator(schema.capsuleSerialSchema, ValidationSource.PARAM),
  controller.getCapsule
)

// Get Upcoming Capsules
router.get(
  '/upcoming',
  validator(schema.allCapsuleQuerySchema, ValidationSource.QUERY),
  controller.getUpcomingCapsules
)

// Get Past Capsules
router.get(
  '/past',
  validator(schema.allCapsuleQuerySchema, ValidationSource.QUERY),
  controller.getPastCapsules
)

export default router
