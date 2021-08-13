const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const { _id } = req.user;

    const userInfo = await User.findById(_id)
      .select('-_id bookmark')
      .populate({
        // 1. 북마크 필드안의 배열로 접근한다.
        path: 'bookmark',
        populate: {
          // 2. 배열안의 contentId를 참조하여 content정보를 불러온다.
          path: 'contentId',
          select: 'category title image userId createdAt',
          // 3. 불러온 content정보 중 userId를 참조하여 user(글쓴이)정보 중 nickname,catInfo를 불러온다.
          populate: { path: 'userId', select: 'nickname catInfo' },
        },
      })
      .lean();
    if (!userInfo) {
      res.status(400).json({ message: '유저정보를 찾을 수 없습니다.' });
    } else {
      const bookmark = userInfo.bookmark.map(data => {
        if (data.contentId) {
          const {
            contentId: {
              _id: contentId,
              title,
              category,
              image: contentImage,
              userId: {
                catInfo: { image: userImage },
                _id: userId,
                nickname: userName,
              },
            },
          } = data;
          return {
            contentId,
            title,
            category,
            contentImage,
            userImage,
            userId,
            userName,
          };
        }
      });
      bookmark.reverse();
      res
        .status(200)
        .json({ bookmark, message: '북마크 목록을 불러왔습니다.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 북마크 목록을 불러올 수 없습니다.' });
  }
};
