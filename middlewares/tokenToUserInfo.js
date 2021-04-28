const decode = require('jwt-decode');
const user = require('../models/User');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json({ message: '토큰이 존재하지 않습니다.' });
    return;
  }

  const bearer = authorization.split(' ')[0];
  if (bearer !== 'Bearer') {
    res.status(400).json({ message: 'Bearer 키워드가 존재하지 않습니다.' });
    return;
  }

  try {
    const token = authorization.split(' ')[1];
    const { userId } = decode(token);
    const userInfo = await user.findOne({ _id: userId }).lean();
    if (!userInfo) {
      res.status(401).json({ message: '유효하지않은 토큰입니다.' });
    } else {
      req.user = userInfo;
      next();
    }
  } catch (err) {
    console.log('userinfo error', err);
    res
      .status(500)
      .json({ message: '서버문제로 유저정보를 불러오는데 실패했습니다.' });
  }
};
