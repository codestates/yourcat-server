const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { nickname } = req.body;

    const existUser = await User.find()
      .where('nickname')
      .equals(nickname)
      .where('_id')
      .ne(userId)
      .lean();
    if (existUser.length === 0) {
      res
        .status(200)
        .json({ message: '변경 가능한 닉네임입니다.', isCheck: true });
    } else {
      res
        .status(401)
        .json({ message: '이미 존재하는 닉네임입니다.', isCheck: false });
    }
  } catch (err) {
    res.status(500).json({
      message: '서버문제로 닉네임체크에 실패했습니다.',
      isCheck: false,
    });
  }
};
