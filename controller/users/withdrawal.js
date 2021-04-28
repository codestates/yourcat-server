const User = require('../../models/User');

// 회원탈퇴시 이메일 비밀번호 다시 입력할지? 클라이언트랑 얘기
module.exports = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.remove({ _id });
    res.status(200).json({ message: '회원탈퇴가 정상적으로 처리되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: '서버문제로 회원탈퇴에 실패했습니다.' });
  }
};
