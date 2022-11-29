import express from 'express'
const router = express.Router()

import {
  getGoals,
  setGoal,
  updateGoal,
  deletGoal,
} from '../controllers/goalController'

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deletGoal)

// router.get('/', getGoals)
// router.post('/', setGoal)

// router.put('/:id', updateGoal)

// router.delete('/:id', deletGoal)

module.exports = router
