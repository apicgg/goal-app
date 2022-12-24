import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../models/userModel";

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | JwtPayload;
    const jwtSecret: Secret = process.env.JWT_SECRET!;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get the token
        token = req.headers.authorization.split(" ")[1];

        // Verify the token
        const { id } = jwt.verify(token, jwtSecret) as JwtPayload;

        // Get the user from the token
        (<any>req).user = await User.findById(id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Not authorized" });
        throw new Error("Not authorized");
      }
    }
    if (!token!) {
      res.status(401).json({ message: "No token found!" });
    }
  }
);

export { protect };
