const decode = require('jwt-decode');
const Content = require('../../models/Content');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // 1. POST요청 URL의 :category와 일치하는 글들을 배열로 불러온다.
    const { category } = req.params;

    // 1.1 카테고리 목록에 해당하는 요청인지 유효성검사를 거친다.
    const categoryList = ['general', 'question', 'knowhow', 'photo'];
    const isCategory = categoryList.indexOf(category) !== -1;

    if (!isCategory) {
      res.status(400).json({ message: '유효하지않은 카테고리입니다.' });

      // 2. limit과 skip을 요청 body에서 받아온다. (더보기 버튼을 위해)
    } else {
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      let bookmark = [];

      // 3. 현재 로그인되어있다면, 북마크 목록을 불러온다.
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = decode(token);
        const userInfo = await User.findById(userId).select('-_id bookmark');
        bookmark = userInfo.bookmark;
      }

      const contents = await Content.find({ category })
        .populate('userId')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)
        .lean();

      // 3. 데이터 정리

      // 탈퇴한 회원인지 확인
      const validContents = contents.filter(el => el.userId);

      const contentsList = validContents.map(el => {
        const {
          _id: contentId,
          title,
          description,
          like,
          image: contentImage,
          userId: { _id: userId, nickname: userName },
          createdAt,
          updatedAt,
        } = el;

        const userImage = el.userId.catInfo
          ? el.userId.catInfo.image
          : undefined;

        // 북마크한 글인지 확인
        const check = bookmark.find(mark => mark.contentId.equals(contentId));
        const isBookmark = check ? true : false;

        const data = {
          contentId,
          title,
          category: el.category,
          description,
          like,
          contentImage,
          user: {
            userId,
            userName,
            userImage,
          },
          isBookmark,
          createdAt,
          updatedAt,
        };

        return data;
      });

      // 4. 더이상 불러올글이 없을때 더보기버튼을 없애기 위해서, 글목록의 길이도 res에 담아 보내준다.
      const contentsLength = contentsList.length;
      res.status(200).json({
        contentsList,
        contentsLength,
        message: '해당 카테고리의 게시글을 불러오는데 성공했습니다.',
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 게시글을 불러오는데 실패했습니다.', err });
  }
};
