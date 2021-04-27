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

// 유저정보에 북마크 추가 (하트누를때, accessToken과 contentId받야와야함)
// PATCH /test/addBookMark
router.patch('/addBookMark', async (req, res) => {
  /* const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt_decode(token);
			const user = await usersModel.findOne({ _id: decoded._id }); */
  const user = await User.findOne({ _id: '6087e6fb8475ed685bd8d976' });
  const { contentId } = req.body;
  await user.update({ $push: { bookmark: { contentId } } });
  res
    .status(200)
    .json({ message: 'success add bookmark!', Bookmark: user.bookmark });
});

module.exports = router;
