const Thoughts = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res.status(404).json({
          message: "No thought found with this ID, please try again",
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "No thought found with this ID, please try again",
        });
      }
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      res.json(thought);
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID, please try again" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID, please try again" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID, please try again" });
      }
      res.json(thought.reaction);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID, please try again" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
