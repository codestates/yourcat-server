module.exports = async (req, res) => {
  // TODO: bookmark의 배열길이가0이거나, catInfo가 undefined인 경우는 클라이언트에서 렌더하지 않는게 편리할듯
  const { email, nickname, bookmark, catInfo } = req.user;
  res.status(200).json({
    email,
    nickname,
    bookmark,
    catInfo,
    message: '유저정보를 불러오는데 성공했습니다.',
  });
};
