module.exports = async (req, res) => {
  const { email, nickname, bookmark, catInfo } = req.user;
  res.status(200).json({
    email,
    nickname,
    bookmark,
    catInfo,
    message: '유저정보를 불러오는데 성공했습니다.',
  });
};
