const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Content = require('../models/Content');

// * POST /test/createUser
router.post('/createUser', async (req, res) => {
  const { email, password, nickname } = req.body;

  const newUser = new User({
    nickname,
    email,
    password,
  });

  await newUser.save();
  res
    .status(200)
    .json({ message: 'success nocat signup~~', userId: newUser.id });
});

// * POST /test/createContent
router.post('/createContent', async (req, res) => {
  const { title, category, description, image } = req.body;

  const userId = await User.findOne()
    .select('_id')
    .where('nickname')
    .equals('순기');

  const newContent = new Content({
    title,
    category,
    description,
    image,
    userId,
  });

  await newContent.save();
  res.status(200).json({ message: 'success create content' });
});

module.exports = router;
