const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: true,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought"

    },
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"

    },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('User', userSchema);

module.exports = User
