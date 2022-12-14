const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');


router.route('/').get(getUsers).post(createUser);



router.route('/:userId/friends').post(addFriend);


router.route('/:userId/friends/:friendsId').delete(removeFriend);

router
  .route('/:userId')
  .get(getUsers)
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

  ;

module.exports = router;
