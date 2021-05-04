const User = require('../../models/User');
const getImageName = require('../../util/getImageName');

module.exports = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    getImageName('user', userId).then(imageName => {
      req.image = { model: 'user', imageName };
    });

    await User.deleteOne({ _id: userId });
    next();
  } catch (err) {
    res.status(500).json({ message: '서버문제로 회원탈퇴에 실패했습니다.' });
  }
};
