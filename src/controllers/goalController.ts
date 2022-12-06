import asyncHandler from 'express-async-handler'

import Goal from '../model/goalModel'

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const getGoals = asyncHandler(async (_req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const goal = await Goal.create({
    text: req.body.text,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(404)
    throw new Error('Goal not found!')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private

const deletGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(404)
    throw new Error('Goal not found!')
  }

  await goal.remove()

  res
    .status(200)
    .json({ message: `The goal with ${req.params.id} has been deleted` })
})

export { getGoals, setGoal, updateGoal, deletGoal }
