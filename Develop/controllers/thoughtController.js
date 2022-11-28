// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (Thought) => {
        const thoughtObj = {
          thoughttext,
          createdAt: await headCount(),
          username,
          reactions,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean()
      .then(async (Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thoughttext,
            createdAt: await headCount(),
            username,
            reactions,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No such Thought exists' })
          : User.findOneAndUpdate(
              { thought: req.params.ThoughtId },
              { $pull: { thought: req.params.ThoughtId } },
              { new: true }
            )
      )
      .then((User) =>
        !User
          ? res.status(404).json({
              message: 'Thought deleted, but no user found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an reaction to a thought
  addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought 
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
