module.exports = (req, res) => {
  try {
    const { email } = req.user;
    const isAuth = email === req.body.email;

    if (!isAuth) {
      res.status(404).josn({ message: '잘못된 로그아웃 요청입니다.' });
    } else {
      res
        .clearCookie('refreshToken')
        .status(200)
        .json({ message: '로그아웃되었습니다.' });
    }
  } catch (err) {
    res.status(500).json({ message: '서버문제로 로그아웃에 실패했습니다.' });
  }
};
