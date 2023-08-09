const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .then((res) => res.json(res))
      .catch((err) => res.status(500).json(err));
  },

  addThought(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: data._id } },
          { new: true }
        );
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thoughtData) => {
        // if no thought is found
        if (thoughtData) {
          res.status(404).json({ message: "Thought does not exist" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
        }

        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: "User and associated apps deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No friend found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete Reaction

  deleteReaction(req, res) {
    console.log(req.params);

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No reactionwith that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
