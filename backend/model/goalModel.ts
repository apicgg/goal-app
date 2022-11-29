import { Schema, model } from 'mongoose'

// Create an interface represnting a document in MongoDB
interface Goal {
  text: string
}

// Create a schema related to the document interface
const goalSchema = new Schema<Goal>(
  {
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
