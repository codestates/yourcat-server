const User = require('../../models/User');

module.exports = async (req, res) => {
  const { email, password, nickname, catInfo } = req.body;
  // or메서드는 결과값이 배열로 출력된다. 데이터없어도 빈배열들어감.
  const userInfo = await User.find().or([{ email }, { nickname }]).lean();

  if (userInfo.length === 0) {
    try {
      // 고양이정보가 있으면 담아서 저장한다.
      if (catInfo) {
        const newUser = new User({
          nickname,
          email,
          password,
          catInfo,
        });
        await newUser.save();
        // 고양이 정보가 없으면 빼고 저장한다.
      } else {
        const newUser = new User({
          nickname,
          email,
          password,
        });
        await newUser.save();
      }

      res.status(200).json({ message: 'Success signup' });
    } catch (err) {
      console.log('controller/login.js err', err);
    }
    // 이메일 중복이면
  } else if (userInfo.find(document => document.email === email)) {
    res.status(401).json({ message: 'Already exists email' });
  } else {
    // 닉네임 중복이면
    res.status(401).json({ message: 'Already exists nickname' });
  }
};
