import { Schema, model } from 'mongoose'

// Create an interface representing a document in MongoDB
interface Goal {
  user: {
    type: Schema.Types.ObjectId
    required: boolean
    ref: string
  }
  text: string
}

// Create a schema related to the document interface
const goalSchema = new Schema<Goal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

// Create a model associated with the schema
const Goal = model<Goal>('Goal', goalSchema)

export default Goal
