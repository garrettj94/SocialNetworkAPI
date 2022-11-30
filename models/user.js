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
    thoughts: {
      type: Date,
  
    },
    friends: {
      type: Date,
    
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const user = model('user', userSchema);

module.exports = user
