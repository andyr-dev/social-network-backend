const User = require("../models/User");
const mongoose  = require("mongoose");
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends').select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },


  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select("-__v");

      if (!user) {
        return res.status(404).json({
          message: "No user found with that ID, please try again",
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      res.json(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID, please try again" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID, please try again" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID, please try again" });
      }

      res.json("Successfully added friend!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID, please try again" });
      }

      res.json("Successfully removed friend");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
