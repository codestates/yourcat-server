const mongoose = require('mongoose');

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
