const { Schema, model, Types } = require("mongoose");
const reactions = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      // required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      // required: true,
    },
    reaction: [reactions],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactions").get(function () {
  return this.reaction.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
