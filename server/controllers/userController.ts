import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { Request, Response } from "express";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

// @desc Register user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  // Get the user details
  const { name, email, password }: UserInput = req.body;

  // If there is a missing data from req.body
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all the fields" });
    // throw new Error('Please add all the fields')
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User is already registered" });
    // throw new Error('User is already registered')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Send the json response to the api

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    // throw new Error('Invalid user data')
  }
});

// @desc Login user
// @route GET /api/users/login
// @access Public

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // Get the user details
  const { email, password } = req.body;

  // Check for user email in database
  const user = await User.findOne({ email });

  // Check if the password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
    // throw new Error('Invalid credentials')
  }
});

// @desc Get user data
// @route /api/users/me
// @access Private

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const { _id, name, email } = (await User.findById(req.user.id)) as {
    _id: number;
    name: string;
    email: string;
  };

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate the token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getMe };
