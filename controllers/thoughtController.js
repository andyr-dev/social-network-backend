const { ObjectID } = require("mongoose").Types;
const Thoughts = require("../models/Thought");

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
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
      res.json(thoughts);
      if (!thought) {
        res.status(404).json({
          message: "Could not find a thought with this ID, please try again",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(res, req) {
    try {
      const newThought = await Thoughts.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(res, req) {
    try {
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      res.json(thoughts);
      if (!thought) {
        res
          .status(404)
          .json({ message: "No thought found with this ID, please try again" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought (res, req) {
    try {
        console.log("still working on it");

    } catch (err) { res.status(500).json(err); }
  }, 

  async addReaction (res, req) {
    try {
        console.log("still working on it");

    } catch (err) { res.status(500).json(err); }
  },

  async deleteReaction (res, req) {
    try {
        console.log("still working on it");
    } catch (err) { res.status(500).json(err); }
  }
};
