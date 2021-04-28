const decode = require('jwt-decode');
const user = require('../../models/User');

module.exports = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: '토큰이 존재하지 않습니다.' });
  }

  const bearer = authorization.split(' ')[0];
  if (bearer !== 'Bearer') {
    return res
      .status(400)
      .json({ message: 'Bearer 키워드가 존재하지 않습니다.' });
  }

  try {
    const token = authorization.split(' ')[1];
    const { userId } = decode(token);
    const userInfo = await user.findOne({ _id: userId }).lean();
    if (!userInfo) {
      res.status(401).json({ message: '유효하지않은 토큰입니다.' });
    } else {
      // TODO: bookmark의 배열길이가0이거나, catInfo가 undefined인 경우는 클라이언트에서 렌더하지 않는게 편리할듯
      const { email, nickname, bookmark, catInfo } = userInfo;
      res.status(200).json({
        email,
        nickname,
        bookmark,
        catInfo,
        message: '유저정보를 불러오는데 성공했습니다.',
      });
    }
  } catch (err) {
    console.log('userinfo error', err);
    res
      .status(500)
      .json({ message: '서버문제로 유저정보를 불러오는데 실패했습니다.' });
  }
};
