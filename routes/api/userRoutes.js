const router = require("express").Router();

const {
    getAllUsers,
    getUser,
    createUser,
    updateUserInfo,
    deleteUser,
    createFriend,
    deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").delete(deleteUser).put(updateUserInfo).get(getUser);
router.route("/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router