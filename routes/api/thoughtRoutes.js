const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);


router.route('/:thoughtId/reaction').post(addReaction);


router.route('/:thougthId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
