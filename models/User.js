const mongoose = require('mongoose');

// TODO:minlength, maxlength 같은 옵션은 나중에. 테스트 번거로우니까!
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
      age: { type: String, trim: true },
      gender: { type: String, trim: true },
      image: { type: String },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
