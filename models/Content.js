const mongoose = require('mongoose');

// FIXME:카테고리를 0,1,2,3 숫자로 분류하는게 편할지도????
const contentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    description: { type: String },
    like: { type: Number, default: 0 },
    image: { type: String },
    comment: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Content', contentSchema);
