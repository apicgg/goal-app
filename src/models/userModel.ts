import { Schema, model, SchemaDefinitionProperty } from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  timestamps: SchemaDefinitionProperty<string> | boolean
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
    },
    email: {
      type: String,
      required: [true, 'Please add your email id'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
  },
  {
    timestamps: true,
  }
)

const User = model<User>('User', userSchema)

export default User
