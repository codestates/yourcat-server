const User = require('../../models/User');

module.exports = async (req, res) => {
  const userId = '608d84f6cd55b0f7b3c4b606';

  // 3연속 populate!! 3연파!
  const userInfo = await User.findById(userId)
    .select('-_id bookmark')
    .populate({
      // 1. 북마크 필드안의 배열로 접근한다.
      path: 'bookmark',
      populate: {
        // 2. 배열안의 contentId를 참조하여 content정보를 불러온다.
        path: 'contentId',
        select: 'category title image userId',
        // 3. 불러온 content정보 중 userId를 참조하여 user(글쓴이)정보 중 nickname을 불러온다.
        populate: { path: 'userId', select: 'nickname' },
      },
    })
    .lean();

  const { bookmark } = userInfo;

  // TODO: 서버에서 photo와 아닌걸로 나누려면 API를 두개만들거나, 경로에 /:category를 줘서 나눠야한다.
  // 후자의경우 category는 원래 4가지인데, 여기서는 /photo 와 /community 로 나누거나
  // /community대신 /general, /knowhow요렇게 해야하는데 photo가 아니면 아무의미없어서 애매하다.
  // 클라에서 일단 모든 북마크리스트 받고 포토북마크페이지와 일반북마크페이지에서 filter로 거르는게 나을것같다. 얘기해보기.

  const onlyPhoto = bookmark.filter(eachBookmark => {
    return eachBookmark.contentId.category === 'photo';
  });

  res.json({ bookmark, onlyPhoto });
};
