const { User } = require('../models');

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Users
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Users with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Users with that ID' })
          : User.deleteMany({ _id: { $in: user._id } })
      )
      .then(() => res.json({ message: 'User  deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Users with this id!' })
          : res.json(Users)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
            .status(404)
            .json({ message: 'No user with that user name :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { userId: req.params.userId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
            .status(404)
            .json({ message: 'No User found with that userId :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

};
