const User = require('../../models/User');
const Content = require('../../models/Content');

module.exports = async (req, res) => {
  const { contentId } = req.params;

  // TODO:
  // 일단 유저정보에 북마크 추가, 컨텐츠정보에 1씩더하기는 완료.
  // 이제 한번더누르면 북마크에서는 빼고 , 컨텐츠정보에서는 1 빼야함.
  // how? 유저정보에 bookmark를 탐색해서, 현재 contentId가 있으면과 없으면으로 분기하자
  const userInfo = await User.findOne({
    _id: '608d84f6cd55b0f7b3c4b606',
  })
    .updateOne({ $push: { bookmark: { contentId } } })
    .lean();

  const contentInfo = await Content.findById(contentId).updateOne({
    $inc: { like: 1 },
  });
  res.json({ userInfo, contentInfo });
};
