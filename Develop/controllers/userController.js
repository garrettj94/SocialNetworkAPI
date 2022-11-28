const { User, Student } = require('../models');

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a users
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with that ID' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a users
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with that ID' })
          : Student.deleteMany({ _id: { $in: user.students } })
      )
      .then(() => res.json({ message: 'User and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a users
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};
