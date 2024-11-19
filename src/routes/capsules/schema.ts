import Joi from 'joi'

const addCapsuleSchema = Joi.object({
  capsule_serial: Joi.string().required(),
  capsule_id: Joi.string().required(),
  status: Joi.string().valid('active', 'retired', 'unknown').required(),
  original_launch: Joi.date().iso().required(),
  original_launch_unix: Joi.number().integer().required(),
  missions: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        flight: Joi.number().integer().required()
      })
    )
    .required(),
  landings: Joi.number().integer().min(0).required(),
  type: Joi.string().required(),
  details: Joi.string().optional(),
  reuse_count: Joi.number().integer().min(0).required()
})

const updateCapsuleSchema = Joi.object({
  status: Joi.string().valid('active', 'retired', 'unknown'),
  original_launch: Joi.date().iso(),
  original_launch_unix: Joi.number().integer(),
  missions: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      flight: Joi.number().integer().required()
    })
  ),
  landings: Joi.number().integer().min(0),
  type: Joi.string(),
  details: Joi.string(),
  reuse_count: Joi.number().integer().min(0)
}).min(1)

const allCapsuleQuerySchema = Joi.object({
  capsule_serial: Joi.string().length(4),
  capsule_id: Joi.string(),
  status: Joi.string(),
  original_launch: Joi.string(),
  mission: Joi.string(),
  landings: Joi.string(),
  type: Joi.string(),
  reuse_count: Joi.string()
})

const capsuleSerialSchema = Joi.string().max(4)

export default {
  addCapsuleSchema,
  updateCapsuleSchema,
  allCapsuleQuerySchema,
  capsuleSerialSchema
}
