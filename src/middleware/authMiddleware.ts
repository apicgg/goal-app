import { NextFunction, Request } from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import User from 'src/models/userModel'

const protect = asyncHandler(async (req: Request, res, next: NextFunction) => {
  let token: string | JwtPayload
  const jwtSecret: Secret = process.env.JWT_SECRET

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token
      token = req.headers.authorization.split(' ')[1]

      // Verify the token
      const decoded = jwt.verify(token, jwtSecret)

      // Get the user from the token
      // TODO: fix the ts error
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
})

export { protect }
