const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 128,
      min_legnth: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thought = model('thought', thoughtSchema);

module.exports = thought;
