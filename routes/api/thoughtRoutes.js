const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtid').get(getSingleThought).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reaction').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thougthId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
