const router = require("express").Router();

const {
    getToughts,
    getThought,
    think,
    editThought,
    deleteThought,
    createReaction,
    deletReaction
} = require("../../controllers/thoughtsControllers");

router.route("/").get(getToughts).post(think);
router.route("/:thoughtId").get(getThought).put(editThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction).delete(deletReaction)
router.route("/:thoughtId/reactions/:reactionsId").delete(deletReaction)

module.exports = router