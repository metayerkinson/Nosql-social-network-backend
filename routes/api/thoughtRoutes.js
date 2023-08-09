const router = require("express").Router();

const {
  getThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getThoughts).post(addThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
