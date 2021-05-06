const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../../models/User');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({ email });

  // 0. 이메일 유효성 검사
  if (!validator.isEmail(email)) {
    res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
  }
  // 1-1. 만약 기존 회원이 아니면 error 메시지 보낸다.
  else if (!userInfo) {
    res.status(400).json({
      message: '등록된 이메일이 아닙니다.',
    });
  }
  // 1-2. 만약 비밀번호가 틀리다면 error 메시지 보낸다.
  else if (userInfo.password !== password) {
    res.status(400).json({ message: '잘못된 비밀번호 입니다.' });
  }
  // 2. _id를 토근 생성에 사용한다.
  else {
    const accessToken = jwt.sign(
      { userId: userInfo.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '3h' },
    );
    const refreshToken = jwt.sign(
      { userId: userInfo.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '1d' },
    );
    res
      .status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ accessToken, message: '로그인되었습니다.' });
  }
};
