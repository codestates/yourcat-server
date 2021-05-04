const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    bookmark: [
      {
        _id: false,
        contentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Content',
          required: true,
        },
      },
    ],
    catInfo: {
      name: { type: String, trim: true },
      age: { type: Number, trim: true },
      gender: { type: String, trim: true },
      image: {
        type: String,
        default: process.env.DEFAULT_IMAGE,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
