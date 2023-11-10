const router = require("express").Router();

const {
    getToughts,
    getThought,
    think,
    editThought,
    deleteThought,
    react,
    deletReaction
} = require("../../controllers/thoughtsControllers");

router.route("/").get(getToughts).post(think);
router.route("/:thoughtId").get(getThought).put(editThought).delete(deleteThought);

module.exports = router