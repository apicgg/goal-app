import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Goal from "../models/goalModel";
import User from "../models/userModel";

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const getGoals = asyncHandler(async (req: Request, res: Response) => {
  const goals = await Goal.find({ user: req.user });
  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private

const setGoal = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private

const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404).json({ message: "User doesn't exist" });
  }

  if (user && goal.user.toString() !== user.id) {
    res.status(401).json({ message: "Not authorized" });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private

const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404).json({ message: "user doesn't exist" });
  }

  if (user && goal.user.toString() !== user.id) {
    res.status(401).json({ message: "Not authorized" });
  }

  await goal.remove();

  res
    .status(200)
    .json({ message: `The goal with ${req.params.id} has been deleted` });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
