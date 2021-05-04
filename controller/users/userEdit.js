const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const { _id } = req.user;
    const { nickname, password, catInfo } = req.body;
    if (password.length !== 0) {
      req.data = { nickname, password, catInfo };
    } else {
      req.data = { nickname, catInfo };
    }
    const existUser = await User.findOne({ nickname });
    if (existUser) {
      res.status(401).json({ message: '이미 존재하는 닉네임입니다.' });
    } else {
      User.updateOne({ _id }, { $set: req.data }, (err, data) => {
        if (err) {
          res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
        } else if (data) {
          res.status(200).json({ message: '회원정보가 수정되었습니다.' });
        }
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 회원정보 수정에 실패했습니다.' });
  }
};
