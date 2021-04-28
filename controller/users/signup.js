const validator = require('validator');
const User = require('../../models/User');

// TODO: bcrypt로 비밀번호 암호화는 basic다하고
module.exports = async (req, res) => {
  const { email, password, nickname, catInfo } = req.body;
  // or메서드는 결과값이 배열로 출력된다. 데이터없어도 빈배열들어감.
  const userInfo = await User.find().or([{ email }, { nickname }]).lean();
  if (!validator.isEmail(email)) {
    res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
  } else if (userInfo.length === 0) {
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

      res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    } catch (err) {
      console.log('controller/login.js err', err);
    }
    // 이메일 중복이면
  } else if (userInfo.find(document => document.email === email)) {
    res.status(401).json({ message: '이미 존재하는 이메일입니다.' });
  } else {
    // 닉네임 중복이면
    res.status(401).json({ message: '이미 존재하는 이름입니다.' });
  }
};
