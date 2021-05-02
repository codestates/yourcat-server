const User = require('../../models/User');
const getImageName = require('../../util/getImageName');

// 회원탈퇴시 이메일 비밀번호 다시 입력할지? 클라이언트랑 얘기
module.exports = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    getImageName('user', userId).then(imageName => {
      req.image = { where: 'user', imageName: imageName || undefined };
    });

    await User.deleteOne({ _id: userId });
    next();
  } catch (err) {
    res.status(500).json({ message: '서버문제로 회원탈퇴에 실패했습니다.' });
  }
};
