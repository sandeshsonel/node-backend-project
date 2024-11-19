const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thrusterSchema = new Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  pods: { type: Number, required: true },
  fuelOne: { type: String, required: true },
  fuelTwo: { type: String, required: true },
  isp: { type: Number, required: true },
  thrust: {
    kN: { type: Number, required: true },
    lbf: { type: Number, required: true }
  }
})

const heatShieldSchema = new Schema({
  material: { type: String, required: true },
  sizeMeters: { type: Number, required: true },
  tempDegrees: { type: Number, required: true },
  devPartner: { type: String, required: true }
})

const payloadVolumeSchema = new Schema({
  cubicMeters: { type: Number, required: true },
  cubicFeet: { type: Number, required: true }
})

const trunkSchema = new Schema({
  trunkVolume: { type: payloadVolumeSchema, required: true },
  cargo: {
    solarArray: { type: Number, required: true },
    unPressurizedCargo: { type: Boolean, required: true }
  }
})

const dragonSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  active: { type: Boolean, required: true },
  crewCapacity: { type: Number, required: true },
  sideWallAngleDeg: { type: Number, required: true },
  orbitDurationYr: { type: Number, required: true },
  dryMassKg: { type: Number, required: true },
  dryMassLb: { type: Number, required: true },
  firstFlight: { type: Date, required: true },
  heatShield: { type: heatShieldSchema, required: true },
  thrusters: { type: [thrusterSchema], required: true },
  launchPayloadMass: { type: payloadVolumeSchema, required: true },
  returnPayloadMass: { type: payloadVolumeSchema, required: true },
  pressurizedCapsule: {
    payloadVolume: { type: payloadVolumeSchema, required: true }
  },
  trunk: { type: trunkSchema, required: true },
  heightWTrunk: {
    meters: { type: Number, required: true },
    feet: { type: Number, required: true }
  },
  diameter: {
    meters: { type: Number, required: true },
    feet: { type: Number, required: true }
  },
  flickrImages: { type: [String], required: true },
  wikipedia: { type: String, required: true },
  description: { type: String, required: true }
})

const Dragon = mongoose.model('Dragon', dragonSchema)

module.exports = Dragon
