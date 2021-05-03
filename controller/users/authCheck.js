const decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
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
    const currentTime = Date.now() / 1000;
    const accessToken = authorization.split(' ')[1];
    const accessTokenData = decode(accessToken);
    const refreshToken = req.headers.cookie.split('=')[1];
    const refreshTokenData = decode(refreshToken);
    console.log('exp:::', accessTokenData.exp);
    console.log('curTime:::', currentTime);

    // accessToken이 만료된경우 --> refreshToken도 만료됐는지 확인한다.
    if (currentTime > accessTokenData.exp) {
      // refreshToken마저 만료된경우, 재로그인 요청을 한다.
      if (currentTime > refreshTokenData.exp) {
        res.status(401).json({
          isAuth: false,
          message: '모든 토큰이 만료되었습니다. 다시 로그인해주세요.',
        });
      } else {
        // refreshToken이 있으면 accessToken을 재발급해준다.
        const newAccessToken = jwt.sign(
          { userId: accessTokenData.userId },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: '3h' },
        );
        res.status(200).json({
          isAuth: true,
          accessToken: newAccessToken,
          message: 'acceeToken이 재발급되었으며, 유저정보가 확인되었습니다.',
        });
      }
    } else {
      res.status(200).json({
        isAuth: true,
        accessToken,
        message: '유저정보가 확인되었습니다.',
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 토큰정보를 읽어오지 못했습니다.', err });
  }
};
