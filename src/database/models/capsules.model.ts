import mongoose, { Schema, Document } from 'mongoose'

interface IMission {
  name: string
  flight: number
}

export interface ICapsule extends Document {
  capsule_serial: string
  capsule_id: string
  status: 'active' | 'retired' | 'inactive' | 'unknown'
  original_launch: Date
  original_launch_unix: number
  missions: IMission[]
  landings: number
  type: string
  details: string
  reuse_count: number
}

const capsuleSchema: Schema<ICapsule> = new Schema(
  {
    capsule_serial: {
      type: String,
      required: true
    },
    capsule_id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'retired', 'inactive', 'unknown'],
      required: true
    },
    original_launch: {
      type: Date,
      required: true
    },
    original_launch_unix: {
      type: Number,
      required: true
    },
    missions: [
      {
        name: {
          type: String,
          required: true
        },
        flight: {
          type: Number,
          required: true
        }
      }
    ],
    landings: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    reuse_count: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const CapsulesModel = mongoose.model<ICapsule>('Capsules', capsuleSchema)

export default CapsulesModel
