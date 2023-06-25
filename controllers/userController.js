const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).JSON(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        res
          .status(404)
          .JSON({ message: "No User found with that ID, try another ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      newUser = await User.create(req.body);
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
        res
          .status(404)
          .json({ message: "No User found with that ID, try another ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser (res, req) {
    try {
        console.log("still working on it");
    } catch (err) { res.status(500).json(err); }
  }, 

  async addFriend (res, req) {
    try {
        console.log("still working on it");
    } catch (err) { res.status(500).json(err); }
  },

  async deleteFriend (res, req) {
    try {
        console.log("still working on it");
    } catch (err) { res.status(500).json(err); }
  }
};
