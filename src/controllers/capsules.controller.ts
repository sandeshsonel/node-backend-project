import { NextFunction, Request, Response } from 'express'
import CapsulesModel, { ICapsule } from '../database/models/capsules.model'
import logger from '../core/logger'

async function addCapsule(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const body = req.body as ICapsule
    const capsule_serial = body.capsule_serial

    const isAlreadExist = await CapsulesModel.findOne({ capsule_serial })

    if (!isAlreadExist) {
      const capsule = await CapsulesModel.create(body)
      return res.status(201).json({
        status: 'success',
        message: 'Capsule added successfully.',
        data: capsule
      })
    } else {
      return res.status(409).json({
        status: 'failed',
        message: 'Capsule already exists.'
      })
    }
  } catch (error: any) {
    logger.error(error)
    return next({
      status: 500,
      message: error.message || 'Capsule added failed.'
    })
  }
}

async function updateCapsule(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {}
}

async function deleteCapsule(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const capsule_serial = req.params.capsule_serial

    if (capsule_serial) {
      const isCapsuleExist = await CapsulesModel.find({ capsule_serial })
      if (isCapsuleExist) {
        await CapsulesModel.deleteOne({ capsule_serial })
        return res.status(200).json({
          status: 'success',
          message: 'Capsule deleted successfully.'
        })
      } else {
        throw Error('Capsule not found.')
      }
    } else {
      throw Error('Please provide capsule serial.')
    }
  } catch (error: any) {
    return next({
      status: 500,
      message: error.message || 'Capsule delete failed.'
    })
  }
}

async function getAllCapsules(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const capsules = await CapsulesModel.find()
    return res.status(200).json({
      status: 'success',
      message: 'Get all capsules successfully.',
      data: capsules
    })
  } catch (error: any) {
    logger.error(error)
    return next({
      status: 500,
      message: error.message || 'Failed to retrieve capsules.'
    })
  }
}

async function getCapsule(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const capsule_serial = req.params.capsule_serial
    if (capsule_serial) {
      const capsule = await CapsulesModel.find({ capsule_serial })
      return res.status(200).json({
        status: 'success',
        message:
          capsule.length > 0
            ? 'Get capsule successfully.'
            : 'Capsule not found.',
        data: capsule
      })
    } else {
      throw Error('Please provide capsule serial.')
    }
  } catch (error: any) {
    return next({
      status: 500,
      message: error.message || 'Failed to retrieve capsules.'
    })
  }
}

async function getUpcomingCapsules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
}

async function getPastCapsules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
}

export default {
  addCapsule,
  updateCapsule,
  deleteCapsule,
  getAllCapsules,
  getCapsule,
  getUpcomingCapsules,
  getPastCapsules
}
