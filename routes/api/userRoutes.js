const router = require("express").Router();

const {
  getUsers,
  getUserById,
  addUsers,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/userController");

router.route("/").get(getUsers).post(addUsers);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
